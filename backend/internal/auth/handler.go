package auth

import (
	"context"
	"encoding/json"
	"net/http"
	"newsletter-navigator-backend/internal/config"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type Handler struct {
	Config      *config.Config
	OAuthConfig *oauth2.Config
}

func NewHandler(cfg *config.Config) *Handler {
	return &Handler{
		Config: cfg,
		OAuthConfig: &oauth2.Config{
			ClientID:     cfg.GoogleClientID,
			ClientSecret: cfg.GoogleClientSecret,
			RedirectURL:  cfg.RedirectURL,
			Scopes: []string{
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile",
			},
			Endpoint: google.Endpoint,
		},
	}
}

func (h *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	url := h.OAuthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (h *Handler) HandleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Code not found", http.StatusBadRequest)
		return
	}

	token, err := h.OAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Failed to exchange token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	client := h.OAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		http.Error(w, "Failed to get user info: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var userInfo map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		http.Error(w, "Failed to decode user info", http.StatusInternalServerError)
		return
	}

	email, ok := userInfo["email"].(string)
	if !ok {
		http.Error(w, "Email not found in user info", http.StatusInternalServerError)
		return
	}

	// Generate JWT
	jwtToken, err := GenerateToken(email, h.Config.JWTSecret)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Set Cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    jwtToken,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   false, // Set to true in production (HTTPS)
		SameSite: http.SameSiteLaxMode,
	})

	http.Redirect(w, r, "http://localhost:5173/payment?status=success", http.StatusTemporaryRedirect)
}
