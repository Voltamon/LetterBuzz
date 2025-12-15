package config

import (
	"os"
)

type Config struct {
	GoogleClientID     string
	GoogleClientSecret string
	RedirectURL        string
	JWTSecret          string
	StripeSecretKey    string
}

func LoadConfig() *Config {
	return &Config{
		GoogleClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		GoogleClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:        os.Getenv("REDIRECT_URL"),
		JWTSecret:          os.Getenv("JWT_SECRET"),
		StripeSecretKey:    os.Getenv("STRIPE_SECRET_KEY"),
	}
}
