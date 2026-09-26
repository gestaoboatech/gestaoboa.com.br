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
    },
  };



  const endpoint = user.skip_verification
    ? `${BASE_URL}/users/?skip_verification=true&cupom=${encodeURIComponent(user.cupom || "SUPREMACY10")}`
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

export interface CompanyCreationData {
  name: string;
  scale: number;
  category: number;
  image: string;
}

export async function getEnterpriseBranches(): Promise<EnterpriseBranch[]> {
  try {
    const response = await axios.get(`${BASE_URL}/enterprises/branches`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as any;
    console.log(axiosError.response?.data ?? axiosError);
    throw new Error(
      axiosError.response?.data?.message ?? "Erro ao carregar categorias"
    );
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
