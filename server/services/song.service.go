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
	offSet := (page - 1) * common.LIMIT_PER_PAGE
	queueErr := make(chan error, 1)
	count := make(chan int64)

	go func() {
		var i int64
		defer close(count)
		if search != "" {
			queueErr <- common.GetDB().Where("title LIKE ?", "%"+search+"%").Preload("Author").Find(&songModel{}).Count(&i).Error
		} else {
			queueErr <- common.GetDB().Preload("Author").Find(&songModel{}).Count(&i).Error
		}
		count <- i
	}()

	if search != "" {
		queueErr <- common.GetDB().Limit(common.LIMIT_PER_PAGE).Offset(offSet).Where("title LIKE ?", "%"+search+"%").Preload("Author").Find(&listSong).Error
	} else {
		queueErr <- common.GetDB().Limit(common.LIMIT_PER_PAGE).Offset(offSet).Preload("Author").Find(&listSong).Error
	}

	err := common.GroupError(queueErr, 2)

	return &listSong, <-count, err
}

func (SongService) CreateFavoriteSong(userID uint, songID uint) (*models.UserLikeSong, error) {
	newFavoriteSong := models.UserLikeSong{UserID: userID, SongID: songID}
	err := common.GetDB().Create(&newFavoriteSong).Error
	return &newFavoriteSong, err
}
