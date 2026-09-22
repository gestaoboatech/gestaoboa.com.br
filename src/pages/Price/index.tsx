import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container } from "../Terms/styles";
import PaymentForm from "./components/PaymentForm";
import PriceTag from "./components/PriceTag";
import UserRegistrationForm from "./components/UserRegistrationForm";
import "./styles.css";

type PlanType = "Anual" | "Semestral" | "Mensal";

const PLAN_PRICES: Record<
  PlanType,
  { Basico: number; Standard: number; Premium: number; Ilimitado: number }
> = {
  Mensal: {
    Basico: 79.90,
    Standard: 99.90,
    Premium: 129.90,
    Ilimitado: 179.90,
  },
  Semestral: {
    Basico: 69.90,
    Standard: 89.90,
    Premium: 119.90,
    Ilimitado: 169.90,
  },
  Anual: {
    Basico: 64.90,
    Standard: 79.90,
    Premium: 109.90,
    Ilimitado: 159.90,
  },
};

const Price = () => {
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<PlanType>("Anual");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);

  const getPriceData = (key: keyof typeof PLAN_PRICES["Mensal"]) => {
    const currentPrice = PLAN_PRICES[planType][key];
    const monthlyBase = PLAN_PRICES["Mensal"][key];
    const daily = currentPrice / 30;
    const monthlyStr = currentPrice.toFixed(2).replace(".", ",");
    const originalStr = monthlyBase.toFixed(2).replace(".", ",");
    const hasDiscount = planType !== "Mensal" && currentPrice < monthlyBase;
    return {
      daily,
      monthlyStr,
      originalStr,
      hasDiscount,
    };
  };

  const featureGroups = [
    {
      name: "Clientes e Agenda",
      features: [
        { name: "Agenda Online Inteligente", basico: true, crescimento: true, empresarial: true, ilimitado: true },
        { name: "Lembretes Automáticos via WhatsApp", basico: true, crescimento: true, empresarial: true, ilimitado: true },
        { name: "CRM com Histórico de Clientes", basico: true, crescimento: true, empresarial: true, ilimitado: true },
      ],
    },
    {
      name: "Financeiro e Comissões",
      features: [
        { name: "Fluxo de Caixa Simplificado", basico: true, crescimento: true, empresarial: true, ilimitado: true },
        { name: "Controle de Receitas e Despesas", basico: true, crescimento: true, empresarial: true, ilimitado: true },
        { name: "Cálculo Automático de Comissões", basico: false, crescimento: true, empresarial: true, ilimitado: true },
      ],
    },
    {
      name: "Estoque e Produtos",
      features: [
        { name: "Gestão Completa de Estoque", basico: true, crescimento: true, empresarial: true, ilimitado: true },
        { name: "Controle de Produtos e Serviços", basico: true, crescimento: true, empresarial: true, ilimitado: true },
      ],
    },
    {
      name: "Equipe e Limites",
      features: [
        { name: "Gestão de Equipe e Desempenho", basico: false, crescimento: true, empresarial: true, ilimitado: true },
        { name: "Profissionais (Usuários)", basico: "1 Usuário", crescimento: "2-3 Usuários", empresarial: "4-6 Usuários", ilimitado: "Ilimitados" },
      ],
    },
    {
      name: "Relatórios e Suporte",
      features: [
        { name: "Relatórios de Desempenho", basico: true, crescimento: true, empresarial: true, ilimitado: true },
        { name: "Suporte via WhatsApp", basico: true, crescimento: true, empresarial: true, ilimitado: true },
      ],
    },
  ];

  const renderFeatureVal = (val: boolean | string) => {
    if (typeof val === "string") {
      return <span className="pricing-table-text-val">{val}</span>;
    }
    return val ? (
      <span className="pricing-table-check" aria-label="Sim">✔</span>
    ) : (
      <span className="pricing-table-x" aria-label="Não">✖</span>
    );
  };

  return (
    <Container>
      <Helmet>
        <title>
          Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 69,90 |
          Teste Grátis
        </title>
        <meta
          name="description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 69,90/mês. Teste grátis por 10 dias! Link de agendamento online, finanças, estoque e muito mais. Compare preços e funcionalidades."
        />
        <meta
          name="keywords"
          content="preços gestão boa, planos sistema gestão, valores software empresarial, assinatura gestão, teste grátis sistema gestão, preço ERP, planos CRM"
        />
        <meta name="author" content="Gestão Boa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gestaoboa.com.br/preco" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 69,90"
        />
        <meta
          property="og:description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 69,90/mês. Teste grátis por 10 dias! Link de agendamento online, finanças, estoque e muito mais."
        />
        <meta property="og:url" content="https://gestaoboa.com.br/preco" />
        <meta property="og:site_name" content="Gestão Boa" />
        <meta
          property="og:image"
          content="https://gestaoboa.com.br/cellphone.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Planos de preços da Gestão Boa - Sistema de gestão"
        />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 69,90"
        />
        <meta
          name="twitter:description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 69,90/mês. Teste grátis por 10 dias!"
        />
        <meta
          name="twitter:image"
          content="https://gestaoboa.com.br/cellphone.png"
        />
        <meta
          name="twitter:image:alt"
          content="Planos de preços da Gestão Boa"
        />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#007BFF" />
        <meta name="application-name" content="Gestão Boa" />

        {/* Schema.org structured data for pricing */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Planos e Preços - Gestão Boa",
            description:
              "Planos de sistema de gestão da Gestão Boa com preços acessíveis e teste grátis por 10 dias",
            url: "https://gestaoboa.com.br/preco",
            provider: {
              "@type": "Organization",
              name: "Gestão Boa",
              url: "https://gestaoboa.com.br",
            },
            offers: [
              {
                "@type": "Offer",
                name: "Plano Básico",
                description: "Perfeito para quem está começando",
                price: "69.90",
                priceCurrency: "BRL",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                category: "Software",
                eligibleDuration: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "MON",
                },
                includesObject: [
                  {
                    "@type": "TypeAndQuantityNode",
                    amountOfThisGood: 1,
                    typeOfGood: "Link de agendamento online",
                  },
                  {
                    "@type": "TypeAndQuantityNode",
                    amountOfThisGood: 1,
                    typeOfGood: "Finanças",
                  },
                  {
                    "@type": "TypeAndQuantityNode",
                    amountOfThisGood: 1,
                    typeOfGood: "Gestão de estoque",
                  },
                  {
                    "@type": "TypeAndQuantityNode",
                    amountOfThisGood: 1,
                    typeOfGood: "Relatórios",
                  },
                ],
              },
              {
                "@type": "Offer",
                name: "Plano Crescimento",
                description: "Para pequenos negócios",
                price: "79.90",
                priceCurrency: "BRL",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                category: "Software",
                eligibleDuration: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "MON",
                },
              },
              {
                "@type": "Offer",
                name: "Plano Empresarial",
                description: "Perfeito para quem já tem funcionários",
                price: "109.90",
                priceCurrency: "BRL",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                category: "Software",
                eligibleDuration: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "MON",
                },
              },
              {
                "@type": "Offer",
                name: "Plano Ilimitado",
                description: "Para negócios em plena expansão",
                price: "159.90",
                priceCurrency: "BRL",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                category: "Software",
                eligibleDuration: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "MON",
                },
              },
            ],
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://gestaoboa.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Preços",
                item: "https://gestaoboa.com.br/preco",
              },
            ],
          })}
        </script>

        {/* Product Schema for Software */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Gestão Boa",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            description:
              "Sistema completo de gestão com Link de agendemento online, finanças, estoque e muito mais",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "69.90",
              highPrice: "179.90",
              priceCurrency: "BRL",
              offerCount: "4",
              offers: [
                {
                  "@type": "Offer",
                  name: "Básico",
                  price: "69.90",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Crescimento",
                  price: "79.90",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Empresarial",
                  price: "109.90",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Ilimitado",
                  price: "159.90",
                  priceCurrency: "BRL",
                },
              ],
            },
            provider: {
              "@type": "Organization",
              name: "BEasier Tech",
              url: "https://gestaoboa.com.br",
            },
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qual é o valor dos planos da Gestão Boa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nossos planos começam em R$ 69,90/mês (no plano Anual para 1 usuário). Temos o plano Crescimento a partir de R$ 79,90/mês, o plano Empresarial a partir de R$ 109,90/mês e o plano Ilimitado a partir de R$ 159,90/mês. Todos os planos incluem teste grátis por 10 dias.",
                },
              },
              {
                "@type": "Question",
                name: "Existe desconto para pagamento anual ou semestral?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Oferecemos descontos exclusivos nos planos Semestral e Anual para economizar ainda mais na sua assinatura.",
                },
              },
              {
                "@type": "Question",
                name: "Como funciona o teste grátis de 10 dias?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Você pode testar todas as funcionalidades do seu plano escolhido por 10 dias sem compromisso. Não é necessário cartão de crédito para iniciar o teste.",
                },
              },
              {
                "@type": "Question",
                name: "Posso trocar de plano depois?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Entre em contato com nosso suporte para realizar a alteração.",
                },
              },
              {
                "@type": "Question",
                name: "O que está incluído no suporte?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Todos os planos incluem suporte via WhatsApp.",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <Header />
      <div className="plans">
        <h1 className="plans-title" id="plans-section">
          Planos do Sistema Gestão Boa
        </h1>
        <div className="plan-type-selector">
          {[
            {
              type: "Anual",
              discount: "Economize até 20%",
            },
            {
              type: "Semestral",
              discount: "Economize até 15%",
            },
            { type: "Mensal" },
          ].map((plan) => (
            <button
              key={plan.type}
              className={`plan-type-button ${
                planType === plan.type ? "active" : ""
              }`}
              onClick={() =>
                setPlanType(plan.type as "Anual" | "Semestral" | "Mensal")
              }
            >
              <span>{plan.type}</span>
              {plan.discount && (
                <span className="plan-type-discount">{plan.discount}</span>
              )}
            </button>
          ))}
        </div>
        <div className="pricing-trust-banner">
          <span>🛡️ 10 dias de teste grátis</span>
          <span className="dot">•</span>
          <span>💳 Sem cartão de crédito</span>
          <span className="dot">•</span>
          <span>🔓 Cancele a qualquer momento</span>
        </div>
        <div className="pricing-table-container">
          <table className="pricing-table">
            <thead>
              <tr>
                <th className="pricing-table-first-col">Recursos do Sistema</th>
                
                {/* Plano Básico */}
                <th className="pricing-table-plan-col">
                  <div className="pricing-table-header-content">
                    <h3>Básico</h3>
                    <span className="pricing-table-user-limit">1 Usuário</span>
                    <PriceTag
                      dailyPrice={getPriceData("Basico").daily}
                      monthlyPrice={getPriceData("Basico").monthlyStr}
                      originalPrice={getPriceData("Basico").originalStr}
                      showDiscount={getPriceData("Basico").hasDiscount}
                    />
                    <button
                      className="sign-button"
                      onClick={() => navigate("/criar-conta?plano=basico")}
                    >
                      TESTE GRÁTIS!
                    </button>
                  </div>
                </th>

                {/* Plano Crescimento */}
                <th className="pricing-table-plan-col popular">
                  <div className="pricing-table-popular-badge">⭐ Mais Popular</div>
                  <div className="pricing-table-header-content">
                    <h3>Crescimento</h3>
                    <span className="pricing-table-user-limit">2-3 Usuários</span>
                    <PriceTag
                      dailyPrice={getPriceData("Standard").daily}
                      monthlyPrice={getPriceData("Standard").monthlyStr}
                      originalPrice={getPriceData("Standard").originalStr}
                      showDiscount={getPriceData("Standard").hasDiscount}
                    />
                    <button
                      className="sign-button"
                      onClick={() => navigate("/criar-conta?plano=crescimento")}
                    >
                      TESTE GRÁTIS!
                    </button>
                  </div>
                </th>

                {/* Plano Empresarial */}
                <th className="pricing-table-plan-col">
                  <div className="pricing-table-header-content">
                    <h3>Empresarial</h3>
                    <span className="pricing-table-user-limit">4-6 Usuários</span>
                    <PriceTag
                      dailyPrice={getPriceData("Premium").daily}
                      monthlyPrice={getPriceData("Premium").monthlyStr}
                      originalPrice={getPriceData("Premium").originalStr}
                      showDiscount={getPriceData("Premium").hasDiscount}
                    />
                    <button
                      className="sign-button"
                      onClick={() => navigate("/criar-conta?plano=empresarial")}
                    >
                      TESTE GRÁTIS!
                    </button>
                  </div>
                </th>

                {/* Plano Ilimitado */}
                <th className="pricing-table-plan-col">
                  <div className="pricing-table-header-content">
                    <h3>Ilimitado</h3>
                    <span className="pricing-table-user-limit">Ilimitados</span>
                    <PriceTag
                      dailyPrice={getPriceData("Ilimitado").daily}
                      monthlyPrice={getPriceData("Ilimitado").monthlyStr}
                      originalPrice={getPriceData("Ilimitado").originalStr}
                      showDiscount={getPriceData("Ilimitado").hasDiscount}
                    />
                    <button
                      className="sign-button"
                      onClick={() => navigate("/criar-conta?plano=ilimitado")}
                    >
                      TESTE GRÁTIS!
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {featureGroups.map((group, groupIdx) => (
                <React.Fragment key={groupIdx}>
                  <tr className="pricing-table-group-header">
                    <td colSpan={5}>{group.name}</td>
                  </tr>
                  {group.features.map((feature, featureIdx) => (
                    <tr key={featureIdx} className="pricing-table-feature-row">
                      <td className="pricing-table-feature-name">{feature.name}</td>
                      <td>{renderFeatureVal(feature.basico)}</td>
                      <td className="pricing-table-popular-col popular-col">
                        {renderFeatureVal(feature.crescimento)}
                      </td>
                      <td>{renderFeatureVal(feature.empresarial)}</td>
                      <td>{renderFeatureVal(feature.ilimitado)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Seção de Implantação e Importação de Dados */}
        <div className="implementation-cta">
          <div className="implementation-cta-inner">
            <div className="implementation-badge">
              📦 Migração de Sistema sem Complicação
            </div>
            <h2>Vem de outro sistema? Importamos seus dados!</h2>
            <p>
              Facilitamos sua transição para o Gestão Boa. Nossa equipe realiza a <strong>implantação personalizada</strong> e a <strong>importação completa dos seus dados</strong> do sistema anterior (clientes, serviços, produtos e históricos) para você não perder nada.
            </p>
            <div className="implementation-cta-actions">
              <button
                className="implementation-button"
                onClick={() => {
                  window.open(
                    "https://wa.me/5553999461550?text=" +
                      encodeURIComponent(
                        "Olá! Gostaria de solicitar a implantação com importação dos dados do meu sistema anterior."
                      )
                  );
                }}
              >
                Solicitar Implantação com Importação de Dados
              </button>
            </div>
          </div>
        </div>
        <div className="support-section">
          <h2>Ainda tem dúvidas sobre os preços?</h2>
          <p>Fale com nosso atendimento especializado</p>
          <button
            className="support-button"
            onClick={() => {
              window.open("https://wa.me/5553999461550?text=Duvida");
            }}
          >
            FALAR COM SUPORTE
          </button>
        </div>
      </div>{" "}
      <Footer />
      {/* Formulário de pagamento */}
      {showPaymentForm && selectedPlan && (
        <PaymentForm
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          onClose={() => {
            setShowPaymentForm(false);
            setSelectedPlan(null);
          }}
        />
      )}
      {/* Formulário de registro para teste grátis */}
      {showRegistrationForm && selectedPlan && (
        <UserRegistrationForm
          planName={selectedPlan.name}
          onClose={() => {
            setShowRegistrationForm(false);
            setSelectedPlan(null);
          }}
        />
      )}
    </Container>
  );
};

export default Price;
