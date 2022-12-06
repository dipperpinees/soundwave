package common

import (
	"time"

	"github.com/patrickmn/go-cache"
)

var c *cache.Cache

func InitCache() {
	c = cache.New(60*time.Minute, 10*time.Minute)
}

func SetCache(key string, value interface{}) {
	c.Set(key, value, cache.DefaultExpiration)
}

func GetCache(key string) interface{} {
	data, _ := c.Get(key)
	return data
}

func DeleteCache(key string) {
	c.Delete(key)
}
