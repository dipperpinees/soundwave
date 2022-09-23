package users

import (
	"net/http"

	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/gin-gonic/gin"
)

type AuthBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
}

type AuthResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Token    string `json:"token"`
}

func signUp(c *gin.Context) {
	body := AuthBody{}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	hashPassword, _ := common.HashPassword(body.Password)

	newUser := UserModel{Username: body.Username, Password: hashPassword}

	if err := saveOne(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tokenString, _ := common.GenerateJWT(newUser.ID, newUser.Username)

	c.JSON(http.StatusAccepted, &AuthResponse{ID: newUser.ID, Username: newUser.Username, Token: tokenString})
}

func signIn(c *gin.Context) {
	body := AuthBody{}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	users, err := findOne(&UserModel{Username: body.Username})
	if err != nil {
		c.JSON(http.StatusBadRequest, "This user is not exist")
		return
	}

	if !common.CheckPasswordHash(body.Password, users.Password) {
		c.JSON(http.StatusBadRequest, "Wrong password")
		return
	}

	tokenString, _ := common.GenerateJWT(users.ID, users.Username)
	
	c.JSON(http.StatusAccepted, &AuthResponse{ID: users.ID, Username: users.Username, Token: tokenString})
}
