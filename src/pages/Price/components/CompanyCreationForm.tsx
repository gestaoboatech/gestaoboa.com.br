import React, { useEffect, useState } from "react";
import {
  createCompany,
  EnterpriseBranch,
  getEnterpriseBranches,
} from "../../../services/userApi";
import "./CompanyCreationForm.css";

interface CompanyCreationFormProps {
  userToken: string;
  onClose: () => void;
  onSuccess: () => void;
}

const SCALE_OPTIONS = [
  { id: 1, name: "MEI", description: "Microempreendedor Individual" },
  { id: 2, name: "ME", description: "Microempresa" },
  { id: 3, name: "Startup", description: "Empresa de tecnologia" },
  { id: 4, name: "Outro", description: "Outros tipos de empresa" },
];

const CompanyCreationForm: React.FC<CompanyCreationFormProps> = ({
  userToken,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<EnterpriseBranch | null>(null);
  const [selectedScale, setSelectedScale] = useState<
    (typeof SCALE_OPTIONS)[0] | null
  >(null);
  const [categories, setCategories] = useState<EnterpriseBranch[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEnterpriseBranches();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Erro ao carregar categorias");
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleNext = () => {
    setError(null);

    if (step === 0) {
      if (!companyName.trim()) {
        setError("Por favor, insira o nome da empresa");
        return;
      }
      setStep(1);
    } else if (step === 1) {
      if (!selectedCategory) {
        setError("Por favor, selecione uma categoria");
        return;
      }
      setStep(2);
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
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

      console.log("Sending company data:", companyData); // Para debug

      const result = await createCompany(userToken, companyData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao criar empresa");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar empresa");
      console.error("Error creating company:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="company-step">
            <h3>Nome da Empresa</h3>
            <p className="step-description">Qual é o nome da sua empresa?</p>
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
                  <span className="option-description">
                    {scale.description}
                  </span>
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
    <div className="company-creation-overlay">
      <div className="company-creation-container">
        <button className="company-creation-close" onClick={onClose}>
          ×
        </button>

        <div className="company-creation-header">
          <h2>Criar Empresa</h2>
          <div className="progress-bar">
            <div className="progress-steps">
              {[0, 1, 2].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`progress-step ${
                    step >= stepNumber ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="company-creation-content">
          {renderStepContent()}

          {error && <div className="error-message">{error}</div>}

          <div className="company-creation-actions">
            {step > 0 && (
              <button
                type="button"
                className="back-button"
                onClick={handleBack}
                disabled={loading}
              >
                Voltar
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                className="next-button"
                onClick={handleNext}
                disabled={loading}
              >
                Próximo
              </button>
            ) : (
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar Empresa"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreationForm;
