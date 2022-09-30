# Getting started

## Directory structure

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
