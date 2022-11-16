package models

import (
	"github.com/hiepnguyen223/int3306-project/common"
)

func Migrate() {
	db := common.GetDB()
	db.SetupJoinTable(&User{}, "FavoriteSongs", &UserLikeSong{})
	db.SetupJoinTable(&Playlist{}, "Songs", &PlaylistsSongs{})
	db.AutoMigrate(&User{}, &Song{}, &Comment{}, &Follow{}, &Genre{}, &Playlist{}, &Forget{})

	//bulk insert data
	// BulkInsertGenre()
}
