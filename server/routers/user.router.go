package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares"
)

var userController = controllers.UserController{}

func userRouter(router *gin.RouterGroup) {
	router.POST(
		"/uploadAvatar",
		middlewares.AuthGuard(),
		middlewares.LimitUploadMiddleware(4),
		userController.UploadAvatar,
	)
	router.GET("/:id", userController.GetUser)
	router.GET("/", userController.SearchUser)
	router.GET("/favorite", middlewares.AuthGuard(), userController.GetFavoriteSong)
	router.GET("/:id/songs", userController.GetSongOfUser)
	router.GET("/:id/playlists", userController.GetPlaylistOfUser)
	router.POST("/follow/:id", middlewares.AuthGuard(), userController.Follow)
	router.POST("/unfollow/:id", middlewares.AuthGuard(), userController.UnFollow)
	router.GET("/follower/:id", userController.GetFollowers)
	router.GET("/following/:id", userController.GetFollowings)
}
