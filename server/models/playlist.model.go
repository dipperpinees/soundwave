package models

import "time"

type Playlist struct {
	ID        uint `gorm:"primaryKey;autoIncrement" json:"id"`
	SongID    uint
	AuthorID  uint
	Thumbnail string
	Songs     []Song    `gorm:"many2many:playlists_songs;" json:"-"`
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}
