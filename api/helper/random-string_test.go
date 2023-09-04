package helper

import (
	"testing"
)

func TestRandomString(t *testing.T) {
	str := RandStr(6)
	t.Logf("str: %s", str)
	if len(str) != 6 {
		t.Fatalf("Error create random string")
	}
}
