package services

import (
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/models"
)

type GenreService struct{}

func (GenreService) GetAll() ([]models.Genre, error) {
	var genres []models.Genre
	err := common.GetDB().Order("id asc").Find(&genres).Error

	return genres, err
}
