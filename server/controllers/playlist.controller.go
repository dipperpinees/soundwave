package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

type PlaylistController struct{}

var playlistService = services.PlaylistService{}

func (PlaylistController) Create(c *gin.Context) {
	user := c.Keys["user"].(*userModel)
	type Body struct {
		Name string `json:"name" binding:"required"`
	}
	body := Body{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	newPlaylist := models.Playlist{AuthorID: user.ID, Name: body.Name}
	if err := playlistService.Create(&newPlaylist); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// if err := playlistService.AddSong(body.Songs, newPlaylist.ID); err != nil {
	// 	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	// 	return
	// }
	newPlaylist.Author = *user
	c.JSON(http.StatusOK, &newPlaylist)
}

func (PlaylistController) FindByID(c *gin.Context) {
	params := common.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist id"})
	}

	playlist, err := playlistService.FindByID(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &playlist)
}

func (PlaylistController) AddSong(c *gin.Context) {
	params := common.IdParams{}
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
	params := common.IdParams{}
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
	params := common.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist id"})
		return
	}

	if err := playlistService.Delete(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete playlist successfully"})
}
