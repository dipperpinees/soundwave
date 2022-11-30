package upload

import (
	"context"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/hiepnguyen223/int3306-project/configs"
)

type mediaUpload struct{}

func NewMediaUpload() *mediaUpload {
	return &mediaUpload{}
}

func (*mediaUpload) Single(input interface{}) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 120*time.Second)
	defer cancel()

	//create cloudinary instance
	cld, err := cloudinary.NewFromParams(configs.EnvCloudinaryCloudName(), configs.EnvCloudinaryApiKey(), configs.EnvCloudinaryApiSecret())
	if err != nil {
		return "", err
	}

	//upload file
	uploadParam, err := cld.Upload.Upload(ctx, input, uploader.UploadParams{Folder: configs.EnvCloudinaryUploadFolder()})
	if err != nil {
		return "", err
	}

	return uploadParam.SecureURL, nil
}

func (m *mediaUpload) Multiple(files map[string]string) (map[string]string, error) {
	cap := len(files)
	queueUrl := make(chan [2]string, cap)
	queueErr := make(chan error, cap)

	//start goroutine to upload multiple file
	for key := range files {
		dst := files[key]
		go func(dst string, key string) {
			url, err := m.Single(dst)
			var data [2]string
			data[0] = key
			data[1] = url
			queueUrl <- data
			queueErr <- err
		}(dst, key)
	}

	urlList := make(map[string]string, cap)
	var err error
	//retrieve uploaded url and error
	for i := 0; i < cap; i++ {
		url := <-queueUrl
		urlList[url[0]] = url[1]

		e := <-queueErr
		err = func() error {
			if e != nil {
				return e
			} else {
				return err
			}
		}()
	}

	return urlList, err
}
