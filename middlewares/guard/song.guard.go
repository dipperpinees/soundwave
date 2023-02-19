package guard

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/models"
)

func Song() gin.HandlerFunc {
	return func(c *gin.Context) {
		params := dtos.IdParams{}
		if err := c.ShouldBindUri(&params); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid song ID"})
			return
		}

		user := c.Keys["user"].(*models.User)
		if user.Role == "admin" {
			c.Next()
			return
		}

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
