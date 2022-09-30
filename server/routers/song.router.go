package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares"
)

var songController = controllers.SongController{}

func songRouter(router *gin.RouterGroup) {
	router.GET("/", songController.FindMany)
	router.POST("/", middlewares.AuthMiddleware(), songController.CreateSong)
	router.GET("/:id", songController.GetByID)
	router.POST("/like/:id", middlewares.AuthMiddleware(), songController.CreateFavoriteSong)
	router.POST("/comment/:id", middlewares.AuthMiddleware(), songController.CreateComment)
}
