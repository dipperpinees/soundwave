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

	//get user data
	router.GET("/:id", userController.GetUser)

	//filter user
	router.GET("/", userController.SearchUser)

	//get user's favorite song
	router.GET("/favorite", middlewares.AuthGuard(), userController.GetFavoriteSong)

	//get user's song
	router.GET("/:id/songs", userController.GetSongOfUser)

	//follow feature
	router.POST("/follow/:id", middlewares.AuthGuard(), userController.Follow)
	router.POST("/unfollow/:id", middlewares.AuthGuard(), userController.UnFollow)
	router.GET("/follower/:id", userController.GetFollowers)
	router.GET("/following/:id", userController.GetFollowings)
	// router.GET("/checkFollow/:id", userController.CheckIsFollow)
}
