package users

import (
	"github.com/gin-gonic/gin"
)

func HandleRoute(router *gin.RouterGroup) {
	router.POST("/signup", signUp)
	router.POST("/signin", signIn)
}
