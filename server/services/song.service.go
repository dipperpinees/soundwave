package services

import (
	"sync"

	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type songModel = models.Song

type SongService struct{}

func (SongService) CreateSong(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (SongService) FindByID(id uint) (songModel, error) {
	song := songModel{}
	err := common.GetDB().Model(&songModel{}).Preload("Genre").Preload("Author").First(&song, id).Error
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
		queueErr <- db.Preload("Genre").Preload("Author").Limit(common.LIMIT_PER_PAGE).Offset(offSet).Find(&listSong).Error
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

func (SongService) DeleteByID(songID uint) error {
	var waitGroup sync.WaitGroup
	waitGroup.Add(2)

	go func() {
		common.GetDB().Where("song_id = ?", songID).Delete(&models.UserLikeSong{})
		waitGroup.Done()
	}()

	go func() {
		common.GetDB().Where("song_id = ?", songID).Delete(&models.Comment{})
		waitGroup.Done()
	}()

	waitGroup.Wait()
	return common.GetDB().Delete(&songModel{}, songID).Error
}

func (SongService) Update(songID uint, title string, url string, thumbnail string) (map[string]interface{}, error) {
	updateData := make(map[string]interface{})

	if title != "" {
		updateData["title"] = title
	}
	if url != "" {
		updateData["url"] = url
	}
	if thumbnail != "" {
		updateData["thumbnail"] = thumbnail
	}

	err := common.GetDB().Model(&songModel{}).Where("id = ?", songID).Updates(updateData).Error
	return updateData, err
}

func (SongService) IncrementPlayCount(songID uint) error {
	return common.GetDB().Model(&songModel{}).Where("id = ?", songID).Update("play_count", gorm.Expr("play_count + ?", 1)).Error
}
