package models

import (
	"time"
)

type User struct {
	ID            uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Email         string    `gorm:"unique;not null" json:"-"`
	Name          string    `gorm:"not null" json:"name"`
	Password      string    `gorm:"not null" json:"-"`
	Avatar        string    `json:"avatar"`
	CreatedAt     time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
	Songs         []Song    `gorm:"foreignKey:AuthorID" json:"-"`
	FavoriteSongs []Song    `gorm:"many2many:user_like_songs;" json:"-"`
}
