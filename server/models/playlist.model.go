package models

type PlayList struct {
	ID        uint `gorm:"primaryKey;autoIncrement" json:"id"`
	SongID    uint
	AuthorID  uint
	Thumbnail string
}
