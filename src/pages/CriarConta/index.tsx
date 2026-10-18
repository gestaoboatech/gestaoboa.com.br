import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  loginUser,
  loginUserWithPhone,
  registerUser,
  verifyPhoneCode,
  resendPhoneCode,
  createCompany,
  createService,
  EnterpriseBranch,
  getEnterpriseBranches,
  DEFAULT_ENTERPRISE_BRANCHES,
} from "../../services/userApi";
import { FB_PIXEL } from "../../utils/pixel";
import "./styles.css";

interface PresetServiceItem {
  id: string;
  name: string;
  price: string;
  duration: number;
  selected: boolean;
}

const DEFAULT_PRESET_SERVICES: PresetServiceItem[] = [
  { id: "cabelo", name: "Cabelo", price: "35,00", duration: 30, selected: true },
  { id: "barba", name: "Barba", price: "25,00", duration: 30, selected: true },
  { id: "cabelo-barba", name: "Cabelo + Barba", price: "55,00", duration: 30, selected: true },
  { id: "sobrancelha", name: "Sobrancelha", price: "15,00", duration: 30, selected: true },
  { id: "corte-tesoura", name: "Corte na tesoura", price: "40,00", duration: 30, selected: true },
  { id: "degrade", name: "Degradê", price: "40,00", duration: 30, selected: true },
];

// Google Ads Conversion Tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function gtag_report_conversion(url?: string) {
  const callback = function () {
    if (typeof (url) != 'undefined') {
      window.location.href = url;
    }
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17761069351/6u6iCL3zj8gbEKfSkZVC',
      'event_callback': callback
    });
  }

  return false;
}

const IOS_APP_URL = "https://apps.apple.com/br/app/gest%C3%A3o-boa/id6741593872";
const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.beasier";

const GooglePlayIcon: React.FC<{ width?: string | number; height?: string | number }> = ({
  width = 18,
  height = 18,
}) => (
  <svg
    viewBox="0 0 512 512"
    width={width}
    height={height}
    style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
  >
    <path
      fill="#4285F4"
      d="M47.7 24.3C45.3 26.9 44 31 44 36.3v439.4c0 5.3 1.3 9.4 3.7 12l1.4 1.3L273.8 264.3v-5.6L49.1 23l-1.4 1.3z"
    />
    <path
      fill="#FBBC04"
      d="M348.6 339.2l-74.8-74.9v-5.6l74.8-74.9 1.7 1 88.6 50.3c25.3 14.4 25.3 37.9 0 52.3l-88.6 50.8-1.7 1z"
    />
    <path
      fill="#EA4335"
      d="M350.3 338.2L273.8 261.7 47.7 487.8c8.3 8.8 22.1 9.9 37.7 1l264.9-150.6z"
    />
    <path
      fill="#34A853"
      d="M350.3 173.8L85.4 23.2C69.8 14.3 56 15.4 47.7 24.2l226.1 226.1 76.5-76.5z"
    />
  </svg>
);


const AppleIcon: React.FC<{ width?: string | number; height?: string | number }> = ({
  width = 18,
  height = 18,
}) => (
  <svg
    viewBox="0 0 170 170"
    width={width}
    height={height}
    fill="currentColor"
    style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
  >
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.66-7.85-11.87-14.32-6.53-10.01-11.66-20.93-15.38-32.77-3.72-11.84-5.58-23.08-5.58-33.72 0-14.57 3.59-26.68 10.77-36.33 7.18-9.65 16.32-14.61 27.42-14.88 4.69 0 10.03 1.25 16.02 3.75 5.99 2.5 9.68 3.81 11.07 3.93 1.74-.23 5.67-1.63 11.78-4.22 6.11-2.58 11.51-3.79 16.19-3.63 12.3.66 22.09 5.34 29.37 14.06-10.68 6.42-15.91 15.24-15.71 26.47.2 8.71 3.59 16.08 10.18 22.11 6.59 6.03 14.37 9.53 23.33 10.5-2.4 7.41-5.34 14.73-8.83 21.96zM119.22 33.74c0-7.3 2.66-14.18 7.99-20.64 5.33-6.46 11.88-10.74 19.64-12.85-.22 1.31-.44 2.62-.66 3.93-1.09 6.86-3.87 13.34-8.34 19.44-4.47 6.1-9.97 10.46-16.5 13.08-.66-1-1.32-1.98-1.99-2.96h-.14z" />
  </svg>
);

type PlanType = "basico" | "crescimento" | "empresarial" | "ilimitado" | "black-friday" | "supremacy10" | "alemdocorte";

const ASAAS_PLAN_LINKS = {
  "basico": "https://www.asaas.com/c/sjf0bqiql2cgglm2",
  "crescimento": "https://www.asaas.com/c/fodhi5rv7zos2blm",
  "empresarial": "https://www.asaas.com/c/2anme44rr5pvp8vq",
  "ilimitado": "https://www.asaas.com/c/isjsvgixp3bzyxmz",
};

const PLAN_CONFIG: Record<PlanType, {
  name: string;
  usersLimit: string;
  originalPrice: string;
  price: string;
  discountPriceVal: number;
  paymentLink: string;
  discount?: string;
}> = {
  "basico": {
    name: "Básico",
    usersLimit: "1 Profissional",
    originalPrice: "R$ 79,90/mês",
    price: "R$ 71,91/mês",
    discountPriceVal: 71.91,
    paymentLink: ASAAS_PLAN_LINKS["basico"],
    discount: "10% OFF",
  },
  "crescimento": {
    name: "Crescimento",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 99,90/mês",
    price: "R$ 89,91/mês",
    discountPriceVal: 89.91,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "10% OFF",
  },
  "empresarial": {
    name: "Empresarial",
    usersLimit: "4-6 Profissionais",
    originalPrice: "R$ 129,90/mês",
    price: "R$ 116,91/mês",
    discountPriceVal: 116.91,
    paymentLink: ASAAS_PLAN_LINKS["empresarial"],
    discount: "10% OFF",
  },
  "ilimitado": {
    name: "Ilimitado",
    usersLimit: "Profissionais Ilimitados",
    originalPrice: "R$ 179,90/mês",
    price: "R$ 161,91/mês",
    discountPriceVal: 161.91,
    paymentLink: ASAAS_PLAN_LINKS["ilimitado"],
    discount: "10% OFF",
  },
  "black-friday": {
    name: "Black Friday",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 535,00",
    price: "R$ 9,90",
    discountPriceVal: 9.90,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "98% OFF",
  },
  "supremacy10": {
    name: "Além do Corte",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 99,90/mês",
    price: "R$ 89,91/mês",
    discountPriceVal: 89.91,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "Exclusivo",
  },
  "alemdocorte": {
    name: "Além do Corte",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 99,90/mês",
    price: "R$ 89,91/mês",
    discountPriceVal: 89.91,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "Exclusivo",
  },
};

