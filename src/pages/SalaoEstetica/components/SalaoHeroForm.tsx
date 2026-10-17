import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Sparkles,
  DollarSign,
  Users,
  ArrowRight,
  Lock,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { sendSalaoHeroLeadToSheets } from "../../../services/formSubmission";
import { FB_PIXEL } from "../../../utils/pixel";
import "./SalaoHeroForm.css";

const FATURAMENTO_OPTIONS = [
  { value: "", label: "Selecione a faixa de faturamento" },
  { value: "Até R$ 5.000", label: "Até R$ 5.000 / mês" },
  { value: "R$ 5.000 a R$ 15.000", label: "R$ 5.000 a R$ 15.000 / mês" },
  { value: "R$ 15.000 a R$ 30.000", label: "R$ 15.000 a R$ 30.000 / mês" },
  { value: "R$ 30.000 a R$ 50.000", label: "R$ 30.000 a R$ 50.000 / mês" },
  { value: "Acima de R$ 50.000", label: "Acima de R$ 50.000 / mês" },
];

const COLABORADORES_OPTIONS = [
  { value: "", label: "Selecione a quantidade de profissionais" },
  { value: "1", label: "Apenas eu (1 profissional)", plan: "basico" },
  { value: "2-3", label: "2 a 3 profissionais", plan: "crescimento" },
  { value: "4-6", label: "4 a 6 profissionais", plan: "empresarial" },
  { value: "7+", label: "Mais de 6 profissionais", plan: "ilimitado" },
];

