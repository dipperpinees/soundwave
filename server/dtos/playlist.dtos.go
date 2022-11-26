package dtos

type PlaylistCreateInput struct {
	Thumbnail string `upload:"thumbnail,_,image"`
	Name      string `form:"name" binding:"required"`
}
