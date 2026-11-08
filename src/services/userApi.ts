import axios from "axios";

// Use the same base URL as the app
const BASE_URL = "https://api.gestaoboa.com.br";
// const BASE_URL = "http://localhost:8080";
// ||
// process.env.BASE_URL

export interface UserRegistrationData {
  name: string;
  surname: string;
  document: string;
  password: string;
  birthday: string;
  phone: string;
  gender: string;
  email?: string;
  cep?: string;
  address?: string;
  address_number?: string;
  city?: string;
  district?: string;
  send_email: boolean;
  skip_verification?: boolean;
  cupom?: string;
}

export async function registerUser(user: UserRegistrationData) {
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("surname", user.surname);
  formData.append("document", user.document);
  formData.append("password", user.password);
  formData.append("birthday", user.birthday);
  formData.append("phone", user.phone);
  if (user.email) {
    formData.append("email", user.email);
  }
  formData.append("gender", user.gender);
  formData.append("cep", user.cep ?? "");
  formData.append("address", user.address ?? "");
  formData.append("address_number", user.address_number ?? "");
  formData.append("city", user.city ?? "");
  formData.append("district", user.district ?? "");
  formData.append("send_email", user.send_email ? "true" : "false");

  if (user.skip_verification) {
    formData.append("skip_verification", "true");
    formData.append("activated", "true");
  }
  if (user.cupom) {
    formData.append("cupom", user.cupom);
  }

  const requestConfig: any = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      ...(user.skip_verification ? { "X-Skip-Verification": "true" } : {}),
    },
  };

  const endpoint = user.skip_verification
    ? `${BASE_URL}/users/?skip_verification=true${user.cupom ? `&cupom=${encodeURIComponent(user.cupom)}` : ""}`
    : `${BASE_URL}/users/`;

  try {
    const response = await axios.post(
      endpoint,
      formData,
      requestConfig
    );
    console.log("registerUser: response.data", response.data);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.log(axiosError.response?.data ?? axiosError);
    return { error: axiosError.response?.data ?? axiosError.message };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log("Tentando fazer login com:", email);
    const response = await axios.post(`${BASE_URL}/auth/`, {
      email: email,
      password: password,
    });
    console.log("Resposta do login:", response.data);

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.log(
      "Erro no login:",
      axiosError.response?.data ?? axiosError.message
    );
    return { error: axiosError.response?.data ?? axiosError.message };
  }
}

export async function loginUserWithPhone(phone: string, password: string) {
  try {
    console.log("Tentando fazer login com telefone:", phone);
    const response = await axios.post(`${BASE_URL}/auth/`, {
      phone: phone.replace(/\D/g, ""),
      password: password,
    });
    console.log("Resposta do login:", response.data);

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.log(
      "Erro no login:",
      axiosError.response?.data ?? axiosError.message
    );
    return { error: axiosError.response?.data ?? axiosError.message };
  }
}

export async function verifyPhoneCode(phone: string, code: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-phone`, {
      phone: phone.replace(/\D/g, ""),
      code,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    return { error: axiosError.response?.data ?? axiosError.message };
  }
}

export async function resendPhoneCode(phone: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend-code`, {
      phone: phone.replace(/\D/g, ""),
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    return { error: axiosError.response?.data ?? axiosError.message };
  }
}

export async function resendEmail(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend/activation`, {
      email,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.log(axiosError.response?.data ?? axiosError);
    return { error: axiosError.response?.data ?? axiosError.message };
  }
}

export interface EnterpriseBranch {
  id: number;
  name: string;
}

const ALLOWED_BRANCH_ORDER = [
  "barbearia",
  "cabeleireiro",
  "salao de beleza",
  "manicure e pedicure",
  "outros",
];

const normalizeBranchName = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const DEFAULT_ENTERPRISE_BRANCHES: EnterpriseBranch[] = [
  { id: 9, name: "Barbearia" },
  { id: 5, name: "Cabeleireiro" },
  { id: 2, name: "Salão de beleza" },
  { id: 3, name: "Manicure e pedicure" },
  { id: 8, name: "Outros" },
];

export interface CompanyCreationData {
  name: string;
  scale: number;
  category: number;
  image: string;
}

export async function getEnterpriseBranches(): Promise<EnterpriseBranch[]> {
  try {
    const response = await axios.get(`${BASE_URL}/enterprises/branches`);
    if (Array.isArray(response.data)) {
      const filtered = response.data
        .filter((branch: EnterpriseBranch) =>
          ALLOWED_BRANCH_ORDER.includes(normalizeBranchName(branch.name || ""))
        )
        .sort((a: EnterpriseBranch, b: EnterpriseBranch) => {
          const indexA = ALLOWED_BRANCH_ORDER.indexOf(
            normalizeBranchName(a.name || "")
          );
          const indexB = ALLOWED_BRANCH_ORDER.indexOf(
            normalizeBranchName(b.name || "")
          );
          return indexA - indexB;
        });

      if (filtered.length > 0) {
        return filtered;
      }
    }
    return DEFAULT_ENTERPRISE_BRANCHES;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.log(axiosError.response?.data ?? axiosError);
    return DEFAULT_ENTERPRISE_BRANCHES;
  }
}

interface CreateCompanyData {
  name: string;
  id_scale: number;
  branches: Array<number>;
  image: string;
  discount_code?: string;
}

export const createCompany = async (
  token: string,
  companyData: CreateCompanyData
) => {
  try {
    const response = await fetch(`${BASE_URL}/enterprises/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(companyData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || result.message || "Erro ao criar empresa"
      );
    }

    return result;
  } catch (error) {
    console.error("Erro na criação da empresa:", error);
    throw error;
  }
};

