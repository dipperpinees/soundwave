package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/dtos"
	"github.com/hiepnguyen223/int3306-project/services"
)

type AdminController struct{}

var adminService = services.AdminService{}

func (AdminController) BanUser(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	if err := adminService.Ban(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Ban user successfully"})
}

func (AdminController) UnbanUser(c *gin.Context) {
	params := dtos.IdParams{}
	if err := c.ShouldBindUri(&params); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}

	if err := adminService.Unban(params.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Unban user successfully"})
}
