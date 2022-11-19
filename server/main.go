package main

import (
	"fmt"

	"os"

	"github.com/gin-contrib/static"
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
	app.Use(middlewares.CORSMiddleware())
	app.Use(middlewares.AuthMiddleware())

	//serve client
	if configs.Environment() == "production" {
		app.Use(static.Serve("/", static.LocalFile("../client/build", false)))
	}

	router := app.Group("/api")

	routers.HandleRoute(router)

	var PORT string
	if configs.EnvPort() != "" {
		PORT = ":" + os.Getenv("PORT")
	} else {
		PORT = ":3001"
	}
	app.Run(PORT)
}
