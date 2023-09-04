package configs

import "os"

func EnvDbUserName() string {
	return os.Getenv("DB_USERNAME")
}

func EnvDbPassword() string {
	return os.Getenv("DB_PASSWORD")
}

func EnvDbName() string {
	return os.Getenv("DB_NAME")
}

func EnvDbHost() string {
	return os.Getenv("DB_HOST")
}

func EnvDbPort() string {
	return os.Getenv("DB_PORT")
}

func EnvSecretKey() string {
	return os.Getenv("SECRET_KEY")
}

func EnvCloudinaryCloudName() string {
	return os.Getenv("CLOUDINARY_CLOUD_NAME")
}

func EnvCloudinaryApiKey() string {
	return os.Getenv("CLOUDINARY_API_KEY")
}

func EnvCloudinaryApiSecret() string {
	return os.Getenv("CLOUDINARY_API_SECRET")
}

func EnvCloudinaryUploadFolder() string {
	return os.Getenv("CLOUDINARY_UPLOAD_FOLDER")
}

func EnvEmail() (string, string) {
	return os.Getenv("EMAIL"), os.Getenv("EMAIL_PASSWORD")
}

func EnvClientDomain() string {
	return os.Getenv("CLIENT_DOMAIN")
}

func Environment() string {
	ENVIROMENT := os.Getenv("ENV")
	if (ENVIROMENT == "") {
		ENVIROMENT = "development"
	}
	return ENVIROMENT;
}

func EnvPort() string {
	return os.Getenv("PORT")
}

func EnvAdmin() (string, string) {
	return os.Getenv("ADMIN_EMAIL"), os.Getenv("ADMIN_PASSWORD")
}
