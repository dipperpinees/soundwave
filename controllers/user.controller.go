package controllers

import (
	"fmt"
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/helper"
	"github.com/hiepnguyen223/int3306-project/helper/upload"
	"github.com/hiepnguyen223/int3306-project/services"
)

var followService = services.FollowService{}

type UserController struct{}

func (UserController) UpdateUser(c *gin.Context) {
	userID := helper.GetUserID(c)

	userUpdate := dtos.UserUpdateInput{}
	c.ShouldBind(&userUpdate)

	if err := upload.Upload(c, &userUpdate); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	user, err := userService.UpdateOne(userID, userUpdate.Avatar, userUpdate.Description, userUpdate.Name)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	//clear cache
	common.DeleteCache(fmt.Sprintf("%v", userID))

	c.JSON(http.StatusOK, &user)
}

func (UserController) GetUser(c *gin.Context) {
	params := dtos.IdParams{}
	userID := helper.GetUserID(c)

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	user, err := userService.FindOne(params.ID, userID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &user)
}

func (UserController) SearchUser(c *gin.Context) {
	userID := helper.GetUserID(c)

	query := dtos.UserFilterInput{}
	if err := c.BindQuery(&query); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userList, total, err := userService.FindMany(query.Page, query.Search, query.OrderBy, query.Limit, userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(query.Limit)))

	c.JSON(
		http.StatusOK,
		gin.H{
			"data":       *userList,
			"pagination": dtos.Paginate{Page: query.Page, TotalPages: totalPages, TotalDocs: total},
		},
	)
}

func (UserController) GetFavoriteSong(c *gin.Context) {
	userID := helper.GetUserID(c)

	songs, err := userService.GetFavoriteSong(userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &songs)
}

func (UserController) GetSongOfUser(c *gin.Context) {
	params := dtos.IdParams{}
	userID := helper.GetUserID(c)

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	songs, err := userService.GetSongOfUser(params.ID, userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &songs)
}

func (UserController) GetPlaylistOfUser(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	playlists, err := userService.GetPlaylistOfUser(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &playlists)
}

func (UserController) Follow(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid following ID"})
		return
	}

	userID := helper.GetUserID(c)

	if err := followService.CreateOne(userID, params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Follow successfully"})
}

func (UserController) UnFollow(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid following ID"})
		return
	}

	userID := c.Keys["user"].(*userModel).ID
	if err := followService.DeleteOne(userID, params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Unfollow successfully"})
}

func (UserController) GetFollowers(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	followers, err := followService.GetFollowers(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &followers)
}

func (UserController) GetFollowings(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	followings, err := followService.GetFollowings(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &followings)
}
