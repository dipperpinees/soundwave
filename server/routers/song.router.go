package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares"
)

var songController = controllers.SongController{}

func songRouter(router *gin.RouterGroup) {
	router.GET("/", songController.FindMany)
	router.POST("/", middlewares.AuthGuard(), songController.CreateSong)
	router.GET("/:id", songController.GetByID)
	router.POST("/like/:id", middlewares.AuthGuard(), songController.CreateFavoriteSong)
	router.DELETE("/like/:id", middlewares.AuthGuard(), songController.DeleteFavoriteSong)
	router.DELETE("/:id", middlewares.AuthGuard(), middlewares.SongGuard(), songController.DeleteSong)
	router.PUT("/:id", middlewares.AuthGuard(), middlewares.SongGuard(), songController.UpdateSong)
	router.POST("/:id/comment", middlewares.AuthGuard(), songController.CreateComment)
	router.GET("/:id/comment", songController.GetCommentOfSong)
	router.DELETE("/comment/:id", middlewares.AuthGuard(), middlewares.CommentGuard(), songController.DeleteComment)
	router.PUT("/comment/:id", middlewares.AuthGuard(), middlewares.CommentGuard(), songController.UpdateComment)
	router.POST("/play/:id", songController.IncrementPlayCount)
}
