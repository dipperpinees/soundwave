package models

import "time"

type SongReport struct {
	SongID    uint `gorm:"primaryKey"`
	Song      Song
	UserID    uint `gorm:"primaryKey"`
	User      User
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updatedAt"`
}
