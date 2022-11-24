package dtos

type SongCreateInput struct {
	Title     string `form:"title" binding:"required"`
	File      string `upload:"file,required,audio"`
	Thumbnail string `upload:"thumbnail,_,image"`
	GenreID   uint   `form:"genreID" binding:"required"`
}

type SongFilterInput struct {
	Page    int    `form:"page,default=1"`
	Search  string `form:"search"`
	Limit   int    `form:"limit,default=10"`
	GenreID int    `form:"genreID"`
	OrderBy string `form:"orderBy"` // like, listen
}

type SongUpdateInput struct {
	Title     string `form:"title"`
	File      string `upload:"file,_,audio"`
	Thumbnail string `upload:"thumbnail,_,image"`
	GenreID   uint   `form:"genreID"`
}
