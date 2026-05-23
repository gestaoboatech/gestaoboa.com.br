import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container } from "../Terms/styles";
import PaymentForm from "./components/PaymentForm";
import PriceTag from "./components/PriceTag";
import UserRegistrationForm from "./components/UserRegistrationForm";
import RoiCalculator from "../../components/RoiCalculator";
import "./styles.css";

type PlanType = "Anual" | "Semestral" | "Mensal";

const getDiscount = (type: PlanType) => {
  switch (type) {
    case "Anual":
      return 0.24; // 24% off
    case "Semestral":
      return 0.15; // 15% off
    default:
      return 0;
  }
};

const calculateDiscountedPrice = (price: number, type: PlanType) => {
  const discount = getDiscount(type);
  return price * (1 - discount);
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

  // Price data
  const monthlyPrices = {
    Basico: 64.00,
    Standard: 89.00,
    Premium: 129.00,
    Ilimitado: 149.00,
  };

  const getPriceData = (key: keyof typeof monthlyPrices) => {
    const base = monthlyPrices[key];
    const discounted = calculateDiscountedPrice(base, planType);
    const daily = (planType === "Mensal" ? base : discounted) / 30;
    const monthlyStr = (planType === "Mensal" ? base : discounted).toFixed(2).replace(".", ",");
    const originalStr = base.toFixed(2).replace(".", ",");
    return {
      daily,
      monthlyStr,
      originalStr,
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
        { name: "Profissionais (Usuários)", basico: "1 Usuário", crescimento: "Até 3 Usuários", empresarial: "Até 10 Usuários", ilimitado: "Ilimitados" },
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
          Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 64,00 |
          Teste Grátis
        </title>
        <meta
          name="description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 64,00/mês. Teste grátis por 20 dias! Link de agendemento online, finanças, estoque e muito mais. Compare preços e funcionalidades."
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
          content="Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 64,00"
        />
        <meta
          property="og:description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 64,00/mês. Teste grátis por 20 dias! Link de agendemento online, finanças, estoque e muito mais."
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
          content="Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 64,00"
        />
        <meta
          name="twitter:description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 64,00/mês. Teste grátis por 20 dias!"
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
              "Planos de sistema de gestão da Gestão Boa com preços acessíveis e teste grátis por 20 dias",
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
                price: "64.00",
                priceCurrency: "BRL",
                priceValidUntil: "2025-12-31",
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
                    typeOfGood: "Link de agendemento online",
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
                price: "89.00",
                priceCurrency: "BRL",
                priceValidUntil: "2025-12-31",
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
                price: "129.00",
                priceCurrency: "BRL",
                priceValidUntil: "2025-12-31",
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
                price: "149.00",
                priceCurrency: "BRL",
                priceValidUntil: "2025-12-31",
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
              lowPrice: "64.00",
              highPrice: "149.00",
              priceCurrency: "BRL",
              offerCount: "4",
              offers: [
                {
                  "@type": "Offer",
                  name: "Básico",
                  price: "64.00",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Crescimento",
                  price: "89.00",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Empresarial",
                  price: "129.00",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Ilimitado",
                  price: "149.00",
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
                  text: "Nossos planos começam em R$ 64,00/mês (plano Básico). Temos o plano Crescimento por R$ 89,00/mês, o plano Empresarial por R$ 129,00/mês e o plano Ilimitado por R$ 149,00/mês. Todos os planos incluem teste grátis por 20 dias.",
                },
              },
              {
                "@type": "Question",
                name: "Existe desconto para pagamento anual?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Oferecemos 24% de desconto para pagamento anual e 15% de desconto para pagamento semestral em todos os planos.",
                },
              },
              {
                "@type": "Question",
                name: "Como funciona o teste grátis de 20 dias?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Você pode testar todas as funcionalidades do seu plano escolhido por 20 dias sem compromisso. Não é necessário cartão de crédito para iniciar o teste.",
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
              discount: "24% off",
            },
            {
              type: "Semestral",
              discount: "15% off",
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
        </div>{" "}
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
                      showDiscount={planType !== "Mensal"}
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
                    <span className="pricing-table-user-limit">Até 3 Usuários</span>
                    <PriceTag
                      dailyPrice={getPriceData("Standard").daily}
                      monthlyPrice={getPriceData("Standard").monthlyStr}
                      originalPrice={getPriceData("Standard").originalStr}
                      showDiscount={planType !== "Mensal"}
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
                    <span className="pricing-table-user-limit">Até 10 Usuários</span>
                    <PriceTag
                      dailyPrice={getPriceData("Premium").daily}
                      monthlyPrice={getPriceData("Premium").monthlyStr}
                      originalPrice={getPriceData("Premium").originalStr}
                      showDiscount={planType !== "Mensal"}
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
                      showDiscount={planType !== "Mensal"}
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
        <RoiCalculator />
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
