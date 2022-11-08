package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/models"
)

func AuthGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Keys["user"] == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
	}
}

func SongGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
			return
		}

		user := c.Keys["user"].(*userModel)
		var thisSong models.Song
		err := common.GetDB().First(&thisSong, params.ID).Error
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "This song does not exist"})
			return
		}

		if thisSong.AuthorID != user.ID {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "You are not authorized to perform this action"})
			return
		}
	}
}

func CommentGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid comment ID"})
			return
		}

		user := c.Keys["user"].(*userModel)
		var thisComment models.Comment
		err := common.GetDB().First(&thisComment, params.ID).Error
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "This comment does not exist"})
			return
		}

		if user.ID != thisComment.AuthorID {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "You are not authorized to perform this action"})
			return
		}
	}
}

func PlaylistGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid playlist ID"})
			return
		}

		user := c.Keys["user"].(*userModel)
		var thisPlaylist models.Playlist
		err := common.GetDB().First(&thisPlaylist, params.ID)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "This playlist does not exist"})
			return
		}

		if thisPlaylist.AuthorID != user.ID {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "You are not authorized to perform this action"})
			return
		}
	}
}
