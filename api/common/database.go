package common

import (
	"fmt"

	"github.com/hiepnguyen223/int3306-project/configs"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

func InitDB() *gorm.DB {
	db = connectDb()
	return db
}

func connectDb() *gorm.DB {
	DB_USERNAME := configs.EnvDbUserName()
	DB_PASSWORD := configs.EnvDbPassword()
	DB_NAME := configs.EnvDbName()
	DB_HOST := configs.EnvDbHost()
	DB_PORT := configs.EnvDbPort()
	DB_TLS := ""
	ENVIRONMENT := configs.Environment()
	if DB_HOST != "localhost" {
		DB_TLS = "&tls=true"
	}
	dsn := DB_USERNAME + ":" + DB_PASSWORD + "@tcp" + "(" + DB_HOST + ":" + DB_PORT + ")/" + DB_NAME + "?parseTime=true" + DB_TLS
	
	gormConfig := &gorm.Config{}
	if ENVIRONMENT == "production" {
		gormConfig.Logger = logger.Default.LogMode(logger.Silent)
	}
	db, err := gorm.Open(mysql.Open(dsn), gormConfig)

	if err != nil {
		fmt.Printf("Error connecting to database : error=%v", err)
		return nil
	}

	return db
}

func GetDB() *gorm.DB {
	return db
}
