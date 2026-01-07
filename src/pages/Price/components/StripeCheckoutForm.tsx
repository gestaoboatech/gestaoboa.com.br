import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import {
  createCheckoutSession,
  createSubscription,
} from "../../../services/stripeService";

interface StripeCheckoutFormProps {
  planName: string;
  planPrice: string;
  planPriceId: string;
  userEmail?: string;
  userName?: string;
  userId?: string;
  planId?: string;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({
  planName,
  planPrice,
  planPriceId,
  userEmail,
  userName,
  userId,
  planId,
  onClose,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState(userEmail || "");
  const [name, setName] = useState(userName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"checkout" | "elements">(
    "checkout"
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  const handleCheckoutSession = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        success,
        session_id,
        error: apiError,
      } = await createCheckoutSession({
        price_id: planPriceId,
        success_url: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/payment-cancelled`,
        customer_email: email,
        customer_name: name,
        user_id: userId,
        plan_id: planId,
      });

      if (!success || !session_id) {
        throw new Error(apiError || "Erro ao criar sessão de checkout");
      }

      // Redirecionar para o Stripe Checkout
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId: session_id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar pagamento");
    } finally {
      setIsLoading(false);
    }
  };

  const handleElementsSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Confirmar o pagamento
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Criar payment method
      const { paymentMethod, error: paymentMethodError } =
        await stripe.createPaymentMethod({
          elements,
          params: {
            billing_details: {
              name,
              email,
            },
          },
        });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Criar assinatura no backend
      const {
        success,
        client_secret,
        error: apiError,
      } = await createSubscription({
        user_id: userId || "",
        plan_id: planId || "",
        price_id: planPriceId,
        customer_email: email,
        customer_name: name,
        payment_method_id: paymentMethod.id,
      });

      if (!success) {
        throw new Error(apiError || "Erro ao criar assinatura");
      }

      // Se houver client_secret, confirmar o pagamento
      if (client_secret) {
        const { error: confirmError } = await stripe.confirmPayment({
          clientSecret: client_secret,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
          },
        });

        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      setSuccess(true);
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        } else {
          onClose();
        }
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Erro ao processar pagamento");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="stripe-success">
        <div className="stripe-success-icon">✓</div>
        <h3>Assinatura Confirmada!</h3>
        <p>
          Parabéns! Sua assinatura do plano {planName} foi confirmada com
          sucesso.
        </p>
        <p>Você receberá um email de confirmação em breve.</p>
      </div>
    );
  }

  return (
    <div className="stripe-checkout-form">
      <div className="stripe-payment-method-toggle">
        <button
          type="button"
          className={`stripe-toggle-btn ${
            paymentMethod === "checkout" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("checkout")}
        >
          Checkout Rápido
        </button>
        <button
          type="button"
          className={`stripe-toggle-btn ${
            paymentMethod === "elements" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("elements")}
        >
          Formulário Personalizado
        </button>
      </div>

      {paymentMethod === "checkout" ? (
        <div className="stripe-checkout-method">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckoutSession();
            }}
          >
            <div className="stripe-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="stripe-form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome completo"
              />
            </div>

            {error && <div className="stripe-error">{error}</div>}

            <button
              type="submit"
              className="stripe-submit-button"
              disabled={isLoading || !email || !name}
            >
              {isLoading ? "Processando..." : `Assinar por R$ ${planPrice}/mês`}
            </button>
          </form>

          <p className="stripe-checkout-info">
            Você será redirecionado para uma página segura do Stripe para
            finalizar o pagamento.
          </p>
        </div>
      ) : (
        <div className="stripe-elements-method">
          <form onSubmit={handleElementsSubmit}>
            <div className="stripe-form-group">
              <label htmlFor="email-elements">Email</label>
              <input
                type="email"
                id="email-elements"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="stripe-form-group">
              <label htmlFor="name-elements">Nome Completo</label>
              <input
                type="text"
                id="name-elements"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="stripe-form-group">
              <label>Informações de Pagamento</label>
              <PaymentElement />
            </div>

            <div className="stripe-form-group">
              <label>Endereço de Cobrança</label>
              <AddressElement options={{ mode: "billing" }} />
            </div>

            {error && <div className="stripe-error">{error}</div>}

            <button
              type="submit"
              className="stripe-submit-button"
              disabled={isLoading || !stripe || !elements || !email || !name}
            >
              {isLoading ? "Processando..." : `Assinar por R$ ${planPrice}/mês`}
            </button>
          </form>
        </div>
      )}

      <div className="stripe-terms">
        <p>
          Ao continuar, você concorda com nossos{" "}
          <a href="/terms" target="_blank">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="/privacy" target="_blank">
            Política de Privacidade
          </a>
          .
        </p>
        <p>
          Sua assinatura será renovada automaticamente. Você pode cancelar a
          qualquer momento.
        </p>
      </div>
    </div>
  );
};

export default StripeCheckoutForm;
