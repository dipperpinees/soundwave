package guard

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/models"
)

func Comment() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid comment ID"})
			return
		}

		user := c.Keys["user"].(*models.User)
		if user.Role == "admin" {
			c.Next()
			return
		}

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
