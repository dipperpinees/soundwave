package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

type AuthResponse struct {
	ID    uint   `json:"id"`
	Email string `json:"email"`
	Token string `json:"token"`
}

var userService = services.UserService{}

type userModel = models.User

type AuthController struct{}

type SignUpBody struct {
	Email    string `json:"email" binding:"required,email"`
	Name     string `json:"name" binding:"required,min=6"`
	Password string `json:"password" binding:"required,min=6"`
}

func (AuthController) SignUp(c *gin.Context) {
	body := SignUpBody{}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	hashPassword, _ := common.HashPassword(body.Password)

	newUser := models.User{Email: body.Email, Password: hashPassword, Name: body.Name}

	if err := userService.CreateOne(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tokenString, _ := common.GenerateJWT(newUser.ID, newUser.Email)

	c.JSON(http.StatusAccepted, &AuthResponse{ID: newUser.ID, Email: newUser.Email, Token: tokenString})
}

type SignInBody struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

func (AuthController) SignIn(c *gin.Context) {
	body := SignInBody{}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	users, err := userService.FindOne(&userModel{Email: body.Email})
	if err != nil {
		c.JSON(http.StatusBadRequest, "This user is not exist")
		return
	}

	if !common.CheckPasswordHash(body.Password, users.Password) {
		c.JSON(http.StatusBadRequest, "Wrong password")
		return
	}

	tokenString, _ := common.GenerateJWT(users.ID, users.Email)

	c.JSON(http.StatusAccepted, &AuthResponse{ID: users.ID, Email: users.Email, Token: tokenString})
}

func (AuthController) Auth(c *gin.Context) {
	user := c.Keys["user"].(*userModel)
	c.JSON(http.StatusOK, user)
}
