package helper

import (
	"math/rand"
	"time"
)

func RandStr(length int) string {
	rand.Seed(time.Now().UnixNano())
	chars := "qwertyuiopasdfghjklzxcvbnm1234567890"
	charsLength := len(chars)
	var str string
	for i := 0; i < length; i++ {
		randChar := rand.Intn(charsLength)
		str = str + string(chars[randChar])
	}
	return str
}
