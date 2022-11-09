## <a href="https://music-a8of.onrender.com/swagger">DEMO</a>
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
DB_NAME=test
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=secretkey
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_FOLDER=
EMAIL_PASSWORD=
EMAIL=abc@gmail.com
```

# Install Dependencies

```bash
go mod tidy
```

# Run server

```bash
go run main.go
```

# For Docker db host: "host.docker.internal"
