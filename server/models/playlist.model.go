package models

import "time"

type Playlist struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	AuthorID  uint      `json:"-"`
	Thumbnail string    `gorm:"-" json:"thumbnail"`
	Name      string    `json:"name"`
	Author    User      `json:"author"`
	Songs     []Song    `gorm:"many2many:playlists_songs;" json:"-"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}
