package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/controllers"
)

var genreController = controllers.GenreController{}

func genreRouter(router *gin.RouterGroup) {
	router.GET("/", genreController.GetAll)
}
