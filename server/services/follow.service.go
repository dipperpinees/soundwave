package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type FollowService struct{}

func (FollowService) Follow(followerID uint, follwingID uint) error {
	return common.GetDB().Create(&models.Follow{FollowerID: followerID, FollowingID: follwingID}).Error
}

func (FollowService) UnFollow(followerID uint, followingID uint) error {
	return common.GetDB().Where("follower_id = ?", followerID).Where("following_id = ?", followingID).Delete(&models.Follow{}).Error
}

func (FollowService) GetFollowers(userID uint) ([]userModel, error) {
	var followList []models.Follow

	err := common.GetDB().Preload("Follower").Where("following_id = ?", userID).Find(&followList).Error

	followers := make([]userModel, len(followList))

	for i, follow := range followList {
		followers[i] = follow.Follower
	}

	return followers, err
}

func (FollowService) GetFollowings(userID uint) ([]userModel, error) {
	var followList []models.Follow

	err := common.GetDB().Preload("Following").Where("follower_id = ?", userID).Find(&followList).Error

	followings := make([]userModel, len(followList))

	for i, follow := range followList {
		followings[i] = follow.Following
	}

	return followings, err
}

func (FollowService) GetFollowerNumber(userID uint) (int64, error) {
	var count int64
	err := common.GetDB().Where("following_id = ?", userID).Count(&count).Error

	return count, err
}

func (FollowService) GetFollowingNumber(userID uint) (int64, error) {
	var count int64
	err := common.GetDB().Where("follower_id = ?", userID).Count(&count).Error

	return count, err
}
