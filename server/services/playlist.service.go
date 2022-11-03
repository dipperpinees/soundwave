package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type PlaylistService struct{}

func (PlaylistService) Create(data interface{}) error {
	return common.GetDB().Create(data).Error
}

func (PlaylistService) FindByID(id uint) (models.Playlist, error) {
	var playlist models.Playlist

	err := common.GetDB().
		Preload("Author", func(db *gorm.DB) *gorm.DB {
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

func (PlaylistService) GetSongsOfPlaylist(id uint) ([]models.Song, error) {
	var playlist models.Playlist
	err := common.GetDB().
		Preload("Songs", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from user_like_songs Where song_id = songs.id) as like_number",
			)
		}).
		Preload("Songs.Genre").
		Preload("Songs.Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			)
		}).
		First(&playlist, id).Error

	return playlist.Songs, err
}

func (PlaylistService) Delete(id uint) error {
	err := common.GetDB().Where("id = ?", id).Delete(&models.Playlist{}).Error
	return err
}

func (PlaylistService) AddSong(songID uint, playlistID uint) error {
	err := common.GetDB().Create(&models.PlaylistsSongs{PlaylistID: playlistID, SongID: songID}).Error
	return err
}

func (PlaylistService) RemoveSong(songID uint, playlistID uint) error {
	err := common.GetDB().Where("song_id = ?", songID).Where("playlist_id = ?", playlistID).Delete(&models.PlaylistsSongs{}).Error
	return err
}
