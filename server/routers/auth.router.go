package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares"
)

var authController = controllers.AuthController{}

func authRouter(router *gin.RouterGroup) {
	router.POST("/signup", authController.SignUp)
	router.POST("/signin", authController.SignIn)
	router.POST("/google/signin", authController.GoogleLogin)
	router.POST("/auth", middlewares.AuthGuard(), authController.Auth)
	router.POST("/logout", authController.LogOut)
	router.POST("/password/forget", authController.ForgetPassword)
	router.POST("/password/reset", authController.ResetPassword)
}
