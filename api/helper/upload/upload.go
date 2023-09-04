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
	queueErr := make(chan error, len(s.Map()))
	for key := range s.Map() {
		go func(key string) {
			field := s.Field(key)
			if field.Tag("upload") == "" {
				queueErr <- nil
				return
			}
			tagArr := strings.Split(field.Tag("upload"), ",")
			name := tagArr[0]
			isRequired := tagArr[1] == "required"
			fileType := tagArr[2]

			file, err := c.FormFile(name)
			if isRequired && err != nil {
				queueErr <- fmt.Errorf("%s required", key)
				return
			}
			if !isRequired && err != nil {
				queueErr <- nil
				return
			}
			if !helper.IsValidContentType(fileType, file) {
				queueErr <- errors.New("invalid file type")
				return
			}

			dst := "public/" + file.Filename
			c.SaveUploadedFile(file, dst) //nolint:all
			defer os.Remove(dst)

			uploadUrl, err := NewMediaUpload().Single(dst)
			field.Set(uploadUrl) //nolint:all
			queueErr <- err
		}(key)
	}

	err := helper.GroupError(queueErr, len(s.Map()))
	return err
}
