import React, { useRef, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  resendEmail,
  createCompany,
  EnterpriseBranch,
  getEnterpriseBranches,
} from "../../../services/userApi";
import "../../Price/components/UserRegistrationForm.css";
import "../../Price/components/CompanyCreationForm.css";

interface BlackFridayRegistrationFormProps {
  onClose: () => void;
}

const SCALE_OPTIONS = [
  { id: 1, name: "MEI", description: "Microempreendedor Individual" },
  { id: 2, name: "ME", description: "Microempresa" },
  { id: 3, name: "Startup", description: "Empresa de tecnologia" },
  { id: 4, name: "Outro", description: "Outros tipos de empresa" },
];

const BlackFridayRegistrationForm: React.FC<BlackFridayRegistrationFormProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState<
    "form" | "confirmation" | "company"
  >("form");
  const [companyStep, setCompanyStep] = useState(0);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    surname: "",
    document: "", // CPF
    birthday: "",
    phone: "",
    email: "",
    password: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

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

    if (step === "company") {
      fetchCategories();
    }
  }, [step]);

  const formatCPF = (value: string) => {
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
      return formatted;
    }
    return value;
  };

  const formatBirthday = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 8) {
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      }
      if (cleaned.length > 4) {
        formatted = `${formatted.slice(0, 5)}/${formatted.slice(5)}`;
      }
      return formatted;
    }
    return value;
  };

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
    if (name === "document") {
      formattedValue = formatCPF(value);
    } else if (name === "birthday") {
      formattedValue = formatBirthday(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({
          ...prev,
          photo: event.target!.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.surname.trim()) {
      setError("Por favor, preencha seu nome e sobrenome.");
      return;
    }

    if (
      !formData.document.replace(/\D/g, "") ||
      formData.document.replace(/\D/g, "").length !== 11
    ) {
      setError("Por favor, insira um CPF válido.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Por favor, insira um email válido.");
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
      const birthdayParts = formData.birthday.split("/");
      const formattedBirthday =
        birthdayParts.length === 3
          ? `${birthdayParts[2]}-${birthdayParts[1]}-${birthdayParts[0]}T17:28:17.213Z`
          : formData.birthday;

      const userData = {
        name: formData.name,
        surname: formData.surname,
        document: formData.document.replace(/\D/g, ""),
        email: formData.email,
        password: formData.password,
        birthday: formattedBirthday,
        phone: formData.phone.replace(/\D/g, ""),
        gender: "",
        cep: "",
        address: "",
        address_number: "",
        city: "",
        district: "",
        send_email: true,
      };

      const result = await registerUser(userData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao registrar usuário");
      }

      setStep("confirmation");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar o registro"
      );
      console.error("Erro no registro do usuário:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await resendEmail(formData.email);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao reenviar o email");
      }

      alert("Email reenviado com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao reenviar o email");
      console.error("Erro ao reenviar o email:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async () => {
    setLoading(true);
    setError(null);

    try {
      const loginResult = await loginUser(formData.email, formData.password);
      if (loginResult.error) {
        throw new Error(loginResult.error.message ?? "Erro ao fazer login");
      }
      setUserToken(loginResult.token);
      setStep("company");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar login");
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  // Company creation handlers
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

      // Redireciona para o link de pagamento do Asaas
      window.open("https://www.asaas.com/c/djam9ndwkf1l3lsi", "_blank");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar empresa");
      console.error("Error creating company:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderCompanyStepContent = () => {
    switch (companyStep) {
      case 0:
        return (
          <div className="company-step">
            <h3>Nome da Empresa</h3>
            <p className="step-description">Qual é o nome da sua barbearia/empresa?</p>
            <div className="form-group">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Digite o nome da sua empresa"
                className="company-input"
                autoFocus
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="company-step">
            <h3>Categoria</h3>
            <p className="step-description">
              Selecione a categoria que melhor descreve sua empresa
            </p>
            <div className="options-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`option-card ${
                    selectedCategory?.id === category.id ? "selected" : ""
                  }`}
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
          <div className="company-step">
            <h3>Porte da Empresa</h3>
            <p className="step-description">Selecione o porte da sua empresa</p>
            <div className="options-grid">
              {SCALE_OPTIONS.map((scale) => (
                <div
                  key={scale.id}
                  className={`option-card ${
                    selectedScale?.id === scale.id ? "selected" : ""
                  }`}
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

  // Render company creation form
  if (step === "company" && userToken) {
    const stepLabels = ["Nome", "Categoria", "Porte"];
    
    return (
      <div className="company-creation-overlay">
        <div className="company-creation-container">
          <button className="company-creation-close" onClick={onClose}>
            ×
          </button>

          <div className="company-creation-header">
            <h2>🔥 Black Friday - Criar Empresa</h2>
            <div className="progress-indicator">
              <div className="progress-steps-enhanced">
                {[0, 1, 2].map((stepNumber) => (
                  <div key={stepNumber} className="progress-step-wrapper">
                    <div
                      className={`progress-step-circle ${
                        companyStep > stepNumber ? "completed" : 
                        companyStep === stepNumber ? "active" : ""
                      }`}
                    >
                      {companyStep > stepNumber ? "✓" : stepNumber + 1}
                    </div>
                    <span className={`progress-step-label ${
                      companyStep >= stepNumber ? "active" : ""
                    }`}>
                      {stepLabels[stepNumber]}
                    </span>
                    {stepNumber < 2 && (
                      <div className={`progress-line ${
                        companyStep > stepNumber ? "completed" : ""
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="company-creation-content">
            {renderCompanyStepContent()}
            {error && <div className="company-error">{error}</div>}
          </div>

          <div className="company-creation-footer">
            {companyStep > 0 && (
              <button
                className="company-back-button"
                onClick={handleCompanyBack}
                disabled={loading}
              >
                ← Voltar
              </button>
            )}
            {companyStep < 2 ? (
              <button
                className="company-next-button"
                onClick={handleCompanyNext}
                disabled={loading}
              >
                Próximo →
              </button>
            ) : (
              <button
                className="company-submit-button"
                onClick={handleCompanySubmit}
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar e Ir para Pagamento 🎁"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-form-overlay">
      <div className="registration-form-container">
        <button className="registration-form-close" onClick={onClose}>
          ×
        </button>

        {step === "form" ? (
          <>
            <div className="registration-progress">
              <div className="registration-progress-steps">
                <div className="registration-step active">
                  <span className="registration-step-number">1</span>
                  <span className="registration-step-text">Criar conta</span>
                </div>
                <div className="registration-step-line"></div>
                <div className="registration-step">
                  <span className="registration-step-number">2</span>
                  <span className="registration-step-text">Confirmar email</span>
                </div>
                <div className="registration-step-line"></div>
                <div className="registration-step">
                  <span className="registration-step-number">3</span>
                  <span className="registration-step-text">Criar empresa</span>
                </div>
              </div>
            </div>
            
            <h2>🔥 Black Friday - Criar Conta</h2>
            <p className="registration-form-description">
              Crie sua conta para aproveitar a promoção de R$ 9,90
            </p>

            <form onSubmit={handleSubmit}>
              <div className="avatar-upload">
                <div
                  className="avatar-preview"
                  onClick={() => photoInputRef.current?.click()}
                  style={{
                    backgroundImage: formData.photo
                      ? `url(${formData.photo})`
                      : "url('https://via.placeholder.com/150')",
                  }}
                >
                  <div className="avatar-edit">
                    <span>+</span>
                  </div>
                </div>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  ref={photoInputRef}
                  style={{ display: "none" }}
                />
                <label htmlFor="photo" className="photo-label">
                  Adicionar foto
                </label>
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="name">Nome*</label>
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

                <div className="form-group half">
                  <label htmlFor="surname">Sobrenome*</label>
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
                <label htmlFor="document">CPF*</label>
                <input
                  type="text"
                  id="document"
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="birthday">Data de Nascimento</label>
                  <input
                    type="text"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    placeholder="DD/MM/AAAA"
                  />
                </div>

                <div className="form-group half">
                  <label htmlFor="phone">Telefone*</label>
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
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha*</label>
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
              <div className="form-group checkbox-group">
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
                  </a>
                </label>
              </div>
              {error && <div className="registration-error">{error}</div>}
              <button
                type="submit"
                className="registration-submit-button"
                disabled={loading}
              >
                {loading ? "Processando..." : "Criar Conta"}
              </button>
            </form>
          </>
        ) : (
          <div className="confirmation-container">
            <div className="registration-progress">
              <div className="registration-progress-steps">
                <div className="registration-step completed">
                  <span className="registration-step-number">✓</span>
                  <span className="registration-step-text">Criar conta</span>
                </div>
                <div className="registration-step-line completed"></div>
                <div className="registration-step active">
                  <span className="registration-step-number">2</span>
                  <span className="registration-step-text">Confirmar email</span>
                </div>
                <div className="registration-step-line"></div>
                <div className="registration-step">
                  <span className="registration-step-number">3</span>
                  <span className="registration-step-text">Criar empresa</span>
                </div>
              </div>
            </div>
            
            <div className="confirmation-envelope">✉️</div>
            <h3>Confirme seu Email</h3>
            <p>
              Enviamos um link de confirmação para{" "}
              <strong>{formData.email}</strong>. Por favor, verifique sua caixa
              de entrada e confirme seu email para ativar sua conta.
            </p>
            <p className="small-text">
              Não recebeu o email? Verifique sua pasta de spam ou clique abaixo
              para reenviar.
            </p>
            <button
              className="resend-email-button"
              onClick={handleResendEmail}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Reenviar Email"}
            </button>
            <button
              className="access-platform-button"
              onClick={handleCreateCompany}
              disabled={loading}
            >
              {loading ? "Processando..." : "Criar Empresa →"}
            </button>
            <div className="secure-info">
              <span className="info-icon">ℹ️</span> Após confirmar seu email e criar sua empresa,
              você será redirecionado para o pagamento.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlackFridayRegistrationForm;
