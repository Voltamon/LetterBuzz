package payment

import (
	"encoding/json"
	"net/http"
	"newsletter-navigator-backend/internal/config"

	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/setupintent"
)

type Handler struct {
	Config *config.Config
}

func NewHandler(cfg *config.Config) *Handler {
	stripe.Key = cfg.StripeSecretKey
	return &Handler{Config: cfg}
}

func (h *Handler) HandleCreateSetupIntent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	params := &stripe.SetupIntentParams{
		AutomaticPaymentMethods: &stripe.SetupIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}
	si, err := setupintent.New(params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"clientSecret": si.ClientSecret,
	})
}
