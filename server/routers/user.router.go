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
}
