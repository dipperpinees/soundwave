package dtos

type Paginate struct {
	Page       int   `json:"page"`
	TotalPages int   `json:"totalPages"`
	TotalDocs  int64 `json:"totalDocs"`
}
