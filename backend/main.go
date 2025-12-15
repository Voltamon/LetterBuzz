package main

import (
	"fmt"
	"log"
	"net/http"
	"newsletter-navigator-backend/internal/auth"
	"newsletter-navigator-backend/internal/config"
	"newsletter-navigator-backend/internal/payment"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using environment variables")
	}

	cfg := config.LoadConfig()
	authHandler := auth.NewHandler(cfg)

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Route("/auth", func(r chi.Router) {
		r.Get("/google/login", authHandler.HandleLogin)
		r.Get("/google/callback", authHandler.HandleCallback)
	})

	paymentHandler := payment.NewHandler(cfg)
	r.Route("/api", func(r chi.Router) {
		r.Post("/create-setup-intent", paymentHandler.HandleCreateSetupIntent)
	})

	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", r)
}
