package models

import "time"

type UserLikeSong struct {
	UserID    uint      `gorm:"primaryKey" json:"userID"`
	SongID    uint      `gorm:"primaryKey" json:"songID"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}
