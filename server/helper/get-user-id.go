package helper

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/models"
)

func GetUserID(c *gin.Context) uint {
	user := c.Keys["user"]
	if user == nil {
		return 0
	}
	return user.(*models.User).ID
}
