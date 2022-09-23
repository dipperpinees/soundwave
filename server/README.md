# Getting started
## Directory structure
```bash
.
├── gorm.db
├── hello.go
├── common
│   ├── database.go         //DB connect manager
│   └── security.go         //handle jwt and hash password
├── users
|   ├── user.model.go       //data models define & DB operation
|   ├── user.router.go      //business logic & router binding
|   ├── user.controller.go  //handle router's logic
|   └── user.middleware.go  //put the before & after logic of handle request
├── ...
...
```
## Install Golang
Go 1.13 or higher
https://go.dev/doc/install
## Environment Config
Fill env variables in .env file
```bash
DB_USERNAME=root
DB_PASSWORD=123456
DB_NAME=mysql
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=secretkey
```
# Install Dependencies
```bash
go mod tidy
```
# Run server
```bash
go run main.go
```
