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

func handleAPIRoutes(app *gin.Engine) {
	router := app.Group("/api")
	router.Use(middlewares.CORS())
	router.Use(middlewares.Auth())
	routers.HandleRoute(router)
}

func serveWeb(app *gin.Engine) {
	app.Use(static.Serve("/", static.LocalFile("../web/build", true)))
	app.NoRoute(func(c *gin.Context) {
		c.File("../web/build/index.html")
	})
}

func initServer() {
	//start default gin server
	app := gin.Default()

	//swagger ui
	app.Use(static.Serve("/swagger", static.LocalFile("./public/swagger", true)))

	handleAPIRoutes(app)

	if configs.Environment() == "production" {
		serveWeb(app)
	}

	var PORT string
	if configs.EnvPort() != "" {
		PORT = ":" + os.Getenv("PORT")
	} else {
		PORT = ":3001"
	}
	err := app.Run(PORT)
	if (err == nil) {
		fmt.Printf("Server started at port %s", PORT)
	}
}

func initDB() {
	//initialize database
	common.InitDB()

	//initialize cache storage
	common.InitCache()

	//migrate database
	models.Migrate()
}

func main() {
	//load env variable
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Failed to load .env")
	}

	initDB()
	initServer();
}
