import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container } from "../Terms/styles";
import PaymentForm from "./components/PaymentForm";
import PriceTag from "./components/PriceTag";
import UserRegistrationForm from "./components/UserRegistrationForm";
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
  const [planType, setPlanType] = useState<PlanType>("Anual");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);

  // Price data
  const monthlyPrices = {
    Basico: 64.90,
    Standard: 89.90,
    Premium: 129.90,
  };

  const prices = {
    Anual: {
      Basico: { original: { vista: monthlyPrices.Basico * 12, parcelas: "64,90" } },
      Standard: { original: { vista: monthlyPrices.Standard * 12, parcelas: "89,90" } },
      Premium: { original: { vista: monthlyPrices.Premium * 12, parcelas: "129,90" } },
    },
    Semestral: {
      Basico: { original: { vista: monthlyPrices.Basico * 6, parcelas: "64,90" } },
      Standard: { original: { vista: monthlyPrices.Standard * 6, parcelas: "89,90" } },
      Premium: { original: { vista: monthlyPrices.Premium * 6, parcelas: "129,90" } },
    },
    Mensal: {
      Basico: { original: monthlyPrices.Basico, parcelas: "64,90" },
      Standard: { original: monthlyPrices.Standard, parcelas: "89,90" },
      Premium: { original: monthlyPrices.Premium, parcelas: "129,90" },
    },
  };

  return (
    <Container>
      <Helmet>
        <title>
          Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 49,90 |
          Teste Grátis
        </title>
        <meta
          name="description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 49,90/mês. Teste grátis por 20 dias! Link de agendemento online, finanças, estoque e muito mais. Compare preços e funcionalidades."
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
          content="Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 49,90"
        />
        <meta
          property="og:description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 49,90/mês. Teste grátis por 20 dias! Link de agendemento online, finanças, estoque e muito mais."
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
          content="Planos e Preços Gestão Boa - Sistema de Gestão a partir de R$ 49,90"
        />
        <meta
          name="twitter:description"
          content="Planos de sistema de gestão da Gestão Boa a partir de R$ 49,90/mês. Teste grátis por 20 dias!"
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
                price: "49.90",
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
                price: "68.90",
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
                price: "99.90",
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
              lowPrice: "49.90",
              highPrice: "99.90",
              priceCurrency: "BRL",
              offerCount: "3",
              offers: [
                {
                  "@type": "Offer",
                  name: "Básico",
                  price: "49.90",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Crescimento",
                  price: "68.90",
                  priceCurrency: "BRL",
                },
                {
                  "@type": "Offer",
                  name: "Empresarial",
                  price: "99.90",
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
                  text: "Nossos planos começam em R$ 49,90/mês (plano Básico). Temos o plano Crescimento por R$ 68,90/mês e o plano Empresarial por R$ 99,90/mês. Todos os planos incluem teste grátis por 20 dias.",
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
                  text: "Todos os planos incluem suporte via WhatsApp. O plano Empresarial ainda inclui 30 minutos de mentoria gratuita com Leandro Figueiredo.",
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
        <div className="plan-cards">
          {" "}
          {/* Plano Básico */}
          <div className="plan-card">
            {(planType === "Anual" || planType === "Semestral") && (
              <div className="plan-discount-badge">
                {planType === "Anual" ? "24% OFF" : "15% OFF"}
              </div>
            )}
            <h2>Plano Básico</h2>
            <p>Perfeito para quem está começando</p>{" "}
            <PriceTag
              dailyPrice={
                planType === "Mensal"
                  ? parseFloat(
                      prices.Mensal.Basico.parcelas.replace(",", ".")
                    ) / 30
                  : calculateDiscountedPrice(
                      prices.Mensal.Basico.original,
                      planType
                    ) / 30
              }
              monthlyPrice={
                planType === "Mensal"
                  ? prices.Mensal.Basico.parcelas
                  : calculateDiscountedPrice(
                      prices.Mensal.Basico.original,
                      planType
                    )
                      .toFixed(2)
                      .replace(".", ",")
              }
              originalPrice={
                planType !== "Mensal"
                  ? prices.Mensal.Basico.parcelas
                  : undefined
              }
              showDiscount={planType !== "Mensal"}
            />{" "}
            <button
              className="sign-button"
              onClick={() => {
                setSelectedPlan({
                  name: "Básico",
                  price:
                    planType === "Mensal"
                      ? prices.Mensal.Basico.parcelas
                      : calculateDiscountedPrice(
                          prices.Mensal.Basico.original,
                          planType
                        )
                          .toFixed(2)
                          .replace(".", ","),
                });
                setShowRegistrationForm(true);
              }}
            >
              TESTE GRATIS POR 20 DIAS!
            </button>{" "}
            <div className="benefits-list">
              {/* Módulo: Clientes e Agenda */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📅</span>
                  Clientes e Agenda
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Agenda Online Inteligente
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Lembretes Automáticos via WhatsApp
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    CRM com Histórico de Clientes
                  </li>
                </ul>
              </div>

              {/* Módulo: Financeiro */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">💰</span>
                  Financeiro
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Fluxo de Caixa Simplificado
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Controle de Receitas e Despesas
                  </li>
                  <li>
                    <span className="x-icon">✖</span>
                    Cálculo Automático de Comissões
                  </li>
                </ul>
              </div>

              {/* Módulo: Estoque e Produtos */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📦</span>
                  Estoque e Produtos
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Gestão Completa de Estoque
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Controle de Produtos e Serviços
                  </li>
                </ul>
              </div>

              {/* Módulo: Equipe */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">👥</span>
                  Equipe e Colaboradores
                </div>
                <ul>
                  <li>
                    <span className="x-icon">✖</span>
                    Gestão de Equipe e Desempenho
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    1 Usuário
                  </li>
                </ul>
              </div>

              {/* Módulo: Relatórios e Suporte */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📊</span>
                  Relatórios e Suporte
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Relatórios de Desempenho
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Suporte via WhatsApp
                  </li>
                </ul>
              </div>
            </div>
          </div>{" "}
          {/* Plano Standard */}
          <div className="plan-card">
            <div className="plan-popular-badge">⭐ Mais Popular</div>
            {(planType === "Anual" || planType === "Semestral") && (
              <div className="plan-discount-badge">
                {planType === "Anual" ? "24% OFF" : "15% OFF"}
              </div>
            )}
            <h2>Plano Crescimento</h2>
            <p>Para pequenos negócios</p>{" "}
            <PriceTag
              dailyPrice={
                planType === "Mensal"
                  ? parseFloat(
                      prices.Mensal.Standard.parcelas.replace(",", ".")
                    ) / 30
                  : calculateDiscountedPrice(
                      prices.Mensal.Standard.original,
                      planType
                    ) / 30
              }
              monthlyPrice={
                planType === "Mensal"
                  ? prices.Mensal.Standard.parcelas
                  : calculateDiscountedPrice(
                      prices.Mensal.Standard.original,
                      planType
                    )
                      .toFixed(2)
                      .replace(".", ",")
              }
              originalPrice={
                planType !== "Mensal"
                  ? prices.Mensal.Standard.parcelas
                  : undefined
              }
              showDiscount={planType !== "Mensal"}
            />{" "}
            <button
              className="sign-button"
              onClick={() => {
                setSelectedPlan({
                  name: "Crescimento",
                  price:
                    planType === "Mensal"
                      ? prices.Mensal.Standard.parcelas
                      : calculateDiscountedPrice(
                          prices.Mensal.Standard.original,
                          planType
                        )
                          .toFixed(2)
                          .replace(".", ","),
                });
                setShowRegistrationForm(true);
              }}
            >
              TESTE GRATIS POR 20 DIAS!
            </button>{" "}
            <div className="benefits-list">
              {/* Módulo: Clientes e Agenda */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📅</span>
                  Clientes e Agenda
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Agenda Online Inteligente
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Lembretes Automáticos via WhatsApp
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    CRM com Histórico de Clientes
                  </li>
                </ul>
              </div>

              {/* Módulo: Financeiro */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">💰</span>
                  Financeiro e Equipe
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Fluxo de Caixa Simplificado
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Controle de Receitas e Despesas
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Cálculo Automático de Comissões
                  </li>
                </ul>
              </div>

              {/* Módulo: Estoque e Produtos */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📦</span>
                  Estoque e Produtos
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Gestão Completa de Estoque
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Controle de Produtos e Serviços
                  </li>
                </ul>
              </div>

              {/* Módulo: Equipe */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">👥</span>
                  Equipe e Colaboradores
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Gestão de Equipe e Desempenho
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Até 3 Usuários
                  </li>
                </ul>
              </div>

              {/* Módulo: Relatórios e Suporte */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📊</span>
                  Relatórios e Suporte
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Relatórios de Desempenho
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Suporte via WhatsApp
                  </li>
                </ul>
              </div>
            </div>
          </div>{" "}
          {/* Plano Premium */}
          <div className="plan-card">
            {(planType === "Anual" || planType === "Semestral") && (
              <div className="plan-discount-badge">
                {planType === "Anual" ? "24% OFF" : "15% OFF"}
              </div>
            )}
            <h2>Plano Empresarial</h2>
            <p>Perfeito para quem já tem funcionários</p>{" "}
            <PriceTag
              dailyPrice={
                planType === "Mensal"
                  ? parseFloat(
                      prices.Mensal.Premium.parcelas.replace(",", ".")
                    ) / 30
                  : calculateDiscountedPrice(
                      prices.Mensal.Premium.original,
                      planType
                    ) / 30
              }
              monthlyPrice={
                planType === "Mensal"
                  ? prices.Mensal.Premium.parcelas
                  : calculateDiscountedPrice(
                      prices.Mensal.Premium.original,
                      planType
                    )
                      .toFixed(2)
                      .replace(".", ",")
              }
              originalPrice={
                planType !== "Mensal"
                  ? prices.Mensal.Premium.parcelas
                  : undefined
              }
              showDiscount={planType !== "Mensal"}
            />{" "}
            <button
              className="sign-button"
              onClick={() => {
                setSelectedPlan({
                  name: "Empresarial",
                  price:
                    planType === "Mensal"
                      ? prices.Mensal.Premium.parcelas
                      : calculateDiscountedPrice(
                          prices.Mensal.Premium.original,
                          planType
                        )
                          .toFixed(2)
                          .replace(".", ","),
                });
                setShowRegistrationForm(true);
              }}
            >
              TESTE GRATIS POR 20 DIAS!
            </button>{" "}
            <div className="benefits-list">
              {/* Módulo: Clientes e Agenda */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📅</span>
                  Clientes e Agenda
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Agenda Online Inteligente
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Lembretes Automáticos via WhatsApp
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    CRM com Histórico de Clientes
                  </li>
                </ul>
              </div>

              {/* Módulo: Financeiro */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">💰</span>
                  Financeiro e Equipe
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Fluxo de Caixa Simplificado
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Controle de Receitas e Despesas
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Cálculo Automático de Comissões
                  </li>
                </ul>
              </div>

              {/* Módulo: Estoque e Produtos */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📦</span>
                  Estoque e Produtos
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Gestão Completa de Estoque
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Controle de Produtos e Serviços
                  </li>
                </ul>
              </div>

              {/* Módulo: Equipe */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">👥</span>
                  Equipe e Colaboradores
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Gestão de Equipe e Desempenho
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Usuários Ilimitados
                  </li>
                </ul>
              </div>

              {/* Módulo: Relatórios e Suporte */}
              <div className="benefit-module">
                <div className="module-title">
                  <span className="module-icon">📊</span>
                  Relatórios e Suporte
                </div>
                <ul>
                  <li>
                    <span className="check-icon">✔</span>
                    Relatórios de Desempenho
                  </li>
                  <li>
                    <span className="check-icon">✔</span>
                    Suporte via WhatsApp
                  </li>
                  {planType === "Anual" && (
                    <li>
                      <span className="check-icon">✔</span>
                      30 minutos de Mentoria com Leandro Figueiredo
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {planType === "Anual" && (
              <button
                className="instagram-button"
                onClick={() => {
                  window.open("https://www.instagram.com/oleandrofigueiredo/");
                }}
              >
                Saiba mais sobre a mentoria
              </button>
            )}
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
