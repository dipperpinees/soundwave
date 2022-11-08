package services

import (
	"fmt"

	"github.com/hiepnguyen223/int3306-project/configs"
	"gopkg.in/gomail.v2"
)

type Email struct{}

func (Email) Send(toList []string, subject string, content string) error {
	from, password := configs.EnvEmail()
	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", toList[:]...)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", content)

	d := gomail.NewDialer("smtp.gmail.com", 587, from, password)

	err := d.DialAndSend(m)
	return err
}

func (e Email) SendForgotPassword(toList []string, code string) error {
	return e.Send(toList, "Reset your password", fmt.Sprintf("<p>Your code is <strong>%s</strong></p>", code))
}
