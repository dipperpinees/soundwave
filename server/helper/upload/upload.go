package upload

import (
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/fatih/structs"
	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/helper"
)

func Upload(c *gin.Context, filesStruct interface{}) error {
	s := structs.New(filesStruct)
	for key := range s.Map() {
		field := s.Field(key)
		if field.Tag("upload") == "" {
			continue
		}
		tagArr := strings.Split(field.Tag("upload"), ",")
		name := tagArr[0]
		isRequired := tagArr[1] == "required"
		fileType := tagArr[2]

		file, err := c.FormFile(name)
		if isRequired && err != nil {
			return fmt.Errorf("%s required", key)
		}
		if !isRequired && err != nil {
			continue
		}
		if !helper.IsValidContentType(fileType, file) {
			return errors.New("invalid file type")
		}

		dst := "public/" + file.Filename
		c.SaveUploadedFile(file, dst)
		defer os.Remove(dst)

		uploadUrl, err := NewMediaUpload().Single(dst)
		field.Set(uploadUrl)
		if err != nil {
			return err
		}
	}
	return nil
}
