import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { getStripe } from "../../../services/stripeConfig";
import StripeCheckoutForm from "./StripeCheckoutForm";
import "./StripePaymentForm.css";

interface StripePaymentFormProps {
  planName: string;
  planPrice: string;
  planPriceId: string; // Stripe Price ID
  onClose: () => void;
  onPaymentSuccess?: () => void;
  userEmail?: string;
  userName?: string;
  userId?: string;
  planId?: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  planName,
  planPrice,
  planPriceId,
  onClose,
  onPaymentSuccess,
  userEmail,
  userName,
  userId,
  planId,
}) => {
  const [stripePromise] = useState(() => getStripe());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento do Stripe
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#0F172A",
      colorBackground: "#ffffff",
      colorText: "#1e293b",
      colorDanger: "#ef4444",
      fontFamily: "Inter, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
    rules: {
      ".Input": {
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "16px",
        backgroundColor: "#ffffff",
      },
      ".Input:focus": {
        border: "2px solid #0F172A",
        boxShadow: "0 0 0 1px #0F172A",
      },
      ".Label": {
        fontSize: "14px",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "8px",
      },
    },
  };

  const options = {
    appearance,
    locale: "pt-BR" as const,
  };

  return (
    <div className="stripe-payment-form-overlay">
      <div className="stripe-payment-form-container">
        <button className="stripe-payment-form-close" onClick={onClose}>
          ×
        </button>

        <div className="stripe-payment-form-header">
          <h2>Assinar Plano {planName}</h2>
          <p className="stripe-payment-form-price">R$ {planPrice}/mês</p>
          <p className="stripe-payment-form-description">
            Pagamento seguro processado pelo Stripe
          </p>
        </div>

        {isLoading ? (
          <div className="stripe-loading">
            <div className="stripe-loading-spinner"></div>
            <p>Carregando formulário de pagamento...</p>
          </div>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <StripeCheckoutForm
              planName={planName}
              planPrice={planPrice}
              planPriceId={planPriceId}
              userEmail={userEmail}
              userName={userName}
              userId={userId}
              planId={planId}
              onClose={onClose}
              onPaymentSuccess={onPaymentSuccess}
            />
          </Elements>
        )}

        <div className="stripe-payment-security">
          <div className="stripe-security-badges">
            <span className="stripe-security-badge">🔒 SSL Seguro</span>
            <span className="stripe-security-badge">💳 Stripe</span>
            <span className="stripe-security-badge">🛡️ PCI Compliant</span>
          </div>
          <p className="stripe-security-text">
            Seus dados de pagamento são protegidos com criptografia de nível
            bancário
          </p>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentForm;
