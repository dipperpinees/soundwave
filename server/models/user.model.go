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
	IsFollowed      bool      `gorm:"-:migration <-:false" json:"isFollowed"`
}

type UserSignInInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserCreateInput struct {
	Email    string `json:"email" binding:"required,email"`
	Name     string `json:"name" binding:"required,min=6"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserEmailInput struct {
	Email string `json:"email"`
}

type UserResetPasswordInput struct {
	UserID      uint   `json:"userID,string,omitempty" binding:"required"`
	Code        string `json:"code,omitempty" binding:"required"`
	NewPassword string `json:"newPassword,omitempty" binding:"required,min=6"`
}

type UserGoogleInput struct {
	AccessToken string `json:"access_token" binding:"required"`
	AuthUser    string `json:"authuser"`
	ExpiresIn   string `json:"prompt"`
	Scope       string `json:"scope"`
	TokenType   string `json:"bearer"`
}

type UserFilterInput struct {
	Search  string `form:"search"`
	Page    int    `form:"page,default=1"`
	Limit   int    `form:"limit,default=10"`
	OrderBy string `form:"orderBy"` //follower, track
}
