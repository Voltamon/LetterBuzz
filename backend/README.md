# Newsletter Navigator Backend

Backend server for Newsletter Navigator application with OAuth2 authentication and Stripe payment integration.

## Setup

### Prerequisites
- Go 1.24.5 or higher
- A Google OAuth2 application
- A Stripe account (optional, for payment features)

### Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required values in `.env`:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth2 client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth2 client secret
   - `REDIRECT_URL`: OAuth redirect URL (default: `http://localhost:5173/payment?status=success`)
   - `JWT_SECRET`: Secret key for signing JWT tokens
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (optional)

### Running the Server

1. Install dependencies:
   ```bash
   go mod download
   ```

2. Run the server:
   ```bash
   go run main.go
   ```

The server will start on port 8080.

## Security

⚠️ **Important**: Never commit the `.env` file to version control. It contains sensitive credentials.

The `.env` file is already added to `.gitignore` to prevent accidental commits.