const SCALE_OPTIONS = [
  { id: 1, name: "MEI", description: "Microempreendedor Individual" },
  { id: 2, name: "ME", description: "Microempresa" },
  { id: 3, name: "Startup", description: "Empresa de tecnologia" },
  { id: 4, name: "Outro", description: "Outros tipos de empresa" },
];

const formatInitialPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  if (!cleaned) return "";
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  }
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

const CriarConta: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navState = (location.state as any) || {};
  const navigate = useNavigate();

  const planParam = (searchParams.get("plano") || navState.plan) as PlanType | null;
  const cupomParam = searchParams.get("cupom") || searchParams.get("desconto");
  const eventoParam = searchParams.get("evento") || searchParams.get("parceria") || searchParams.get("origem");
  const planoParam = searchParams.get("plano") || navState.plan;
  const parceriaParam = searchParams.get("parceria");
  const origemParam = searchParams.get("origem") || navState.origem;
  const refParam = searchParams.get("ref");

  // Dados pré-preenchidos de formulários externos (ex: /barbearia)
  const prefilledName = navState.name || searchParams.get("nome") || searchParams.get("name") || "";
  const prefilledSurname = navState.surname || searchParams.get("sobrenome") || searchParams.get("surname") || "";
  const prefilledEmail = navState.email || searchParams.get("email") || "";
  const rawPhone = navState.phone || searchParams.get("telefone") || searchParams.get("phone") || "";
  const prefilledCompany = navState.companyName || searchParams.get("empresa") || searchParams.get("barbearia") || "";
  const ramoParam = (navState.category || searchParams.get("ramo") || searchParams.get("segmento") || "").toLowerCase();
  const colaboradoresParam = navState.colaboradores || searchParams.get("colaboradores") || "";

  const isAlemDoCorte =
    cupomParam?.toUpperCase() === "ALEMDOCORTE" ||
    cupomParam?.toUpperCase() === "ALEM_DO_CORTE" ||
    cupomParam?.toUpperCase() === "ALEM-DO-CORTE" ||
    planoParam?.toUpperCase() === "ALEMDOCORTE" ||
    parceriaParam?.toUpperCase() === "ALEMDOCORTE" ||
    origemParam?.toUpperCase() === "ALEMDOCORTE" ||
    eventoParam?.toLowerCase() === "alemdocorte" ||
    eventoParam?.toLowerCase() === "alem-do-corte" ||
    eventoParam?.toLowerCase() === "alem_do_corte" ||
    searchParams.has("alemdocorte") ||
    searchParams.has("alem-do-corte") ||
    searchParams.has("alem_do_corte") ||
    refParam?.toUpperCase() === "ALEMDOCORTE" ||
    window.location.pathname.toLowerCase().includes("alemdocorte") ||
    window.location.pathname.toLowerCase().includes("alem-do-corte");

  const isSupremacyCupomParam =
    cupomParam?.toUpperCase() === "SUPREMACY10" ||
    cupomParam?.toUpperCase() === "SUPREMACY" ||
    planoParam?.toUpperCase() === "SUPREMACY10" ||
    parceriaParam?.toUpperCase() === "SUPREMACY10" ||
    origemParam?.toUpperCase() === "SUPREMACY10" ||
    eventoParam?.toLowerCase() === "supremacy" ||
    searchParams.has("supremacy") ||
    searchParams.has("supremacy10") ||
    refParam?.toUpperCase() === "SUPREMACY10" ||
    window.location.pathname.toLowerCase().includes("supremacy");

  const isSupremacy10 = isAlemDoCorte || isSupremacyCupomParam;
  const isSupremacy = isSupremacy10;

  const initialPlanKey: PlanType = isSupremacy10
    ? (planParam && PLAN_CONFIG[planParam] ? planParam : "alemdocorte")
    : (planParam && PLAN_CONFIG[planParam] ? planParam : "crescimento");

  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanType>(initialPlanKey);
  const plan = selectedPlanKey;
  const planConfig = PLAN_CONFIG[plan];

  const [currentStep, setCurrentStep] = useState(1);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [enterpriseToken, setEnterpriseToken] = useState<string | null>(null);
  const [createdEnterpriseId, setCreatedEnterpriseId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [servicesList, setServicesList] = useState<PresetServiceItem[]>(DEFAULT_PRESET_SERVICES);
  const [savingServicesText, setSavingServicesText] = useState("");

  const [formData, setFormData] = useState({
    name: prefilledName,
    surname: prefilledSurname,
    email: prefilledEmail,
    phone: formatInitialPhone(rawPhone),
    password: "",
    terms: true,
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [caretIndex, setCaretIndex] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  useEffect(() => {
    const rawCupom = searchParams.get("cupom") || searchParams.get("desconto");
    const isSupremacyCupom = rawCupom?.toUpperCase() === "SUPREMACY10" || rawCupom?.toUpperCase() === "SUPREMACY";

    if (isSupremacyCupom || searchParams.has("supremacy10") || searchParams.has("supremacy")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("supremacy10");
      newParams.delete("supremacy");
      newParams.delete("desconto");
      newParams.set("cupom", "ALEMDOCORTE");
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    }
  }, [searchParams, location.pathname, navigate]);

  useEffect(() => {
    FB_PIXEL.pageView();
    FB_PIXEL.trackCustomEvent("ViewCriarContaPage", {
      is_supremacy: isSupremacy10,
      plano: selectedPlanKey,
    });
  }, []);

  // Sincroniza dados pré-preenchidos se chegarem via navegação
  useEffect(() => {
    if (prefilledName || prefilledSurname || prefilledEmail || rawPhone) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || prefilledName,
        surname: prev.surname || prefilledSurname,
        email: prev.email || prefilledEmail,
        phone: prev.phone || formatInitialPhone(rawPhone),
      }));
    }
    if (prefilledCompany) {
      setCompanyName((prev: string) => prev || prefilledCompany);
    }
  }, [prefilledName, prefilledSurname, prefilledEmail, rawPhone, prefilledCompany]);

  useEffect(() => {
    if (currentStep === 2) {
      setTimeout(() => {
        codeInputRef.current?.focus();
      }, 100);
    }
  }, [currentStep]);

  // Determinar porte da empresa com base em colaboradores se fornecido (padrão MEI para facilitar)
  const initialScale = (() => {
    if (colaboradoresParam === "1") return SCALE_OPTIONS[0]; // MEI
    if (colaboradoresParam === "2-3" || colaboradoresParam === "4-6") return SCALE_OPTIONS[1]; // ME
    if (colaboradoresParam === "7+") return SCALE_OPTIONS[1]; // ME
    return SCALE_OPTIONS[0];
  })();

  // Company form states (com padrões inteligentes pré-selecionados para zero atrito)
  const [companyName, setCompanyName] = useState(prefilledCompany);
  const [discountCode, setDiscountCode] = useState(
    isSupremacy10 ? "ALEMDOCORTE" : cupomParam ? cupomParam.toUpperCase() : ""
  );

  useEffect(() => {
    if (isSupremacy10 && (!discountCode || discountCode === "SUPREMACY10")) {
      setDiscountCode("ALEMDOCORTE");
    }
  }, [isSupremacy10]);

  const [selectedCategory, setSelectedCategory] = useState<EnterpriseBranch | null>(
    DEFAULT_ENTERPRISE_BRANCHES[0]
  );
  const [selectedScale, setSelectedScale] = useState<typeof SCALE_OPTIONS[0] | null>(initialScale);
  const [categories, setCategories] = useState<EnterpriseBranch[]>(DEFAULT_ENTERPRISE_BRANCHES);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEnterpriseBranches();
        if (fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories);

          if (
            ramoParam === "salao" ||
            ramoParam === "salao-estetica" ||
            ramoParam === "estetica"
          ) {
            const salaoCat = fetchedCategories.find((c) =>
              c.name.toLowerCase().includes("salão") ||
              c.name.toLowerCase().includes("salao") ||
              c.name.toLowerCase().includes("estética") ||
              c.name.toLowerCase().includes("estetica")
            );
            if (salaoCat) {
              setSelectedCategory(salaoCat);
              return;
            }
          }

          const barbeariaCat = fetchedCategories.find((c) =>
            c.name.toLowerCase().includes("barbearia")
          );
          if (barbeariaCat) {
            setSelectedCategory(barbeariaCat);
          } else {
            setSelectedCategory(fetchedCategories[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (currentStep === 3) {
      fetchCategories();
    }
  }, [currentStep, isSupremacy10, ramoParam]);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (!cleaned) return "";
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    }
    if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (name === "terms" && checked) {
        setTermsError(false);
        if (error === "Você precisa aceitar os termos de uso para continuar.") {
          setError(null);
        }
      }
      return;
    }

    let formattedValue = value;
    if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    if (name === "email") {
      setEmailError(false);
      if (error === "Por favor, insira um e-mail válido.") {
        setError(null);
      }
    }

    if (name === "password") {
      if (value.length >= 6) {
        setPasswordError(false);
        if (error === "A senha deve ter pelo menos 6 caracteres.") {
          setError(null);
        }
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handlePasswordBlur = () => {
    if (formData.password.length > 0 && formData.password.length < 6) {
      setPasswordError(true);
    }
  };

  const handleEmailBlur = () => {
    if (isSupremacy10 && formData.email) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      setEmailError(!isValid);
    }
  };

  // Extrai nome e sobrenome de forma inteligente para nunca travar o usuário se ele digitar tudo no primeiro campo
  const getResolvedNameAndSurname = () => {
    const rawName = formData.name.trim();
    const rawSurname = formData.surname.trim();

    if (rawSurname) {
      return { firstName: rawName, lastName: rawSurname };
    }

    const parts = rawName.split(/\s+/);
    if (parts.length > 1) {
      return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
      };
    }

    return {
      firstName: rawName,
      lastName: " ",
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let hasError = false;
    const { firstName, lastName } = getResolvedNameAndSurname();

    if (isSupremacy10) {
      if (!firstName) {
        setError("Por favor, digite seu nome para continuar.");
        hasError = true;
      }

      const cleanEmail = formData.email.trim().toLowerCase();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

      if (!cleanEmail || !isValidEmail) {
        setEmailError(true);
        if (!hasError) {
          setError("Por favor, insira um e-mail válido.");
        }
        hasError = true;
      } else {
        setEmailError(false);
      }

      if (!formData.password || formData.password.length < 6) {
        setPasswordError(true);
        if (!hasError) {
          setError("A senha deve ter pelo menos 6 caracteres.");
        }
        hasError = true;
      } else {
        setPasswordError(false);
      }

      if (!formData.terms) {
        setTermsError(true);
        if (!hasError) {
          setError("Você precisa aceitar os termos de uso para continuar.");
        }
        hasError = true;
      } else {
        setTermsError(false);
      }

      if (hasError) return;

      setLoading(true);

      try {
        const userData = {
          name: firstName,
          surname: lastName,
          document: "",
          email: cleanEmail,
          password: formData.password,
          birthday: "",
          phone: formData.phone.replace(/\D/g, ""),
          gender: "",
          cep: "",
          address: "",
          address_number: "",
          city: "",
          district: "",
          send_email: false,
          skip_verification: true,
          cupom: discountCode || (isSupremacy10 ? "ALEMDOCORTE" : undefined),
        };

        const result = await registerUser(userData);
        if (result.error) {
          const errMsg = typeof result.error === "object" ? result.error.message : result.error;
          throw new Error(errMsg ?? "Erro ao registrar usuário");
        }

        FB_PIXEL.trackStartTrial({
          content_name: isSupremacy10 ? "Registro Além do Corte evento em Pelotas" : "Registro Criar Conta",
          plan: selectedPlanKey,
        });

        // Automatic login with email and password without any verification step
        const loginResult = await loginUser(cleanEmail, formData.password);
        if (loginResult.error) {
          const errMsg = typeof loginResult.error === "object" ? loginResult.error.message : loginResult.error;
          throw new Error(errMsg ?? "Erro ao realizar login");
        }

        setUserToken(loginResult.token);
        if (!companyName.trim() && firstName) {
          setCompanyName(`Barbearia ${firstName}`);
        }
        setCurrentStep(3);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao processar o registro"
        );
        console.error("Erro no registro do usuário:", err);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!firstName) {
      setError("Por favor, digite seu nome para continuar.");
      hasError = true;
    } else if (!formData.phone.replace(/\D/g, "") || formData.phone.replace(/\D/g, "").length < 10) {
      setError("Por favor, insira um celular válido com DDD.");
      hasError = true;
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError(true);
      if (!hasError) {
        setError("A senha deve ter pelo menos 6 caracteres.");
      }
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!formData.terms) {
      setTermsError(true);
      if (!hasError) {
        setError("Você precisa aceitar os termos de uso para continuar.");
      }
      hasError = true;
    } else {
      setTermsError(false);
    }

    if (hasError) return;

    setLoading(true);

    try {
      const userData = {
        name: firstName,
        surname: lastName,
        document: "",
        password: formData.password,
        birthday: "",
        phone: formData.phone.replace(/\D/g, ""),
        gender: "",
        cep: "",
        address: "",
        address_number: "",
        city: "",
        district: "",
        send_email: false,
      };

      const result = await registerUser(userData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao registrar usuário");
      }

      FB_PIXEL.trackLead({
        content_name: "Cadastro Criar Conta",
        plan: selectedPlanKey,
      });

      setCurrentStep(2);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar o registro"
      );
      console.error("Erro no registro do usuário:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await resendPhoneCode(formData.phone);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao reenviar o código");
      }

      setVerificationCode("");
      setCaretIndex(0);
      codeInputRef.current?.focus();
      alert("Código reenviado com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao reenviar o código");
      console.error("Erro ao reenviar o código:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (codeToVerify?: string) => {
    const code = codeToVerify || verificationCode;
    if (code.length < 6) {
      setError("Por favor, insira o código de 6 dígitos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await verifyPhoneCode(formData.phone, code);
      if (result.error) {
        throw new Error(result.error.message ?? "Código inválido");
      }

      handleCreateCompany();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao verificar código");
      console.error("Erro na verificação:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async () => {
    setLoading(true);
    setError(null);

    try {
      const loginResult = await loginUserWithPhone(formData.phone, formData.password);
      if (loginResult.error) {
        throw new Error(loginResult.error.message ?? "Erro ao fazer login");
      }
      setUserToken(loginResult.token);
      const { firstName } = getResolvedNameAndSurname();
      if (!companyName.trim() && firstName) {
        setCompanyName(`Barbearia ${firstName}`);
      }
      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar login");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  const finalizeOnboardingRedirect = (entId?: number | null) => {
    const targetEntId = entId ?? createdEnterpriseId;
    if (planConfig?.paymentLink) {
      FB_PIXEL.trackInitiateCheckout({
        content_name: planConfig.name,
        value: planConfig.discountPriceVal || planConfig.price,
        currency: "BRL",
      });

      let finalPaymentLink = planConfig.paymentLink;
      if (targetEntId) {
        const separator = finalPaymentLink.includes("?") ? "&" : "?";
        finalPaymentLink = `${finalPaymentLink}${separator}externalReference=${targetEntId}`;
      }

      window.location.href = finalPaymentLink;
    } else {
      window.open("https://app.gestaoboa.com.br", "_blank");
      navigate("/");
    }
  };

  const handleCompanySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!companyName.trim()) {
      setError("Por favor, digite o nome da sua barbearia ou empresa.");
      return;
    }

    const scaleToUse = selectedScale || SCALE_OPTIONS[0];
    let categoryToUse = selectedCategory;

    if (!categoryToUse) {
      let fetchedCats = categories;
      if (fetchedCats.length === 0) {
        try {
          fetchedCats = await getEnterpriseBranches();
          setCategories(fetchedCats);
        } catch (err) {
          console.error("Error fetching categories in submit:", err);
        }
      }
      categoryToUse =
        fetchedCats.find((c) => c.name.toLowerCase().includes("barbearia")) ||
        fetchedCats[0] ||
        DEFAULT_ENTERPRISE_BRANCHES[0];
    }

    setLoading(true);
    setError(null);

    try {
      const companyData = {
        name: companyName.trim(),
        id_scale: Number(scaleToUse.id),
        branches: [Number(categoryToUse.id)],
        image: "",
        discount_code: discountCode || undefined,
      };

      const result = await createCompany(userToken!, companyData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao criar empresa");
      }

      const entId = (result as any)?.enterprise?.id || (result as any)?.id || null;
      const newToken = (result as any)?.token || userToken;

      setCreatedEnterpriseId(entId);
      setEnterpriseToken(newToken);
      if (newToken) {
        setUserToken(newToken);
      }

      // Trigger Google Ads conversion event
      gtag_report_conversion();

      // Trigger Meta Pixel conversion events
      FB_PIXEL.trackCompleteRegistration({
        content_name: companyName.trim(),
        status: "success",
        plan: planConfig?.name || selectedPlanKey,
        category: categoryToUse.name,
      });

      // Avança para a etapa de configuração fácil de serviços!
      setCurrentStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar empresa");
      console.error("Error creating company:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers de Serviços (Etapa 4)
  const handleToggleService = (id: string) => {
    setServicesList((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, selected: !srv.selected } : srv))
    );
  };

  const handleServiceFieldChange = (
    id: string,
    field: "name" | "price" | "duration",
    value: string | number
  ) => {
    setServicesList((prev) =>
      prev.map((srv) => {
        if (srv.id !== id) return srv;
        if (field === "duration") {
          const num = Math.max(5, Math.min(480, Number(value) || 30));
          return { ...srv, duration: num };
        }
        return { ...srv, [field]: String(value), selected: true };
      })
    );
  };

  const handleAddCustomService = () => {
    const newId = `custom-${Date.now()}`;
    setServicesList((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        price: "35,00",
        duration: 30,
        selected: true,
      },
    ]);
  };

  const handleRemoveService = (id: string) => {
    setServicesList((prev) => prev.filter((srv) => srv.id !== id));
  };

  const handleSaveServices = async () => {
    const activeServices = servicesList.filter((s) => s.selected && s.name.trim().length > 0);
    if (activeServices.length === 0) {
      finalizeOnboardingRedirect();
      return;
    }

    setLoading(true);
    setError(null);
    setSavingServicesText("Preparando seus serviços...");

    try {
      const tokenToUse = enterpriseToken || userToken;
      if (tokenToUse) {
        for (let i = 0; i < activeServices.length; i++) {
          const srv = activeServices[i];
          setSavingServicesText(`Salvando (${i + 1}/${activeServices.length}): ${srv.name}...`);

          const numericPrice = parseFloat(
            srv.price.replace(/[^\d,.-]/g, "").replace(",", ".")
          );
          const validPrice = !isNaN(numericPrice) && numericPrice > 0 ? numericPrice : 35;
          const validDuration = !isNaN(Number(srv.duration)) && Number(srv.duration) > 0 ? Number(srv.duration) : 30;

          try {
            await createService(tokenToUse, {
              name: srv.name.trim(),
              duration_minutes: validDuration,
              sale_price: validPrice,
              cost_price: 0,
              id_enterprise: createdEnterpriseId || undefined,
              service_type: "standard",
              show_on_booking: true,
            });
          } catch (srvErr) {
            console.error(`Erro ao criar serviço ${srv.name}:`, srvErr);
          }
        }
      }

      finalizeOnboardingRedirect();
    } catch (err) {
      console.error("Erro ao salvar serviços:", err);
      finalizeOnboardingRedirect();
    } finally {
      setLoading(false);
      setSavingServicesText("");
    }
  };

  const renderStepIndicator = () => {
    const steps = isSupremacy10
      ? [
          { number: 1, label: "1. Sua Conta", stepId: 1 },
          { number: 2, label: "2. Sua Empresa", stepId: 3 },
          { number: 3, label: "3. Seus Serviços", stepId: 4 },
        ]
      : [
          { number: 1, label: "1. Sua Conta", stepId: 1 },
          { number: 2, label: "2. Celular", stepId: 2 },
          { number: 3, label: "3. Sua Empresa", stepId: 3 },
          { number: 4, label: "4. Seus Serviços", stepId: 4 },
        ];

    return (
      <div className="signup-steps">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.stepId;
          const isActive = currentStep === step.stepId;

          return (
            <React.Fragment key={step.number}>
              <div className={`signup-step ${isCompleted ? "completed" : isActive ? "active" : ""}`}>
                <div className="step-circle">
                  {isCompleted ? "✓" : step.number}
                </div>
                <span className="step-label">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${isCompleted ? "completed" : ""}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderCompanyStepContent = () => {
    const { firstName } = getResolvedNameAndSurname();
    const nameSuggestions = firstName
      ? [`Barbearia ${firstName}`, `Studio ${firstName}`, `${firstName} Barber`]
      : ["Barbearia Estilo", "Studio Barber"];

    return (
      <form onSubmit={handleCompanySubmit} className="company-form-step unified-company-step">
        <div className="company-step-header">
          <div className="step-badge-pill">⚡ Passo 2 de 3 • Configuração Rápida</div>
          <h3>Dados da sua Barbearia / Empresa</h3>
          <p className="step-description">
            Digite o nome do seu negócio. Já deixamos o ramo e o porte pré-selecionados para facilitar!
          </p>
        </div>

        <div className="company-field-block">
          <label className="company-field-label" htmlFor="companyNameInput">
            Nome da Barbearia / Estabelecimento *
          </label>
          <div className="input-wrapper">
            <input
              id="companyNameInput"
              type="text"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Ex: Barbearia do João"
              className="company-input"
              autoFocus
              required
            />
          </div>
          <div className="quick-suggestions-row">
            <span className="quick-suggestions-label">💡 Sugestões:</span>
            {nameSuggestions.map((sug) => (
              <button
                key={sug}
                type="button"
                className={`suggestion-chip ${companyName === sug ? "active" : ""}`}
                onClick={() => {
                  setCompanyName(sug);
                  if (error) setError(null);
                }}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        <div className="company-field-block">
          <label className="company-field-label">Ramo de Atuação</label>
          <div className="compact-chips-grid">
            {categories.map((category) => {
              const isSelected = selectedCategory?.id === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`compact-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name.toLowerCase().includes("barbearia") ? "✂️ " : "🏢 "}
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="company-field-block">
          <label className="company-field-label">Tamanho da Equipe / Porte</label>
          <div className="compact-chips-grid">
            {SCALE_OPTIONS.map((scale) => {
              const isSelected = selectedScale?.id === scale.id;
              return (
                <button
                  key={scale.id}
                  type="button"
                  className={`compact-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedScale(scale)}
                >
                  <strong>{scale.name}</strong>
                  <span>• {scale.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="company-field-block">
          <label className="company-field-label">
            Plano Desejado {isSupremacy10 ? "(com 10% OFF Exclusivo)" : ""}:
          </label>
          <div
            className="options-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
              gap: "8px",
            }}
          >
            {(["basico", "crescimento", "empresarial", "ilimitado"] as PlanType[]).map((pKey) => {
              const conf = PLAN_CONFIG[pKey];
              const isSelected =
                selectedPlanKey === pKey ||
                (selectedPlanKey === "alemdocorte" && pKey === "crescimento") ||
                (selectedPlanKey === "supremacy10" && pKey === "crescimento");
              return (
                <div
                  key={pKey}
                  className={`option-card ${isSelected ? "selected" : ""}`}
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    cursor: "pointer",
                    border: isSelected ? "2px solid #0077b6" : "1px solid #cbd5e1",
                    borderRadius: "10px",
                    background: isSelected ? "#f0f9ff" : "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                  onClick={() => setSelectedPlanKey(pKey)}
                >
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: isSelected ? "#0077b6" : "#334155" }}>
                    {conf.name}
                  </span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: isSelected ? "#0284c7" : "#64748b" }}>
                    {conf.usersLimit}
                  </span>
                  <span style={{ textDecoration: "line-through", fontSize: "0.7rem", color: "#94a3b8" }}>
                    {conf.originalPrice}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#10b981" }}>
                    {conf.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="company-field-block">
          <div className="coupon-inline-box">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Cupom de Desconto (opcional)"
              className="company-input"
              readOnly={Boolean(isSupremacy10 || cupomParam)}
              disabled={Boolean(isSupremacy10 || cupomParam)}
            />
          </div>
          {isSupremacy &&
            (discountCode.toUpperCase() === "ALEMDOCORTE" ||
              discountCode.toUpperCase() === "SUPREMACY10") && (
              <p className="supremacy-applied-helper">
                ✓ Cupom ALEMDOCORTE do Além do Corte evento em Pelotas aplicado (10% OFF)!
              </p>
            )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="company-actions">
          <button
            type="submit"
            className="submit-btn final-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              "Criar Empresa e Configurar Serviços →"
            )}
          </button>
        </div>
      </form>
    );
  };

  const renderServicesStepContent = () => {
    const selectedCount = servicesList.filter((s) => s.selected && s.name.trim().length > 0).length;
    const allSelected = servicesList.length > 0 && servicesList.every((s) => s.selected);

    return (
      <div className="services-onboarding-step">
        <div className="services-step-header">
          <div className="services-success-pill">
            🎉 Empresa <strong>{companyName}</strong> criada com sucesso!
          </div>
          <h3>Configure seus Serviços</h3>
          <p className="step-description">
            Já deixamos os serviços mais usados prontos com <strong>30 minutos</strong> por padrão.
            Edite nomes, valores ou tempos como preferir:
          </p>
        </div>

        <div className="services-toolbar">
          <span className="services-count-badge">
            ✅ <strong>{selectedCount}</strong> {selectedCount === 1 ? "serviço selecionado" : "serviços selecionados"}
          </span>
          <button
            type="button"
            className="services-select-all-btn"
            onClick={() =>
              setServicesList((prev) => prev.map((s) => ({ ...s, selected: !allSelected })))
            }
          >
            {allSelected ? "Desmarcar todos" : "Selecionar todos"}
          </button>
        </div>

        <div className="preset-services-list">
          {servicesList.map((srv) => (
            <div
              key={srv.id}
              className={`preset-service-card ${srv.selected ? "active" : "inactive"}`}
            >
              <div className="preset-service-top">
                <label className="preset-service-check">
                  <input
                    type="checkbox"
                    checked={srv.selected}
                    onChange={() => handleToggleService(srv.id)}
                  />
                </label>

                <div className="preset-service-name-wrap">
                  <label className="preset-mini-label">Nome do Serviço</label>
                  <input
                    type="text"
                    value={srv.name}
                    onChange={(e) => handleServiceFieldChange(srv.id, "name", e.target.value)}
                    placeholder="Nome do serviço (ex: Cabelo)"
                    className="preset-name-input"
                  />
                </div>

                {srv.id.startsWith("custom-") && (
                  <button
                    type="button"
                    className="preset-remove-btn"
                    onClick={() => handleRemoveService(srv.id)}
                    title="Remover serviço"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="preset-service-bottom">
                <div className="preset-field-group">
                  <label className="preset-mini-label">Valor (R$)</label>
                  <div className="preset-price-input-wrap">
                    <span className="currency-prefix">R$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={srv.price}
                      onChange={(e) => handleServiceFieldChange(srv.id, "price", e.target.value)}
                      placeholder="35,00"
                      className="preset-price-input"
                    />
                  </div>
                </div>

                <div className="preset-field-group">
                  <label className="preset-mini-label">Tempo de Duração</label>
                  <div className="preset-duration-control">
                    <button
                      type="button"
                      className="duration-step-btn"
                      onClick={() =>
                        handleServiceFieldChange(srv.id, "duration", Math.max(5, srv.duration - 5))
                      }
                      title="Diminuir 5 minutos"
                    >
                      −
                    </button>
                    <select
                      value={srv.duration}
                      onChange={(e) =>
                        handleServiceFieldChange(srv.id, "duration", Number(e.target.value))
                      }
                      className="preset-duration-select"
                    >
                      {[10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 120].map((min) => (
                        <option key={min} value={min}>
                          {min} min
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="duration-step-btn"
                      onClick={() =>
                        handleServiceFieldChange(srv.id, "duration", Math.min(240, srv.duration + 5))
                      }
                      title="Aumentar 5 minutos"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="add-custom-service-btn"
          onClick={handleAddCustomService}
        >
          + Adicionar outro serviço
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="services-onboarding-actions">
          <button
            type="button"
            className="submit-btn final-btn"
            onClick={handleSaveServices}
            disabled={loading}
          >
            {loading ? (
              <span className="saving-services-status">
                <span className="loading-spinner"></span>
                <span>{savingServicesText || "Salvando serviços..."}</span>
              </span>
            ) : selectedCount > 0 ? (
              `Salvar ${selectedCount} ${selectedCount === 1 ? "Serviço" : "Serviços"} e Concluir 🚀`
            ) : (
              "Concluir Cadastro 🚀"
            )}
          </button>

          <button
            type="button"
            className="skip-services-btn"
            onClick={() => finalizeOnboardingRedirect()}
            disabled={loading}
          >
            Pular por enquanto e configurar depois →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="signup-page">
      <Helmet>
        <title>
          {isSupremacy10
            ? "Além do Corte evento em Pelotas - Criar Conta | Gestão Boa"
            : "Criar Conta | Teste Grátis de 10 Dias - Gestão Boa"}
        </title>
        <meta
          name="description"
          content={
            isSupremacy10
              ? "Crie sua conta exclusiva de Além do Corte evento em Pelotas na Gestão Boa com 10% de desconto em todos os planos."
              : "Crie sua conta na Gestão Boa e experimente por 10 dias grátis sem cartão de crédito. Agendamento online, financeiro e controle total."
          }
        />
        <link rel="canonical" href="https://gestaoboa.com.br/criar-conta" />
      </Helmet>
      {/* Header */}
      <header className="signup-header">
        <div className="header-content">
          <div className="header-brand-group">
            <a href="/" className="logo">
              <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
            </a>
            <div className="header-official-badge">
              <span className="official-dot" />
              <span>Cadastro Oficial • <strong>Gestão Boa</strong></span>
            </div>
          </div>
          <div className="header-actions">
            {planConfig && (
              <div className="plan-badge">
                {planConfig.discount && <span className="discount-badge">{planConfig.discount}</span>}
                <span className="plan-name">Plano {planConfig.name}</span>
                <span className="plan-price">
                  {planConfig.originalPrice && (
                    <span className="original-price">{planConfig.originalPrice}</span>
                  )}
                  {planConfig.price}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="signup-main">
        <div className="signup-container">
          {/* Left Side - Info */}
          <div className="signup-info">
            {isSupremacy10 ? (
              <>
                <div className="gestao-boa-pill-tag">
                  ✨ SISTEMA GESTÃO BOA PARA BARBEARIAS
                </div>
                <h1>
                  Bem-vindo ao Gestão Boa, participante do{" "}
                  <span className="highlight">Além do Corte evento em Pelotas</span>!
                </h1>
                <p className="info-description">
                  Crie sua conta em menos de 1 minuto, cadastre seus serviços em 1 clique e aproveite 10% de desconto em todos os planos!
                </p>

                <div className="supremacy-promo-card">
                  <div className="supremacy-tag">
                    <span>🏆 BENEFÍCIO EXCLUSIVO</span>
                  </div>
                  <div className="supremacy-content">
                    <div className="supremacy-discount-header">
                      <span className="supremacy-discount-num">10% OFF</span>
                      <span className="supremacy-discount-txt">em todos os planos</span>
                    </div>
                    <div className="supremacy-coupon-box">
                      <span>Cupom aplicado:</span>
                      <strong>ALEMDOCORTE</strong>
                    </div>
                  </div>
                </div>
              </>
            ) : selectedPlanKey === "black-friday" ? (
              <>
                <div className="gestao-boa-pill-tag">
                  ✨ CADASTRO OFICIAL GESTÃO BOA
                </div>
                <h1>
                  🔥 Aproveite a <span className="highlight">Black Friday</span>
                </h1>
                <p className="info-description">
                  Garanta acesso completo ao sistema por apenas R$ 9,90 e transforme a gestão do seu negócio!
                </p>
              </>
            ) : (
              <>
                <div className="gestao-boa-pill-tag">
                  ✨ CADASTRO OFICIAL GESTÃO BOA
                </div>
                <h1>
                  Comece sua jornada com o <span className="highlight">Gestão Boa</span>
                </h1>
                <p className="info-description">
                  Simplifique a agenda, comissões e financeiro da sua barbearia ou salão em menos de 1 minuto.
                </p>
              </>
            )}

            <div className="quick-onboarding-highlights">
              <div className="onboarding-highlight-item">
                <span className="onboarding-highlight-icon">⚡</span>
                <div>
                  <strong>Cadastro em 1 minuto</strong>
                  <p>Sem burocracia: crie sua conta, empresa e serviços rapidamente</p>
                </div>
              </div>
              <div className="onboarding-highlight-item">
                <span className="onboarding-highlight-icon">✂️</span>
                <div>
                  <strong>Serviços pré-configurados</strong>
                  <p>Cabelo, Barba, Degradê e mais já prontos para personalizar</p>
                </div>
              </div>
              <div className="onboarding-highlight-item">
                <span className="onboarding-highlight-icon">📅</span>
                <div>
                  <strong>Agenda e Financeiro Prontos</strong>
                  <p>Link de agendamento online e controle total no celular ou PC</p>
                </div>
              </div>
            </div>

            {selectedPlanKey === "black-friday" && (
              <div className="guarantee-box">
                <span className="guarantee-icon">🛡️</span>
                <div>
                  <strong>Garantia de 7 dias</strong>
                  <p>Se não gostar, devolvemos 100% do seu dinheiro</p>
                </div>
              </div>
            )}
            <div className="app-download-box">
              <div className="app-download-info">
                <strong>Baixe nosso aplicativo</strong>
                <p>Disponível para iOS e Android</p>
              </div>
              <div className="app-download-badges">
                <a
                  href={IOS_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-badge-btn"
                  title="Baixar na App Store"
                >
                  <AppleIcon width={20} height={20} />
                  <div className="app-store-btn-labels">
                    <span className="app-store-sub">Disponível na</span>
                    <span className="app-store-main">App Store</span>
                  </div>
                </a>

                <a
                  href={ANDROID_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-badge-btn play-store-badge-btn"
                  title="Baixar no Google Play"
                >
                  <GooglePlayIcon width={20} height={20} />
                  <div className="app-store-btn-labels">
                    <span className="app-store-sub">Disponível no</span>
                    <span className="app-store-main">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="signup-form-wrapper">
            {renderStepIndicator()}

            <div className="form-card">
              {/* Top Contextual Banner inside Form Card so user always knows this is Gestão Boa */}
              <div className="form-brand-context-bar">
                <div className="form-brand-context-left">
                  <span className="form-brand-shield">🛡️</span>
                  <span>Cadastro na <strong>Gestão Boa</strong></span>
                </div>
                <span className="form-brand-time-badge">⏱️ Rápido • 1 min</span>
              </div>

              {isSupremacy10 && currentStep === 1 && (
                <div className="mobile-promo-callout">
                  <span>🏆 <strong>Além do Corte evento em Pelotas</strong></span>
                  <span className="mobile-promo-pill">Cupom ALEMDOCORTE • 10% OFF</span>
                </div>
              )}

              {/* Step 1: Create Account */}
              {currentStep === 1 && (
                <>
                  <div className="form-header">
                    <h2>Crie sua conta na Gestão Boa</h2>
                    <p>
                      {isSupremacy10
                        ? "Preencha seus dados básicos para liberar seu acesso exclusivo com 10% OFF"
                        : "Preencha seus dados básicos para começar agora mesmo"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="signup-form" noValidate>
                    {isSupremacy10 ? (
                      <>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="name">Seu Nome *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Ex: João"
                              autoFocus
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="surname">Sobrenome</label>
                            <input
                              type="text"
                              id="surname"
                              name="surname"
                              value={formData.surname}
                              onChange={handleChange}
                              placeholder="Ex: Silva"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">Seu melhor E-mail *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            placeholder="seu@email.com"
                            className={emailError ? "input-error" : ""}
                            required
                          />
                          {emailError && (
                            <span className="field-error-text">
                              Por favor, insira um e-mail válido.
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">WhatsApp / Celular (opcional)</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Crie uma Senha *</label>
                          <div className="password-input-wrapper">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handlePasswordBlur}
                              placeholder="Mínimo 6 caracteres"
                              className={passwordError ? "input-error" : ""}
                              required
                            />
                            <button
                              type="button"
                              className="toggle-password-btn"
                              onClick={() => setShowPassword((prev) => !prev)}
                              tabIndex={-1}
                            >
                              {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                          </div>
                          {passwordError && (
                            <span className="field-error-text">
                              A senha deve ter pelo menos 6 caracteres.
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="name">Seu Nome *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Ex: João"
                              autoFocus
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="surname">Sobrenome</label>
                            <input
                              type="text"
                              id="surname"
                              name="surname"
                              value={formData.surname}
                              onChange={handleChange}
                              placeholder="Ex: Silva"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">WhatsApp / Celular *</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Crie uma Senha *</label>
                          <div className="password-input-wrapper">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handlePasswordBlur}
                              placeholder="Mínimo 6 caracteres"
                              className={passwordError ? "input-error" : ""}
                              required
                            />
                            <button
                              type="button"
                              className="toggle-password-btn"
                              onClick={() => setShowPassword((prev) => !prev)}
                              tabIndex={-1}
                            >
                              {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                          </div>
                          {passwordError && (
                            <span className="field-error-text">
                              A senha deve ter pelo menos 6 caracteres.
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    <div className="terms-wrapper">
                      <div className={`checkbox-group ${termsError ? "checkbox-group-error" : ""}`}>
                        <input
                          type="checkbox"
                          id="terms"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                        />
                        <label htmlFor="terms">
                          Li e concordo com os{" "}
                          <a href="/terms" target="_blank" rel="noopener noreferrer">
                            Termos de Uso
                          </a>{" "}
                          e{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer">
                            Política de Privacidade
                          </a>
                        </label>
                      </div>
                      {termsError && (
                        <span className="terms-error-text">
                          Você precisa aceitar os termos de uso para continuar.
                        </span>
                      )}
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        "Criar Minha Conta e Continuar →"
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* Step 2: Phone Verification */}
              {currentStep === 2 && (
                <div className="confirmation-step">
                  <div className="confirmation-icon">📱</div>
                  <h2>Verifique seu Celular</h2>
                  <p>
                    Enviamos um SMS com o código de 6 dígitos para{" "}
                    <strong>{formData.phone}</strong>
                  </p>

                  <div className="code-slots-wrapper">
                    <div className="code-slots-field">
                      <input
                        ref={codeInputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={verificationCode}
                        onChange={(e) => {
                          if (error) setError(null);
                          const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setVerificationCode(val);
                          setCaretIndex(val.length);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && verificationCode.length === 6) {
                            e.preventDefault();
                            handleVerifyCode();
                          }
                        }}
                        onClick={(e) => {
                          const input = e.currentTarget;
                          const rect = input.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const slotWidth = rect.width / 6;
                          const clickedIndex = Math.min(Math.floor(clickX / slotWidth), 5);
                          if (clickedIndex < verificationCode.length) {
                            input.setSelectionRange(clickedIndex, clickedIndex + 1);
                            setCaretIndex(clickedIndex);
                          } else {
                            const pos = verificationCode.length;
                            input.setSelectionRange(pos, pos);
                            setCaretIndex(pos);
                          }
                        }}
                        onKeyUp={(e) => {
                          const input = e.currentTarget;
                          setCaretIndex(input.selectionStart ?? input.value.length);
                        }}
                        onSelect={(e) => {
                          const input = e.currentTarget;
                          setCaretIndex(input.selectionStart ?? input.value.length);
                        }}
                        onFocus={() => setIsCodeFocused(true)}
                        onBlur={() => setIsCodeFocused(false)}
                        className="code-hidden-input"
                        autoFocus
                        aria-label="Código de verificação de 6 dígitos"
                      />

                      <div className="code-slots-container">
                        {[0, 1, 2, 3, 4, 5].map((index) => {
                          const digit = verificationCode[index] || "";
                          const isCurrent =
                            isCodeFocused &&
                            (caretIndex === index || (index === 5 && caretIndex >= 6));
                          const isFilled = Boolean(digit);
                          const hasError = Boolean(error);

                          return (
                            <div
                              key={index}
                              className={`code-slot ${isCurrent ? "focused" : ""} ${isFilled ? "filled" : ""} ${hasError ? "has-error" : ""}`}
                            >
                              <span className="code-slot-digit">{digit}</span>
                              {isCurrent && !digit && <span className="code-slot-cursor" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {verificationCode.length > 0 && (
                      <button
                        type="button"
                        className="code-clear-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setVerificationCode("");
                          setCaretIndex(0);
                          codeInputRef.current?.focus();
                        }}
                      >
                        Limpar código
                      </button>
                    )}
                  </div>

                  <div className="confirmation-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={handleResendCode}
                      disabled={loading}
                    >
                      {loading ? "Reenviando..." : "Reenviar Código"}
                    </button>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => handleVerifyCode()}
                      disabled={loading || verificationCode.length < 6}
                    >
                      {loading ? "Verificando..." : "Verificar e Continuar →"}
                    </button>
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <div className="info-box">
                    <span className="info-icon">ℹ️</span>
                    <p>O código de 6 dígitos foi enviado via SMS. Caso não receba, verifique se o número informado está correto.</p>
                  </div>
                </div>
              )}

              {/* Step 3: Unified Fast Company Creation */}
              {currentStep === 3 && userToken && (
                <div className="company-step">
                  {renderCompanyStepContent()}
                </div>
              )}

              {/* Step 4: Easy Services Setup */}
              {currentStep === 4 && (
                <div className="company-step">
                  {renderServicesStepContent()}
                </div>
              )}
            </div>

            <div className="signup-bottom-links">
              <p className="login-link">
                Já tem uma conta na Gestão Boa? <a href="https://app.gestaoboa.com.br">Fazer login</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="signup-footer">
        <div className="footer-content">
          <p>© 2025 Gestão Boa. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="/terms">Termos de Uso</a>
            <a href="/privacy">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CriarConta;
