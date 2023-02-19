package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/helper"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type PlaylistService struct{}

func (PlaylistService) CreateOne(data interface{}) error {
	return common.GetDB().Create(data).Error
}

func (PlaylistService) FindByID(id uint, userID uint) (models.Playlist, error) {
	var playlist models.Playlist

	err := common.GetDB().
		Preload("Songs").
		Preload("Songs.Genre").
		Preload("Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
				helper.CheckFollowedSubquery(userID),
			)
		}).
		Preload("Songs.Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			)
		}).
		First(&playlist, id).Error
	return playlist, err
}

func (PlaylistService) AddSong(songID uint, playlistID uint) error {
	return common.GetDB().Create(&models.PlaylistsSongs{SongID: songID, PlaylistID: playlistID}).Error
}

func (PlaylistService) RemoveSong(songID uint, playlistID uint) error {
	return common.GetDB().Where("song_id = ?", songID).Where("playlist_id = ?", playlistID).Delete(&models.PlaylistsSongs{}).Error
}

func (PlaylistService) DeleteByID(playlistID uint) error {
	if err := common.GetDB().Where("playlist_id = ?", playlistID).Delete(&models.PlaylistsSongs{}).Error; err != nil {
		return err
	}
	if err := common.GetDB().Where("id = ?", playlistID).Delete(&models.Playlist{}).Error; err != nil {
		return err
	}

	return nil
}

func (PlaylistService) FindMany(page int, search string, limit int, userID uint) (*[]models.Playlist, int64, error) {
	var playlists []models.Playlist
	var count int64
	offSet := (page - 1) * limit
	queueErr := make(chan error, 1)

	go func() {
		db := common.GetDB()
		if search != "" {
			db = db.Where("name LIKE ?", "%"+search+"%")
		}
		queueErr <- db.Find(&models.Playlist{}).Count(&count).Error
	}()

	go func() {
		db := common.GetDB()
		if search != "" {
			db = db.Where("name LIKE ?", "%"+search+"%")
		}
		queueErr <- db.
			Preload("Songs").
			Preload("Songs.Genre").
			Preload("Author", func(db *gorm.DB) *gorm.DB {
				return db.Select(
					"*",
					"(Select count(*) from songs where author_id = users.id) as track_number",
					"(Select count(*) from follows where following_id = users.id) as follower_number",
					"(Select count(*) from follows where follower_id = users.id) as following_number",
					helper.CheckFollowedSubquery(userID),
				)
			}).
			Preload("Songs.Author", func(db *gorm.DB) *gorm.DB {
				return db.Select(
					"*",
					"(Select count(*) from songs where author_id = users.id) as track_number",
					"(Select count(*) from follows where following_id = users.id) as follower_number",
					"(Select count(*) from follows where follower_id = users.id) as following_number",
				)
			}).
			Limit(limit).Offset(offSet).Order("id desc").Find(&playlists).Error
	}()

	err := helper.GroupError(queueErr, 2)
	return &playlists, count, err
}
