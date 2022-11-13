package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares"
)

var playlistController = controllers.PlaylistController{}

func playlistRouter(router *gin.RouterGroup) {
	router.POST("/", middlewares.AuthGuard(), playlistController.Create)
	router.GET("/:id", playlistController.FindByID)
	router.DELETE("/:id", middlewares.AuthGuard(), middlewares.PlaylistGuard(), playlistController.Delete)
	router.POST("/:id/songs", middlewares.AuthGuard(), middlewares.PlaylistGuard(), playlistController.AddSong)
	router.DELETE("/:id/songs", middlewares.AuthGuard(), middlewares.PlaylistGuard(), playlistController.RemoveSong)
}
