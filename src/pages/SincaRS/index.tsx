import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Heart,
  Ticket,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FB_PIXEL } from "../../utils/pixel";
import "./styles.css";

type PlanPeriod = "Anual" | "Semestral" | "Mensal";

// Base prices without discount
const BASE_PRICES = {
  basico: 79.9,
  crescimento: 99.9,
  empresarial: 129.9,
  ilimitado: 179.9,
};

const PLAN_PRICES: Record<
  PlanPeriod,
  {
    basico: number;
    crescimento: number;
    empresarial: number;
    ilimitado: number;
  }
> = {
  Mensal: {
    basico: BASE_PRICES.basico * 0.9,
    crescimento: BASE_PRICES.crescimento * 0.9,
    empresarial: BASE_PRICES.empresarial * 0.9,
    ilimitado: BASE_PRICES.ilimitado * 0.9,
  },
  Semestral: {
    basico: BASE_PRICES.basico * 0.7,
    crescimento: BASE_PRICES.crescimento * 0.7,
    empresarial: BASE_PRICES.empresarial * 0.7,
    ilimitado: BASE_PRICES.ilimitado * 0.7,
  },
  Anual: {
    basico: BASE_PRICES.basico * 0.5,
    crescimento: BASE_PRICES.crescimento * 0.5,
    empresarial: BASE_PRICES.empresarial * 0.5,
    ilimitado: BASE_PRICES.ilimitado * 0.5,
  },
};

