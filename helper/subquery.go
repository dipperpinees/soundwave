package helper

import "fmt"

func CheckFollowedSubquery(followerID uint) string {
	if followerID != 0 {
		return fmt.Sprintf("(SELECT count(*) from follows WHERE follower_id = %d and following_id = users.id) as is_followed", followerID)
	}
	return "0 as is_followed"
}

func CheckLikeSubquery(userID uint) string {
	if userID != 0 {
		return fmt.Sprintf("(SELECT count(*) from user_like_songs WHERE user_id = %d and song_id = songs.id) as is_liked", userID)
	}
	return "0 as is_liked"
}
