declare global {
  interface Window {
    MercadoPago: any;
    // @ts-ignore
    mercadoPagoInstance: any;
  }
}

import React, { useEffect, useState } from "react";
import { MercadoPagoConfig } from "../../../services/mercadoPagoConfig";
import {
  createCardToken,
  identifyCardBrand,
} from "../../../services/paymentApi";
import {
  getCurrentUserId,
  getPlanIdByName,
  processPaymentBackend,
} from "../../../services/paymentService";
import "./PaymentForm.css";
import StripePaymentForm from "./StripePaymentForm";

interface PaymentFormProps {
  planName: string;
  planPrice: string;
  planPriceId?: string; // Stripe Price ID
  onClose: () => void;
  onPaymentSuccess?: () => void;
  userEmail?: string; // Adicionado email do usuário
  userDocument?: string; // Adicionado CPF do usuário
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  planName,
  planPrice,
  planPriceId,
  onClose,
  onPaymentSuccess,
  userEmail, // Recebendo email
  userDocument, // Recebendo CPF
}) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    email: userEmail ?? "", // Preenchendo email
    documentNumber: userDocument ?? "", // Preenchendo CPF
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const naotapronto = false
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<
    "mercadopago" | "stripe" | "selection"
  >("selection");

  // Carregar o SDK do Mercado Pago
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;

    script.onload = () => {
      // Inicializar o SDK do Mercado Pago
      if (window.MercadoPago) {
        const mp = new window.MercadoPago(MercadoPagoConfig.publicKey, {
          locale: "pt-BR",
        });

        // Salvar a instância do MP para uso posterior na submissão do pagamento
        window.mercadoPagoInstance = mp;
      }
      setSdkLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Formatação específica para alguns campos
    if (name === "cardNumber") {
      // Formatar apenas números e adicionar espaços a cada 4 dígitos
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({ ...formData, [name]: formatted.slice(0, 19) });
    } else if (name === "expiryDate") {
      // Formatar MM/AA
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 2) {
        setFormData({ ...formData, [name]: cleaned });
      } else {
        setFormData({
          ...formData,
          [name]: `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`,
        });
      }
    } else if (name === "cvv") {
      // Limitar a 4 dígitos
      setFormData({
        ...formData,
        [name]: value.replace(/\D/g, "").slice(0, 4),
      });
    } else if (name === "documentNumber") {
      // Formatar CPF: 000.000.000-00
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 11) {
        let formatted = cleaned;
        if (cleaned.length > 3) {
          formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
        }
        if (cleaned.length > 6) {
          formatted = `${formatted.slice(0, 7)}.${formatted.slice(7)}`;
        }
        if (cleaned.length > 9) {
          formatted = `${formatted.slice(0, 11)}-${formatted.slice(11)}`;
        }
        setFormData({ ...formData, [name]: formatted });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!sdkLoaded) {
        throw new Error("SDK do Mercado Pago ainda não foi carregado");
      }

      if (!window.mercadoPagoInstance) {
        throw new Error("Instância do Mercado Pago não inicializada");
      }

      // Validações básicas
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        throw new Error("Por favor, preencha todos os campos do cartão");
      }

      if (!formData.email || !formData.documentNumber) {
        throw new Error("Por favor, preencha email e CPF");
      }

      // 1. Criar o token do cartão usando o SDK do Mercado Pago
      const cardToken = await createCardToken({
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        cardholderName: formData.cardholderName,
        cardExpirationMonth: formData.expiryDate.split("/")[0],
        cardExpirationYear: `20${formData.expiryDate.split("/")[1]}`,
        securityCode: formData.cvv,
        identificationType: "CPF",
        identificationNumber: formData.documentNumber.replace(/\D/g, ""),
      });

      // Obter dados necessários para o pagamento
      const userId = getCurrentUserId();
      const planId = getPlanIdByName(planName);
      const amount = parseFloat(
        planPrice.replace(/[^\d,]/g, "").replace(",", ".")
      );

      if (!userId) {
        throw new Error("Usuário não autenticado. Faça login para continuar.");
      }

      // 2. Enviar o token para o backend processar o pagamento
      const paymentResponse = await processPaymentBackend({
        user_id: userId,
        plan_id: planId,
        amount: amount,
        email: formData.email,
        card_token: cardToken,
      });

      if (paymentResponse.error) {
        throw new Error(paymentResponse.error || "Erro ao processar pagamento");
      }

      setLoading(false);
      setSuccess(true);

      // Mostrar mensagem de sucesso e depois prosseguir
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        } else {
          onClose();
        }
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "Erro ao processar pagamento"
      );
      console.error("Erro no processamento do pagamento:", err);
    }
  };
  const getCardBrand = (number: string) => {
    return identifyCardBrand(number) || "unknown";
  };
  return (
    <div className="payment-form-overlay">
      <div className="payment-form-container">
        <button className="payment-form-close" onClick={onClose}>
          ×
        </button>

        <h2>Assinatura do Plano {planName}</h2>
        <p className="payment-form-price">Valor: R$ {planPrice}/mês</p>

        {success ? (
          <div className="payment-success">
            <div className="checkmark">✓</div>
            <h3>Pagamento Confirmado!</h3>
            <p>
              Obrigado pela sua assinatura. Você receberá um email em breve com
              mais instruções.
            </p>
          </div>
        ) : naotapronto ? (
          <div className="payment-not-ready">
            <h3>Pagamento não disponível</h3>
            <p>
              O pagamento automático ainda não está pronto. Por favor, chame
              nosso whatsApp.
            </p>
            <button
              className="payment-not-ready-button"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=5553999461550",
                  "_blank"
                )
              }
            >
              Entrar em contato via WhatsApp
            </button>
          </div>
        ) : showStripeForm ? (
          <StripePaymentForm
            planName={planName}
            planPrice={planPrice}
            planPriceId={planPriceId || ""}
            userEmail={formData.email}
            userName={formData.cardholderName}
            onClose={onClose}
            onPaymentSuccess={onPaymentSuccess}
          />
        ) : paymentProvider ? (
          <div className="payment-provider-selection">
            <h3>Escolha seu método de pagamento</h3>
            <div className="payment-providers">
              <button
                className={`payment-provider-btn ${
                  paymentProvider === "stripe" ? "active" : ""
                }`}
                onClick={() => setPaymentProvider("stripe")}
              >
                <div className="provider-icon">💳</div>
                <div className="provider-info">
                  <h4>Stripe</h4>
                  <p>Cartão de crédito internacional</p>
                </div>
              </button>

              <button
                className={`payment-provider-btn ${
                  paymentProvider === "mercadopago" ? "active" : ""
                }`}
                onClick={() => setPaymentProvider("mercadopago")}
              >
                <div className="provider-icon">🏦</div>
                <div className="provider-info">
                  <h4>Mercado Pago</h4>
                  <p>PIX, Cartão e Boleto</p>
                </div>
              </button>
            </div>

            <button
              className="payment-continue-btn"
              onClick={() => {
                if (paymentProvider === "stripe") {
                  setShowStripeForm(true);
                } else {
                  setPaymentProvider("mercadopago");
                }
              }}
            >
              Continuar com{" "}
              {paymentProvider === "stripe" ? "Stripe" : "Mercado Pago"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="documentNumber">CPF</label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                placeholder="000.000.000-00"
                value={formData.documentNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Número do Cartão</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="expiryDate">Validade</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group half">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="000"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardholderName">Nome no Cartão</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                placeholder="Como está no cartão"
                value={formData.cardholderName}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="payment-error">{error}</div>}

            <button
              type="submit"
              className="payment-submit-button"
              disabled={loading}
            >
              {loading ? "Processando..." : "Confirmar Pagamento"}
            </button>

            <div className="payment-secure-info">
              <span className="lock-icon">🔒</span>
              Pagamento seguro processado pelo Mercado Pago
            </div>
          </form>
        )}

        {!showStripeForm && (
          <div className="credit-card-mockup">
            <div className="card-chip"></div>
            <div className="card-logo">
              {getCardBrand(formData.cardNumber) === "visa" && "VISA"}
              {getCardBrand(formData.cardNumber) === "master" && "MC"}
              {getCardBrand(formData.cardNumber) === "amex" && "AMEX"}
              {getCardBrand(formData.cardNumber) === "elo" && "ELO"}
              {getCardBrand(formData.cardNumber) === "hipercard" && "HIPERCARD"}
            </div>
            <div className="card-number">
              {formData.cardNumber || "#### #### #### ####"}
            </div>
            <div className="card-footer">
              <div className="card-holder-name">
                {formData.cardholderName || "NOME DO TITULAR"}
              </div>
              <div className="card-expiry">
                {formData.expiryDate || "MM/AA"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
