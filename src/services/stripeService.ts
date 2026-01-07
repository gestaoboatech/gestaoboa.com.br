import axios from "axios";

const API_BASE_URL = "https://api.gestaoboa.com.br";

export interface StripeSubscriptionData {
  user_id: string;
  plan_id: string;
  price_id: string; // Stripe Price ID
  customer_email: string;
  customer_name: string;
  payment_method_id?: string;
  trial_days?: number;
}

export interface StripePaymentIntentData {
  amount: number;
  currency: string;
  customer_email: string;
  description: string;
  payment_method_id?: string;
}

export interface CreateCheckoutSessionData {
  price_id: string;
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  customer_name?: string;
  trial_days?: number;
  user_id?: string;
  plan_id?: string;
}

export interface StripeResponse {
  success: boolean;
  data?: any;
  error?: string;
  client_secret?: string;
  session_id?: string;
  subscription_id?: string;
}

/**
 * Cria uma sessão de checkout do Stripe para assinatura
 */
export const createCheckoutSession = async (
  data: CreateCheckoutSessionData
): Promise<StripeResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${API_BASE_URL}/stripe/create-checkout-session`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar sessão de checkout:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Erro ao criar sessão de checkout",
    };
  }
};

/**
 * Cria uma assinatura recorrente via Stripe
 */
export const createSubscription = async (
  data: StripeSubscriptionData
): Promise<StripeResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${API_BASE_URL}/stripe/create-subscription`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar assinatura:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Erro ao criar assinatura",
    };
  }
};

/**
 * Cria um Payment Intent para pagamento único
 */
export const createPaymentIntent = async (
  data: StripePaymentIntentData
): Promise<StripeResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${API_BASE_URL}/stripe/create-payment-intent`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar payment intent:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Erro ao criar payment intent",
    };
  }
};

/**
 * Cancela uma assinatura
 */
export const cancelSubscription = async (
  subscriptionId: string
): Promise<StripeResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${API_BASE_URL}/stripe/cancel-subscription`,
      { subscription_id: subscriptionId },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao cancelar assinatura:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Erro ao cancelar assinatura",
    };
  }
};

/**
 * Busca o status da assinatura
 */
export const getSubscriptionStatus = async (
  subscriptionId: string
): Promise<StripeResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(
      `${API_BASE_URL}/stripe/subscription/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar status da assinatura:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || "Erro ao buscar status da assinatura",
    };
  }
};

/**
 * Atualiza método de pagamento da assinatura
 */
export const updatePaymentMethod = async (
  subscriptionId: string,
  paymentMethodId: string
): Promise<StripeResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.put(
      `${API_BASE_URL}/stripe/update-payment-method`,
      {
        subscription_id: subscriptionId,
        payment_method_id: paymentMethodId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar método de pagamento:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || "Erro ao atualizar método de pagamento",
    };
  }
};
