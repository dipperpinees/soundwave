package mail

import (
	"github.com/hiepnguyen223/int3306-project/configs"
	"gopkg.in/gomail.v2"
)

func Send(toList []string, subject string, content string) error {
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
