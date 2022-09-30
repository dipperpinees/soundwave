package main

import (
	"fmt"

	"os"

	"github.com/gin-gonic/gin"
	"github.com/hiepnguyen223/int3306-project/common"
	docs "github.com/hiepnguyen223/int3306-project/docs"
	"github.com/hiepnguyen223/int3306-project/models"
	"github.com/hiepnguyen223/int3306-project/routers"
	"github.com/joho/godotenv"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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

	//add swagger
	docs.SwaggerInfo.BasePath = "/api"
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

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
