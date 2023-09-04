package helper

import (
	"mime/multipart"
	"net/http"
	"strings"
)

func getContentType(formFile *multipart.FileHeader) (string, error) {
	buff := make([]byte, 512)
	file, _ := formFile.Open()
	if _, err := file.Read(buff); err != nil {
		return "", err
	}
	defer file.Close()

	return http.DetectContentType(buff), nil
}

func IsValidContentType(fileType string, file *multipart.FileHeader) bool {
	currentFileType, err := getContentType(file)
	if err != nil {
		return false
	}

	if fileType == "audio" && currentFileType == "application/octet-stream" {
		return true
	}

	return strings.HasPrefix(currentFileType, fileType)
}
