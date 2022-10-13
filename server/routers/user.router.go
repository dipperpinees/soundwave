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
		middlewares.AuthMiddleware(),
		middlewares.LimitUploadMiddleware(4),
		userController.UploadAvatar,
	)

	//get user data
	router.GET("/:id", userController.GetUser)

	//filter user
	router.GET("/", userController.SearchUser)

	//get user's favorite song
	router.GET("/favorite", middlewares.AuthMiddleware(), userController.GetFavoriteSong)

	//get user's song
	router.GET("/:id/songs", userController.GetSongOfUser)

	//follow feature
	router.POST("/follow/:id", middlewares.AuthMiddleware(), userController.Follow)
	router.POST("/unfollow/:id", middlewares.AuthMiddleware(), userController.UnFollow)
	router.GET("/follower/:id", userController.GetFollowers)
	router.GET("/following/:id", userController.GetFollowings)

}
