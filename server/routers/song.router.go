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
	router.DELETE("/:id", middlewares.AuthMiddleware(), middlewares.SongGuard(), songController.DeleteSong)
	router.PUT("/:id", middlewares.AuthMiddleware(), middlewares.SongGuard(), songController.UpdateSong)
	router.POST("/:id/comment", middlewares.AuthMiddleware(), songController.CreateComment)
	router.GET("/:id/comment", songController.GetCommentOfSong)
	router.DELETE("/comment/:id", middlewares.AuthMiddleware(), middlewares.CommentGuard(), songController.DeleteComment)
	router.PUT("/comment/:id", middlewares.AuthMiddleware(), middlewares.CommentGuard(), songController.UpdateComment)
	router.POST("/play/:id", songController.IncrementPlayCount)
}
