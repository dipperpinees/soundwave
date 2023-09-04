package models

import "time"

type Follow struct {
	Follower    User
	FollowerID  uint `gorm:"primaryKey"`
	Following   User
	FollowingID uint      `gorm:"primaryKey"`
	CreatedAt   time.Time `gorm:"autoCreateTime;column:created_at" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime;column:updated_at" json:"updated_at"`
}

func (Follow) TableName() string {
	return "follows"
}
