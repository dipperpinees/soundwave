package dtos

type PlaylistCreateInput struct {
	Thumbnail string `upload:"thumbnail,_,image"`
	Name      string `form:"name" binding:"required"`
	Public    bool   `form:"public,default=true"`
}

type PlaylistFilterInput struct {
	Page   int    `form:"page,default=1"`
	Search string `form:"search"`
	Limit  int    `form:"limit,default=10"`
}
