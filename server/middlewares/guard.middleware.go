package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/services"
)

var songService = services.SongService{}

func SongGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid song ID")
			return
		}

		user := c.Keys["user"].(*userModel)
		song, err := songService.FindByID(params.ID)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, "This song does not exist")
			return
		}

		if song.AuthorID != user.ID {
			c.AbortWithStatusJSON(http.StatusBadRequest, "You are not authorized to perform this action")
			return
		}
	}
}

var commentService = services.CommentService{}

func CommentGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid comment ID")
			return
		}

		user := c.Keys["user"].(*userModel)
		comment, err := commentService.GetCommentByID(params.ID)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, "This comment does not exist")
			return
		}

		if user.ID != comment.AuthorID {
			c.AbortWithStatusJSON(http.StatusBadRequest, "You are not authorized to perform this action")
			return
		}
	}
}
