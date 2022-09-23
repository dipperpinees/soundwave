package users

import (
	"time"

	"github.com/hiepnguyen223/int3306-project/common"
)

type UserModel struct {
	ID        uint      `gorm:"primaryKey;autoIncrement"`
	Username  string    `gorm:"unique;not null"`
	Password  string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}

func Migrate() {
	db := common.Db
	db.AutoMigrate(&UserModel{})
}

//create new user
func saveOne(data interface{}) error {
	err := common.Db.Create(data).Error
	if err != nil {
		return err
	}
	return nil
}

//find user
func findOne(data interface{}) (UserModel, error) {
	var model UserModel
	err := common.Db.Where(data).First(&model).Error

	return model, err
}
