package models

import "time"

type Forget struct {
	ID        uint `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID    uint
	User      User
	Code      string
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}
