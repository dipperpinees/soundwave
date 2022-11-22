package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type CommentService struct{}

func (CommentService) CreateOne(data *models.Comment) error {
	return common.GetDB().Create(&data).Error
}

func (CommentService) FindByID(id uint) (models.Comment, error) {
	var comment models.Comment
	err := common.GetDB().
		Preload("Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			)
		}).
		First(&comment, id).Error
	return comment, err
}

func (CommentService) GetCommentsOfSong(songID uint) (*[]models.Comment, error) {
	comments := []models.Comment{}

	err := common.GetDB().
		Model(&models.Comment{}).
		Preload("Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			)
		}).
		Where("song_id = ?", songID).
		Find(&comments).Error

	return &comments, err
}

func (CommentService) DeleteOne(commentID uint) error {
	return common.GetDB().Delete(&models.Comment{}, commentID).Error
}

func (CommentService) UpdateOne(commentID uint, content string) error {
	return common.GetDB().Model(&models.Comment{}).Where("id = ?", commentID).Update("content", content).Error
}
