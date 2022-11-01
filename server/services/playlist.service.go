package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type PlaylistService struct{}

func (PlaylistService) Create(data interface{}) error {
	return common.GetDB().Model(&models.Playlist{}).Create(data).Error
}

func (PlaylistService) FindByID(id uint) (models.Playlist, error) {
	var playlist models.Playlist

	err := common.GetDB().First(&playlist, id).Error
	return playlist, err
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
