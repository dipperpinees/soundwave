package main

import (
	"fmt"

	"os"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	"github.com/hiepnguyen223/int3306-project/configs"
	"github.com/hiepnguyen223/int3306-project/middlewares"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/routers"
	"github.com/joho/godotenv"
)

func main() {
	//load env variable
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	//initialize database
	common.InitDB()

	//initialize cache storage
	common.InitCache()

	//migrate database
	models.Migrate()

	//start default gin server
	app := gin.Default()

	//swagger ui
	app.Static("/swagger", "./public/swagger")

	//middleware
	app.Use(middlewares.CORS())
	app.Use(middlewares.Auth())

	router := app.Group("/api")
	routers.HandleRoute(router)

	//serve client
	if configs.Environment() == "production" {
		app.NoRoute(func(c *gin.Context) {
			c.File("../client/build/index.html")
		})
	}

	var PORT string
	if configs.EnvPort() != "" {
		PORT = ":" + os.Getenv("PORT")
	} else {
		PORT = ":3001"
	}
	app.Run(PORT)
}
