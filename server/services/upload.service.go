package services

import (
	"context"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/hiepnguyen223/int3306-project/configs"
)

type UploadService struct{}

func (UploadService) SingleFileUpload(file multipart.File) (string, error) {
	ctx := context.Background()

	//create cloudinary instance
	cld, err := cloudinary.NewFromParams(configs.EnvCloudinaryCloudName(), configs.EnvCloudinaryApiKey(), configs.EnvCloudinaryApiSecret())
	if err != nil {
		return "", err
	}

	//upload file
	uploadParams, err2 := cld.Upload.Upload(ctx, file, uploader.UploadParams{Folder: configs.EnvCloudinaryUploadFolder()})
	if err2 != nil {
		return "", err
	}

	return uploadParams.URL, nil
}

func (u UploadService) MultipleFileUpload(files map[string]multipart.File) (map[string]string, error) {
	cap := len(files)
	queueUrl := make(chan [2]string, cap)
	queueErr := make(chan error, cap)

	//start goroutine to upload multiple file
	for key := range files {
		file := files[key]
		go func(file multipart.File, key string) {
			url, err := u.SingleFileUpload(file)
			var data [2]string
			data[0] = key
			data[1] = url
			queueUrl <- data
			queueErr <- err
		}(file, key)
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