interface FAQItemData {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItemData[] = [
  {
    question: "O que é o Sinca RS e qual a sua relação com a Fecomércio?",
    answer:
      "O Sinca RS é o Sindicato dos Salões de Barbeiros, Cabeleireiros, Institutos de Beleza e Similares do Estado do Rio Grande do Sul. Filiado ao sistema Fecomércio-RS, o sindicato atua ativamente na valorização, representação jurídica e desenvolvimento de profissionais e empresários da beleza em todo o estado.",
  },
  {
    question: "Quem tem direito aos benefícios e descontos de até 50%?",
    answer:
      "Todos os proprietários de barbearias, salões de beleza, clínicas de estética, manicures, maquiadores, micropigmentadores e profissionais autônomos associados ao Sinca RS ou representados pelo sistema Fecomércio-RS no Rio Grande do Sul têm acesso garantido aos descontos de até 50% em todos os planos da Gestão Boa.",
  },
  {
    question: "Como funciona a parceria da Gestão Boa com o Sinca RS?",
    answer:
      "A parceria disponibiliza a tecnologia de gestão e agendamento mais moderna do Brasil com condições subsidiadas: agenda online 24h para seus clientes marcarem pelo link do Instagram, chatbot inteligente de WhatsApp com lembretes automáticos e mensagens de feliz aniversário com cupom, além de controle financeiro completo e comissões automáticas para sua equipe.",
  },
  {
    question: "Como ativar o desconto de associado Sinca RS?",
    answer:
      "É muito simples: basta selecionar o plano desejado nesta página ou clicar em qualquer botão de teste grátis. Você terá 10 dias de teste gratuito sem compromisso e o desconto especial de associado Sinca RS / Fecomércio já é ativado automaticamente no seu cadastro.",
  },
  {
    question: "Preciso cadastrar cartão de crédito para iniciar o teste gratuito?",
    answer:
      "Não! O teste de 10 dias é 100% gratuito e não exige nenhum cartão de crédito. Você testa todas as funcionalidades com suporte completo e só decide contratar após comprovar os resultados no seu negócio.",
  },
];

const SincaRS: React.FC = () => {
  const navigate = useNavigate();
  const [planPeriod, setPlanPeriod] = useState<PlanPeriod>("Anual");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pricingRef = useRef<HTMLDivElement>(null);
  const nichesRef = useRef<HTMLDivElement>(null);

  const getPriceInfo = (key: keyof (typeof PLAN_PRICES)["Mensal"]) => {
    const currentPrice = PLAN_PRICES[planPeriod][key];
    const monthlyBase = BASE_PRICES[key];
    const daily = currentPrice / 30;
    const monthlyStr = currentPrice.toFixed(2).replace(".", ",");
    const originalStr = monthlyBase.toFixed(2).replace(".", ",");
    return {
      dailyStr: daily.toFixed(2).replace(".", ","),
      monthlyStr,
      originalStr,
      hasDiscount: true,
    };
  };

  const handleStartFree = () => {
    FB_PIXEL.trackCustomEvent("SincaRSStartFree", {
      page: "sincars",
      timestamp: new Date().toISOString(),
    });
    navigate("/criar-conta?parceria=sincars");
  };

  const handleSelectPlan = (planName: string) => {
    FB_PIXEL.trackCustomEvent("SincaRSSelectPlan", {
      page: "sincars",
      plan: planName,
      period: planPeriod,
      timestamp: new Date().toISOString(),
    });
    navigate(`/criar-conta?plano=${planName}&periodo=${planPeriod.toLowerCase()}&parceria=sincars`);
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToNiches = () => {
    nichesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    FB_PIXEL.pageView();
    FB_PIXEL.trackCustomEvent("ViewSincaRSPage", {
      page: "sincars",
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="sinca-page">
      <Helmet>
        <title>
          Sinca RS & Fecomércio-RS | Sistema para Barbeiros, Cabeleireiros e Salões de Beleza | Gestão Boa
        </title>
        <meta
          name="description"
          content="Benefícios exclusivos para associados Sinca RS e Fecomércio-RS. Sistema completo de gestão para sindicato de barbeiros, salões e clínicas de estética no Rio Grande do Sul com até 50% de desconto. Agenda online, chatbot WhatsApp e controle financeiro."
        />
        <meta
          name="keywords"
          content="Sinca RS, Sindicato de barbeiros, Fecomércio, Fecomércio-RS, sindicato dos barbeiros RS, sindicato de cabeleireiros, sindicato salão de beleza RS, sistema para barbearia sinca rs, software para salão sincars, benefícios sindicato dos barbeiros, convênio fecomercio sinca rs, agendamento online barbeiros RS, gestão para estética sinca rs, Sindicato dos Salões de Barbeiros Cabeleireiros Institutos de Beleza e Similares do Estado do Rio Grande do Sul"
        />
        <meta name="author" content="Gestão Boa & Sinca RS" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gestaoboa.com.br/sincars" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Sinca RS & Fecomércio-RS | Benefícios e Sistema para Barbeiros e Salões"
        />
        <meta
          property="og:description"
          content="Benefícios e até 50% de desconto para associados Sinca RS e Fecomércio-RS. Sistema completo com agenda online 24h, chatbot WhatsApp e controle financeiro."
        />
        <meta property="og:url" content="https://gestaoboa.com.br/sincars" />
        <meta property="og:site_name" content="Gestão Boa & Sinca RS" />
        <meta property="og:image" content="https://gestaoboa.com.br/sincars.png" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sinca RS & Fecomércio-RS | Sistema para Barbeiros e Salões de Beleza"
        />
        <meta
          name="twitter:description"
          content="Desconto exclusivo de até 50% para associados do Sindicato dos Barbeiros e Cabeleireiros (Sinca RS / Fecomércio)."
        />
        <meta name="twitter:image" content="https://gestaoboa.com.br/sincars.png" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Gestão Boa - Parceria Sinca RS & Fecomércio",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            description:
              "Sistema de gestão para barbearias, salões de beleza e estética com condições especiais para associados do Sinca RS e Fecomércio-RS.",
            offers: {
              "@type": "Offer",
              price: "34.95",
              priceCurrency: "BRL",
              description: "Até 50% de desconto para associados Sinca RS / Fecomércio",
              availability: "https://schema.org/InStock",
            },
            provider: {
              "@type": "Organization",
              name: "Gestão Boa em parceria com Sinca RS (Fecomércio-RS)",
              url: "https://gestaoboa.com.br/sincars",
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <Header />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Clean White & Blue Co-Branding)                          */}
      {/* ========================================================================= */}
      <section className="sinca-hero">
        <div className="sinca-container">
          <div className="sinca-hero-logos">
            <img src="/3.png" alt="Logo Gestão Boa" className="sinca-logo-img" />
            <span className="sinca-logo-plus">+</span>
            <img src="/sincars.png" alt="Logo Sinca RS Fecomércio" className="sinca-logo-img" />
          </div>

          <div className="sinca-pill-badge">
            <Sparkles size={16} />
            <span>Convênio Oficial Sinca RS & Fecomércio-RS</span>
          </div>

          <h1 className="sinca-hero-title">
            Gestão de excelência para seu espaço de beleza com{" "}
            <span className="sinca-gradient-text">até 50% de desconto</span>
          </h1>

          <p className="sinca-hero-subtitle">
            Benefícios exclusivos para associados do <strong>Sindicato dos Salões de Barbeiros, Cabeleireiros e Institutos de Beleza do RS</strong>.
            Tenha agenda online 24h pelo link do Instagram, chatbot no WhatsApp com lembretes automáticos anti-furo e controle financeiro completo.
          </p>

          <div className="sinca-hero-actions">
            <button type="button" className="sinca-btn-primary" onClick={scrollToPricing}>
              Aproveitar Desconto do Sinca RS
              <ArrowRight size={18} />
            </button>
            <button type="button" className="sinca-btn-secondary" onClick={scrollToNiches}>
              Ver Segmentos Atendidos
            </button>
          </div>

          <p className="sinca-hero-trial-note">
            ✨ Teste grátis por 10 dias • Sem cartão de crédito • Sem fidelidade
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS / AUTHORITY STRIP                                                */}
      {/* ========================================================================= */}
      <section className="sinca-stats-strip">
        <div className="sinca-container">
          <div className="sinca-stats-grid">
            <div className="sinca-stat-item">
              <div className="sinca-stat-num">+R$ 4.000.000</div>
              <div className="sinca-stat-label">Reais gerenciados</div>
            </div>

            <div className="sinca-stat-divider" />

            <div className="sinca-stat-item">
              <div className="sinca-stat-num">+35.000</div>
              <div className="sinca-stat-label">Agendamentos realizados</div>
            </div>

            <div className="sinca-stat-divider" />

            <div className="sinca-stat-item">
              <div className="sinca-stat-num">Até 50% OFF</div>
              <div className="sinca-stat-label">Desconto de associado Sinca RS</div>
            </div>

            <div className="sinca-stat-divider" />

            <div className="sinca-stat-item">
              <div className="sinca-stat-num">4.9 / 5</div>
              <div className="sinca-stat-label">Avaliação média dos clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEGMENTOS ATENDIDOS PELO SINCA RS (COM FOTOS REAIS DA HOME)            */}
      {/* ========================================================================= */}
      <section className="sinca-section sinca-niches-section" ref={nichesRef}>
        <div className="sinca-container">
          <div className="sinca-section-header">
            <span className="sinca-section-tag">Representatividade & Força</span>
            <h2 className="sinca-section-title">
              Segmentos atendidos pela parceria no Rio Grande do Sul
            </h2>
            <p className="sinca-section-subtitle">
              Soluções customizadas para as reais necessidades diárias de cada especialidade da beleza.
            </p>
          </div>

          <div className="sinca-niches-grid">
            {/* 1. Barbearias */}
            <div className="sinca-niche-card">
              <div className="sinca-niche-header">
                <div className="sinca-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&crop=center"
                    alt="Barbearia"
                    className="sinca-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Barbearias</h4>
                  <span className="sinca-niche-badge">Barbeiros & Studios</span>
                </div>
              </div>
              <p className="sinca-niche-pain">
                <strong>O que resolve:</strong> Acaba com os horários vagos e furos de clientes enviando confirmações no WhatsApp, além de permitir agendamento online 24h sem tirar o barbeiro da cadeira.
              </p>
              <ul className="sinca-niche-list">
                <li>Link de agendamento online na bio do Instagram</li>
                <li>Lembretes automáticos anti-furo pelo WhatsApp</li>
                <li>Divisão e cálculo de comissões por barbeiro</li>
              </ul>
            </div>

            {/* 2. Salões de Beleza */}
            <div className="sinca-niche-card">
              <div className="sinca-niche-header">
                <div className="sinca-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&crop=center"
                    alt="Salão de Beleza"
                    className="sinca-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Salões de Beleza</h4>
                  <span className="sinca-niche-badge">Cabeleireiros & Coloristas</span>
                </div>
              </div>
              <p className="sinca-niche-pain">
                <strong>O que resolve:</strong> Elimina a bagunça de comandas manuais e papel, organiza a escala de múltiplos profissionais e auxiliares, e controla o fluxo de caixa com precisão.
              </p>
              <ul className="sinca-niche-list">
                <li>Comandas integradas e fechamento de caixa diário</li>
                <li>Divisão transparente de comissões da equipe</li>
                <li>Controle de estoque de tinturas e cosméticos</li>
              </ul>
            </div>

            {/* 3. Clínicas de Estética */}
            <div className="sinca-niche-card">
              <div className="sinca-niche-header">
                <div className="sinca-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&h=300&fit=crop&crop=center"
                    alt="Clínica de Estética"
                    className="sinca-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Clínicas de Estética</h4>
                  <span className="sinca-niche-badge">Biomédicos & Esteticistas</span>
                </div>
              </div>
              <p className="sinca-niche-pain">
                <strong>O que resolve:</strong> Prontuário organizado, controle de pacotes e sessões de tratamento, registro de evolução fotográfica e históricos de procedimentos sem complicação.
              </p>
              <ul className="sinca-niche-list">
                <li>Fichas de anamnese e fotos antes/depois</li>
                <li>Gestão de pacotes e sessões de tratamentos</li>
                <li>Controle financeiro de parcelamentos</li>
              </ul>
            </div>

            {/* 4. Esmalterias & Nails */}
            <div className="sinca-niche-card">
              <div className="sinca-niche-header">
                <div className="sinca-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop&crop=center"
                    alt="Esmalterias & Nails"
                    className="sinca-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Esmalterias & Nails</h4>
                  <span className="sinca-niche-badge">Nail Designers & Manicures</span>
                </div>
              </div>
              <p className="sinca-niche-pain">
                <strong>O que resolve:</strong> Lembretes de retorno para manutenção e esmaltação periódica, cobrança rápida e controle de lucro por serviço na palma da mão no celular.
              </p>
              <ul className="sinca-niche-list">
                <li>Lembretes automáticos de retorno e manutenção</li>
                <li>Controle financeiro direto pelo celular</li>
                <li>Agendamento rápido sem pausar o atendimento</li>
              </ul>
            </div>

            {/* 5. Lash & Micropigmentação */}
            <div className="sinca-niche-card">
              <div className="sinca-niche-header">
                <div className="sinca-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&crop=center"
                    alt="Lash & Micropigmentação"
                    className="sinca-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Lash & Micropigmentação</h4>
                  <span className="sinca-niche-badge">Lash Designers & Sobrancelhas</span>
                </div>
              </div>
              <p className="sinca-niche-pain">
                <strong>O que resolve:</strong> Fim do tempo perdido respondendo mensagens enquanto faz extensão de cílios. A cliente agenda sozinha pelo link e você foca 100% no procedimento.
              </p>
              <ul className="sinca-niche-list">
                <li>Autonomia total para o cliente agendar online</li>
                <li>Confirmações imediatas e lembretes prévios</li>
                <li>Histórico detalhado de mapeamentos e estilos</li>
              </ul>
            </div>

            {/* 6. CTA Card da Parceria */}
            <div className="sinca-niche-card sinca-niche-cta-card">
              <div className="sinca-niche-cta-content">
                <Sparkles size={36} className="text-amber-400" />
                <h4>Seu negócio faz parte do Sinca RS?</h4>
                <p>
                  Aproveite até 50% de desconto exclusivo negociado pelo sindicato para associados de todo o Rio Grande do Sul.
                </p>
                <button type="button" className="sinca-btn-primary" onClick={scrollToPricing}>
                  Garantir meu desconto agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ESSENTIALS SECTION (6 Clean Feature Cards)                             */}
      {/* ========================================================================= */}
      <section className="sinca-section sinca-essentials-section">
        <div className="sinca-container">
          <div className="sinca-section-header">
            <span className="sinca-section-tag">Recursos Essenciais</span>
            <h2 className="sinca-section-title">Tudo que seu espaço de beleza precisa</h2>
            <p className="sinca-section-subtitle">
              Simplificamos a gestão do seu negócio para você focar no que realmente importa: atender bem seus clientes.
            </p>
          </div>

          <div className="sinca-essentials-grid">
            <div className="sinca-essential-card">
              <div className="sinca-essential-icon">
                <CalendarDays size={26} />
              </div>
              <h3>Agenda Online 24h</h3>
              <p>
                Seus clientes agendam sozinhos pelo link exclusivo, a qualquer hora do dia ou da noite, direto pelo celular.
              </p>
            </div>

            <div className="sinca-essential-card">
              <div className="sinca-essential-icon">
                <MessageSquare size={26} />
              </div>
              <h3>Chatbot WhatsApp & Aniversários</h3>
              <p>
                Lembretes automáticos que reduzem até 90% das faltas e mensagens de aniversário com cupom para fidelizar.
              </p>
            </div>

            <div className="sinca-essential-card">
              <div className="sinca-essential-icon">
                <DollarSign size={26} />
              </div>
              <h3>Gestão Financeira Descomplicada</h3>
              <p>
                Saiba com clareza quanto faturou, controle despesas, métodos de pagamento e o lucro líquido em tempo real.
              </p>
            </div>

            <div className="sinca-essential-card">
              <div className="sinca-essential-icon">
                <TrendingUp size={26} />
              </div>
              <h3>Comissões Automáticas</h3>
              <p>
                Cálculo instantâneo das comissões da sua equipe. Adeus contas manuais, discussões e planilhas confusas.
              </p>
            </div>

            <div className="sinca-essential-card">
              <div className="sinca-essential-icon">
                <Heart size={26} />
              </div>
              <h3>Fidelização & CRM de Clientes</h3>
              <p>
                Histórico completo de atendimentos, preferências registradas e lembretes periódicos de retorno para manter a casa cheia.
              </p>
            </div>

            <div className="sinca-essential-card">
              <div className="sinca-essential-icon">
                <Ticket size={26} />
              </div>
              <h3>Cupons Personalizados</h3>
              <p>
                Crie cupons de desconto exclusivos para campanhas no Instagram, datas comemorativas e retenção de clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHOWCASE SECTION (Real Screens & Clean WhatsApp Bot Mockup)             */}
      {/* ========================================================================= */}
      <section className="sinca-section sinca-showcase-section">
        <div className="sinca-container">
          <div className="sinca-section-header">
            <span className="sinca-section-tag">Demonstração Prática</span>
            <h2 className="sinca-section-title">Conheça o sistema por dentro</h2>
            <p className="sinca-section-subtitle">
              Veja como o Gestão Boa opera de forma simples, visual e automatizada no dia a dia do seu espaço.
            </p>
          </div>

