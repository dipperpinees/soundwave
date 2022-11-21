package models

import (
	"mime/multipart"
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
	LikeNumber int    `gorm:"-:migration <-:false" json:"likeNumber"`
	// DownloadCount int        `gorm:"default:0" json:"downloadCount"`
	PlayCount int64      `gorm:"default:0" json:"playCount"`
	Genre     Genre      `json:"genre"`
	GenreID   uint       `json:"-"`
	Playlists []Playlist `gorm:"many2many:playlists_songs;" json:"-"`
	CreatedAt time.Time  `gorm:"autoCreateTime;column:created_at" json:"createdAt"`
	UpdatedAt time.Time  `gorm:"autoUpdateTime;column:updated_at" json:"updatedAt"`
}

type SongCreateInput struct {
	Title     string                `form:"title" binding:"required"`
	File      *multipart.FileHeader `form:"file" binding:"required"`
	Thumbnail *multipart.FileHeader `form:"file"`
	GenreID   uint                  `form:"genreID" binding:"required"`
}

type SongFilterInput struct {
	Page    int    `form:"page,default=1"`
	Search  string `form:"search"`
	Limit   int    `form:"limit,default=10"`
	GenreID int    `form:"genreID"`
	OrderBy string `form:"orderBy"` // like, listen
}

type SongUpdateInput struct {
	Title     string                `form:"title"`
	File      *multipart.FileHeader `form:"file"`
	Thumbnail *multipart.FileHeader `form:"thumbnail"`
	GenreID   uint                  `form:"genreID"`
}
