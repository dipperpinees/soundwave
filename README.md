<p align="center">
  <a href="https://soundwavee.vercel.app" target="blank"><img src="https://iili.io/HI5pxkB.png" width="200" alt="SOUNDWAVE" /></a>
</p>
<p align="center"> <b><a href="https://soundwavee.vercel.app">SOUNDWAVE</a></b>  - Listen to Free Online Music Streaming</p>

## Technology used:
  + Front-end: [ReactJS](https://reactjs.org/), [SCSS](https://sass-lang.com/), [Chakra UI](https://chakra-ui.com/), [React Hook Form](https://react-hook-form.com/), [React Icons](https://react-icons.github.io/react-icons/), [React Query](https://react-query-v3.tanstack.com/)
  + Back-end: [Golang](https://go.dev/)([Gin Gonic](https://gin-gonic.com/)), [GORM](https://gorm.io/)
  + Database: MySQL
  + RESTful API ([DEMO API](https://music-a8of.onrender.com/swagger/))

## How to start

```bash
# client
$ git clone https://github.com/hiepnguyen223/soundwave-front-end.git public/client
$ cd public/client
$ yarn install
$ yarn build

# server
$ go mod tidy
$ go run main.go
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
