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
	Description     string    `json:"description"`
	CreatedAt       time.Time `gorm:"autoCreateTime;column:created_at" json:"createdAt"`
	UpdatedAt       time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updatedAt"`
	Songs           []Song    `gorm:"foreignKey:AuthorID" json:"-"`
	FavoriteSongs   []Song    `gorm:"many2many:user_like_songs;" json:"-"`
	Role            string    `gorm:"default:'user'" json:"role"`
	TrackNumber     int       `gorm:"->;-:migration" json:"trackNumber"`
	FollowerNumber  int       `gorm:"->;-:migration" json:"followerNumber"`
	FollowingNumber int       `gorm:"->;-:migration" json:"followingNumber"`
	IsFollowed      bool      `gorm:"->;-:migration" json:"isFollowed"`
	IsBanned        bool      `gorm:"default:0" json:"isBanned"`
	IsVerified      bool      `gorm:"default:0" json:"isVerified"`
}
