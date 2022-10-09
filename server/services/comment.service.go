package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type CommentService struct{}

func (CommentService) CreateComment(data *models.Comment) error {
	err := common.GetDB().Create(&data).Error
	return err
}

func (CommentService) GetCommentByID(id uint) (models.Comment, error) {
	var comment models.Comment
	err := common.GetDB().Preload("Author").First(&comment, id).Error
	return comment, err
}

func (CommentService) GetCommentOfSong(songID uint) (*[]models.Comment, error) {
	comments := []models.Comment{}

	err := common.GetDB().Model(&models.Comment{}).Preload("Author").Where("song_id = ?", songID).Find(&comments).Error

	return &comments, err
}

func (CommentService) DeleteComment(commentID uint) error {
	return common.GetDB().Delete(&models.Comment{}, commentID).Error
}

func (CommentService) UpdateComment(commentID uint, content string) error {
	return common.GetDB().Model(&models.Comment{}).Where("id = ?", commentID).Update("content", content).Error
}
