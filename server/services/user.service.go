package services

import (
	"errors"
	"fmt"

	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/helper"
	"github.com/hiepnguyen223/int3306-project/models"
	"gorm.io/gorm"
)

type userModel = models.User

type UserService struct{}

func (UserService) CreateOne(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (UserService) FindOneOrCreate(user *userModel) error {
	return common.GetDB().FirstOrCreate(&user, userModel{Email: user.Email}).Error
}

func (UserService) FindOne(profileID uint, userID uint) (userModel, error) {
	user := userModel{}
	err := common.
		GetDB().
		Select("*",
			"(Select count(*) from songs where author_id = users.id) as track_number",
			"(Select count(*) from follows where following_id = users.id) as follower_number",
			"(Select count(*) from follows where follower_id = users.id) as following_number",
			helper.CheckFollowedSubquery(userID),
		).
		First(&user, profileID).Error
	return user, err
}

func (UserService) FindMany(page int, search string, orderBy string, limit int, userID uint) (*[]userModel, int64, error) {
	var userList []userModel
	offSet := (page - 1) * limit
	queueErr := make(chan error, 1)
	count := make(chan int64)

	go func() {
		var i int64
		defer close(count)
		db := common.GetDB()
		if search != "" {
			db = db.Where("name LIKE ?", "%"+search+"%")
		}
		if userID != 0 {
			db = db.Where("id <> ?", userID)
		}
		queueErr <- db.Find(&userModel{}).Count(&i).Error
		count <- i
	}()
	fmt.Println(userID)
	go func() {
		db := common.GetDB()
		order := "id desc"
		if search != "" {
			db = db.Where("name LIKE ?", "%"+search+"%")
		}
		if orderBy == "track" {
			order = "track_number desc"
		}
		if orderBy == "follower" {
			order = "follower_number desc"
		}
		if userID != 0 {
			db = db.Where("id <> ?", userID)
		}
		queueErr <- db.
			Select("*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
				helper.CheckFollowedSubquery(userID),
			).
			Limit(limit).
			Offset(offSet).
			Order(order).
			Find(&userList).Error
	}()

	err := helper.GroupError(queueErr, 2)

	return &userList, <-count, err
}

func (UserService) GetFavoriteSong(userID uint) ([]songModel, error) {
	var songs []models.Song

	err := common.GetDB().
		Model(&models.UserLikeSong{}).
		Where("user_id = ?", userID).Select(
		"songs.*",
		"`Author`.`id` as `Author__id`",
	).
		Joins("join songs on songs.id = user_like_songs.song_id").
		Joins("join users as Author on Author.id = user_like_songs.user_id").
		Find(&songs).Error
	return songs, err
}

func (u UserService) GetSongOfUser(authorID uint, userID uint) ([]songModel, error) {
	var songs []songModel
	var author userModel
	queueErr := make(chan error, 1)

	go func() {
		queueErr <- common.GetDB().
			Select(
				"*",
				"(Select count(*) from user_like_songs Where song_id = songs.id) as like_number",
				helper.CheckLikeSubquery(userID),
			).Preload("Genre").
			Where("author_id = ?", authorID).Find(&songs).Error
	}()

	go func(author *userModel) {
		var err error
		*author, err = u.FindOne(authorID, userID)
		queueErr <- err
	}(&author)

	err := helper.GroupError(queueErr, 2)

	for i := range songs {
		songs[i].Author = author
	}

	return songs, err
}

func (UserService) CreateForget(userID uint) (string, error) {
	randStr := helper.RandStr(8)
	err := common.GetDB().Create(&models.Forget{UserID: userID, Code: randStr}).Error
	return randStr, err
}

func (UserService) ResetPassword(userID uint, code string, newPassword string) error {
	var count int64
	err := common.GetDB().Model(&models.Forget{}).Where("user_id = ?", userID).Where("code = ?", code).Where("created_at > (NOW() - INTERVAL 10 MINUTE)").Count(&count).Error
	if err != nil {
		return err
	}
	if count == 0 {
		return errors.New("you do not have permission to perform this action")
	}
	//delete all old code
	err = common.GetDB().Where("user_id = ?", userID).Delete(&models.Forget{}).Error
	if err != nil {
		return err
	}

	hash, _ := common.HashPassword(newPassword)
	err = common.GetDB().Model(&userModel{}).Where("id = ?", userID).Update("password", hash).Error
	return err
}

func (u UserService) GetPlaylistOfUser(userID uint) ([]models.Playlist, error) {
	var playlists []models.Playlist
	err := common.GetDB().
		Where("author_id = ?", userID).
		Preload("Songs").
		Preload("Songs.Genre").
		Preload("Author", func(db *gorm.DB) *gorm.DB {
			return db.Select(
				"*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
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
		Find(&playlists).Error
	return playlists, err
}

func (UserService) UpdateOne(userID uint, avatar string, description string, name string) (interface{}, error) {
	updateData := make(map[string]interface{})

	if avatar != "" {
		updateData["avatar"] = avatar
	}
	if description != "" {
		updateData["description"] = description
	}
	if name != "" {
		updateData["name"] = name
	}

	err := common.GetDB().Model(&userModel{}).Where("id = ?", userID).Updates(updateData).Error
	return updateData, err
}
