<p align="center">
  <a href="https://soundwavee.vercel.app" target="blank"><img src="https://iili.io/HI5pxkB.png" width="200" alt="SOUNDWAVE" /></a>
</p>
<p align="center"> <b><a href="https://soundwavee.vercel.app">SOUNDWAVE</a></b>  - Listen to Free Online Music Streaming</p>

## Technology used:
  + Front-end: [ReactJS](https://reactjs.org/), [SCSS](https://sass-lang.com/), [Chakra UI](https://chakra-ui.com/), [React Hook Form](https://react-hook-form.com/), [React Icons](https://react-icons.github.io/react-icons/), [React Query](https://react-query-v3.tanstack.com/)
  + Back-end: [Golang](https://go.dev/) ([Gin Gonic](https://gin-gonic.com/)), [GORM](https://gorm.io/)
  + Database: MySQL
  + RESTful API ([DEMO API](https://soundwave-app.onrender.com/swagger))

## How to start
Build docker image
```bash
docker build -t soundwave --build-arg GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>  .
```
Run the application in a Docker container:
```bash
docker run -d \
--name soundwave-app \
-e DB_USERNAME='root' \
-e DB_PASSWORD='123456' \
-e DB_NAME='db' \
-e DB_HOST='127.0.0.1' \
-e DB_PORT='4000' \
-e SECRET_KEY='secret_key' \
-e CLOUDINARY_CLOUD_NAME='cloud_name' \
-e CLOUDINARY_API_KEY='api_key' \
-e CLOUDINARY_API_SECRET='api_secret' \
-e CLOUDINARY_UPLOAD_FOLDER='folder' \
-e EMAIL_PASSWORD='email_password' \
-e EMAIL='abc@gmail.com' \
-e ADMIN_EMAIL='admin@gmail.com' \
-e ADMIN_PASSWORD='admin123' \
-p 3001:3001 \
soundwave
``` 


## Environment variables
Fill env variables in `.env` file

## Functionality overview

**General functionality:**
- Sign in with email or Google Login
- Authenticate via JWT and HttpOnly Cookie
- Upload mp3 sound
- CRUD song
- CRUD comments on song
- CRUD playlist
- Create favorite song
- Recommend songs
- Song genre
- Follow other users
- Search & filter song & user
- ADMIN dashboard
- Password reset email message

<img width="550" src="https://iili.io/HI7iFGp.png"/>
<img width="550" src="https://iili.io/HI7i3nR.png"/>
<img width="550" src="https://iili.io/HI7Pb3P.png"/>
<img width="550" src="https://iili.io/HI7idZv.png"/>
<img width="550" src="https://iili.io/HI7Pyyg.png"/>
