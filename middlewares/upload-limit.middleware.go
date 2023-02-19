package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadLimit(maxMegaBytes int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, int64(maxMegaBytes<<20))
	}
}
