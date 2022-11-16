package controllers

import (
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/services"
)

var uploadService = services.UploadService{}
var followService = services.FollowService{}

type UserController struct{}

func (UserController) UploadAvatar(c *gin.Context) {
	userID := c.Keys["user"].(*userModel).ID

	formFile, _, err := c.Request.FormFile("avatar")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	if formFile == nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Failed upload avatar"})
		return
	}

	//check file type is valid
	if !common.IsValidContentType("image", formFile) {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Invalid file type"})
		return
	}

	//close upload when uploaded
	defer formFile.Close()

	//start upload avatar
	uploadUrl, err := uploadService.SingleFileUpload(formFile)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if err := userService.UpdateOne(userID, &userModel{Avatar: uploadUrl}); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": uploadUrl})
}

func (UserController) GetUser(c *gin.Context) {
	params := common.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	user, err := userService.GetProfile(params.ID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &user)
}

func (UserController) SearchUser(c *gin.Context) {
	user := c.Keys["user"]

	type SearchUserQuery struct {
		Search  string `form:"search"`
		Page    int    `form:"page,default=1"`
		Limit   int    `form:"limit,default=10"`
		OrderBy string `form:"orderBy"` //follower, track
	}
	query := SearchUserQuery{}
	if err := c.BindQuery(&query); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userList, total, err := userService.Search(query.Page, query.Search, query.OrderBy, query.Limit, user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(query.Limit)))

	c.JSON(
		http.StatusOK,
		gin.H{
			"data":       *userList,
			"pagination": models.Paginate{Page: query.Page, TotalPages: totalPages, TotalDocs: total},
		},
	)
}

func (UserController) GetFavoriteSong(c *gin.Context) {
	userID := c.Keys["user"].(*userModel).ID

	songs, err := userService.GetFavoriteSong(userID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &songs)
}

func (UserController) GetSongOfUser(c *gin.Context) {
	params := common.IdParams{}

	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	songs, err := userService.GetSongOfUser(params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &songs)
}

func (UserController) GetPlaylistOfUser(c *gin.Context) {
	params := common.IdParams{}
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
	params := common.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid following ID"})
		return
	}

	userID := c.Keys["user"].(*userModel).ID
	err := followService.Follow(userID, params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Follow successfully"})
}

func (UserController) UnFollow(c *gin.Context) {
	params := common.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid following ID"})
		return
	}

	userID := c.Keys["user"].(*userModel).ID
	err := followService.UnFollow(userID, params.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Unfollow successfully"})
}

func (UserController) GetFollowers(c *gin.Context) {
	params := common.IdParams{}
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
	params := common.IdParams{}
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

// func (UserController) CheckIsFollow(c *gin.Context) {
// 	params := common.IdParams{}
// 	if err := c.ShouldBindUri(&params); err != nil {
// 		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid user ID")
// 		return
// 	}
// 	c.JSON(http.StatusOK, )
// }
