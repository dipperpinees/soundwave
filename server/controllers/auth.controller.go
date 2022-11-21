package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

var userService = services.UserService{}
var emailService = services.Email{}

type userModel = models.User

type AuthController struct{}

func (AuthController) SignUp(c *gin.Context) {
	body := models.UserCreateInput{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	hashPassword, _ := common.HashPassword(body.Password)

	newUser := models.User{Email: body.Email, Password: hashPassword, Name: body.Name}

	if err := userService.CreateOne(&newUser); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	tokenString, _ := common.GenerateJWT(newUser.ID)
	common.SetTokenCookie(c, tokenString)
	c.JSON(http.StatusAccepted, gin.H{"id": newUser.ID, "name": newUser.Name, "avatar": newUser.Avatar, "role": newUser.Role})
}

func (AuthController) SignIn(c *gin.Context) {
	body := models.UserSignInInput{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	user, err := userService.FindOne(&userModel{Email: body.Email})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "This user is not exist"})
		return
	}

	if !common.CheckPasswordHash(body.Password, user.Password) {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Wrong password"})
		return
	}

	tokenString, _ := common.GenerateJWT(user.ID)

	common.SetTokenCookie(c, tokenString)
	c.JSON(http.StatusAccepted, gin.H{"id": user.ID, "name": user.Name, "avatar": user.Avatar, "role": user.Role})
}

func (AuthController) Auth(c *gin.Context) {
	user := c.Keys["user"].(*userModel)
	c.JSON(http.StatusOK, gin.H{"id": user.ID, "name": user.Name, "avatar": user.Avatar, "role": user.Role})
}

func (AuthController) LogOut(c *gin.Context) {
	common.ClearTokenCookie(c)
	c.JSON(http.StatusOK, gin.H{"message": "Log out successfully"})
}

func (AuthController) ForgetPassword(c *gin.Context) {
	body := models.UserEmailInput{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	user, err := userService.FindOne(&userModel{Email: body.Email})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "This user doesn't exist"})
		return
	}
	code, err := userService.CreateForget(user.ID)
	emailService.SendForgotPassword([]string{user.Email}, code)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"userID": user.ID})
}

func (AuthController) ResetPassword(c *gin.Context) {
	body := models.UserResetPasswordInput{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	if err := userService.ResetPassword(body.UserID, body.Code, body.NewPassword); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, "Reset password successfully")
}

func (AuthController) GoogleLogin(c *gin.Context) {
	body := models.UserGoogleInput{}
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	googleProfile, err := common.DecodeGoogleJWT(body.AccessToken)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	var user = userModel{Email: googleProfile.Email, Name: googleProfile.Name, Avatar: googleProfile.Picture, Password: common.RandStr(8)}
	if err := userService.FindOneOrCreate(&user); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	tokenString, _ := common.GenerateJWT(user.ID)

	common.SetTokenCookie(c, tokenString)
	c.JSON(http.StatusAccepted, gin.H{"id": user.ID, "name": user.Name, "avatar": user.Avatar, "role": user.Role})
}
