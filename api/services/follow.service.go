package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type FollowService struct{}

func (FollowService) CreateOne(followerID uint, follwingID uint) error {
	return common.GetDB().Create(&models.Follow{FollowerID: followerID, FollowingID: follwingID}).Error
}

func (FollowService) DeleteOne(followerID uint, followingID uint) error {
	return common.GetDB().Where("follower_id = ?", followerID).Where("following_id = ?", followingID).Delete(&models.Follow{}).Error
}

func (FollowService) GetFollowers(userID uint) ([]userModel, error) {
	var followList []models.Follow

	err := common.GetDB().
		Preload("Follower", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			)
		}).
		Where("following_id = ?", userID).
		Find(&followList).Error

	followers := make([]userModel, len(followList))

	for i, follow := range followList {
		followers[i] = follow.Follower
	}

	return followers, err
}

func (FollowService) GetFollowings(userID uint) ([]userModel, error) {
	var followList []models.Follow

	err := common.GetDB().
		Preload("Following", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			)
		}).
		Where("follower_id = ?", userID).
		Find(&followList).Error

	followings := make([]userModel, len(followList))

	for i, follow := range followList {
		followings[i] = follow.Following
	}

	return followings, err
}
