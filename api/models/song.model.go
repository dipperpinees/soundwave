package models

import (
	"time"
)

type Song struct {
	ID         uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Title      string `gorm:"not null" json:"title"`
	Url        string `gorm:"not null" json:"url"`
	AuthorID   uint   `gorm:"column:author_id" json:"-"`
	Thumbnail  string `gorm:"column:thumbnail" json:"thumbnail"`
	Author     User   `json:"author"`
	Likes      []User `gorm:"many2many:user_like_songs;" json:"-"`
	LikeNumber int    `gorm:"->;-:migration" json:"likeNumber"`
	// DownloadCount int        `gorm:"default:0" json:"downloadCount"`
	PlayCount int64      `gorm:"default:0" json:"playCount"`
	Genre     Genre      `json:"genre"`
	GenreID   uint       `json:"-"`
	Playlists []Playlist `gorm:"many2many:playlists_songs;" json:"-"`
	IsLiked   bool       `gorm:"->;-:migration" json:"isLiked"`
	Duration  int        `json:"duration"`
	CreatedAt time.Time  `gorm:"autoCreateTime;column:created_at" json:"createdAt"`
	UpdatedAt time.Time  `gorm:"autoUpdateTime;column:updated_at" json:"updatedAt"`
}
