package dtos

type UserSignInInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserCreateInput struct {
	Email    string `json:"email" binding:"required,email"`
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required,min=6"`
}

type UserEmailInput struct {
	Email string `json:"email"`
}

type UserResetPasswordInput struct {
	UserID      uint   `json:"userID" binding:"required"`
	Code        string `json:"code" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required,min=6"`
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

type UserUpdateInput struct {
	Avatar      string `upload:"avatar,_,image"`
	Description string `form:"description"`
	Name        string `form:"name"`
}
