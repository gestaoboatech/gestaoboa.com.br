import React, { useRef, useState } from "react";
import {
  loginUser,
  registerUser,
  resendEmail,
} from "../../../services/userApi";
import CompanyCreationForm from "./CompanyCreationForm";
import LoginForm from "./LoginForm";
import PaymentForm from "./PaymentForm";
import "./UserRegistrationForm.css";

interface UserRegistrationFormProps {
  planName: string;
  onClose: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  planName,
  onClose,
}) => {
  const [step, setStep] = useState<
    "form" | "confirmation" | "payment" | "company"
  >("form");
  const [userToken, setUserToken] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
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

    // Validate file is an image and size is acceptable
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("A imagem deve ter no máximo 5MB.");
      return;
    }

    // Convert to base64 for preview and submission
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

    // Validate form
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
      // Format birthday for API (DD/MM/YYYY to YYYY-MM-DD)
      const birthdayParts = formData.birthday.split("/");
      const formattedBirthday =
        birthdayParts.length === 3
          ? `${birthdayParts[2]}-${birthdayParts[1]}-${birthdayParts[0]}T17:28:17.213Z`
          : formData.birthday;
      // Prepare data for API
      const userData = {
        name: formData.name,
        surname: formData.surname,
        document: formData.document.replace(/\D/g, ""),
        email: formData.email,
        password: formData.password,
        birthday: formattedBirthday,
        phone: formData.phone.replace(/\D/g, ""),
        gender: "", // Not collected in this form
        cep: "", // Not collected in this form
        address: "", // Not collected in this form
        address_number: "", // Not collected in this form
        city: "", // Not collected in this form
        district: "", // Not collected in this form
        send_email: true,
      };

      // Use the registerUser function from userApi
      const result = await registerUser(userData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao registrar usuário");
      }

      // Move to confirmation step
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
      // Use the resendEmail function from userApi
      const result = await resendEmail(formData.email);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao reenviar o email");
      }

      // Show success message
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
      // Login the user to get the token
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
  const handleCompanyCreated = () => {
    // Redirect to the platform
    window.open("https://app.gestaoboa.com.br", "_blank");
    onClose();
  };
  const handleLoginSuccess = (
    token: string,
    email: string,
    document: string
  ) => {
    setUserToken(token);
    setShowLoginForm(false);
    // Pass user data to PaymentForm
    setFormData((prev) => ({
      ...prev,
      email: email,
      document: document,
    }));
    setStep("payment");
  };

  const handlePaymentSuccess = () => {
    setStep("company");
  };

  const handleCloseLogin = () => {
    setShowLoginForm(false);
  };
  // Se estamos no passo de pagamento, renderizar apenas o PaymentForm
  if (step === "payment" && userToken) {
    return (
      <PaymentForm
        planName={planName}
        planPrice="97,00"
        onClose={onClose}
        onPaymentSuccess={handlePaymentSuccess}
        userEmail={formData.email}
        userDocument={formData.document}
      />
    );
  }

  // Se estamos no passo da empresa, renderizar apenas o CompanyCreationForm
  if (step === "company" && userToken) {
    return (
      <CompanyCreationForm
        userToken={userToken}
        onClose={onClose}
        onSuccess={handleCompanyCreated}
      />
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
            <h2>Teste Grátis - Plano {planName}</h2>
            <p className="registration-form-description">
              Preencha seus dados para iniciar o período de teste de 21 dias
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
              {error && <div className="registration-error">{error}</div>}{" "}
              <button
                type="submit"
                className="registration-submit-button"
                disabled={loading}
              >
                {loading ? "Processando..." : "Criar Conta"}
              </button>
              {/* <button
                type="button"
                className="login-button"
                onClick={handleShowLogin}
                disabled={loading}
              >
                Já possuo conta
              </button> */}
            </form>
          </>
        ) : (
          <div className="confirmation-container">
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
            </button>{" "}
            <button
              className="access-platform-button"
              onClick={handleCreateCompany}
              disabled={loading}
            >
              {loading ? "Processando..." : "Criar Empresa"}
            </button>{" "}
            <div className="secure-info">
              <span className="info-icon">ℹ️</span> Após confirmar seu email,
              você poderá acessar a plataforma.
            </div>
          </div>
        )}
      </div>

      {/* Modal de Login */}
      {showLoginForm && (
        <LoginForm
          onClose={handleCloseLogin}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default UserRegistrationForm;
