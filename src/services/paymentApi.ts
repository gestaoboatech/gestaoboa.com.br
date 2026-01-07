import axios from "axios";

declare global {
  interface Window {
    // @ts-ignore
    mercadoPagoInstance?: any;
  }
}

// Interface para o token de cartão do Mercado Pago
export interface CardTokenData {
  cardNumber: string;
  cardholderName: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

// Interface para o pagamento
export interface PaymentData {
  token: string;
  email: string;
  planName: string;
  planPrice: string;
  installments: number;
  paymentMethodId: string;
  description: string;
  document: string;
}

// URL do backend da aplicação
const BASE_URL = "https://escalefacil.shop";

/**
 * Função para processar pagamento com Mercado Pago
 * Esta função envia a requisição para o backend que irá se comunicar com o Mercado Pago
 */
export async function processPayment(paymentData: PaymentData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/payments/process`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.error(
      "Erro ao processar pagamento:",
      axiosError.response?.data ?? axiosError
    );
    return {
      error: true,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Erro ao processar pagamento",
    };
  }
}

interface CardTokenParams {
  cardNumber: string;
  cardholderName: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

/**
 * Função para criar um token de cartão usando o SDK do Mercado Pago
 * Esta função deve ser chamada no frontend antes de enviar o pagamento para o backend
 */
export const createCardToken = async (
  cardData: CardTokenParams
): Promise<string> => {
  try {
    if (!window.mercadoPagoInstance) {
      throw new Error("MercadoPago instance not initialized");
    }

    const tokenResponse = await window.mercadoPagoInstance.createCardToken({
      cardNumber: cardData.cardNumber,
      cardholderName: cardData.cardholderName,
      cardExpirationMonth: cardData.cardExpirationMonth,
      cardExpirationYear: cardData.cardExpirationYear,
      securityCode: cardData.securityCode,
      identificationType: cardData.identificationType,
      identificationNumber: cardData.identificationNumber,
    });

    if (tokenResponse.error) {
      throw new Error(
        tokenResponse.error.message || "Erro ao criar token do cartão"
      );
    }

    return tokenResponse.id;
  } catch (error) {
    console.error("Erro ao criar token do cartão:", error);
    throw error;
  }
};

/**
 * Função para obter os métodos de pagamento disponíveis
 * Útil para exibir as opções de parcelamento e bandeiras aceitas
 */
export async function getPaymentMethods() {
  if (!window.mercadoPagoInstance) {
    throw new Error("Instância do Mercado Pago não inicializada");
  }

  try {
    const paymentMethods = await window.mercadoPagoInstance.getPaymentMethods();
    return paymentMethods;
  } catch (error) {
    console.error("Erro ao obter métodos de pagamento:", error);
    throw error;
  }
}

/**
 * Função para identificar a bandeira do cartão baseada no número
 * @param cardNumber Número do cartão
 * @returns Identificador da bandeira ou null se não identificada
 */
export const identifyCardBrand = (cardNumber: string): string | null => {
  const cleanNumber = cardNumber.replace(/\s/g, "");

  if (!cleanNumber) return null;

  // Visa
  if (/^4/.test(cleanNumber)) {
    return "visa";
  }

  // Mastercard
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return "master";
  }

  // American Express
  if (/^3[47]/.test(cleanNumber)) {
    return "amex";
  }

  // Elo
  if (
    /^(4011|4312|4389|4514|4573|5041|5066|5067|6277|6362|6363|6504|6505|6516|6550)/.test(
      cleanNumber
    )
  ) {
    return "elo";
  }

  // Hipercard
  if (/^(606282|637095|637568|637599|637609|637612)/.test(cleanNumber)) {
    return "hipercard";
  }

  return null;
};
