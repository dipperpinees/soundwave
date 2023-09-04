package services

// var userService = UserService{}

// func TestSendEmail(t *testing.T) {
// 	godotenv.Load("../.env")

// 	err := ht.SendForgotPassword([]string{"hiepnguyenno01@gmail.com"}, "https://go.dev/play/")

// 	if err != nil {
// 		t.Errorf("Don't send email %s", gin.H{"message": err.Error()})
// 	}
// }

// func TestForgetPassword(t *testing.T) {
// 	godotenv.Load("../.env")
// 	common.InitDB()

// 	code, err := userService.CreateForget(1)
// 	if err != nil {
// 		t.Errorf("Don't create forget %s", gin.H{"message": err.Error()})
// 	}
// 	t.Log(code)
// }

// func TestSelect(t *testing.T) {
// 	godotenv.Load("../.env")
// 	common.InitDB()
// 	var count int64
// 	err := common.GetDB().Model(&models.Forget{}).Where("user_id = ?", 1).Where("code = ?", "il06ElEj").Count(&count).Error
// 	t.Log(err, count)
// }
