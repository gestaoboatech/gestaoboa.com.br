import React, { useState } from "react";
import { loginUser } from "../../../services/userApi";
import "./LoginForm.css";

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: (token: string, email: string, document: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Por favor, insira um email válido.");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const loginResult = await loginUser(formData.email, formData.password);
      if (loginResult.error) {
        throw new Error(loginResult.error.message ?? "Erro ao fazer login");
      }

      // Extrair documento do usuário se disponível nos dados do usuário
      const userDocument = loginResult.userData?.document || "";

      // Login successful, pass token, email e documento to parent
      onLoginSuccess(loginResult.token, formData.email, userDocument);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-overlay">
      <div className="login-form-container">
        <button className="login-form-close" onClick={onClose}>
          ×
        </button>

        <h2>Entrar na Conta</h2>
        <p className="login-form-description">
          Entre com suas credenciais para acessar a plataforma
        </p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Sua senha"
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