export const SalaoHeroForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    nomeSalao: "",
    faturamento: "",
    colaboradores: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (!numbers) return "";
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formatted }));
    if (errors.telefone) {
      setErrors((prev) => ({ ...prev, telefone: "" }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Insira seu nome completo";
    } else if (formData.nome.trim().split(" ").length < 2) {
      newErrors.nome = "Insira nome e sobrenome";
    }

    const cleanPhone = formData.telefone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.telefone = "Insira seu WhatsApp";
    } else if (cleanPhone.length < 10) {
      newErrors.telefone = "Número de WhatsApp incompleto";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Insira seu e-mail";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Insira um e-mail válido";
    }

    if (!formData.nomeSalao.trim()) {
      newErrors.nomeSalao = "Insira o nome do seu salão ou clínica";
    }

    if (!formData.faturamento) {
      newErrors.faturamento = "Selecione o faturamento médio";
    }

    if (!formData.colaboradores) {
      newErrors.colaboradores = "Selecione o número de profissionais";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Enviar para a planilha via Google Sheets
      await sendSalaoHeroLeadToSheets({
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        nomeSalao: formData.nomeSalao,
        faturamento: formData.faturamento,
        colaboradores: formData.colaboradores,
        origem: "salao_estetica_hero_form",
      });

      // 2. Determinar plano recomendado baseado em colaboradores
      const selectedColabOption = COLABORADORES_OPTIONS.find(
        (opt) => opt.value === formData.colaboradores
      );
      const recommendedPlan = selectedColabOption?.plan || "crescimento";

      // 3. Disparar eventos no Meta Pixel
      FB_PIXEL.trackLead({
        content_name: "Hero Salao Cadastro",
        empresa: formData.nomeSalao,
        faturamento: formData.faturamento,
        colaboradores: formData.colaboradores,
        plano: recommendedPlan,
      });

      FB_PIXEL.trackStartTrial({
        content_name: "Hero Salao StartTrial",
        plan: recommendedPlan,
      });

      // 4. Separar nome e sobrenome
      const parts = formData.nome.trim().split(" ");
      const firstName = parts[0] || "";
      const surname = parts.slice(1).join(" ") || "";

      // 5. Montar query params para a página /criar-conta
      const params = new URLSearchParams({
        nome: firstName,
        sobrenome: surname,
        email: formData.email.trim().toLowerCase(),
        telefone: formData.telefone,
        empresa: formData.nomeSalao.trim(),
        ramo: "salao",
        plano: recommendedPlan,
        colaboradores: formData.colaboradores,
        faturamento: formData.faturamento,
        origem: "salao-estetica",
      });

      // 6. Navegar com as informações pré-preenchidas
      navigate(`/criar-conta?${params.toString()}`, {
        state: {
          name: firstName,
          surname: surname,
          email: formData.email.trim().toLowerCase(),
          phone: formData.telefone,
          companyName: formData.nomeSalao.trim(),
          category: "salao",
          plan: recommendedPlan,
          colaboradores: formData.colaboradores,
          faturamento: formData.faturamento,
        },
      });
    } catch (err) {
      console.error("Erro ao processar formulário do salão:", err);
      setSubmitError("Houve uma oscilação na conexão. Tentando avançar...");

      setTimeout(() => {
        const parts = formData.nome.trim().split(" ");
        const firstName = parts[0] || "";
        const surname = parts.slice(1).join(" ") || "";
        navigate(
          `/criar-conta?nome=${encodeURIComponent(firstName)}&sobrenome=${encodeURIComponent(
            surname
          )}&email=${encodeURIComponent(formData.email.trim())}&telefone=${encodeURIComponent(
            formData.telefone
          )}&empresa=${encodeURIComponent(formData.nomeSalao.trim())}&ramo=salao`
        );
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="salao-hero-form-card">
      <div className="salao-form-header-badge">
        <span className="badge-dot" />
        <Sparkles size={14} />
        Teste Grátis por 10 Dias
      </div>

      <h2 className="salao-form-card-title">Transforme seu Espaço</h2>
      <p className="salao-form-card-subtitle">
        Cadastre-se e profissionalize seus agendamentos e comissões hoje mesmo:
      </p>

      {submitError && <div className="salao-general-error">{submitError}</div>}

      <form onSubmit={handleSubmit} className="salao-hero-lead-form" noValidate>
        {/* Nome Completo */}
        <div className="salao-form-group">
          <label className="salao-form-label">
            Seu Nome Completo <span className="required-star">*</span>
          </label>
          <div className="salao-input-with-icon">
            <input
              type="text"
              name="nome"
              placeholder="Ex: Maria Clara Santos"
              value={formData.nome}
              onChange={handleChange}
              className={`salao-input ${errors.nome ? "has-error" : ""}`}
              disabled={loading}
              autoComplete="name"
            />
            <div className="salao-input-icon">
              <User size={18} />
            </div>
          </div>
          {errors.nome && <span className="salao-field-error">{errors.nome}</span>}
        </div>

        {/* Telefone e Email em 2 Colunas */}
        <div className="salao-form-row-2cols">
          <div className="salao-form-group">
            <label className="salao-form-label">
              WhatsApp com DDD <span className="required-star">*</span>
            </label>
            <div className="salao-input-with-icon">
              <input
                type="tel"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={handlePhoneChange}
                className={`salao-input ${errors.telefone ? "has-error" : ""}`}
                disabled={loading}
                autoComplete="tel"
              />
              <div className="salao-input-icon">
                <Phone size={18} />
              </div>
            </div>
            {errors.telefone && (
              <span className="salao-field-error">{errors.telefone}</span>
            )}
          </div>

          <div className="salao-form-group">
            <label className="salao-form-label">
              Seu E-mail <span className="required-star">*</span>
            </label>
            <div className="salao-input-with-icon">
              <input
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                className={`salao-input ${errors.email ? "has-error" : ""}`}
                disabled={loading}
                autoComplete="email"
              />
              <div className="salao-input-icon">
                <Mail size={18} />
              </div>
            </div>
            {errors.email && (
              <span className="salao-field-error">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Nome do Salão / Clínica */}
        <div className="salao-form-group">
          <label className="salao-form-label">
            Nome do Salão ou Clínica <span className="required-star">*</span>
          </label>
          <div className="salao-input-with-icon">
            <input
              type="text"
              name="nomeSalao"
              placeholder="Ex: Studio Bella Donna"
              value={formData.nomeSalao}
              onChange={handleChange}
              className={`salao-input ${errors.nomeSalao ? "has-error" : ""}`}
              disabled={loading}
            />
            <div className="salao-input-icon">
              <Heart size={18} />
            </div>
          </div>
          {errors.nomeSalao && (
            <span className="salao-field-error">{errors.nomeSalao}</span>
          )}
        </div>

        {/* Faturamento e Colaboradores em 2 Colunas */}
        <div className="salao-form-row-2cols">
          <div className="salao-form-group">
            <label className="salao-form-label">
              Faturamento Médio <span className="required-star">*</span>
            </label>
            <div className="salao-input-with-icon">
              <select
                name="faturamento"
                value={formData.faturamento}
                onChange={handleChange}
                className={`salao-select ${errors.faturamento ? "has-error" : ""}`}
                disabled={loading}
              >
                {FATURAMENTO_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="salao-input-icon">
                <DollarSign size={18} />
              </div>
            </div>
            {errors.faturamento && (
              <span className="salao-field-error">{errors.faturamento}</span>
            )}
          </div>

          <div className="salao-form-group">
            <label className="salao-form-label">
              Profissionais <span className="required-star">*</span>
            </label>
            <div className="salao-input-with-icon">
              <select
                name="colaboradores"
                value={formData.colaboradores}
                onChange={handleChange}
                className={`salao-select ${errors.colaboradores ? "has-error" : ""}`}
                disabled={loading}
              >
                {COLABORADORES_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="salao-input-icon">
                <Users size={18} />
              </div>
            </div>
            {errors.colaboradores && (
              <span className="salao-field-error">{errors.colaboradores}</span>
            )}
          </div>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          className="salao-btn-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="salao-btn-spinner" />
              <span>Liberando seu acesso...</span>
            </>
          ) : (
            <>
              <span>Experimentar Grátis por 10 Dias</span>
              <ArrowRight size={19} />
            </>
          )}
        </button>
      </form>

      {/* Rodapé de Confiança */}
      <div className="salao-trust-footer">
        <div className="salao-trust-badges-row">
          <div className="salao-trust-badge-item">
            <CheckCircle2 size={15} />
            <span>10 dias grátis</span>
          </div>
          <div className="salao-trust-badge-item">
            <CheckCircle2 size={15} />
            <span>Sem cartão</span>
          </div>
          <div className="salao-trust-badge-item">
            <CheckCircle2 size={15} />
            <span>Configuração rápida</span>
          </div>
        </div>
        <div className="salao-security-note">
          <Lock size={12} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />
          Seus dados estão protegidos pela LGPD. Cancele quando quiser.
        </div>
      </div>
    </div>
  );
};

export default SalaoHeroForm;
