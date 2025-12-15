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
		GoogleClientID:     "575905650718-47vkndfn4uf8kkcl5r1cj253ghuka4hp.apps.googleusercontent.com",
		GoogleClientSecret: "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",
		RedirectURL:        "http://localhost:5173/payment?status=success",
		JWTSecret:          "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",
		StripeSecretKey:    os.Getenv("STRIPE_SECRET_KEY"),
	}
}
