import React, { useState } from "react";
import { FB_PIXEL } from "../../utils/pixel";
import {
  CalculatorContainer,
  HeaderArea,
  CalcCard,
  InputsCol,
  InputGroup,
  ResultCol,
  StatBlock,
  ROIHighlight,
  CTAButton,
} from "./styles";

export const LostRevenueCalculator: React.FC = () => {
  const [atendimentosPorSemana, setAtendimentosPorSemana] = useState(50);
  const [ticketMedio, setTicketMedio] = useState(50);
  const [faltasPorSemana, setFaltasPorSemana] = useState(4);

  // Cálculos
  const perdaMensal = faltasPorSemana * ticketMedio * 4.3;
  // A automação por WhatsApp do Gestão Boa reduz até 75% das faltas (recupera 75%)
  const recuperadoMensal = perdaMensal * 0.75;
  const mensalidadeSistema = 64; // Plano inicial
  const roiMultiplicador = Math.max(1, Math.round(recuperadoMensal / mensalidadeSistema));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleTrackAndNavigate = () => {
    FB_PIXEL.trackCustomEvent("CalculateNoShowROI", {
      weeklyAppointments: atendimentosPorSemana,
      averageTicket: ticketMedio,
      weeklyNoShows: faltasPorSemana,
      monthlyLoss: perdaMensal,
      recoveredMonthly: recuperadoMensal,
    });
  };

  return (
    <CalculatorContainer id="calculadora-faltas">
      <HeaderArea>
        <div className="badge">
          <span>⚡ Calculadora de Retorno Real</span>
        </div>
        <h2>
          Descubra quanto dinheiro você <span>perde por mês</span> com clientes que não comparecem
        </h2>
        <p>
          Lembretes manuais não funcionam. Veja o faturamento que o Gestão Boa recupera automaticamente
          para o seu caixa através do WhatsApp.
        </p>
      </HeaderArea>

      <CalcCard>
        <InputsCol>
          <InputGroup>
            <div className="label-row">
              <label htmlFor="atendimentos">Atendimentos por semana:</label>
              <span className="value-pill">{atendimentosPorSemana} agendamentos</span>
            </div>
            <input
              id="atendimentos"
              type="range"
              min={10}
              max={250}
              step={5}
              value={atendimentosPorSemana}
              onChange={(e) => setAtendimentosPorSemana(Number(e.target.value))}
            />
            <div className="range-limits">
              <span>10</span>
              <span>250</span>
            </div>
          </InputGroup>

          <InputGroup>
            <div className="label-row">
              <label htmlFor="ticket">Preço médio por serviço:</label>
              <span className="value-pill">R$ {ticketMedio},00</span>
            </div>
            <input
              id="ticket"
              type="range"
              min={25}
              max={250}
              step={5}
              value={ticketMedio}
              onChange={(e) => setTicketMedio(Number(e.target.value))}
            />
            <div className="range-limits">
              <span>R$ 25</span>
              <span>R$ 250</span>
            </div>
          </InputGroup>

          <InputGroup>
            <div className="label-row">
              <label htmlFor="faltas">Faltas ou furos por semana:</label>
              <span className="value-pill" style={{ color: "#dc2626", background: "#fef2f2" }}>
                {faltasPorSemana} faltas
              </span>
            </div>
            <input
              id="faltas"
              type="range"
              min={1}
              max={30}
              step={1}
              value={faltasPorSemana}
              onChange={(e) => setFaltasPorSemana(Number(e.target.value))}
            />
            <div className="range-limits">
              <span>1 falta</span>
              <span>30 faltas</span>
            </div>
          </InputGroup>
        </InputsCol>

        <ResultCol>
          <div>
            <StatBlock>
              <div className="stat-label">
                <span>❌</span> Faturamento perdido hoje (por mês):
              </div>
              <div className="lost-value">{formatCurrency(perdaMensal)} /mês</div>
              <div className="stat-sub">
                Dinheiro que entra na agenda e simplesmente desaparece sem aviso.
              </div>
            </StatBlock>

            <StatBlock>
              <div className="stat-label">
                <span>✅</span> Recuperado com o Gestão Boa:
              </div>
              <div className="recovered-value">+{formatCurrency(recuperadoMensal)} /mês</div>
              <div className="stat-sub">
                Redução de até 75% dos no-shows através da confirmação automática via WhatsApp.
              </div>
            </StatBlock>

            <ROIHighlight>
              <div className="roi-title">
                <span>🚀</span> O sistema se paga {roiMultiplicador}x todo mês!
              </div>
              <div className="roi-desc">
                Recuperando apenas <strong>2 cortes ou atendimentos</strong>, a mensalidade do Gestão Boa já
                está 100% paga. O resto é lucro líquido no seu bolso.
              </div>
            </ROIHighlight>
          </div>

          <CTAButton
            href="/criar-conta?plano=crescimento"
            onClick={handleTrackAndNavigate}
          >
            Quero Parar de Perder Dinheiro ➔
          </CTAButton>
        </ResultCol>
      </CalcCard>
    </CalculatorContainer>
  );
};

export default LostRevenueCalculator;
