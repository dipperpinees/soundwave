package models

type Paginate struct {
	Page       int `json:"page"`
	TotalPages int `json:"total_pages"`
}
