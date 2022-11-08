package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

var userService = services.UserService{}

type userModel = models.User

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Request.Cookie("access_token")
		if err != nil {
			c.Set("user", nil)
			return
		}

		claims, err := common.DecodeJWT(token.Value)

		if err != nil {
			c.Set("user", nil)
			return
		}

		userID := uint(claims["id"].(float64))
		user, err := userService.FindOne(userModel{ID: userID})
		if err != nil {
			c.Set("user", nil)
			return
		}

		c.Set("user", &user)
	}
}
