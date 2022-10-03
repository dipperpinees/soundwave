package main

import (
	"fmt"

	"os"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
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

	//migrate database
	models.Migrate()

	//start default gin server
	app := gin.Default()

	//cors
	app.Use(middlewares.CORSMiddleware())

	router := app.Group("/api")
	routers.HandleRoute(router)

	var PORT string
	if os.Getenv("PORT") != "" {
		PORT = ":" + os.Getenv("PORT")
	} else {
		PORT = ":3001"
	}
	app.Run(PORT)
}
