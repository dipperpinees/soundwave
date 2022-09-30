package common

import (
	"mime/multipart"
	"net/http"
	"strings"
)

func getContentType(formFile multipart.File) (string, error) {
	buff := make([]byte, 512)

	if _, err := formFile.Read(buff); err != nil {
		return "", err
	}

	return http.DetectContentType(buff), nil
}

func IsValidContentType(fileType string, formFile multipart.File) bool {
	currentFileType, err := getContentType(formFile)
	if err != nil {
		return false
	}

	return strings.HasPrefix(currentFileType, fileType)
}
