package controllers

import (
	"math"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

type SongController struct{}

var songService = services.SongService{}
var commentService = services.CommentService{}

type songModel = models.Song

func (SongController) CreateSong(c *gin.Context) {
	type CreateSongForm struct {
		Title     string                `form:"title" binding:"required"`
		File      *multipart.FileHeader `form:"file" binding:"required"`
		Thumbnail *multipart.FileHeader `form:"file"`
	}
	user := c.Keys["user"].(*userModel)

	//validate form data
	formData := CreateSongForm{}
	if err := c.ShouldBind(&formData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	//start upload file
	songFile, _, _ := c.Request.FormFile("file")
	thumbnailFile, _, _ := c.Request.FormFile("thumbnail")

	//start upload avatar
	var listFile = make(map[string]multipart.File)
	listFile["song"] = songFile
	if thumbnailFile != nil {
		listFile["thumbnail"] = thumbnailFile
	}

	uploadUrl, err := uploadService.MultipleFileUpload(listFile)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	//upload song to database
	newSong := songModel{
		Title:     formData.Title,
		Url:       uploadUrl["song"],
		Thumbnail: uploadUrl["thumbnail"],
		AuthorID:  user.ID,
	}
	if err := songService.CreateSong(&newSong); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}
	newSong.Author = *user

	c.JSON(http.StatusOK, &newSong)
}

type songModelWithLike struct {
	models.Song
	Like int64 `json:"like"`
}

func (SongController) GetByID(c *gin.Context) {
	params := dtos.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}
	queueErr := make(chan error, 1)
	var song models.Song
	var likeNumber int64

	go func(song *models.Song) {
		var err error
		*song, err = songService.FindByID(params.ID)
		queueErr <- err
	}(&song)

	go func(likeNumber *int64) {
		var err error
		*likeNumber, err = songService.GetLikeNumber(params.ID)
		queueErr <- err
	}(&likeNumber)

	err := common.GroupError(queueErr, 2)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &songModelWithLike{Song: song, Like: likeNumber})
}

func (SongController) FindMany(c *gin.Context) {
	type QueryBinding struct {
		Page   int    `form:"page,default=1"`
		Search string `form:"search"`
	}

	query := QueryBinding{}
	c.BindQuery(&query)

	listSong, total, err := songService.FindMany(query.Page, query.Search)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}
	totalPages := int(math.Ceil(float64(total) / float64(common.LIMIT_PER_PAGE)))
	c.JSON(
		http.StatusOK,
		gin.H{
			"data":       *listSong,
			"pagination": models.Paginate{Page: query.Page, TotalPages: totalPages},
		},
	)
}

func (SongController) CreateFavoriteSong(c *gin.Context) {
	params := dtos.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}

	user := c.Keys["user"].(*userModel)

	data, err := songService.CreateFavoriteSong(user.ID, params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &data)
}

func (SongController) DeleteSong(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}

	if err := songService.DeleteByID(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete song successfully"})
}

func (SongController) UpdateSong(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}

	type UpdateSongForm struct {
		Title     string                `form:"title"`
		File      *multipart.FileHeader `form:"file"`
		Thumbnail *multipart.FileHeader `form:"file"`
	}

	formData := UpdateSongForm{}
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
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	updateData, err := songService.Update(params.ID, formData.Title, uploadUrl["song"], uploadUrl["thumbnail"])
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &updateData)
}

func (SongController) CreateComment(c *gin.Context) {
	type CommentBody struct {
		Content string `json:"content" binding:"required"`
	}

	params := dtos.IdParams{}
	body := CommentBody{}
	if err := c.ShouldBind(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}

	user := c.Keys["user"].(*userModel)

	comment := models.Comment{AuthorID: user.ID, SongID: params.ID, Content: body.Content}

	err := commentService.CreateComment(&comment)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}
	comment.Author = *user
	c.JSON(http.StatusOK, &comment)
}

func (SongController) GetCommentOfSong(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}

	comments, err := commentService.GetCommentOfSong(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &comments)
}

func (SongController) DeleteComment(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid comment ID")
		return
	}

	if err := commentService.DeleteComment(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete comment successfully"})
}

func (SongController) UpdateComment(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid comment ID")
		return
	}

	type CommentBody struct {
		Content string `json:"content" binding:"required"`
	}

	body := CommentBody{}
	if err := c.ShouldBind(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := commentService.UpdateComment(params.ID, body.Content); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Update comment successfully"})
}

func (SongController) IncrementPlayCount(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}

	err := songService.IncrementPlayCount(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Increment play count successfully"})
}
