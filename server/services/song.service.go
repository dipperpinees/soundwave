package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type songModel = models.Song

type SongService struct{}

func (SongService) CreateSong(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (SongService) FindByID(id uint) (songModel, error) {
	song := songModel{}
	err := common.GetDB().Model(&songModel{}).Preload("Author").First(&song, id).Error
	return song, err
}

func (SongService) FindMany(page int, search string) (*[]songModel, int64, error) {
	var listSong []songModel
	var count int64
	offSet := (page - 1) * common.LIMIT_PER_PAGE
	queueErr := make(chan error, 1)

	go func() {
		db := common.GetDB()
		if search != "" {
			db = db.Where("title LIKE ?", "%"+search+"%")
		}
		queueErr <- db.Find(&songModel{}).Count(&count).Error
	}()

	go func() {
		db := common.GetDB()
		if search != "" {
			db = db.Where("title LIKE ?", "%"+search+"%")
		}
		queueErr <- db.Preload("Author").Limit(common.LIMIT_PER_PAGE).Offset(offSet).Find(&listSong).Error
	}()

	err := common.GroupError(queueErr, 2)
	return &listSong, count, err
}

func (SongService) CreateFavoriteSong(userID uint, songID uint) (*models.UserLikeSong, error) {
	newFavoriteSong := models.UserLikeSong{UserID: userID, SongID: songID}
	err := common.GetDB().Create(&newFavoriteSong).Error
	return &newFavoriteSong, err
}

func (SongService) GetLikeNumber(songID uint) (int64, error) {
	var count int64
	err := common.GetDB().Model(&models.UserLikeSong{}).Where("song_id = ?", songID).Count(&count).Error
	return count, err
}
