import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FB_PIXEL } from '../../utils/pixel';
import { submitSalaoForm, SalaoFormData } from '../../services/formSubmission';
import './animations.css';
import '../Barbershop/form.css'; // Importando CSS do formulário
import { 
  Container, 
  Content,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ProblemSolutionContainer,
  ProblemSection,
  ProblemTitle,
  ProblemList,
  ProblemItem,
  SolutionSection,
  SolutionTitle,
  SolutionList,
  SolutionItem,
  TestimonialsSection,
  TestimonialsTitle,
  TestimonialCard,
  TestimonialContent,
  TestimonialAuthor,
  OnlineBookingSection,
  OnlineBookingContent,
  OnlineBookingTitle,
  OnlineBookingDescription,
  OnlineBookingBenefits,
  OnlineBookingImageContainer,
  AboutUsSection,
  AboutUsContent,
  AboutUsLabel,
  AboutUsTitle,
  AboutUsDescription,
  AboutUsHighlight,
  FoundersGrid,
  FounderCard,
  AboutUsImageContainer,
  CTASection,
  CTATitle,
  CTADescription,
  FeatureSection,
  FeatureTitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureCardTitle,
  FeatureDescription,
  PricingSection,
  PricingTitle,
  FinalCTASection,
  GuaranteeSection,
  GuaranteeTitle,
  GuaranteeDescription
} from './styles';

// type PlanType = "Anual" | "Semestral" | "Mensal";

// const getDiscount = (type: PlanType) => {
//   switch (type) {
//     case "Anual":
//       return 0.24; // 24% off
//     case "Semestral":
//       return 0.15; // 15% off
//     default:
//       return 0;
//   }
// };

// const calculateDiscountedPrice = (price: number, type: PlanType) => {
//   const discount = getDiscount(type);
//   return price * (1 - discount);
// };

