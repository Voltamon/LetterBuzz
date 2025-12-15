import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, AlertCircle, ArrowLeft, Shield, Loader2 } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const createSetupIntent = async () => {
  const response = await fetch("http://localhost:8080/api/create-setup-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.clientSecret;
};

type Status = "idle" | "loading" | "success" | "error";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !isReady) return;

    setStatus("loading");
    setErrorMessage("");

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment?status=success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong");
    } else {
      setStatus("success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <PaymentElement
          onReady={() => setIsReady(true)}
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">Payment method saved successfully!</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || !elements || !isReady || status === "loading" || status === "success"}
        className="w-full h-14 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-base rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving...
          </span>
        ) : status === "success" ? (
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Saved
          </span>
        ) : (
          "Save Payment Method"
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
        <Shield className="w-4 h-4" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  );
}

export default function Payment() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      return;
    }

    createSetupIntent()
      .then((secret) => {
        setClientSecret(secret);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to initialize payment. Please try again.");
        setIsLoading(false);
      });
  }, []);

  const isSuccess = new URLSearchParams(window.location.search).get("status") === "success";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#f97316]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-white/10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to home</span>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-16">
          {isSuccess ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Payment Method Saved</h1>
              <p className="text-white/60 max-w-md mx-auto">
                Your payment method has been securely saved. You can now use it for future purchases.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/app">
                  <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-8">
                    Go to App
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#f97316]/20 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-[#f97316]" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">Add Payment Method</h1>
                <p className="text-white/60 max-w-md mx-auto">
                  Securely save your payment details for faster checkout and future purchases.
                </p>
              </div>

              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#f97316]" />
                    <p className="text-white/60">Initializing secure payment...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                    <p className="text-red-400">{error}</p>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#f97316",
                          colorBackground: "#1a1a24",
                          colorText: "#ffffff",
                          colorDanger: "#ef4444",
                          fontFamily: "system-ui, sans-serif",
                          borderRadius: "8px",
                          spacingUnit: "4px",
                        },
                        rules: {
                          ".Input": {
                            backgroundColor: "#1a1a24",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          },
                          ".Input:focus": {
                            border: "1px solid #f97316",
                            boxShadow: "0 0 0 1px #f97316",
                          },
                          ".Label": {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                          ".Tab": {
                            backgroundColor: "#12121a",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          },
                          ".Tab--selected": {
                            backgroundColor: "#1a1a24",
                            borderColor: "#f97316",
                          },
                        },
                      },
                    }}
                  >
                    <PaymentForm />
                  </Elements>
                ) : null}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-sm text-white/60">256-bit encryption</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">💳</div>
                  <p className="text-sm text-white/60">PCI compliant</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-sm text-white/60">Secure storage</p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
