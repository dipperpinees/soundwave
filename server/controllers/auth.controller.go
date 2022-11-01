package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

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
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	hashPassword, _ := common.HashPassword(body.Password)

	newUser := models.User{Email: body.Email, Password: hashPassword, Name: body.Name}

	if err := userService.CreateOne(&newUser); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	tokenString, _ := common.GenerateJWT(newUser.ID)
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("access_token", tokenString, 365*60*60*24, "/", "", true, true)
	c.JSON(http.StatusAccepted, gin.H{"id": newUser.ID, "name": newUser.Name, "avatar": newUser.Avatar, "role": newUser.Role})
}

type SignInBody struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

func (AuthController) SignIn(c *gin.Context) {
	body := SignInBody{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := userService.FindOne(&userModel{Email: body.Email})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "This user is not exist")
		return
	}

	if !common.CheckPasswordHash(body.Password, user.Password) {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Wrong password")
		return
	}

	tokenString, _ := common.GenerateJWT(user.ID)

	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("access_token", tokenString, 365*60*60*24, "/", "", true, true)
	c.JSON(http.StatusAccepted, gin.H{"id": user.ID, "name": user.Name, "avatar": user.Avatar, "role": user.Role})
}

func (AuthController) Auth(c *gin.Context) {
	user := c.Keys["user"].(*userModel)
	c.JSON(http.StatusOK, gin.H{"id": user.ID, "name": user.Name, "avatar": user.Avatar, "role": user.Role})
}

func (AuthController) LogOut(c *gin.Context) {
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie("access_token", "", -1, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Log out successfully"})
}
