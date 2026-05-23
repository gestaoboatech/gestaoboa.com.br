import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FB_PIXEL } from "../../utils/pixel";
import {
  CalculatorContainer,
  CalculatorGrid,
  CalculatorInputs,
  CalculatorResults,
  TabContainer,
  TabItem,
  ResultCard,
  CalculatorCTA,
  ToggleWrapper,
} from "./styles";

type PresetType = "pequeno" | "medio" | "grande" | "mega";
type UserTierType = "1" | "3" | "10" | "ilimitado";

interface PresetConfig {
  label: string;
  value: number;
}

const PRESET_CONFIGS: Record<PresetType, PresetConfig> = {
  pequeno: {
    label: "300 /mês",
    value: 300,
  },
  medio: {
    label: "1.000 /mês",
    value: 1000,
  },
  grande: {
    label: "2.500 /mês",
    value: 2500,
  },
  mega: {
    label: "5.000 /mês",
    value: 5000,
  },
};

const USER_TIER_CONFIGS: Record<UserTierType, { label: string; price: number }> = {
  "1": {
    label: "1 Usuário",
    price: 64,
  },
  "3": {
    label: "Até 3 Usuários",
    price: 89,
  },
  "10": {
    label: "Até 10 Usuários",
    price: 129,
  },
  ilimitado: {
    label: "Ilimitados",
    price: 149,
  },
};

const RoiCalculator: FunctionComponent = () => {
  const navigate = useNavigate();
  const [comandas, setComandas] = useState(500);
  const [activePreset, setActivePreset] = useState<PresetType | "custom">("custom");
  const [userTier, setUserTier] = useState<UserTierType>("3");
  const [emitNf, setEmitNf] = useState(true);

  const handleSliderChange = (val: number) => {
    setComandas(val);
    const matchingPreset = (Object.keys(PRESET_CONFIGS) as PresetType[]).find(
      (key) => PRESET_CONFIGS[key].value === val
    );
    if (matchingPreset) {
      setActivePreset(matchingPreset);
    } else {
      setActivePreset("custom");
    }
  };

  const handlePresetSelect = (key: PresetType) => {
    setActivePreset(key);
    setComandas(PRESET_CONFIGS[key].value);
  };

  // Calculations
  const costPerNota = 0.3;
  const systemPrice = USER_TIER_CONFIGS[userTier].price;
  const billingNfCost = emitNf ? comandas * costPerNota : 0;
  const totalMonthlyCost = systemPrice + billingNfCost;

  // Format helper for currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <CalculatorContainer id="invoice-simulator">
      <h2 className="calc-title">Simulador de Mensalidade</h2>
      <p className="calc-subtitle">
        Calcule o custo do sistema de acordo com a quantidade de profissionais (usuários).
        Adicione a emissão opcional de Notas Fiscais apenas se o seu negócio precisar.
      </p>

      <CalculatorGrid>
        {/* Left Side: Inputs */}
        <CalculatorInputs>
          <div className="input-group">
            <label style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
              1. Quantidade de profissionais (usuários):
            </label>
            <TabContainer>
              {(Object.keys(USER_TIER_CONFIGS) as UserTierType[]).map((key) => (
                <TabItem
                  key={key}
                  $active={userTier === key}
                  onClick={() => setUserTier(key)}
                  type="button"
                >
                  {USER_TIER_CONFIGS[key].label}
                </TabItem>
              ))}
            </TabContainer>
          </div>

          <div className="input-group" style={{ marginTop: "0.25rem" }}>
            <ToggleWrapper>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={emitNf}
                  onChange={(e) => setEmitNf(e.target.checked)}
                />
                <span className="slider-switch"></span>
              </label>
              <div className="switch-label-group">
                <span className="switch-text">Emissão de Nota Fiscal (Opcional)</span>
                <span className="switch-subtext">R$ 0,30 por nota emitida</span>
              </div>
            </ToggleWrapper>
          </div>

          <div className="input-group" style={{ opacity: emitNf ? 1 : 0.45, transition: "opacity 0.2s" }}>
            <label style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
              2. Volume estimado de comandas:
            </label>
            <TabContainer style={{ marginBottom: "0.5rem" }}>
              {(Object.keys(PRESET_CONFIGS) as PresetType[]).map((key) => (
                <TabItem
                  key={key}
                  $active={emitNf && activePreset === key}
                  onClick={() => emitNf && handlePresetSelect(key)}
                  disabled={!emitNf}
                  type="button"
                >
                  {PRESET_CONFIGS[key].label}
                </TabItem>
              ))}
            </TabContainer>

            <div className="label-row">
              <label htmlFor="comandas-slider" style={{ fontSize: "0.9rem", color: "#475569" }}>
                Comandas Geradas por Mês
              </label>
              <span className="value-display">{emitNf ? `${comandas} notas` : "Desativado"}</span>
            </div>
            <input
              id="comandas-slider"
              type="range"
              min={100}
              max={5000}
              step={50}
              value={comandas}
              disabled={!emitNf}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b" }}>
              <span>Mínimo: 100</span>
              <span>Máximo: 5.000</span>
            </div>
          </div>
        </CalculatorInputs>

        {/* Right Side: Results */}
        <CalculatorResults>
          <div>
            <div className="results-header">
              <span>🧾</span> Resumo Mensal
            </div>

            <div className="results-cards">
              <ResultCard>
                <div className="icon-wrapper">📱</div>
                <div className="info">
                  <span className="label">Assinatura ({USER_TIER_CONFIGS[userTier].label})</span>
                  <span className="value">{formatCurrency(systemPrice)}</span>
                </div>
              </ResultCard>

              <ResultCard>
                <div className="icon-wrapper">🧾</div>
                <div className="info">
                  <span className="label">Notas Fiscais {emitNf ? `(${comandas} notas)` : "(Desativado)"}</span>
                  <span className="value">{emitNf ? formatCurrency(billingNfCost) : "R$ 0,00"}</span>
                </div>
              </ResultCard>

              <ResultCard $highlight={true}>
                <div className="icon-wrapper">💰</div>
                <div className="info">
                  <span className="label">Total Mensal Estimado</span>
                  <span className="value">{formatCurrency(totalMonthlyCost)}</span>
                </div>
              </ResultCard>
            </div>
          </div>

          <CalculatorCTA
            href={`/criar-conta?plano=${
              userTier === "1"
                ? "basico"
                : userTier === "3"
                ? "crescimento"
                : "empresarial"
            }`}
            onClick={(e) => {
              e.preventDefault();
              const selectedPlan =
                userTier === "1"
                  ? "basico"
                  : userTier === "3"
                  ? "crescimento"
                  : "empresarial";

              FB_PIXEL.trackStartTrial({
                plan: selectedPlan,
                users: userTier,
                comandas: comandas,
                invoices: emitNf ? "sim" : "nao",
                totalCost: totalMonthlyCost,
              });

              navigate(`/criar-conta?plano=${selectedPlan}`);
            }}
            title="Começar Meu Teste Grátis de 20 Dias"
          >
            Começar Teste Grátis de 20 Dias ⚡️
          </CalculatorCTA>
        </CalculatorResults>
      </CalculatorGrid>
    </CalculatorContainer>
  );
};

export default RoiCalculator;
