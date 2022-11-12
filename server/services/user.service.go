package services

import (
	"errors"

	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type userModel = models.User

type UserService struct{}

func (UserService) CreateOne(data interface{}) error {
	err := common.GetDB().Create(data).Error
	return err
}

func (UserService) FindOne(condition interface{}) (userModel, error) {
	user := userModel{}
	err := common.GetDB().Where(condition).First(&user).Error
	return user, err
}

func (UserService) FindOneOrCreate(user *userModel) error {
	return common.GetDB().FirstOrCreate(&user, userModel{Email: user.Email}).Error
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

func (UserService) Search(page int, search string, orderBy string, limit int, user interface{}) (*[]userModel, int64, error) {
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
		if user != nil {
			db = db.Where("id <> ?", user.(*userModel).ID)
		}
		queueErr <- db.Find(&userModel{}).Count(&i).Error
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
		if user != nil {
			db = db.Where("id <> ?", user.(*userModel).ID)
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

func (UserService) CreateForget(userID uint) (string, error) {
	randStr := common.RandStr(8)
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
