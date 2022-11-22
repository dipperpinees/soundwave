package controllers

import (
	"math"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/helper"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

type SongController struct{}

var songService = services.SongService{}
var commentService = services.CommentService{}

type songModel = models.Song

func (SongController) CreateSong(c *gin.Context) {
	user := c.Keys["user"].(*userModel)

	//validate form data
	formData := models.SongCreateInput{}
	if err := c.ShouldBind(&formData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var listFile = make(map[string]multipart.File)

	songFile, _, _ := c.Request.FormFile("file")
	//check audio file type is valid
	if !helper.IsValidContentType("audio", songFile) {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Invalid audio file type"})
		return
	}
	listFile["song"] = songFile

	thumbnailFile, _, _ := c.Request.FormFile("thumbnail")
	if thumbnailFile != nil {
		if !helper.IsValidContentType("image", thumbnailFile) {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Invalid thumbnail file type"})
			return
		}
		listFile["thumbnail"] = thumbnailFile
	}
	uploadUrl, err := uploadService.MultipleFileUpload(listFile)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	//upload song to database
	newSong := songModel{
		Title:     formData.Title,
		Url:       uploadUrl["song"],
		Thumbnail: uploadUrl["thumbnail"],
		AuthorID:  user.ID,
		GenreID:   formData.GenreID,
	}
	if err := songService.CreateOne(&newSong); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	newSong.Author = *user

	c.JSON(http.StatusOK, &newSong)
}

func (SongController) GetByID(c *gin.Context) {
	params := helper.IdParams{}
	userID := helper.GetUserID(c)

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	song, err := songService.FindByID(params.ID, userID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &song)
}

func (SongController) FindMany(c *gin.Context) {
	userID := helper.GetUserID(c)

	query := models.SongFilterInput{}
	c.BindQuery(&query)

	listSong, total, err := songService.FindMany(query.Page, query.Search, query.OrderBy, query.GenreID, query.Limit, userID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	totalPages := int(math.Ceil(float64(total) / float64(query.Limit)))
	c.JSON(
		http.StatusOK,
		gin.H{
			"data":       *listSong,
			"pagination": models.Paginate{Page: query.Page, TotalPages: totalPages, TotalDocs: total},
		},
	)
}

func (SongController) CreateFavoriteSong(c *gin.Context) {
	params := helper.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	user := c.Keys["user"].(*userModel)

	_, err := songService.CreateFavoriteSong(user.ID, params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Like song successfully"})
}

func (SongController) DeleteFavoriteSong(c *gin.Context) {
	params := helper.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	user := c.Keys["user"].(*userModel)

	if err := songService.DeleteFavoriteSong(user.ID, params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete favorite song successfully"})
}

func (SongController) DeleteSong(c *gin.Context) {
	params := helper.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	if err := songService.DeleteByID(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete song successfully"})
}

func (SongController) UpdateSong(c *gin.Context) {
	params := helper.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	formData := models.SongUpdateInput{}
	c.ShouldBind(&formData)

	//start upload file
	songFile, _, _ := c.Request.FormFile("file")
	thumnailFile, _, _ := c.Request.FormFile("thumbnail")

	//start upload avatar
	var listFile = make(map[string]multipart.File)
	if songFile != nil {
		listFile["song"] = songFile
	}
	if thumnailFile != nil {
		listFile["thumbnail"] = thumnailFile
	}

	uploadUrl, err := uploadService.MultipleFileUpload(listFile)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	updateData, err := songService.UpdateOne(params.ID, formData.Title, uploadUrl["song"], uploadUrl["thumbnail"], formData.GenreID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &updateData)
}

func (SongController) CreateComment(c *gin.Context) {
	params := helper.IdParams{}
	body := models.CommentCreateInput{}
	if err := c.ShouldBind(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	user := c.Keys["user"].(*userModel)

	comment := models.Comment{AuthorID: user.ID, SongID: params.ID, Content: body.Content}

	err := commentService.CreateOne(&comment)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	comment.Author = *user
	c.JSON(http.StatusOK, &comment)
}

func (SongController) GetCommentOfSong(c *gin.Context) {
	params := helper.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	comments, err := commentService.GetCommentsOfSong(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &comments)
}

func (SongController) DeleteComment(c *gin.Context) {
	params := helper.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid comment ID"})
		return
	}

	if err := commentService.DeleteOne(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete comment successfully"})
}

func (SongController) UpdateComment(c *gin.Context) {
	params := helper.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid comment ID"})
		return
	}

	type CommentBody struct {
		Content string `json:"content" binding:"required"`
	}

	body := CommentBody{}
	if err := c.ShouldBind(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := commentService.UpdateOne(params.ID, body.Content); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Update comment successfully"})
}

func (SongController) IncrementPlayCount(c *gin.Context) {
	params := helper.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}

	err := songService.IncrementPlayCount(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Increment play count successfully"})
}
