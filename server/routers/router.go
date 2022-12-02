package routers

import "github.com/gin-gonic/gin"

func HandleRoute(router *gin.RouterGroup) {
	authRouter(router.Group("/"))
	userRouter(router.Group("/user"))
	songRouter(router.Group("/song"))
	genreRouter(router.Group("/genre"))
	playlistRouter(router.Group("/playlist"))
	adminRouter(router.Group("/admin"))
}
