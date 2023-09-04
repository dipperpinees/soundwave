package models

import (
	"github.com/hiepnguyen223/int3306-project/common"
)

func Migrate() {
	db := common.GetDB()
	db.SetupJoinTable(&User{}, "FavoriteSongs", &UserLikeSong{})
	db.SetupJoinTable(&Playlist{}, "Songs", &PlaylistsSongs{})
	db.AutoMigrate(&User{}, &Song{}, &Comment{}, &Follow{}, &Genre{}, &Playlist{}, &Forget{}, &SongReport{})

	//create admin account
	// adminEmail, adminPassword := configs.EnvAdmin()
	// hashPassword, _ := common.HashPassword(adminPassword)
	// adminUser := User{Email: adminEmail, Name: "admin", Password: hashPassword, Role: "admin"}
	// common.GetDB().Create(&adminUser)
}
