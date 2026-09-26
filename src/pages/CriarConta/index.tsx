import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  loginUser,
  loginUserWithPhone,
  registerUser,
  verifyPhoneCode,
  resendPhoneCode,
  createCompany,
  EnterpriseBranch,
  getEnterpriseBranches,
} from "../../services/userApi";
import "./styles.css";

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

type PlanType = "basico" | "crescimento" | "empresarial" | "ilimitado" | "black-friday" | "supremacy10";

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
    name: "Supremacy 10",
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

const CriarConta: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plano") as PlanType | null;
  const cupomParam = searchParams.get("cupom") || searchParams.get("desconto");
  const planoParam = searchParams.get("plano");
  const parceriaParam = searchParams.get("parceria");
  const origemParam = searchParams.get("origem");
  const refParam = searchParams.get("ref");

  const isSupremacy10 =
    (cupomParam?.toUpperCase() === "SUPREMACY10") ||
    (planoParam?.toUpperCase() === "SUPREMACY10") ||
    (parceriaParam?.toUpperCase() === "SUPREMACY10") ||
    (origemParam?.toUpperCase() === "SUPREMACY10") ||
    (refParam?.toUpperCase() === "SUPREMACY10") ||
    window.location.pathname.toLowerCase().includes("supremacy");

  const initialPlanKey: PlanType = isSupremacy10
    ? (planParam && PLAN_CONFIG[planParam] ? planParam : "supremacy10")
    : (planParam && PLAN_CONFIG[planParam] ? planParam : "crescimento");

  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanType>(initialPlanKey);
  const plan = selectedPlanKey;
  const planConfig = PLAN_CONFIG[plan];

  const [currentStep, setCurrentStep] = useState(1);
  const [companyStep, setCompanyStep] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  // Company form states
  const [companyName, setCompanyName] = useState("");
  const [discountCode, setDiscountCode] = useState(
    isSupremacy10 ? "SUPREMACY10" : cupomParam ? cupomParam.toUpperCase() : ""
  );
  const [selectedCategory, setSelectedCategory] = useState<EnterpriseBranch | null>(null);
  const [selectedScale, setSelectedScale] = useState<typeof SCALE_OPTIONS[0] | null>(null);
  const [categories, setCategories] = useState<EnterpriseBranch[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEnterpriseBranches();
        setCategories(fetchedCategories);

        if (isSupremacy10 && fetchedCategories.length > 0) {
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
  }, [currentStep, isSupremacy10]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let hasError = false;

    if (isSupremacy10) {
      if (!formData.name.trim() || !formData.surname.trim()) {
        setError("Por favor, preencha seu nome e sobrenome.");
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
          name: formData.name.trim(),
          surname: formData.surname.trim(),
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
          cupom: "SUPREMACY10",
        };

        const result = await registerUser(userData);
        if (result.error) {
          const errMsg = typeof result.error === "object" ? result.error.message : result.error;
          throw new Error(errMsg ?? "Erro ao registrar usuário");
        }

        // Automatic login with email and password without any verification step
        const loginResult = await loginUser(cleanEmail, formData.password);
        if (loginResult.error) {
          const errMsg = typeof loginResult.error === "object" ? loginResult.error.message : loginResult.error;
          throw new Error(errMsg ?? "Erro ao realizar login");
        }

        setUserToken(loginResult.token);
        // Skip phone verification completely, jump directly to company creation step
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

    if (!formData.name.trim() || !formData.surname.trim()) {
      setError("Por favor, preencha seu nome e sobrenome.");
      hasError = true;
    } else if (!formData.phone.replace(/\D/g, "") || formData.phone.replace(/\D/g, "").length < 10) {
      setError("Por favor, insira um telefone válido com DDD.");
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
        name: formData.name,
        surname: formData.surname,
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

      alert("Código reenviado com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao reenviar o código");
      console.error("Erro ao reenviar o código:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length < 4) {
      setError("Por favor, insira o código de 4 dígitos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await verifyPhoneCode(formData.phone, verificationCode);
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
      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar login");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyNext = () => {
    setError(null);

    if (companyStep === 0) {
      if (!companyName.trim()) {
        setError("Por favor, insira o nome da empresa");
        return;
      }
      if (isSupremacy10) {
        setCompanyStep(2);
      } else {
        setCompanyStep(1);
      }
    } else if (companyStep === 1) {
      if (!selectedCategory) {
        setError("Por favor, selecione uma categoria");
        return;
      }
      setCompanyStep(2);
    }
  };

  const handleCompanyBack = () => {
    setError(null);
    if (companyStep > 0) {
      if (isSupremacy10 && companyStep === 2) {
        setCompanyStep(0);
      } else {
        setCompanyStep(companyStep - 1);
      }
    }
  };

  const handleCompanySubmit = async () => {
    if (!selectedScale) {
      setError("Por favor, selecione o porte da empresa");
      return;
    }

    let categoryToUse = selectedCategory;
    if (isSupremacy10 && !categoryToUse) {
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
        null;
    }

    if (!categoryToUse) {
      setError("Por favor, selecione uma categoria");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const companyData = {
        name: companyName.trim(),
        id_scale: Number(selectedScale.id),
        branches: [Number(categoryToUse.id)],
        image: "",
        discount_code: discountCode || undefined,
      };

      const result = await createCompany(userToken!, companyData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao criar empresa");
      }

      // Trigger Google Ads conversion event
      gtag_report_conversion();

      const createdEnterpriseId = (result as any)?.enterprise?.id || (result as any)?.id;
      let finalPaymentLink = planConfig.paymentLink;
      if (createdEnterpriseId) {
        const separator = finalPaymentLink.includes("?") ? "&" : "?";
        finalPaymentLink = `${finalPaymentLink}${separator}externalReference=${createdEnterpriseId}`;
      }

      window.location.href = finalPaymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar empresa");
      console.error("Error creating company:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = isSupremacy10
      ? [
          { number: 1, label: "Criar conta", stepId: 1 },
          { number: 2, label: "Criar empresa", stepId: 3 },
        ]
      : [
          { number: 1, label: "Criar conta", stepId: 1 },
          { number: 2, label: "Verificar celular", stepId: 2 },
          { number: 3, label: "Criar empresa", stepId: 3 },
        ];

    return (
      <div className="signup-steps">
        {steps.map((step, index) => {
          const isCompleted = isSupremacy10
            ? currentStep > step.stepId
            : currentStep > step.stepId;
          const isActive = isSupremacy10
            ? (currentStep === 1 && step.stepId === 1) || (currentStep >= 3 && step.stepId === 3)
            : currentStep === step.stepId;

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

  const renderCompanySubSteps = () => {
    const subSteps = isSupremacy10
      ? ["Nome", "Porte"]
      : ["Nome", "Categoria", "Porte"];

    return (
      <div className="company-substeps">
        {subSteps.map((label, index) => {
          const isCompleted = isSupremacy10
            ? index === 0 && companyStep > 0
            : companyStep > index;
          const isActive = isSupremacy10
            ? (index === 0 && companyStep === 0) || (index === 1 && companyStep === 2)
            : companyStep === index;

          return (
            <React.Fragment key={index}>
              <div className={`substep ${isCompleted ? "completed" : isActive ? "active" : ""}`}>
                <div className="substep-circle">
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span className="substep-label">{label}</span>
              </div>
              {index < subSteps.length - 1 && (
                <div className={`substep-connector ${isCompleted ? "completed" : ""}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderCompanyStepContent = () => {
    switch (companyStep) {
      case 0:
        return (
          <div className="company-form-step">
            <div className="step-icon">🏢</div>
            <h3>Nome da Empresa</h3>
            <p className="step-description">Qual é o nome da sua empresa ou estabelecimento?</p>
            <div className="input-wrapper">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ex: Barbearia do João"
                className="company-input"
                autoFocus
              />
            </div>
            <div className="input-wrapper" style={{ marginTop: '20px' }}>
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
            <div style={{ marginTop: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1e293b' }}>
                Plano Desejado (com 10% de desconto):
              </label>
                <div className="options-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {(["basico", "crescimento", "empresarial", "ilimitado"] as PlanType[]).map((pKey) => {
                    const conf = PLAN_CONFIG[pKey];
                    const isSelected = selectedPlanKey === pKey;
                    return (
                      <div
                        key={pKey}
                        className={`option-card ${isSelected ? "selected" : ""}`}
                        style={{
                          padding: '12px 10px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          border: isSelected ? '2px solid #0077b6' : '1px solid #cbd5e1',
                          borderRadius: '10px',
                          background: isSelected ? '#f0f9ff' : '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                        onClick={() => setSelectedPlanKey(pKey)}
                      >
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? '#0077b6' : '#334155' }}>
                          {conf.name}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isSelected ? '#0284c7' : '#64748b' }}>
                          {conf.usersLimit}
                        </span>
                        <span style={{ textDecoration: 'line-through', fontSize: '0.75rem', color: '#94a3b8' }}>
                          {conf.originalPrice}
                        </span>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#10b981' }}>
                          {conf.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>
        );

      case 1:
        return (
          <div className="company-form-step">
            <div className="step-icon">📂</div>
            <h3>Categoria</h3>
            <p className="step-description">Selecione a categoria que melhor descreve sua empresa</p>
            <div className="options-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`option-card ${selectedCategory?.id === category.id ? "selected" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="option-name">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="company-form-step">
            <div className="step-icon">📊</div>
            <h3>Porte da Empresa</h3>
            <p className="step-description">Selecione o porte da sua empresa</p>
            <div className="options-grid scale-options">
              {SCALE_OPTIONS.map((scale) => (
                <div
                  key={scale.id}
                  className={`option-card ${selectedScale?.id === scale.id ? "selected" : ""}`}
                  onClick={() => setSelectedScale(scale)}
                >
                  <span className="option-name">{scale.name}</span>
                  <span className="option-description">{scale.description}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="signup-page">
      {/* Header */}
      <header className="signup-header">
        <div className="header-content">
          <a href="/" className="logo">
            <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
          </a>
          <div className="header-actions">
            <a
              href={IOS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-header-btn"
              title="Baixar app para iOS na App Store"
            >
              <AppleIcon width={16} height={16} />
              <span>Baixar no iOS</span>
            </a>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="signup-main">
        <div className="signup-container">
          {/* Left Side - Info */}
          <div className="signup-info">
            <h1>
              {isSupremacy10 ? (
                <>⭐ Acesso Exclusivo <span className="highlight">Supremacy 10</span></>
              ) : selectedPlanKey === "black-friday" ? (
                <>🔥 Aproveite a <span className="highlight">Black Friday</span></>
              ) : (
                <>Comece sua jornada com o <span className="highlight">Gestão Boa</span></>
              )}
            </h1>
            <p className="info-description">
              {isSupremacy10
                ? "Crie sua conta apenas com e-mail e senha e comece a transformar a gestão do seu negócio agora mesmo!"
                : selectedPlanKey === "black-friday"
                ? "Garanta acesso completo ao sistema por apenas R$ 9,90 e transforme a gestão do seu negócio!"
                : "Simplifique a gestão do seu negócio com nossa plataforma completa e intuitiva."
              }
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Agendamento Online</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Controle Financeiro</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Gestão de Clientes</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Relatórios Completos</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Suporte Dedicado</span>
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
                <strong>Disponível para iPhone e iPad</strong>
                <p>Baixe o aplicativo oficial na App Store</p>
              </div>
              <a
                href={IOS_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="app-store-badge-btn"
                title="Baixar na App Store"
              >
                <AppleIcon width={22} height={22} />
                <div className="app-store-btn-labels">
                  <span className="app-store-sub">Disponível na</span>
                  <span className="app-store-main">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="signup-form-wrapper">
            {renderStepIndicator()}

            <div className="form-card">
              {/* Step 1: Create Account */}
              {currentStep === 1 && (
                <>
                  <div className="form-header">
                    <h2>{isSupremacy10 ? "Criar sua conta Supremacy 10" : "Criar sua conta"}</h2>
                    <p>{isSupremacy10 ? "Preencha seus dados para começar seu acesso exclusivo" : "Preencha seus dados para começar"}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="signup-form" noValidate>
                    {isSupremacy10 ? (
                      <>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="name">Nome *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Seu nome"
                              autoFocus
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="surname">Sobrenome *</label>
                            <input
                              type="text"
                              id="surname"
                              name="surname"
                              value={formData.surname}
                              onChange={handleChange}
                              placeholder="Seu sobrenome"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">E-mail *</label>
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
                          <label htmlFor="phone">Telefone / Celular (opcional)</label>
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
                          <label htmlFor="password">Senha *</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handlePasswordBlur}
                            placeholder="Mínimo 6 caracteres"
                            className={passwordError ? "input-error" : ""}
                            required
                          />
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
                            <label htmlFor="name">Nome *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Seu nome"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="surname">Sobrenome *</label>
                            <input
                              type="text"
                              id="surname"
                              name="surname"
                              value={formData.surname}
                              onChange={handleChange}
                              placeholder="Seu sobrenome"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">Telefone / Celular *</label>
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
                          <label htmlFor="password">Senha *</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handlePasswordBlur}
                            placeholder="Mínimo 6 caracteres"
                            className={passwordError ? "input-error" : ""}
                            required
                          />
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
                        "Criar Conta"
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
                    Enviamos um SMS com o código para{" "}
                    <strong>{formData.phone}</strong>
                  </p>

                  <div className="code-input-wrapper">
                    <input
                      type="text"
                      maxLength={6} // Updated to 6 digits
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000" // Updated placeholder to reflect 6 digits
                      className="code-input"
                      autoFocus
                    />
                  </div>

                  <div className="confirmation-actions">
                    <button
                      className="secondary-btn"
                      onClick={handleResendCode}
                      disabled={loading}
                    >
                      {loading ? "Reenviando..." : "Reenviar Código"}
                    </button>
                    <button
                      className="primary-btn"
                      onClick={handleVerifyCode}
                      disabled={loading || verificationCode.length < 4}
                    >
                      {loading ? "Verificando..." : "Verificar e Continuar →"}
                    </button>
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <div className="info-box">
                    <span className="info-icon">ℹ️</span>
                    <p>O código foi enviado via SMS. Caso não receba, verifique se o número informado está correto.</p>
                  </div>
                </div>
              )}

              {/* Step 3: Company Creation */}
              {currentStep === 3 && userToken && (
                <div className="company-step">
                  {renderCompanySubSteps()}

                  {renderCompanyStepContent()}

                  {error && <div className="error-message">{error}</div>}

                  <div className="company-actions">
                    {companyStep > 0 && (
                      <button
                        className="secondary-btn"
                        onClick={handleCompanyBack}
                        disabled={loading}
                      >
                        ← Voltar
                      </button>
                    )}
                    {companyStep < 2 ? (
                      <button
                        className="primary-btn"
                        onClick={handleCompanyNext}
                        disabled={loading}
                      >
                        Próximo →
                      </button>
                    ) : (
                      <button
                        className="submit-btn final-btn"
                        onClick={handleCompanySubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="loading-spinner"></span>
                        ) : (
                          <>Finalizar e Ir para Pagamento 🎉</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="signup-bottom-links">
              <p className="login-link">
                Já tem uma conta? <a href="https://app.gestaoboa.com.br">Fazer login</a>
              </p>
              <a
                href={IOS_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ios-app-link"
              >
                <AppleIcon width={16} height={16} />
                <span>Baixar o App no iOS</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="signup-footer">
        <p>© 2025 Gestão Boa. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="/terms">Termos de Uso</a>
          <a href="/privacy">Privacidade</a>
        </div>
      </footer>
    </div>
  );
};

export default CriarConta;
