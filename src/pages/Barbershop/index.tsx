import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FB_PIXEL } from '../../utils/pixel';
import { submitBarbershopForm, BarbershopFormData } from '../../services/formSubmission';
import './animations.css';
import './form.css';
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
  GuaranteeDescription,
  CTAButtonContainer,
  MobileFixedCTAButton
} from './styles';

const Barbershop: React.FC = () => {
  // Estado do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    tempoAberta: '',
    numeroBarbeiros: ''
  });

  // Estado de loading do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Função para fazer scroll até o formulário
  const scrollToForm = () => {
    const formElement = document.getElementById('barbershop-form-section');
    if (formElement) {
      // Scroll suave com offset para dispositivos móveis
      const offsetTop = formElement.offsetTop - 80; // 80px de offset para o header
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Alternativa para browsers que não suportam scrollTo com options
      if (!window.requestAnimationFrame) {
        formElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (11) 99999-9999
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // Função para atualizar os dados do formulário
  const handleInputChange = (field: string, value: string) => {
    // Se for telefone, aplicar formatação
    if (field === 'telefone') {
      value = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funções para o modal do WhatsApp
  const handleJoinWhatsApp = () => {
    // Link do grupo do WhatsApp (substitua pelo seu link real)
    const whatsappGroupLink = "https://chat.whatsapp.com/JWC0pUmu04l3ZkXZUErEUN";
    
    // Abre o link do WhatsApp
    window.open(whatsappGroupLink, "_blank");
    
    // Rastreamento do pixel para entrada no grupo
    FB_PIXEL.trackCustomEvent("WhatsAppGroupJoin", {
      page: "barbershop",
      action: "join_group",
      timestamp: new Date().toISOString(),
    });
    
    // Fecha o modal
    setShowWhatsAppModal(false);
  };

  const handleSkipWhatsApp = () => {
    // Fecha o modal
    setShowWhatsAppModal(false);
    
    // Oferece acesso direto ao app
    setTimeout(() => {
      const confirmApp = confirm(
        'Gostaria de acessar nossa plataforma para começar seu teste gratuito?'
      );
      
      if (confirmApp) {
        window.open("https://app.gestaoboa.com.br", "_blank");
      }
    }, 500);
  };

  // Função para enviar o formulário
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nomeCompleto || !formData.telefone || !formData.tempoAberta || !formData.numeroBarbeiros) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepara os dados para envio
      const dataToSubmit: BarbershopFormData = {
        nomeCompleto: formData.nomeCompleto,
        telefone: formData.telefone,
        tempoAberta: formData.tempoAberta,
        numeroBarbeiros: formData.numeroBarbeiros,
        timestamp: new Date().toISOString()
      };

      // Envia os dados
      const success = await submitBarbershopForm(dataToSubmit);

      if (success) {
        // Rastreamento do pixel
        FB_PIXEL.trackCustomEvent("BarbershopFormSubmit", {
          page: "barbershop",
          nome_completo: formData.nomeCompleto,
          telefone: formData.telefone,
          tempo_aberta: formData.tempoAberta,
          numero_barbeiros: formData.numeroBarbeiros,
          timestamp: new Date().toISOString(),
        });

        console.log("Formulário enviado com sucesso:", dataToSubmit);
        
        setSubmitSuccess(true);
        
        // Limpa o formulário
        setFormData({
          nomeCompleto: '',
          telefone: '',
          tempoAberta: '',
          numeroBarbeiros: ''
        });

        // Mostra modal de sucesso e convite para WhatsApp
        setShowWhatsAppModal(true);

      } else {
        throw new Error('Falha ao enviar formulário');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário. Tente novamente ou entre em contato conosco.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rastreamento do carregamento da página
  useEffect(() => {
    // Rastreia pageview
    FB_PIXEL.pageView();
    
    // Rastreia evento customizado para página de barbearia
    FB_PIXEL.trackCustomEvent("ViewBarbershopPage", {
      page: "barbershop",
      timestamp: new Date().toISOString(),
    });

    // Observer para rastrear quando o usuário visualiza a seção de agendamento online
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            if (section === 'online-booking') {
              FB_PIXEL.trackCustomEvent("ViewOnlineBookingSection", {
                page: "barbershop",
                section: "online_booking",
                timestamp: new Date().toISOString(),
              });
            } else if (section === 'about-us') {
              FB_PIXEL.trackCustomEvent("ViewAboutUsSection", {
                page: "barbershop",
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

  // Função para redirecionar para acesso grátis
  const handleFreeTrialClick = () => {
    // Rastreamento do pixel
    FB_PIXEL.trackStartTrial({
      source: "barbershop_page",
      timestamp: new Date().toISOString(),
    });
    
    FB_PIXEL.trackCustomEvent("FreeTrial_ButtonClick", {
      page: "barbershop",
      button_location: "cta",
    });
    
    console.log("Navegando para o formulário..."); // Para debug
    scrollToForm(); // Navega para o formulário ao invés de abrir link externo
  };
  return (
    <>
      <Helmet>
        <title>Gestão Boa - Sistema Completo para Barbearias</title>
        <meta name="description" content="Transforme sua barbearia com o sistema de gestão mais completo do mercado. Agendamento online, controle financeiro, gestão de clientes e muito mais." />
        <meta name="keywords" content="sistema barbearia, agendamento online, gestão barbearia, software barbeiro" />
      </Helmet>
      
      <Header />
      
      <Container>
        <Content>
          {/* Hero Section */}
          <HeroSection>
            <HeroTitle>
              🔥 <span>BLACK FRIDAY</span> Gestão Boa - Oferta especial será revelada dia <span>14/11</span>
            </HeroTitle>
            <HeroSubtitle>
              Não perca a maior promoção do ano! Para receber nossa oferta EXCLUSIVA de Black Friday, preencha o formulário abaixo e entre no nosso grupo VIP do WhatsApp. A oferta será revelada apenas para os membros do grupo no dia 14/11! 🎯
            </HeroSubtitle>
            <Button 
              text="🎁 QUERO A OFERTA EXCLUSIVA"
              method={handleFreeTrialClick}
              type="focused"
            />
          </HeroSection>

          {/* Video Section */}

          {/* Problem & Solution Section */}
          <ProblemSolutionContainer>
            {/* Problem Section */}
            <ProblemSection>
              <ProblemTitle>Se você não aguenta mais...</ProblemTitle>
              <ProblemList>
                <ProblemItem>
                  ❌ Perder clientes porque não consegue organizar os agendamentos...
                </ProblemItem>
                <ProblemItem>
                  ❌ Ficar perdido sem saber quanto está ganhando ou gastando...
                </ProblemItem>
                <ProblemItem>
                  ❌ Esquecer de cobrar serviços ou produtos vendidos...
                </ProblemItem>
                <ProblemItem>
                  ❌ Não conseguir fidelizar clientes por falta de controle...
                </ProblemItem>
                <ProblemItem>
                  ❌ Trabalhar mais e ganhar menos por desorganização...
                </ProblemItem>
                <ProblemItem>
                  ❌ Ter dor de cabeça com papelada e controles manuais...
                </ProblemItem>
              </ProblemList>
            </ProblemSection>

            {/* Solution Section */}
            <SolutionSection>
              <SolutionTitle>Você será capaz de...</SolutionTitle>
              <SolutionList>
                <SolutionItem>
                  ✅ Ter seu link de agendamento personalizado...
                </SolutionItem>
                <SolutionItem>
                  ✅ Controlar todas as finanças da sua barbearia em tempo real...
                </SolutionItem>
                <SolutionItem>
                  ✅ Nunca mais esquecer de cobrar um serviço ou produto...
                </SolutionItem>
                <SolutionItem>
                  ✅ Fidelizar clientes com histórico completo de atendimentos...
                </SolutionItem>
                <SolutionItem>
                  ✅ Trabalhar menos e ganhar mais com organização total...
                </SolutionItem>
                <SolutionItem>
                  ✅ Ter relatórios automáticos e controle profissional...
                </SolutionItem>
              </SolutionList>
            </SolutionSection>
          </ProblemSolutionContainer>
          
          {/* CTA Button após problemas/soluções */}
          <CTAButtonContainer>
            <Button 
              text="🎁 QUERO A OFERTA EXCLUSIVA"
              method={handleFreeTrialClick}
              type="focused"
            />
          </CTAButtonContainer>

          {/* Testimonials Section */}
          <TestimonialsSection>
            <TestimonialsTitle>
              Barbeiros já estão transformando seus negócios
            </TestimonialsTitle>
            
            <TestimonialCard>
              <TestimonialContent>
                "O app da gestão boa vem me ajudando muito desde o primeiro dia, consigo saber com exatidão quantos clientes eu tenho e atendo, faturamento, venda de produtos, etc. Comecei a ter controle não só dos cortes, mas das vendas dos produtos e dos custos."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/PedroArthur.jpg" alt="Pedro Arthur" />
                <div>
                  <strong>Pedro Arthur</strong>
                  <span>Proprietário da Prime Barbershop</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialContent>
                "Com o Gestão Boa aumentei meu faturamento e organizei completamente minha barbearia. Agora tenho controle total do meu negócio e sei exatamente quanto estou lucrando."
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/leandro.png" alt="Leandro Figueiredo" />
                <div>
                  <strong>Leandro Figueiredo</strong>
                  <span>Proprietário da Barbearia Duque</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialContent>
                "Fora de série, fora de série mesmo! Eu te chamo, tu me responde. Tinha muito receio, pois já contratei outros serviços e não tinha esse retorno pra tirar minhas dúvidas. Poderia ser um sistema funcional, mas quando eu tinha dúvidas, eles não supriam. Tu responde, tira minhas dúvidas, não faz corpo mole, e me mostra tudo certinho. Cara, tá show de bola!"
              </TestimonialContent>
              <TestimonialAuthor>
                <img src="/gustavo.jpg" alt="Gustavo" />
                <div>
                  <strong>Gustavo</strong>
                  <span>Proprietário da Barbaria Conceito</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            {/* CTA Button após depoimentos */}
            <CTAButtonContainer>
              <Button 
                text="🎁 QUERO A OFERTA EXCLUSIVA"
                method={handleFreeTrialClick}
                type="focused"
              />
            </CTAButtonContainer>
          </TestimonialsSection>

          {/* Online Booking Section */}
          <OnlineBookingSection data-section="online-booking">
            <OnlineBookingContent>
              <OnlineBookingTitle>
                <span className="highlight">Agendamento online</span> é muito mais fácil do que você imagina.
              </OnlineBookingTitle>
              <OnlineBookingDescription>
                O problema é que, quando se trata dos seus serviços e horários, você sente vergonha de ofertar. Tem medo de parecer um barbeiro chato.
              </OnlineBookingDescription>
              <OnlineBookingBenefits>
                <li>Seus clientes agendam 24h por dia, sem você precisar atender o telefone</li>
                <li>Reduz faltas e remarcações de última hora</li>
                <li>Clientes recebem lembretes automáticos por WhatsApp</li>
                <li>Você tem controle total da sua agenda em tempo real</li>
                <li>Aumenta seu faturamento com agendamentos noturnos e fins de semana</li>
                <li>Cria uma imagem mais profissional para sua barbearia</li>
              </OnlineBookingBenefits>
              <OnlineBookingDescription>
                Você não precisa conhecer mil técnicas, gatilhos mentais ou palavras mágicas. A única coisa que você precisa é entender a lógica por trás do desejo de consumo — e usar isso a seu favor.
              </OnlineBookingDescription>
              
              {/* CTA Button na seção de agendamento */}
              <CTAButtonContainer>
                <Button 
                  text="🎁 QUERO A OFERTA EXCLUSIVA"
                  method={handleFreeTrialClick}
                  type="focused"
                />
              </CTAButtonContainer>
            </OnlineBookingContent>
            <OnlineBookingImageContainer>
              <img src="/Muitos_Agendamentos.png" alt="Interface do sistema de agendamento online" />
            </OnlineBookingImageContainer>
          </OnlineBookingSection>

          {/* Features Section */}
          <FeatureSection>
            <FeatureTitle>Tudo que sua barbearia precisa em um só lugar</FeatureTitle>
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon>📅</FeatureIcon>
                <FeatureCardTitle>Agendamento Online</FeatureCardTitle>
                <FeatureDescription>
                  Seus clientes agendam direto pelo celular, 24h por dia. Sem mais ligações perdidas ou confusão nos horários.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>💰</FeatureIcon>
                <FeatureCardTitle>Controle Financeiro</FeatureCardTitle>
                <FeatureDescription>
                  Acompanhe receitas, despesas e lucro em tempo real. Relatórios automáticos para você tomar melhores decisões.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>👥</FeatureIcon>
                <FeatureCardTitle>Gestão de Clientes</FeatureCardTitle>
                <FeatureDescription>
                  Histórico completo de cada cliente, preferências, aniversários e lembretes automáticos para fidelização.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>🎯</FeatureIcon>
                <FeatureCardTitle>Comissões Automáticas</FeatureCardTitle>
                <FeatureDescription>
                  Calcule automaticamente as comissões dos barbeiros e tenha relatórios detalhados de cada profissional.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>📊</FeatureIcon>
                <FeatureCardTitle>Relatórios Inteligentes</FeatureCardTitle>
                <FeatureDescription>
                  Dashboards com tudo que você precisa saber: faturamento, clientes mais fiéis, serviços mais vendidos.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>🔄</FeatureIcon>
                <FeatureCardTitle>Estoque e Produtos</FeatureCardTitle>
                <FeatureDescription>
                  Controle total do estoque, alertas de produtos em falta e gestão completa de vendas de produtos.
                </FeatureDescription>
              </FeatureCard>
            </FeatureGrid>
            
            {/* CTA Button após recursos */}
            <CTAButtonContainer>
              <Button 
                text="🎁 QUERO A OFERTA EXCLUSIVA"
                method={handleFreeTrialClick}
                type="focused"
              />
            </CTAButtonContainer>
          </FeatureSection>

          {/* CTA Section */}
          <CTASection>
            <CTATitle>
              Quanto dinheiro você está perdendo por desorganização?
            </CTATitle>
            <CTADescription>
              Todo dia sem organização é dinheiro que sai do seu bolso. Clientes perdidos, serviços não cobrados, 
              despesas desnecessárias... Preencha o formulário abaixo e ganhe acesso grátis ao Gestão Boa.
            </CTADescription>
          </CTASection>

          {/* Pricing Section - COMENTADO
          <PricingSection>
            <PricingTitle>Escolha o plano ideal para sua barbearia</PricingTitle>
            
            {/* Plan Type Selector *\/}
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
                      page: "barbershop",
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
              {/* Plano Básico *\/}
              <PricingCard>
                <div className="plan-header">
                  <h3>Plano Básico</h3>
                  <p>Perfeito para quem está começando</p>
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
                  text="TESTE GRÁTIS POR 20 DIAS"
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

              {/* Plano Crescimento *\/}
              <PricingCard className="featured">
                <div className="popular-badge">MAIS POPULAR</div>
                <div className="plan-header">
                  <h3>Plano Crescimento</h3>
                  <p>Para pequenos negócios</p>
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
                  text="TESTE GRÁTIS POR 20 DIAS"
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

              {/* Plano Empresarial *\/}
              <PricingCard>
                <div className="plan-header">
                  <h3>Plano Empresarial</h3>
                  <p>Perfeito para quem já tem funcionários</p>
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
                  text="TESTE GRÁTIS POR 20 DIAS"
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

          {/* Formulário de Contato */}
          <PricingSection id="barbershop-form-section">
            <PricingTitle>🎁 Garanta sua oferta EXCLUSIVA de Black Friday</PricingTitle>
            <div className="black-friday-subtitle">
              Preencha os dados abaixo e entre no nosso grupo VIP para receber a oferta especial no dia 14/11! 🔥
            </div>
            <div className="barbershop-form-container">
              <form className="barbershop-form" onSubmit={handleFormSubmit}>
                <div className="form-field">
                  <label className="form-label">Nome Completo *</label>
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
                  <label className="form-label">Há quanto tempo sua barbearia está aberta? *</label>
                  <select
                    className="form-select"
                    value={formData.tempoAberta}
                    onChange={(e) => handleInputChange('tempoAberta', e.target.value)}
                    required
                    title="Selecione há quanto tempo sua barbearia está aberta"
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
                  <label className="form-label">Quantos barbeiros trabalham na sua barbearia? *</label>
                  <select
                    className="form-select"
                    value={formData.numeroBarbeiros}
                    onChange={(e) => handleInputChange('numeroBarbeiros', e.target.value)}
                    required
                    title="Selecione quantos barbeiros trabalham na sua barbearia"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="apenas-eu">Apenas eu (proprietário)</option>
                    <option value="2-barbeiros">2 barbeiros</option>
                    <option value="3-barbeiros">3 barbeiros</option>
                    <option value="4-5-barbeiros">4 a 5 barbeiros</option>
                    <option value="mais-5-barbeiros">Mais de 5 barbeiros</option>
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

                <p className="form-disclaimer">
                  <strong>*</strong> Campos obrigatórios. <strong>Preencha o formulário e ganhe um acesso grátis</strong>, sem compromisso, sem cartão de crédito.
                </p>
              </form>
            </div>
          </PricingSection>

          {/* 20 Days Free Trial Section */}
          <GuaranteeSection>
            <GuaranteeTitle>Acesso grátis garantido</GuaranteeTitle>
            <GuaranteeDescription>
              Preencha o formulário acima e ganhe acesso completo ao Gestão Boa. 
              Sem compromisso, sem cartão de crédito. Veja na prática como o sistema pode transformar sua barbearia.
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
              
              {/* CTA Button na seção sobre nós */}
              <CTAButtonContainer>
                <Button 
                  text="🎁 QUERO A OFERTA EXCLUSIVA"
                  method={handleFreeTrialClick}
                  type="focused"
                />
              </CTAButtonContainer>
            </AboutUsContent>
            <AboutUsImageContainer>
              <img src="/time.png" alt="Equipe Gestão Boa - Sílvio, Karine e Victor, fundadores da empresa" />
            </AboutUsImageContainer>
          </AboutUsSection>

          {/* Final CTA */}
          <FinalCTASection>
            <CTATitle>
              Comece hoje mesmo - Preencha o formulário e ganhe acesso grátis
            </CTATitle>
            <CTADescription>
              Junte-se às barbearias que já usam o Gestão Boa. 
              Preencha o formulário acima com as informações da sua barbearia e ganhe acesso completo ao sistema.
            </CTADescription>
            <Button 
              text="GANHAR ACESSO GRÁTIS"
              method={handleFreeTrialClick}
              type="focused"
            />
          </FinalCTASection>
        </Content>
        
        
        {/* Botão CTA fixo no fundo para mobile */}
        <MobileFixedCTAButton>
          <button onClick={handleFreeTrialClick}>
            🎁 QUERO A OFERTA EXCLUSIVA
          </button>
        </MobileFixedCTAButton>
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
                <li>📈 Dicas para aumentar o faturamento da barbearia</li>
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

export default Barbershop;
