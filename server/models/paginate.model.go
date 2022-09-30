package models

type Paginate struct {
	Page       int `json:"page"`
	TotalPages int `json:"total_pages"`
	TotalDocs  int `json:"total_docs"`
}
