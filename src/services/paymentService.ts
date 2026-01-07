interface PaymentRequest {
  user_id: string;
  plan_id: string;
  amount: number;
  email: string;
  card_token: string;
}

interface PaymentResponse {
  message?: string;
  data?: {
    payment_id: string;
    status: string;
    user_id: string;
    plan_id: string;
  };
  error?: string;
}

const API_BASE_URL = "https://api.gestaoboa.com.br";

export const processPaymentBackend = async (
  paymentData: PaymentRequest
): Promise<PaymentResponse> => {
  try {
    const token = localStorage.getItem("authToken"); // Assumindo que você armazena o token JWT

    const response = await fetch(`${API_BASE_URL}/users/process-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao processar pagamento");
    }

    return result;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
};

// Função para mapear planos para IDs (você pode ajustar conforme sua estrutura)
export const getPlanIdByName = (planName: string): string => {
  const planMapping: { [key: string]: string } = {
    Básico: "1",
    Premium: "2",
    Enterprise: "3",
    Starter: "1",
    Pro: "2",
    Business: "3",
  };

  return planMapping[planName] || "1";
};

// Função para obter o user_id do usuário logado
export const getCurrentUserId = (): string => {
  try {
    // Implementar conforme sua lógica de autenticação
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      return user.id || user.user_id || "";
    }

    // Se não tiver userData, retorna um ID temporário para teste
    return "temp_user_" + Date.now();
  } catch (error) {
    console.error("Erro ao obter ID do usuário:", error);
    return "temp_user_" + Date.now();
  }
};
