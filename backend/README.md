# LetterBuzz Backend

## Setup

### Environment Variables

This project uses environment variables for sensitive configuration. Follow these steps to set up your environment:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your actual credentials:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `JWT_SECRET`: A secure random string for JWT signing
   - `REDIRECT_URL`: OAuth redirect URL (default: `http://localhost:5173/payment?status=success`)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key

### Running the Backend

```bash
go run main.go
```

## Security Notes

- **Never commit the `.env` file** - It contains sensitive credentials
- The `.env.example` file is safe to commit as it only contains placeholder values
- Make sure `.env` is listed in `.gitignore` before pushing to GitHub
