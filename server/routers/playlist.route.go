package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares/guard"
)

var playlistController = controllers.PlaylistController{}

func playlistRouter(router *gin.RouterGroup) {
	router.GET("/", playlistController.FindMany)
	router.POST("/", guard.Auth(), playlistController.Create)
	router.GET("/:id", playlistController.FindByID)
	router.DELETE("/:id", guard.Auth(), guard.Playlist(), playlistController.Delete)
	router.POST("/:id/songs", guard.Auth(), guard.Playlist(), playlistController.AddSong)
	router.DELETE("/:id/songs", guard.Auth(), guard.Playlist(), playlistController.RemoveSong)
}