          <div className="sinca-showcase-container">
            {/* Feature 1: Agenda */}
            <div className="sinca-showcase-card">
              <div className="sinca-showcase-media">
                <img
                  src="/Agenda.png"
                  alt="App de Agendamentos Inteligente - Agenda online sincronizada"
                  loading="lazy"
                />
              </div>
              <div className="sinca-showcase-content">
                <span className="sinca-section-tag">📅 Agenda Sincronizada</span>
                <h3>Agendamento Online 24h & em Tempo Real</h3>
                <p>
                  Organize todos os horários da equipe sem furos, duplicidades ou confusões.
                </p>
                <ul className="sinca-checklist">
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Agendamento autônomo:</strong> Clientes marcam o próprio horário a qualquer momento.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Lembretes automáticos no WhatsApp:</strong> Reduza faltas e atrasos em até 90%.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Sincronização em tempo real:</strong> Acesse pelo celular, tablet ou computador.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Múltiplos profissionais:</strong> Visão clara da grade de horários de cada colaborador.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: WhatsApp Chatbot Clean */}
            <div className="sinca-showcase-card sinca-showcase-reverse">
              <div className="sinca-showcase-media">
                <div className="sinca-wa-mockup">
                  <div className="sinca-wa-header">
                    <div className="sinca-wa-avatar">GB</div>
                    <div className="sinca-wa-title">
                      <strong>Gestão Boa Bot 🤖</strong>
                      <span>• Online agora</span>
                    </div>
                  </div>

                  <div className="sinca-wa-body">
                    <div className="sinca-wa-bubble">
                      <span className="sinca-wa-badge">⏰ Lembrete de Horário</span>
                      <div>
                        Olá, <strong>Mariana</strong>! 🌸 Passando para lembrar do seu horário de{" "}
                        <strong>Corte & Tratamento</strong> amanhã às <strong>14:30</strong> com o especialista Bruno.
                      </div>
                      <div style={{ marginTop: "6px", fontSize: "12px", color: "#0284c7", fontWeight: 700 }}>
                        Responda 1 para confirmar ou 2 para reagendar.
                      </div>
                      <div className="sinca-wa-time">10:30 ✓✓</div>
                    </div>

                    <div className="sinca-wa-bubble sinca-wa-bubble-outgoing">
                      <div>1 - Confirmado! Já estou ansiosa! ✨</div>
                      <div className="sinca-wa-time">10:32</div>
                    </div>

                    <div className="sinca-wa-bubble">
                      <span className="sinca-wa-badge" style={{ background: "#fce7f3", color: "#be185d" }}>
                        🎂 Feliz Aniversário!
                      </span>
                      <div>
                        🎉 Parabéns, <strong>Mariana</strong>! Toda a equipe deseja um dia incrível! Preparamos um presente: use o cupom <strong>NIVER15</strong> e ganhe <strong>15% OFF</strong> no seu próximo atendimento! 🎁✨
                      </div>
                      <div className="sinca-wa-time">09:00 ✓✓</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sinca-showcase-content">
                <span className="sinca-section-tag">🤖 Automação WhatsApp</span>
                <h3>Lembretes Anti-Furo & Felicitações de Aniversário</h3>
                <p>
                  Deixe o robô inteligente cuidar da comunicação com seus clientes pelo WhatsApp, garantindo agenda cheia e fidelização contínua.
                </p>
                <ul className="sinca-checklist">
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Lembretes automáticos:</strong> Notificações inteligentes que evitam horários vazios na agenda.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Mensagem de aniversário com presente:</strong> Fidelize clientes enviando carinho e cupom exclusivo.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Confirmação em 1 clique:</strong> A resposta do cliente atualiza o status na agenda na hora.</span>
                  </li>
                </ul>
                <div className="sinca-tip-box">
                  💡 <strong>Fidelização comprovada:</strong> Clientes que recebem felicitações de aniversário têm taxa de retorno 3x maior no mesmo mês!
                </div>
              </div>
            </div>

            {/* Feature 3: Financeiro & Caixa */}
            <div className="sinca-showcase-card">
              <div className="sinca-showcase-media">
                <img
                  src="/Caixa.png"
                  alt="Gestão Financeira e Controle de Caixa"
                  loading="lazy"
                />
              </div>
              <div className="sinca-showcase-content">
                <span className="sinca-section-tag">💰 Financeiro & Caixa</span>
                <h3>Controle Financeiro Completo e Descomplicado</h3>
                <p>
                  Tenha clareza total sobre entradas, saídas e rentabilidade do seu estabelecimento.
                </p>
                <ul className="sinca-checklist">
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Fluxo de caixa em tempo real:</strong> Acompanhe receitas, despesas e saldo líquido atualizado.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Múltiplas formas de pagamento:</strong> PIX, cartões de crédito/débito, dinheiro e pagamentos divididos.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="sinca-check-icon" />
                    <span><strong>Fechamento diário sem estresse:</strong> Conciliação rápida de valores no final do expediente.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRICING SECTION WITH SINCA RS DISCOUNT (CLEAN WHITE CARDS)             */}
      {/* ========================================================================= */}
      <section className="sinca-section sinca-pricing-section" ref={pricingRef}>
        <div className="sinca-container">
          <div className="sinca-section-header">
            <span className="sinca-section-tag">Tabela Oficial da Parceria</span>
            <h2 className="sinca-section-title">Planos com Desconto Sinca RS</h2>
            <p className="sinca-section-subtitle">
              Como associado Sinca RS / Fecomércio-RS, você tem acesso a condições exclusivas em todos os planos.
            </p>
          </div>

          {/* Period Selector */}
          <div className="sinca-period-selector">
            {[
              { type: "Anual" as PlanPeriod, discount: "50% OFF (Mais Vantajoso)" },
              { type: "Semestral" as PlanPeriod, discount: "30% OFF" },
              { type: "Mensal" as PlanPeriod, discount: "10% OFF" },
            ].map((item) => (
              <button
                type="button"
                key={item.type}
                className={`sinca-period-btn ${planPeriod === item.type ? "sinca-period-active" : ""}`}
                onClick={() => setPlanPeriod(item.type)}
              >
                <span>{item.type}</span>
                <span className="sinca-discount-tag">{item.discount}</span>
              </button>
            ))}
          </div>

          {/* Pricing Grid */}
          <div className="sinca-pricing-grid">
            {/* PLANO BÁSICO */}
            <div className="sinca-plan-card">
              <div>
                <h3 className="sinca-plan-name">Básico</h3>
                <span className="sinca-plan-limit">1 Profissional</span>

                <div className="sinca-price-box">
                  <div className="sinca-original-price">
                    De R$ {getPriceInfo("basico").originalStr}/mês por
                  </div>
                  <div className="sinca-main-price">
                    <span className="sinca-currency">R$</span>
                    {getPriceInfo("basico").monthlyStr}
                    <span className="sinca-period">/mês</span>
                  </div>
                  <div className="sinca-daily-price">
                    apenas R$ {getPriceInfo("basico").dailyStr} por dia
                  </div>
                </div>

                <ul className="sinca-plan-features">
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Agenda Online 24h</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Chatbot Lembretes & Aniversário</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> CRM com Histórico de Clientes</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Controle Financeiro & Caixa</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> 1 Profissional</li>
                </ul>
              </div>

              <button
                type="button"
                className="sinca-plan-btn"
                onClick={() => handleSelectPlan("basico")}
              >
                Começar Teste Grátis
              </button>
            </div>

            {/* PLANO CRESCIMENTO (FEATURED) */}
            <div className="sinca-plan-card sinca-plan-featured">
              <span className="sinca-plan-badge">MAIS POPULAR</span>
              <div>
                <h3 className="sinca-plan-name">Crescimento</h3>
                <span className="sinca-plan-limit">2-3 Profissionais</span>

                <div className="sinca-price-box">
                  <div className="sinca-original-price">
                    De R$ {getPriceInfo("crescimento").originalStr}/mês por
                  </div>
                  <div className="sinca-main-price">
                    <span className="sinca-currency">R$</span>
                    {getPriceInfo("crescimento").monthlyStr}
                    <span className="sinca-period">/mês</span>
                  </div>
                  <div className="sinca-daily-price">
                    apenas R$ {getPriceInfo("crescimento").dailyStr} por dia
                  </div>
                </div>

                <ul className="sinca-plan-features">
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> <strong>Tudo do Básico +</strong></li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> 2 a 3 Profissionais</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Comissões Automáticas da Equipe</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Gestão de Equipe & Escalas</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Relatórios de Desempenho</li>
                </ul>
              </div>

              <button
                type="button"
                className="sinca-plan-btn sinca-plan-btn-featured"
                onClick={() => handleSelectPlan("crescimento")}
              >
                Escolher Plano Crescimento
              </button>
            </div>

            {/* PLANO EMPRESARIAL */}
            <div className="sinca-plan-card">
              <div>
                <h3 className="sinca-plan-name">Empresarial</h3>
                <span className="sinca-plan-limit">4-6 Profissionais</span>

                <div className="sinca-price-box">
                  <div className="sinca-original-price">
                    De R$ {getPriceInfo("empresarial").originalStr}/mês por
                  </div>
                  <div className="sinca-main-price">
                    <span className="sinca-currency">R$</span>
                    {getPriceInfo("empresarial").monthlyStr}
                    <span className="sinca-period">/mês</span>
                  </div>
                  <div className="sinca-daily-price">
                    apenas R$ {getPriceInfo("empresarial").dailyStr} por dia
                  </div>
                </div>

                <ul className="sinca-plan-features">
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> <strong>Tudo do Crescimento +</strong></li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> 4 a 6 Profissionais</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Gestão Completa de Equipe</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Relatórios Avançados de Vendas</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Suporte Prioritário</li>
                </ul>
              </div>

              <button
                type="button"
                className="sinca-plan-btn"
                onClick={() => handleSelectPlan("empresarial")}
              >
                Começar Teste Grátis
              </button>
            </div>

            {/* PLANO ILIMITADO */}
            <div className="sinca-plan-card">
              <div>
                <h3 className="sinca-plan-name">Ilimitado</h3>
                <span className="sinca-plan-limit">Profissionais Ilimitados</span>

                <div className="sinca-price-box">
                  <div className="sinca-original-price">
                    De R$ {getPriceInfo("ilimitado").originalStr}/mês por
                  </div>
                  <div className="sinca-main-price">
                    <span className="sinca-currency">R$</span>
                    {getPriceInfo("ilimitado").monthlyStr}
                    <span className="sinca-period">/mês</span>
                  </div>
                  <div className="sinca-daily-price">
                    apenas R$ {getPriceInfo("ilimitado").dailyStr} por dia
                  </div>
                </div>

                <ul className="sinca-plan-features">
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> <strong>Tudo do Empresarial +</strong></li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Profissionais Ilimitados</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Gestão de Múltiplas Cadeiras</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Relatórios Personalizados</li>
                  <li><CheckCircle2 size={16} className="sinca-check-icon" /> Atendimento & Suporte VIP</li>
                </ul>
              </div>

              <button
                type="button"
                className="sinca-plan-btn"
                onClick={() => handleSelectPlan("ilimitado")}
              >
                Começar Teste Grátis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FAQ ACCORDION (INTERACTIVE CLEAN ACCORDION)                            */}
      {/* ========================================================================= */}
      <section className="sinca-section sinca-faq-section">
        <div className="sinca-container">
          <div className="sinca-section-header">
            <span className="sinca-section-tag">Tire Suas Dúvidas</span>
            <h2 className="sinca-section-title">Perguntas Frequentes sobre a Parceria</h2>
            <p className="sinca-section-subtitle">
              Tudo o que você precisa saber sobre as condições especiais do Sinca RS e Fecomércio-RS.
            </p>
          </div>

          <div className="sinca-faq-container">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`sinca-faq-item ${isOpen ? "sinca-faq-open" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="sinca-faq-question">
                    <span className="sinca-faq-q-text">{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`sinca-faq-chevron ${isOpen ? "sinca-chevron-rotated" : ""}`}
                    />
                  </div>
                  {isOpen && <div className="sinca-faq-answer">{item.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA BANNER                                                       */}
      {/* ========================================================================= */}
      <section className="sinca-final-cta">
        <div className="sinca-container">
          <div className="sinca-cta-content">
            <h2>Aproveite as vantagens exclusivas do Sinca RS</h2>
            <p>
              Faça seu teste gratuito de 10 dias agora mesmo. Modernize sua barbearia, salão ou clínica de estética sem fidelidade e sem cartão de crédito.
            </p>
            <button type="button" className="sinca-btn-cta-large" onClick={handleStartFree}>
              🚀 Criar Minha Conta Grátis com Desconto Sinca RS
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SincaRS;
