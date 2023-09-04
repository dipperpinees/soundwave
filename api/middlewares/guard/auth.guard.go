package guard

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/models"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Keys["user"] == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
	}
}

func Banned() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Keys["user"].(*models.User).IsBanned {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Your account has been banned"})
			return
		}
	}
}
