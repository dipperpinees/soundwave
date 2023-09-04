package controllers

import (
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/helper"
	"github.com/hiepnguyen223/int3306-project/helper/upload"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

type PlaylistController struct{}

var playlistService = services.PlaylistService{}

func (PlaylistController) Create(c *gin.Context) {
	user := c.Keys["user"].(*userModel)
	formData := dtos.PlaylistCreateInput{}

	if err := c.ShouldBind(&formData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if err := upload.Upload(c, &formData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	newPlaylist := models.Playlist{AuthorID: user.ID, Name: formData.Name, Thumbnail: formData.Thumbnail}

	if err := playlistService.CreateOne(&newPlaylist); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	newPlaylist.Author = *user
	c.JSON(http.StatusOK, &newPlaylist)
}

func (PlaylistController) FindByID(c *gin.Context) {
	userID := helper.GetUserID(c)

	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist id"})
	}

	playlist, err := playlistService.FindByID(params.ID, userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &playlist)
}

func (PlaylistController) AddSong(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist id"})
		return
	}
	type Body struct {
		SongID uint `json:"songID,omitempty" binding:"required"`
	}
	body := Body{}

	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if err := playlistService.AddSong(body.SongID, params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Add song to playlist successfully"})
}

func (PlaylistController) RemoveSong(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist id"})
		return
	}
	type Body struct {
		SongID uint `json:"songID,omitempty" binding:"required"`
	}
	body := Body{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if err := playlistService.RemoveSong(body.SongID, params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Remove song from playlist successfully"})
}

func (PlaylistController) Delete(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist id"})
		return
	}

	if err := playlistService.DeleteByID(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete playlist successfully"})
}

func (PlaylistController) FindMany(c *gin.Context) {
	userID := helper.GetUserID(c)
	query := dtos.PlaylistFilterInput{}
	c.BindQuery(&query) //nolint:all

	playlists, total, err := playlistService.FindMany(query.Page, query.Search, query.Limit, userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(query.Limit)))
	c.JSON(
		http.StatusOK,
		gin.H{
			"data":       *playlists,
			"pagination": dtos.Paginate{Page: query.Page, TotalPages: totalPages, TotalDocs: total},
		},
	)
}