const SalaoEstetica: React.FC = () => {
  const planType = "Anual";
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    tempoAberta: '',
    numeroProfissionais: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Rastreamento do carregamento da página
  useEffect(() => {
    // Rastreia pageview
    FB_PIXEL.pageView();
    
    // Rastreia evento customizado para página de salão/estética
    FB_PIXEL.trackCustomEvent("ViewSalaoEsteticaPage", {
      page: "salao_estetica",
      timestamp: new Date().toISOString(),
    });

    // Observer para rastrear quando o usuário visualiza seções importantes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            if (section === 'online-booking') {
              FB_PIXEL.trackCustomEvent("ViewOnlineBookingSection", {
                page: "salao_estetica",
                section: "online_booking",
                timestamp: new Date().toISOString(),
              });
            } else if (section === 'about-us') {
              FB_PIXEL.trackCustomEvent("ViewAboutUsSection", {
                page: "salao_estetica",
                section: "about_us",
                timestamp: new Date().toISOString(),
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observa as seções
    const onlineBookingElement = document.querySelector('[data-section="online-booking"]');
    const aboutUsElement = document.querySelector('[data-section="about-us"]');
    
    if (onlineBookingElement) {
      observer.observe(onlineBookingElement);
    }
    if (aboutUsElement) {
      observer.observe(aboutUsElement);
    }

    return () => observer.disconnect();
  }, []);

  // Price data
  // const monthlyPrices = {
  //   Basico: 64.90,
  //   Crescimento: 89.90,
  //   Empresarial: 129.90,
  // };

  // Função para redirecionar para teste grátis
  const handleFreeTrialClick = () => {
    // Rastreamento do pixel
    FB_PIXEL.trackStartTrial({
      source: "salao_estetica_page",
      plan_type: planType,
      timestamp: new Date().toISOString(),
    });
    
    FB_PIXEL.trackCustomEvent("FreeTrial_ButtonClick", {
      page: "salao_estetica",
      plan_selected: planType,
      button_location: "cta",
    });
    
    scrollToForm(); // Navega para o formulário ao invés de abrir link externo
  };

  // Funções específicas para cada plano
  // const handlePlanClick = (planName: string) => {
  //   // Rastreamento do pixel
  //   FB_PIXEL.trackStartTrial({
  //     source: "salao_estetica_page",
  //     plan_type: planType,
  //     plan_name: planName,
  //     timestamp: new Date().toISOString(),
  //   });
    
  //   FB_PIXEL.trackCustomEvent("PlanSelection", {
  //     page: "salao_estetica",
  //     plan_selected: planName,
  //     plan_type: planType,
  //     button_location: "pricing_card",
  //   });
    
  //   console.log(`Plano ${planName} selecionado!`); // Para debug
  //   window.open("https://app.gestaoboa.com.br", "_blank");
  // };

  // Função para scroll para o formulário
  const scrollToForm = () => {
    const formElement = document.getElementById('salao-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para lidar com mudanças no formulário
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Função para lidar com mudanças no formulário (legacy)
  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // Função para submissão do formulário
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nomeCompleto || !formData.telefone || !formData.tempoAberta || !formData.numeroProfissionais) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepara os dados para envio
      const dataToSubmit: SalaoFormData = {
        nomeCompleto: formData.nomeCompleto,
        telefone: formData.telefone,
        tempoAberta: formData.tempoAberta,
        numeroProfissionais: formData.numeroProfissionais,
        timestamp: new Date().toISOString()
      };

      // Envia os dados
      const success = await submitSalaoForm(dataToSubmit);

      if (success) {
        // Rastreamento do pixel
        FB_PIXEL.trackCustomEvent("SalaoFormSubmit", {
          page: "salao_estetica",
          nome_completo: formData.nomeCompleto,
          telefone: formData.telefone,
          tempo_aberta: formData.tempoAberta,
          numero_profissionais: formData.numeroProfissionais,
          timestamp: new Date().toISOString(),
        });

        console.log("Formulário do salão enviado com sucesso:", dataToSubmit);
        
        setSubmitSuccess(true);
        
        // Limpa o formulário
        setFormData({
          nomeCompleto: '',
          telefone: '',
          tempoAberta: '',
          numeroProfissionais: ''
        });

        // Mostra modal de sucesso e convite para WhatsApp
        setTimeout(() => {
          setShowWhatsAppModal(true);
        }, 1000);

      } else {
        throw new Error('Falha ao enviar formulário');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário do salão:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para entrar no WhatsApp
  const handleJoinWhatsApp = () => {
    FB_PIXEL.trackCustomEvent("WhatsAppGroupJoin", {
      page: "salao_estetica",
      source: "form_modal",
    });
    
    // Link do grupo do WhatsApp para salões
    window.open("https://chat.whatsapp.com/JWC0pUmu04l3ZkXZUErEUN", "_blank");
    setShowWhatsAppModal(false);
  };

  // Função para pular o WhatsApp
  const handleSkipWhatsApp = () => {
    setShowWhatsAppModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Gestão Boa - Sistema Completo para Salões de Beleza e Clínicas de Estética</title>
        <meta name="description" content="Transforme seu salão de beleza ou clínica de estética com o sistema de gestão mais completo do mercado. Agendamento online, controle financeiro, gestão de clientes e muito mais." />
        <meta name="keywords" content="sistema salão beleza, agendamento online, gestão estética, software salão, clínica estética" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gestaoboa.com.br/salao-estetica" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Sistema Completo para Salões de Beleza e Clínicas de Estética" />
        <meta property="og:description" content="Transforme seu salão ou clínica com agendamento online, controle financeiro e gestão completa. Teste grátis por 20 dias!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gestaoboa.com.br/salao-estetica" />
        <meta property="og:image" content="https://gestaoboa.com.br/salao-estetica-og.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sistema para Salões de Beleza e Clínicas de Estética" />
        <meta name="twitter:description" content="Agendamento online, controle financeiro e gestão completa para seu negócio de beleza." />
        <meta name="twitter:image" content="https://gestaoboa.com.br/salao-estetica-twitter.jpg" />
      </Helmet>
      
      <Header />
      
      <Container>
        <Content>
          {/* Hero Section */}
          <HeroSection>
            <HeroTitle>
              🔥 <span>BLACK FRIDAY</span> Sistema de Gestão para Salões e Clínicas - Oferta especial será revelada dia <span>14/11</span>
            </HeroTitle>
            <HeroSubtitle className="black-friday-subtitle">
              Não perca a maior promoção do ano! Para receber nossa oferta EXCLUSIVA de Black Friday, preencha o formulário abaixo e entre no nosso grupo VIP do WhatsApp. A oferta será revelada apenas para os membros do grupo no dia 14/11! 🎯
            </HeroSubtitle>
            <Button 
              text="🎁 QUERO A OFERTA EXCLUSIVA"
              method={handleFreeTrialClick}
              type="focused"
            />
          </HeroSection>

          {/* Problem & Solution Section */}
          <ProblemSolutionContainer>
            {/* Problem Section */}
            <ProblemSection>
              <ProblemTitle>Se você não aguenta mais...</ProblemTitle>
              <ProblemList>
                <ProblemItem>
                  ❌ Perder clientes porque não consegue organizar os agendamentos de procedimentos...
                </ProblemItem>
                <ProblemItem>
                  ❌ Ficar perdida sem saber quanto está ganhando com cada tratamento...
                </ProblemItem>
                <ProblemItem>
                  ❌ Esquecer de cobrar produtos de beleza ou procedimentos realizados...
                </ProblemItem>
                <ProblemItem>
                  ❌ Não conseguir fidelizar clientes por falta de controle dos tratamentos...
                </ProblemItem>
                <ProblemItem>
                  ❌ Trabalhar mais e ganhar menos por desorganização da agenda...
                </ProblemItem>
                <ProblemItem>
                  ❌ Ter dor de cabeça com papelada e controles manuais de pacotes...
                </ProblemItem>
              </ProblemList>
            </ProblemSection>

            {/* Solution Section */}
            <SolutionSection>
              <SolutionTitle>Você será capaz de...</SolutionTitle>
              <SolutionList>
                <SolutionItem>
                  ✅ Ter seu link de agendamento personalizado para todos os serviços...
                </SolutionItem>
                <SolutionItem>
                  ✅ Controlar todas as finanças do seu salão/clínica em tempo real...
                </SolutionItem>
                <SolutionItem>
                  ✅ Nunca mais esquecer de cobrar um procedimento ou produto de beleza...
                </SolutionItem>
                <SolutionItem>
                  ✅ Fidelizar clientes com histórico completo de tratamentos e preferências...
                </SolutionItem>
                <SolutionItem>
                  ✅ Trabalhar menos e ganhar mais com organização total da agenda...
                </SolutionItem>
                <SolutionItem>
                  ✅ Ter relatórios automáticos e controle profissional de pacotes...
                </SolutionItem>
              </SolutionList>
            </SolutionSection>
          </ProblemSolutionContainer>

          {/* Testimonials Section */}
          <TestimonialsSection>
            <TestimonialsTitle>
              Profissionais da beleza já estão transformando seus negócios
            </TestimonialsTitle>
            
            <TestimonialCard>
              <TestimonialContent>
                "O app da gestão boa vem me ajudando muito desde o primeiro dia, consigo saber com exatidão quantas clientes eu tenho e atendo, faturamento, venda de produtos, etc. Comecei a ter controle não só dos procedimentos, mas das vendas dos produtos de beleza e dos custos."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/kaiane.jpeg" alt="Kaiane Silva" />
                <div>
                  <strong>Kaiane Silva</strong>
                  <span>Proprietária do Espaço Beleza Kaiane</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialContent>
                "Com o Gestão Boa aumentei meu faturamento e organizei completamente minha clínica de estética. Agora tenho controle total dos tratamentos e sei exatamente quanto estou lucrando com cada procedimento."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/karine.png" alt="Karine Mendes" />
                <div>
                  <strong>Karine Mendes</strong>
                  <span>Proprietária da Clínica Bem Estar</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialContent>
                "Fora de série, fora de série mesmo! Eu te chamo, tu me responde. Tinha muito receio, pois já contratei outros sistemas e não tinha esse retorno pra tirar minhas dúvidas. Tu responde, tira minhas dúvidas, não faz corpo mole, e me mostra tudo certinho. Cara, tá show de bola!"
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/WhatsApp Image 2024-07-05 at 10.01.10.jpeg" alt="Juliana Santos" />
                <div>
                  <strong>Juliana Santos</strong>
                  <span>Proprietária do Studio J Beauty</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsSection>

          {/* Online Booking Section */}
          <OnlineBookingSection data-section="online-booking">
            <OnlineBookingContent>
              <OnlineBookingTitle>
                <span className="highlight">Agendamento online</span> é muito mais fácil do que você imagina.
              </OnlineBookingTitle>
              <OnlineBookingDescription>
                O problema é que, quando se trata dos seus serviços e horários, você sente vergonha de ofertar. Tem medo de parecer uma profissional insistente.
              </OnlineBookingDescription>
              <OnlineBookingBenefits>
                <li>Suas clientes agendam 24h por dia, sem você precisar atender o telefone</li>
                <li>Reduz faltas e remarcações de última hora nos tratamentos</li>
                <li>Clientes recebem lembretes automáticos por WhatsApp dos procedimentos</li>
                <li>Você tem controle total da sua agenda de beleza em tempo real</li>
                <li>Aumenta seu faturamento com agendamentos noturnos e fins de semana</li>
                <li>Cria uma imagem mais profissional para seu salão ou clínica</li>
              </OnlineBookingBenefits>
              <OnlineBookingDescription>
                Você não precisa conhecer mil técnicas de vendas ou palavras mágicas. A única coisa que você precisa é entender a lógica por trás do desejo de beleza — e usar isso a seu favor.
              </OnlineBookingDescription>
            </OnlineBookingContent>
            <OnlineBookingImageContainer>
              <img src="/karine agendamentos.png" alt="Interface do sistema de agendamento online para salões" />
            </OnlineBookingImageContainer>
          </OnlineBookingSection>

          {/* Features Section */}
          <FeatureSection>
            <FeatureTitle>Tudo que seu salão ou clínica precisa em um só lugar</FeatureTitle>
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon>📅</FeatureIcon>
                <FeatureCardTitle>Agendamento Online</FeatureCardTitle>
                <FeatureDescription>
                  Suas clientes agendam procedimentos direto pelo celular, 24h por dia. Sem mais ligações perdidas ou confusão nos horários.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>💰</FeatureIcon>
                <FeatureCardTitle>Controle Financeiro</FeatureCardTitle>
                <FeatureDescription>
                  Acompanhe receitas, despesas e lucro por procedimento em tempo real. Relatórios automáticos para você tomar melhores decisões.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>👥</FeatureIcon>
                <FeatureCardTitle>Gestão de Clientes</FeatureCardTitle>
                <FeatureDescription>
                  Histórico completo de cada cliente, preferências de tratamentos, aniversários e lembretes automáticos para fidelização.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>🎯</FeatureIcon>
                <FeatureCardTitle>Comissões Automáticas</FeatureCardTitle>
                <FeatureDescription>
                  Calcule automaticamente as comissões das profissionais e tenha relatórios detalhados de cada especialista.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>📊</FeatureIcon>
                <FeatureCardTitle>Relatórios Inteligentes</FeatureCardTitle>
                <FeatureDescription>
                  Dashboards com tudo que você precisa saber: faturamento, clientes mais fiéis, procedimentos mais realizados.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>🔄</FeatureIcon>
                <FeatureCardTitle>Estoque e Produtos</FeatureCardTitle>
                <FeatureDescription>
                  Controle total do estoque de produtos de beleza, alertas de produtos em falta e gestão completa de vendas.
                </FeatureDescription>
              </FeatureCard>
            </FeatureGrid>
          </FeatureSection>

          {/* CTA Section */}
          <CTASection>
            <CTATitle>
              Quanto dinheiro você está perdendo por desorganização?
            </CTATitle>
            <CTADescription>
              Todo dia sem organização é dinheiro que sai do seu bolso. Clientes perdidas, procedimentos não cobrados, 
              despesas desnecessárias... Teste o Gestão Boa por 20 dias grátis e pare de perder dinheiro.
            </CTADescription>
            <Button 
              text="🎁 QUERO A OFERTA EXCLUSIVA"
              method={handleFreeTrialClick}
              type="focused"
            />
          </CTASection>

          {/* Pricing Section - Comentado para Black Friday */}
          {/*
          <PricingSection>
            <PricingTitle>Escolha o plano ideal para seu salão ou clínica</PricingTitle>
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
                  onClick={() => {
                    const newPlanType = plan.type as "Anual" | "Semestral" | "Mensal";
                    setPlanType(newPlanType);
                    
                    // Rastreamento da seleção de plano
                    FB_PIXEL.trackCustomEvent("PlanTypeSelection", {
                      page: "salao_estetica",
                      plan_type: newPlanType,
                      previous_plan: planType,
                      discount_percentage: plan.discount || "none",
                    });
                  }}
                >
                  <span>{plan.type}</span>
                  {plan.discount && (
                    <span className="plan-type-discount">{plan.discount}</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="pricing-grid">
              <PricingCard>
                <div className="plan-header">
                  <h3>Plano Básico</h3>
                  <p>Perfeito para profissionais solo</p>
                </div>
                <PricingPrice>
                  <span>
                    {planType === "Mensal" 
                      ? "Por mês" 
                      : planType === "Semestral" 
                        ? "6x de" 
                        : "12x de"}
                  </span>
                  <strong>
                    R$ {planType === "Mensal"
                      ? monthlyPrices.Basico.toFixed(2).replace(".", ",")
                      : calculateDiscountedPrice(monthlyPrices.Basico, planType)
                          .toFixed(2)
                          .replace(".", ",")}
                  </strong>
                  <span className="period">
                    {planType === "Mensal" ? "/mês" : ""}
                  </span>
                </PricingPrice>
                {planType !== "Mensal" && (
                  <div className="original-price">
                    <span>De: R$ {monthlyPrices.Basico.toFixed(2).replace(".", ",")}/mês</span>
                    <span className="savings">
                      Economize {getDiscount(planType) * 100}%
                    </span>
                  </div>
                )}
                <PricingPeriod>Teste grátis por 20 dias</PricingPeriod>
                <Button 
                  text="🎁 QUERO A OFERTA EXCLUSIVA"
                  method={() => handlePlanClick("Básico")}
                  type="focused"
                />
                <ul className="plan-features">
                  <li>✅ Agendamentos</li>
                  <li>✅ Finanças</li>
                  <li>✅ Gestão de estoque</li>
                  <li>✅ Relatórios</li>
                  <li>✅ Suporte via WhatsApp</li>
                  <li>✅ Gestão de clientes</li>
                  <li>✅ Limite de 1 usuário</li>
                </ul>
              </PricingCard>

              <PricingCard className="featured">
                <div className="popular-badge">MAIS POPULAR</div>
                <div className="plan-header">
                  <h3>Plano Crescimento</h3>
                  <p>Para salões pequenos e médios</p>
                </div>
                <PricingPrice>
                  <span>
                    {planType === "Mensal" 
                      ? "Por mês" 
                      : planType === "Semestral" 
                        ? "6x de" 
                        : "12x de"}
                  </span>
                  <strong>
                    R$ {planType === "Mensal"
                      ? monthlyPrices.Crescimento.toFixed(2).replace(".", ",")
                      : calculateDiscountedPrice(monthlyPrices.Crescimento, planType)
                          .toFixed(2)
                          .replace(".", ",")}
                  </strong>
                  <span className="period">
                    {planType === "Mensal" ? "/mês" : ""}
                  </span>
                </PricingPrice>
                {planType !== "Mensal" && (
                  <div className="original-price">
                    <span>De: R$ {monthlyPrices.Crescimento.toFixed(2).replace(".", ",")}/mês</span>
                    <span className="savings">
                      Economize {getDiscount(planType) * 100}%
                    </span>
                  </div>
                )}
                <PricingPeriod>Teste grátis por 20 dias</PricingPeriod>
                <Button 
                  text="🎁 QUERO A OFERTA EXCLUSIVA"
                  method={() => handlePlanClick("Crescimento")}
                  type="focused"
                />
                <ul className="plan-features">
                  <li>✅ Agendamentos</li>
                  <li>✅ Finanças</li>
                  <li>✅ Gestão de estoque</li>
                  <li>✅ Relatórios</li>
                  <li>✅ Suporte via WhatsApp</li>
                  <li>✅ Gestão de clientes</li>
                  <li>✅ Gestão de equipes</li>
                  <li>✅ Comissões automáticas</li>
                  <li>✅ Limite de 2 usuários</li>
                </ul>
              </PricingCard>

              <PricingCard>
                <div className="plan-header">
                  <h3>Plano Empresarial</h3>
                  <p>Para clínicas e salões grandes</p>
                </div>
                <PricingPrice>
                  <span>
                    {planType === "Mensal" 
                      ? "Por mês" 
                      : planType === "Semestral" 
                        ? "6x de" 
                        : "12x de"}
                  </span>
                  <strong>
                    R$ {planType === "Mensal"
                      ? monthlyPrices.Empresarial.toFixed(2).replace(".", ",")
                      : calculateDiscountedPrice(monthlyPrices.Empresarial, planType)
                          .toFixed(2)
                          .replace(".", ",")}
                  </strong>
                  <span className="period">
                    {planType === "Mensal" ? "/mês" : ""}
                  </span>
                </PricingPrice>
                {planType !== "Mensal" && (
                  <div className="original-price">
                    <span>De: R$ {monthlyPrices.Empresarial.toFixed(2).replace(".", ",")}/mês</span>
                    <span className="savings">
                      Economize {getDiscount(planType) * 100}%
                    </span>
                  </div>
                )}
                <PricingPeriod>Teste grátis por 20 dias</PricingPeriod>
                <Button 
                  text="🎁 QUERO A OFERTA EXCLUSIVA"
                  method={() => handlePlanClick("Empresarial")}
                  type="focused"
                />
                <ul className="plan-features">
                  <li>✅ Agendamentos</li>
                  <li>✅ Finanças</li>
                  <li>✅ Gestão de estoque</li>
                  <li>✅ Relatórios</li>
                  <li>✅ Suporte via WhatsApp</li>
                  <li>✅ Gestão de clientes</li>
                  <li>✅ Gestão de equipes</li>
                  <li>✅ Comissões automáticas</li>
                  <li>✅ Usuários ilimitados</li>
                  <li>✅ 30 min de Mentoria com Leandro</li>
                </ul>
              </PricingCard>
            </div>
          </PricingSection>
          */}

          {/* Formulário Black Friday */}
          <PricingSection id="salao-form">
            <PricingTitle>🎁 Garanta sua oferta EXCLUSIVA de Black Friday</PricingTitle>
            <div className="black-friday-subtitle">
              Preencha seus dados abaixo e seja o primeiro a saber sobre nossa promoção especial! 
              A oferta será revelada no dia <strong>14/11</strong> apenas para quem estiver no nosso grupo VIP.
            </div>
            
            <div className="barbershop-form-container">
              <form onSubmit={handleFormSubmit} className="barbershop-form">
                <div className="form-field">
                  <label className="form-label">Nome completo *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Digite seu nome completo"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Telefone/WhatsApp *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    maxLength={15}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Há quanto tempo seu salão/clínica está aberto? *</label>
                  <select
                    className="form-select"
                    value={formData.tempoAberta}
                    onChange={(e) => handleInputChange('tempoAberta', e.target.value)}
                    required
                    title="Selecione há quanto tempo seu salão/clínica está aberto"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="menos-6-meses">Menos de 6 meses</option>
                    <option value="6-meses-1-ano">De 6 meses a 1 ano</option>
                    <option value="1-2-anos">De 1 a 2 anos</option>
                    <option value="2-5-anos">De 2 a 5 anos</option>
                    <option value="mais-5-anos">Mais de 5 anos</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Quantos profissionais trabalham no seu salão/clínica? *</label>
                  <select
                    className="form-select"
                    value={formData.numeroProfissionais}
                    onChange={(e) => handleInputChange('numeroProfissionais', e.target.value)}
                    required
                    title="Selecione quantos profissionais trabalham no seu salão/clínica"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="apenas-eu">Apenas eu (proprietário/a)</option>
                    <option value="2-profissionais">2 profissionais</option>
                    <option value="3-profissionais">3 profissionais</option>
                    <option value="4-5-profissionais">4 a 5 profissionais</option>
                    <option value="mais-5-profissionais">Mais de 5 profissionais</option>
                  </select>
                </div>

                <div className="form-button-container">
                  <button 
                    type="submit"
                    className="form-submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? 'ENVIANDO...' 
                      : submitSuccess 
                        ? '✅ FORMULÁRIO ENVIADO - AGUARDE O GRUPO VIP!' 
                        : '🎁 QUERO A OFERTA EXCLUSIVA'
                    }
                  </button>
                </div>
              </form>
            </div>
          </PricingSection>

          {/* 20 Days Free Trial Section */}
          <GuaranteeSection>
            <GuaranteeTitle>20 dias grátis para testar</GuaranteeTitle>
            <GuaranteeDescription>
              Teste todas as funcionalidades do Gestão Boa por 20 dias completamente grátis. 
              Sem compromisso, sem cartão de crédito. Veja na prática como o sistema pode transformar seu salão ou clínica.
            </GuaranteeDescription>
          </GuaranteeSection>

          {/* About Us Section */}
          <AboutUsSection data-section="about-us">
            <AboutUsContent>
              <AboutUsLabel>Porque confiar na Gestão Boa?</AboutUsLabel>
              <AboutUsTitle>Gestão Boa</AboutUsTitle>
              <AboutUsDescription>
                Há mais de 2 anos desenvolvendo soluções tecnológicas, nossa missão é simples: 
                tornar a gestão empresarial acessível para todo empreendedor.
              </AboutUsDescription>
              <AboutUsHighlight>
                Acreditamos que tecnologia deve simplificar, não complicar. Por isso criamos 
                um sistema que qualquer pessoa consegue usar, independente do conhecimento técnico.
              </AboutUsHighlight>
              <AboutUsDescription>
                Nosso compromisso é continuar inovando para que você tenha mais tempo para 
                focar no que realmente importa: fazer seu negócio crescer.
              </AboutUsDescription>
              
              <FoundersGrid>
                <FounderCard>
                  <h4>Sílvio Quintana</h4>
                  <span className="role">CEO e Fundador</span>
                  <p>
                    Arquiteto de ideias que dá vida e direção à Gestão Boa. 
                    Navega com maestria entre desenvolvimento tecnológico, vendas e estratégia.
                  </p>
                </FounderCard>
                
                <FounderCard>
                  <h4>Karine Quintana</h4>
                  <span className="role">CFO e Cofundadora</span>
                  <p>
                    Mente estratégica por trás das finanças e do crescimento. 
                    Lidera nossas iniciativas de marketing digital e representa a empresa em eventos.
                  </p>
                </FounderCard>
                
                <FounderCard>
                  <h4>Victor Amaral</h4>
                  <span className="role">CTO e Cofundador</span>
                  <p>
                    Maestro tecnológico que orquestra nossas equipes de desenvolvimento. 
                    Sua visão técnica impulsiona nossa capacidade de inovação contínua.
                  </p>
                </FounderCard>
              </FoundersGrid>
              
              <AboutUsHighlight>
                Porque quando a tecnologia trabalha a seu favor, empreender se torna 
                muito mais simples e prazeroso.
              </AboutUsHighlight>
            </AboutUsContent>
            <AboutUsImageContainer>
              <img src="/time.png" alt="Equipe Gestão Boa - Sílvio, Karine e Victor, fundadores da empresa" />
            </AboutUsImageContainer>
          </AboutUsSection>

          {/* Final CTA */}
          <FinalCTASection>
            <CTATitle>
              Comece hoje mesmo - 20 dias grátis para transformar seu salão ou clínica
            </CTATitle>
            <CTADescription>
              Junte-se aos salões e clínicas que já usam o Gestão Boa. 
              Teste todas as funcionalidades por 20 dias sem compromisso e veja a diferença na organização do seu negócio.
            </CTADescription>
            <Button 
              text="🎁 QUERO A OFERTA EXCLUSIVA"
              method={handleFreeTrialClick}
              type="focused"
            />
          </FinalCTASection>
        </Content>
      </Container>
      
      {/* Modal do WhatsApp */}
      {showWhatsAppModal && (
        <div className="whatsapp-modal-overlay">
          <div className="whatsapp-modal">
            <div className="whatsapp-modal-header">
              <h3>🔥 BLACK FRIDAY - Formulário enviado com sucesso!</h3>
            </div>
            
            <div className="whatsapp-modal-content">
              <div className="whatsapp-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#25D366"/>
                  <path d="M45.5 14.4C42.9 11.8 39.7 10.1 36.2 9.4C32.7 8.7 29.1 9 25.8 10.2C22.5 11.4 19.6 13.5 17.4 16.2C15.2 18.9 13.8 22.1 13.4 25.5C13 28.9 13.5 32.3 15 35.4L13 47L24.9 45.1C27.8 46.4 30.9 47.1 34.1 47C37.3 46.9 40.4 46.1 43.2 44.6C46 43.1 48.4 40.9 50.2 38.2C52 35.5 53.1 32.4 53.4 29.2C53.7 26 53.2 22.8 51.9 19.9C50.6 17 48.6 14.5 46.1 12.6L45.5 14.4ZM30 43.3C27.3 43.3 24.7 42.6 22.4 41.3L21.8 41L16.7 42.3L18 37.3L17.6 36.7C16.2 34.3 15.4 31.6 15.4 28.8C15.4 21.8 21.1 16.1 28.1 16.1C31.4 16.1 34.5 17.4 36.8 19.7C39.1 22 40.4 25.1 40.4 28.4C40.4 35.4 34.7 41.1 27.7 41.1L30 43.3Z" fill="white"/>
                </svg>
              </div>
              
              <h4>🎁 Entre no grupo VIP para a oferta BLACK FRIDAY!</h4>
              <p>Sua oferta EXCLUSIVA será revelada dia <strong>14/11</strong>! Entre no grupo VIP e receba:</p>
              
              <ul className="whatsapp-benefits">
                <li>🔥 Oferta EXCLUSIVA de Black Friday (revelada 14/11)</li>
                <li>💰 Preços especiais apenas para o grupo VIP</li>
                <li>⚡ Acesso prioritário às promoções</li>
                <li>✅ Suporte direto e preferencial</li>
                <li>📈 Dicas para aumentar o faturamento do salão/clínica</li>
              </ul>
            </div>
            
            <div className="whatsapp-modal-actions">
              <button 
                className="whatsapp-join-btn"
                onClick={handleJoinWhatsApp}
              >
                🎁 QUERO A OFERTA EXCLUSIVA
              </button>
              
              <button 
                className="whatsapp-skip-btn"
                onClick={handleSkipWhatsApp}
              >
                Pular por agora
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default SalaoEstetica;
