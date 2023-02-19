package dtos

type CommentCreateInput struct {
	Content string `json:"content" binding:"required"`
}
