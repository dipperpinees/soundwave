package models

import "time"

type Comment struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Author    User      `json:"author"`
	AuthorID  uint      `json:"-"`
	Song      Song      `json:"-"`
	SongID    uint      `json:"song_id"`
	Content   string    `gorm:"not null" json:"content"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}

type CommentCreateInput struct {
	Content string `json:"content" binding:"required"`
}
