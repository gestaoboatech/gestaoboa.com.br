import axios from "axios";
import { PaymentData } from "./paymentApi";

// URL do backend da aplicação
const BASE_URL = "https://api.gestaoboa.com.br";

/**
 * Interface para a resposta de pagamento do backend
 */
export interface PaymentResponse {
  id: string;
  status: string;
  status_detail: string;
  date_created: string;
  date_approved?: string;
  payment_method_id: string;
  payment_type_id: string;
  transaction_amount: number;
  installments: number;
  description: string;
  error?: boolean;
  message?: string;
}

/**
 * Função para enviar dados de pagamento para o backend processar
 * @param token Token de autenticação do usuário
 * @param paymentData Dados do pagamento
 */
export async function processPaymentBackend(
  token: string | null,
  paymentData: PaymentData
): Promise<PaymentResponse> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Adicionar token de autenticação ao cabeçalho se fornecido
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.post(
      `${BASE_URL}/payments/process`,
      paymentData,
      { headers }
    );

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.error(
      "Erro ao processar pagamento:",
      axiosError.response?.data ?? axiosError
    );

    return {
      id: "",
      status: "error",
      status_detail:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Erro desconhecido",
      date_created: new Date().toISOString(),
      payment_method_id: "",
      payment_type_id: "",
      transaction_amount: 0,
      installments: 0,
      description: "",
      error: true,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Erro ao processar pagamento",
    };
  }
}

/**
 * Função para verificar o status de um pagamento
 * @param paymentId ID do pagamento
 * @param token Token de autenticação
 */
export async function checkPaymentStatus(
  paymentId: string,
  token: string
): Promise<PaymentResponse> {
  try {
    const response = await axios.get(`${BASE_URL}/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.error(
      "Erro ao verificar status do pagamento:",
      axiosError.response?.data ?? axiosError
    );

    return {
      id: paymentId,
      status: "error",
      status_detail:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Erro ao verificar status",
      date_created: new Date().toISOString(),
      payment_method_id: "",
      payment_type_id: "",
      transaction_amount: 0,
      installments: 0,
      description: "",
      error: true,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Erro ao verificar status do pagamento",
    };
  }
}
