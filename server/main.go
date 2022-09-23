package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/users"
	"github.com/joho/godotenv"
)

func migrate() {
	users.Migrate()
}

func handleRouter(r *gin.RouterGroup) {
	users.HandleRoute(r.Group("/users"))
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	common.Init()

	//migrate database
	migrate()

	app := gin.Default()

	router := app.Group("/api")
	handleRouter(router)

	app.Run(":3001")
}
