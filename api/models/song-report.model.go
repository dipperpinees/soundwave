package models

import "time"

type SongReport struct {
	SongID    uint      `gorm:"primaryKey"`
	Song      Song      `json:"song"`
	UserID    uint      `gorm:"primaryKey"`
	User      User      `json:"user"`
	Reason    string    `json:"reason"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updatedAt"`
}
