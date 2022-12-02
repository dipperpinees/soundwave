package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/dtos"
)

type AdminController struct{}

func (AdminController) DeleteUser(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	if err := userService.DeleteOne(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete user successfully"})
}
