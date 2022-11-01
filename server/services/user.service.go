package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type userModel = models.User

type UserService struct{}

var songService = SongService{}

func (UserService) CreateOne(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (UserService) FindOne(condition interface{}) (userModel, error) {
	user := userModel{}
	err := common.GetDB().Where(condition).First(&user).Error
	return user, err
}

func (UserService) GetProfile(id uint) (userModel, error) {
	user := userModel{}
	err := common.
		GetDB().
		Select("*",
			"(Select count(*) from songs where author_id = users.id) as track_number",
			"(Select count(*) from follows where following_id = users.id) as follower_number",
			"(Select count(*) from follows where follower_id = users.id) as following_number",
		).
		First(&user, id).Error
	return user, err
}

func (UserService) UpdateOne(userId uint, data interface{}) error {
	err := common.GetDB().Model(&userModel{}).Where("id = ?", userId).Updates(data).Error

	return err
}

func (UserService) Search(page int, search string, orderBy string, limit int) (*[]userModel, int64, error) {
	var userList []userModel
	offSet := (page - 1) * limit
	queueErr := make(chan error, 1)
	count := make(chan int64)

	go func() {
		var i int64
		defer close(count)
		if search != "" {
			queueErr <- common.GetDB().Where("name LIKE ?", "%"+search+"%").Find(&userModel{}).Count(&i).Error
		} else {
			queueErr <- common.GetDB().Find(&userModel{}).Count(&i).Error
		}
		count <- i
	}()

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
		queueErr <- db.
			Select("*",
				"(Select count(*) from songs where author_id = users.id) as track_number",
				"(Select count(*) from follows where following_id = users.id) as follower_number",
				"(Select count(*) from follows where follower_id = users.id) as following_number",
			).
			Limit(limit).
			Offset(offSet).
			Order(order).
			Find(&userList).Error
	}()

	err := common.GroupError(queueErr, 2)

	return &userList, <-count, err
}

func (UserService) GetFavoriteSong(userID uint) ([]songModel, error) {
	var songs []models.Song

	// err := common.GetDB().Debug().Model(&models.User{}).Where("id = ?", userID).Joins("FavoriteSongs").Preload("FavoriteSongs.Author").First(&user).Error
	err := common.GetDB().Debug().
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

func (u UserService) GetSongOfUser(userID uint) ([]songModel, error) {
	var songs []songModel
	var author userModel
	queueErr := make(chan error, 1)

	go func() {
		queueErr <- common.GetDB().Select("*, (Select count(*) from user_like_songs Where song_id = songs.id) as like_number").Preload("Genre").Where("author_id = ?", userID).Find(&songs).Error
	}()

	go func(author *userModel) {
		var err error
		*author, err = u.GetProfile(userID)
		queueErr <- err
	}(&author)

	err := common.GroupError(queueErr, 2)

	for i := range songs {
		songs[i].Author = author
	}

	return songs, err
}
