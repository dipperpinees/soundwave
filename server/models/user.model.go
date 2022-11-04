package models

import (
	"time"
)

type User struct {
	ID              uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Email           string    `gorm:"unique;not null" json:"-"`
	Name            string    `gorm:"not null" json:"name"`
	Password        string    `gorm:"not null" json:"-"`
	Avatar          string    `json:"avatar"`
	CreatedAt       time.Time `gorm:"autoCreateTime;column:created_at" json:"createdAt"`
	UpdatedAt       time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updatedAt"`
	Songs           []Song    `gorm:"foreignKey:AuthorID" json:"-"`
	FavoriteSongs   []Song    `gorm:"many2many:user_like_songs;" json:"-"`
	Role            string    `gorm:"default:'user'" json:"role"`
	TrackNumber     int       `gorm:"-:migration <-:false" json:"trackNumber"`
	FollowerNumber  int       `gorm:"-:migration <-:false" json:"followerNumber"`
	FollowingNumber int       `gorm:"-:migration <-:false" json:"followingNumber"`
}
