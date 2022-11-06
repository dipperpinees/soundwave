package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

type PlaylistController struct{}

var playlistService = services.PlaylistService{}

func (PlaylistController) Create(c *gin.Context) {
	userID := c.Keys["user"].(*userModel).ID
	type Body struct {
		Name string `json:"name" binding:"required"`
	}
	body := Body{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	newPlaylist := models.Playlist{AuthorID: userID}
	if err := playlistService.Create(&newPlaylist); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &newPlaylist)
}

// func (PlaylistController) FindByID(c *gin.Context) {
// 	params := dtos.IdParams{}
// 	if err := c.ShouldBindUri(&params); err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid playlist id")
// 	}

// 	playlist, err :=
// }
