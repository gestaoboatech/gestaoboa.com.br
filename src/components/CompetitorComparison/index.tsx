import React from "react";
import { FB_PIXEL } from "../../utils/pixel";
import {
  ComparisonSection,
  ComparisonHeader,
  TableWrapper,
  ComparisonTable,
  ComparisonFooter,
} from "./styles";

export const CompetitorComparison: React.FC = () => {
  const comparisonRows = [
    {
      feature: "Teste Gratuito sem Cartão",
      sub: "Acesso total a todas as funções para testar na prática",
      gestaoboa: "20 Dias Livres",
      competitors: "5 dias ou pede cartão",
      manual: "Não se aplica",
      isGestaoboaCheck: true,
    },
    {
      feature: "Confirmação Automática WhatsApp",
      sub: "Lembrete 24h e 2h antes com atualização imediata da agenda",
      gestaoboa: "Incluso em todos os planos",
      competitors: "Cobrado à parte (R$ 50 - 150/mês)",
      manual: "Você gasta 2h todo dia digitando",
      isGestaoboaCheck: true,
    },
    {
      feature: "Cliente precisa baixar app?",
      sub: "Agendamento rápido pelo link na bio do Instagram",
      gestaoboa: "Não (100% web em 3 cliques)",
      competitors: "Exige download de app",
      manual: "Mensagens soltas no WhatsApp",
      isGestaoboaCheck: true,
    },
    {
      feature: "Cálculo Automático de Comissões",
      sub: "App individual para profissionais consultarem seus ganhos",
      gestaoboa: "Sim (Zero brigas na equipe)",
      competitors: "Apenas nos planos mais caros",
      manual: "Planilhas confusas e papel",
      isGestaoboaCheck: true,
    },
    {
      feature: "Clube de Assinaturas & Recorrência",
      sub: "Crie planos mensais de corte/serviços recorrentes",
      gestaoboa: "Sim (Previsibilidade de receita)",
      competitors: "Com taxas percentuais extras",
      manual: "Não possui",
      isGestaoboaCheck: true,
    },
    {
      feature: "Suporte Técnico",
      sub: "Agilidade quando você tiver qualquer dúvida",
      gestaoboa: "Humano e ágil via WhatsApp",
      competitors: "Chamados demorados por e-mail",
      manual: "Nenhum",
      isGestaoboaCheck: true,
    },
    {
      feature: "Preço Inicial",
      sub: "Transparência total sem surpresas na fatura",
      gestaoboa: "A partir de R$ 64,00/mês",
      competitors: "R$ 120,00 a R$ 250,00+",
      manual: "Perde centenas de R$ em faltas",
      isGestaoboaCheck: true,
    },
  ];

  return (
    <ComparisonSection id="comparativo">
      <ComparisonHeader>
        <div className="badge">
          <span>⚖️ Comparativo de Mercado</span>
        </div>
        <h2>
          Por que a <span>Gestão Boa</span> é a escolha mais inteligente?
        </h2>
        <p>
          Compare e veja por que centenas de barbearias, salões e clínicas trocaram sistemas
          complicados e caros pela Gestão Boa.
        </p>
      </ComparisonHeader>

      <TableWrapper>
        <ComparisonTable>
          <thead>
            <tr>
              <th className="col-feature">Recursos & Benefícios</th>
              <th className="col-gestaoboa th-header">
                <div className="brand-title">Gestão Boa</div>
                <span className="badge-tag">Mais Recomendado</span>
              </th>
              <th className="col-competitors">Sistemas Tradicionais (Trinks, Avec...)</th>
              <th className="col-manual">Caderno, Papel ou Planilhas</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, idx) => (
              <tr key={idx}>
                <td className="col-feature">
                  <strong>{row.feature}</strong>
                  <span className="feature-sub">{row.sub}</span>
                </td>
                <td className="col-gestaoboa">
                  <span className="highlight-text">{row.gestaoboa}</span>
                </td>
                <td className="col-competitors">{row.competitors}</td>
                <td className="col-manual">{row.manual}</td>
              </tr>
            ))}
          </tbody>
        </ComparisonTable>
      </TableWrapper>

      <ComparisonFooter>
        <a
          href="/criar-conta?plano=crescimento"
          className="cta-link"
          onClick={() => {
            FB_PIXEL.trackCustomEvent("ComparisonCTAClick", {
              section: "comparative_table",
            });
          }}
        >
          Experimente 20 Dias Grátis Agora ➔
        </a>
      </ComparisonFooter>
    </ComparisonSection>
  );
};

export default CompetitorComparison;