export interface InfluencerData {
  name: string;
  surname: string;
  phone?: string;
  pix_key?: string;
  discount_code: string;
}

export const createInfluencer = async (data: InfluencerData) => {
  try {
    const response = await fetch(`${BASE_URL}/influencers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || "Erro ao criar influenciador");
    }

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const validateDiscountCode = async (code: string) => {
  try {
    const response = await fetch(`${BASE_URL}/influencers/code/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || "Cupom inválido");
    }

    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

export interface CreateServiceData {
  name: string;
  duration_minutes: number;
  sale_price: number;
  cost_price?: number;
  id_enterprise?: number;
  service_type?: string;
  show_on_booking?: boolean;
}

export const createService = async (
  token: string,
  serviceData: CreateServiceData
) => {
  try {
    const response = await fetch(`${BASE_URL}/services/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: serviceData.name.trim(),
        duration_minutes: Math.max(5, Number(serviceData.duration_minutes) || 30),
        sale_price: Math.max(0.01, Number(serviceData.sale_price) || 1),
        cost_price: Number(serviceData.cost_price) || 0,
        id_enterprise: serviceData.id_enterprise,
        service_type: serviceData.service_type || "standard",
        show_on_booking: serviceData.show_on_booking ?? true,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || result.message || "Erro ao criar serviço"
      );
    }

    return result;
  } catch (error) {
    console.error("Erro na criação do serviço:", error);
    throw error;
  }
};

export interface EmployeeCreationData {
  enterprise_id: number;
  name: string;
  phone: string;
  password?: string;
  commission: number;
  email?: string;
}

export const createEmployee = async (token: string, data: EmployeeCreationData) => {
  const cleanPhone = data.phone.replace(/\D/g, "");
  const parts = data.name.trim().split(/\s+/);
  const firstName = parts[0] || "Profissional";
  const lastName = parts.slice(1).join(" ") || " ";
  const emailToUse = data.email?.trim() || `${cleanPhone || Date.now()}@gestaoboa.app`;
  const passwordToUse = data.password?.trim() || "123456";

  const response = await fetch(`${BASE_URL}/employees/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      enterprise_id: data.enterprise_id,
      name: firstName,
      surname: lastName,
      email: emailToUse,
      password: passwordToUse,
      phone: cleanPhone || undefined,
      commission: Number(data.commission) || 0,
      wage: 0,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || result.message || "Erro ao adicionar profissional");
  }
  return result;
};

export const createOwnerProfessional = async (token: string, enterprise_id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/enterprises/${enterprise_id}/owner-professional`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.warn("Owner professional already created or error:", err);
    return null;
  }
};

export interface ShiftCreationData {
  enterprise_id: number;
  day_id: number;
  user_id: number;
  start_time: string; // e.g. "09:00"
  end_time: string;   // e.g. "20:00"
  works_at_lunch?: boolean;
}

export const createEnterpriseShift = async (token: string, shiftData: ShiftCreationData) => {
  try {
    const startIso = `2026-01-01T${shiftData.start_time}:00Z`;
    const endIso = `2026-01-01T${shiftData.end_time}:00Z`;

    const response = await fetch(`${BASE_URL}/enterprises/${shiftData.enterprise_id}/shifts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_enterprise: shiftData.enterprise_id,
        id_day: shiftData.day_id,
        id_user: shiftData.user_id,
        turn_start_hour: startIso,
        turn_end_hour: endIso,
        works_at_lunch: shiftData.works_at_lunch ?? true,
      }),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.warn("Aviso ao salvar turno:", err);
    return null;
  }
};


