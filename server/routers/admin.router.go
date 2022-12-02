package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
	"github.com/hiepnguyen223/int3306-project/middlewares/guard"
)

var adminController = controllers.AdminController{}

func adminRouter(router *gin.RouterGroup) {
	router.DELETE("/user/:id", guard.Auth(), guard.AdminGuard(), adminController.DeleteUser)
}
