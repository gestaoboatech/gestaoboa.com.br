import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
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
    if (typeof(url) != 'undefined') {
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

type PlanType = "basico" | "crescimento" | "empresarial" | "black-friday";

const PLAN_CONFIG: Record<PlanType, { 
  name: string; 
  price: string; 
  originalPrice?: string;
  paymentLink: string;
  discount?: string;
}> = {
  "basico": {
    name: "Básico",
    price: "R$ 49,90/mês",
    paymentLink: "https://www.app.gestaoboa.com.br",
  },
  "crescimento": {
    name: "Crescimento",
    price: "R$ 89,90/mês",
    paymentLink: "https://www.app.gestaoboa.com.br",
  },
  "empresarial": {
    name: "Empresarial",
    price: "R$ 98,72/mês",
    paymentLink: "https://www.app.gestaoboa.com.br",
  },
  "black-friday": {
    name: "Black Friday",
    price: "R$ 9,90",
    originalPrice: "R$ 535,00",
    paymentLink: "https://www.app.gestaoboa.com.br",
    discount: "98% OFF",
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
  const navigate = useNavigate();
  const planParam = searchParams.get("plano") as PlanType | null;
  const plan = planParam && PLAN_CONFIG[planParam] ? planParam : "black-friday";
  const planConfig = PLAN_CONFIG[plan];

  const [currentStep, setCurrentStep] = useState(1);
  const [companyStep, setCompanyStep] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "", // Mantido como opcional no estado para compatibilidade com o backend se necessário, mas removido do form
    password: "",
    terms: false,
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Company form states
  const [companyName, setCompanyName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EnterpriseBranch | null>(null);
  const [selectedScale, setSelectedScale] = useState<typeof SCALE_OPTIONS[0] | null>(null);
  const [categories, setCategories] = useState<EnterpriseBranch[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEnterpriseBranches();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (currentStep === 3) {
      fetchCategories();
    }
  }, [currentStep]);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      let formatted = cleaned;
      if (cleaned.length > 0) {
        formatted = `(${cleaned.slice(0, 2)})${
          cleaned.length > 2 ? " " + cleaned.slice(2) : ""
        }`;
      }
      if (cleaned.length > 7) {
        formatted = `${formatted.slice(0, 10)}-${formatted.slice(10)}`;
      }
      return formatted;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    let formattedValue = value;
    if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.surname.trim()) {
      setError("Por favor, preencha seu nome e sobrenome.");
      return;
    }

    if (!formData.phone.replace(/\D/g, "") || formData.phone.replace(/\D/g, "").length < 10) {
      setError("Por favor, insira um telefone válido.");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!formData.terms) {
      setError("Você precisa aceitar os termos de uso para continuar.");
      return;
    }
    
    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        surname: formData.surname,
        document: "",
        email: "", // Removido o email obrigatório
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
      setCompanyStep(1);
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
      setCompanyStep(companyStep - 1);
    }
  };

  const handleCompanySubmit = async () => {
    if (!selectedScale) {
      setError("Por favor, selecione o porte da empresa");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const companyData = {
        name: companyName.trim(),
        id_scale: Number(selectedScale.id),
        branches: [Number(selectedCategory!.id)],
        image: "",
      };

      const result = await createCompany(userToken!, companyData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao criar empresa");
      }

      // Trigger Google Ads conversion event
      gtag_report_conversion();
      
      window.open(planConfig.paymentLink, "_blank");
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar empresa");
      console.error("Error creating company:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: "Criar conta" },
      { number: 2, label: "Verificar celular" },
      { number: 3, label: "Criar empresa" },
    ];

    return (
      <div className="signup-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className={`signup-step ${currentStep > step.number ? "completed" : currentStep === step.number ? "active" : ""}`}>
              <div className="step-circle">
                {currentStep > step.number ? "✓" : step.number}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${currentStep > step.number ? "completed" : ""}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderCompanySubSteps = () => {
    const subSteps = ["Nome", "Categoria", "Porte"];
    
    return (
      <div className="company-substeps">
        {subSteps.map((label, index) => (
          <React.Fragment key={index}>
            <div className={`substep ${companyStep > index ? "completed" : companyStep === index ? "active" : ""}`}>
              <div className="substep-circle">
                {companyStep > index ? "✓" : index + 1}
              </div>
              <span className="substep-label">{label}</span>
            </div>
            {index < subSteps.length - 1 && (
              <div className={`substep-connector ${companyStep > index ? "completed" : ""}`} />
            )}
          </React.Fragment>
        ))}
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
      </header>

      {/* Main Content */}
      <main className="signup-main">
        <div className="signup-container">
          {/* Left Side - Info */}
          <div className="signup-info">
            <h1>
              {plan === "black-friday" ? (
                <>🔥 Aproveite a <span className="highlight">Black Friday</span></>
              ) : (
                <>Comece sua jornada com o <span className="highlight">Gestão Boa</span></>
              )}
            </h1>
            <p className="info-description">
              {plan === "black-friday" 
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

            {plan === "black-friday" && (
              <div className="guarantee-box">
                <span className="guarantee-icon">🛡️</span>
                <div>
                  <strong>Garantia de 7 dias</strong>
                  <p>Se não gostar, devolvemos 100% do seu dinheiro</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Form */}
          <div className="signup-form-wrapper">
            {renderStepIndicator()}

            <div className="form-card">
              {/* Step 1: Create Account */}
              {currentStep === 1 && (
                <>
                  <div className="form-header">
                    <h2>Criar sua conta</h2>
                    <p>Preencha seus dados para começar</p>
                  </div>

                  <form onSubmit={handleSubmit} className="signup-form">
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
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
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
                        placeholder="Mínimo 6 caracteres"
                        required
                      />
                    </div>

                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
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
                      maxLength={4}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="0000"
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

            <p className="login-link">
              Já tem uma conta? <a href="https://app.gestaoboa.com.br">Fazer login</a>
            </p>
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
