package controllers

import (
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

var uploadService = services.UploadService{}

type UserController struct{}

func (UserController) UploadAvatar(c *gin.Context) {
	userID := c.Keys["user"].(*userModel).ID

	formFile, _, err := c.Request.FormFile("avatar")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}
	if formFile == nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, "Failed upload avatar")
		return
	}

	//check file type is valid
	if !common.IsValidContentType("image", formFile) {
		c.AbortWithStatusJSON(http.StatusInternalServerError, "Invalid file type")
		return
	}

	//close upload when uploaded
	defer formFile.Close()

	//start upload avatar
	uploadUrl, err := uploadService.SingleFileUpload(formFile)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if err := userService.UpdateOne(userID, &userModel{Avatar: uploadUrl}); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": uploadUrl})
}

func (UserController) GetUser(c *gin.Context) {
	params := dtos.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid user ID")
		return
	}

	user, err := userService.FindOne(&userModel{ID: params.ID})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &user)
}

// func (UserController) GetUserProfile(c *gin.Context) {

// }

func (UserController) SearchUser(c *gin.Context) {
	type SearchUserQuery struct {
		Search string `form:"search"`
		Page   int    `form:"page,default=1"`
	}
	query := SearchUserQuery{}
	if err := c.BindQuery(&query); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	userList, total, err := userService.Search(query.Page, query.Search)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(common.LIMIT_PER_PAGE)))
	c.JSON(
		http.StatusOK,
		gin.H{
			"data":       *userList,
			"pagination": models.Paginate{Page: query.Page, TotalPages: totalPages},
		},
	)
}

func (UserController) GetFavoriteSong(c *gin.Context) {
	userID := c.Keys["user"].(*userModel).ID

	songs, err := userService.GetFavoriteSong(userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &songs)
}

func (UserController) GetSongOfUser(c *gin.Context) {
	params := dtos.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid user ID")
		return
	}

	songs, err := userService.GetSongOfUser(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, &songs)
}
