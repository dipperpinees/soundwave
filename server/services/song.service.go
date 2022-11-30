package services

import (
	"sync"

	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/helper"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type songModel = models.Song

type SongService struct{}

func (SongService) CreateOne(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (SongService) FindByID(id uint, userID uint) (songModel, error) {
	song := songModel{}
	err := common.GetDB().
		Select("*",
			"(Select count(*) from user_like_songs Where song_id = songs.id) as like_number",
			helper.CheckLikeSubquery(userID),
		).
		Preload("Genre").
		Preload("Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
				helper.CheckFollowedSubquery(userID),
			)
		}).
		First(&song, id).Error
	return song, err
}

func (SongService) FindMany(page int, search string, orderBy string, genreID int, limit int, userID uint) (*[]songModel, int64, error) {
	var listSong []songModel
	var count int64
	offSet := (page - 1) * limit
	queueErr := make(chan error, 1)

	go func() {
		db := common.GetDB()
		if search != "" {
			db = db.Where("title LIKE ?", "%"+search+"%")
		}
		if genreID != 0 {
			db = db.Where("genre_id = ?", genreID)
		}
		queueErr <- db.Find(&songModel{}).Count(&count).Error
	}()

	go func() {
		db := common.GetDB()
		order := "id desc"
		if search != "" {
			db = db.Where("title LIKE ?", "%"+search+"%")
		}
		if genreID != 0 {
			db = db.Where("genre_id = ?", genreID)
		}
		if orderBy == "like" {
			order = "like_number desc"
		}
		if orderBy == "listen" {
			order = "play_count desc"
		}
		queueErr <- db.
			Select(
				"*",
				"(Select count(*) from user_like_songs Where song_id = songs.id) as like_number",
				helper.CheckLikeSubquery(userID)).
			Preload("Genre").
			Preload("Author", func(db *gorm.DB) *gorm.DB {
				return db.Select(
					"*",
					"(Select count(*) from songs where author_id = users.id) as track_number",
					"(Select count(*) from follows where following_id = users.id) as follower_number",
					"(Select count(*) from follows where follower_id = users.id) as following_number",
					helper.CheckFollowedSubquery(userID),
				)
			}).
			Limit(limit).Offset(offSet).Order(order).Find(&listSong).Error
	}()

	err := helper.GroupError(queueErr, 2)
	return &listSong, count, err
}

func (SongService) CreateFavoriteSong(userID uint, songID uint) (*models.UserLikeSong, error) {
	newFavoriteSong := models.UserLikeSong{UserID: userID, SongID: songID}
	err := common.GetDB().Create(&newFavoriteSong).Error
	return &newFavoriteSong, err
}

func (SongService) DeleteFavoriteSong(userID uint, songID uint) error {
	return common.GetDB().Where("user_id = ?", userID).Where("song_id = ?", songID).Delete(&models.UserLikeSong{}).Error
}

func (SongService) GetLikeNumber(songID uint) (int64, error) {
	var count int64
	err := common.GetDB().Model(&models.UserLikeSong{}).Where("song_id = ?", songID).Count(&count).Error
	return count, err
}

func (SongService) DeleteByID(songID uint) error {
	var waitGroup sync.WaitGroup
	waitGroup.Add(4)

	go func() {
		common.GetDB().Where("song_id = ?", songID).Delete(&models.UserLikeSong{})
		waitGroup.Done()
	}()

	go func() {
		common.GetDB().Where("song_id = ?", songID).Delete(&models.Comment{})
		waitGroup.Done()
	}()

	go func() {
		common.GetDB().Where("song_id = ?", songID).Delete(&models.PlaylistsSongs{})
		waitGroup.Done()
	}()

	go func() {
		common.GetDB().Where("song_id = ?", songID).Delete(&models.SongReport{})
		waitGroup.Done()
	}()

	waitGroup.Wait()
	return common.GetDB().Delete(&songModel{}, songID).Error
}

func (SongService) UpdateOne(songID uint, title string, url string, thumbnail string, genreID uint, duration int) (map[string]interface{}, error) {
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
	if genreID != 0 {
		updateData["genre_id"] = genreID
	}
	if duration != 0 {
		updateData["duration"] = duration
	}
	err := common.GetDB().Model(&songModel{}).Where("id = ?", songID).Updates(updateData).Error
	return updateData, err
}

func (SongService) IncrementPlayCount(songID uint) error {
	return common.GetDB().Model(&songModel{}).Where("id = ?", songID).Update("play_count", gorm.Expr("play_count + ?", 1)).Error
}

func (SongService) CreateReport(report *models.SongReport) error {
	err := common.GetDB().Create(&report).Error
	return err
}
