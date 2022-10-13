package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type userModel = models.User

type UserService struct{}

func (UserService) CreateOne(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (UserService) FindOne(condition interface{}) (userModel, error) {
	user := userModel{}
	err := common.GetDB().Where(condition).First(&user).Error

	return user, err
}

func (UserService) UpdateOne(userId uint, data interface{}) error {
	err := common.GetDB().Model(&userModel{}).Where("id = ?", userId).Updates(data).Error

	return err
}

func (UserService) Search(page int, search string) (*[]userModel, int64, error) {
	var userList []userModel
	offSet := (page - 1) * common.LIMIT_PER_PAGE
	queueErr := make(chan error, 1)
	count := make(chan int64)

	go func() {
		var i int64
		defer close(count)
		if search != "" {
			queueErr <- common.GetDB().Where("name LIKE ?", "%"+search+"%").Find(&userModel{}).Count(&i).Error
		} else {
			queueErr <- common.GetDB().Find(&userModel{}).Count(&i).Error
		}
		count <- i
	}()

	if search != "" {
		queueErr <- common.GetDB().Limit(common.LIMIT_PER_PAGE).Offset(offSet).Model(&userModel{}).Where("name LIKE ?", "%"+search+"%").Find(&userList).Error
	} else {
		queueErr <- common.GetDB().Limit(common.LIMIT_PER_PAGE).Offset(offSet).Model(&userModel{}).Find(&userList).Error
	}

	err := common.GroupError(queueErr, 2)

	return &userList, <-count, err
}

func (UserService) GetFavoriteSong(userID uint) ([]songModel, error) {
	var user userModel

	err := common.GetDB().Model(&models.User{}).Where("id = ?", userID).Preload("FavoriteSongs").Preload("FavoriteSongs.Author").First(&user).Error
	return user.FavoriteSongs, err
}

func (UserService) GetSongOfUser(userID uint) ([]songModel, error) {
	var songs []songModel
	err := common.GetDB().Preload("Author").Where("author_id = ?", userID).Find(&songs).Error

	return songs, err
}

func (UserService) Follow(followerID uint, follwingID uint) error {
	return common.GetDB().Create(&models.Follow{FollowerID: followerID, FollowingID: follwingID}).Error
}

func (UserService) GetFollowers(userID uint) ([]userModel, error) {
	var followList []models.Follow

	err := common.GetDB().Preload("Follower").Where("following_id = ?", userID).Find(&followList).Error

	followers := make([]userModel, len(followList))

	for i, follow := range followList {
		followers[i] = follow.Follower
	}

	return followers, err
}

func (UserService) GetFollowings(userID uint) ([]userModel, error) {
	var followList []models.Follow

	err := common.GetDB().Preload("Following").Where("follower_id = ?", userID).Find(&followList).Error

	followings := make([]userModel, len(followList))

	for i, follow := range followList {
		followings[i] = follow.Following
	}

	return followings, err
}
