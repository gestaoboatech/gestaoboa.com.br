import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FB_PIXEL } from '../../utils/pixel';
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
  const navigate = useNavigate();
  
  // Estado para o contador regressivo (termina dia 28/11/2025 às 23:59:59)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Contador regressivo
  useEffect(() => {
    const targetDate = new Date('2025-11-28T23:59:59-03:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Função para navegar para a página de criar conta
  const handlePromoClick = () => {
    FB_PIXEL.trackCustomEvent("BlackFridayPromoClick", {
      page: "barbershop",
      timestamp: new Date().toISOString(),
    });
    navigate('/criar-conta?plano=black-friday');
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

  return (
    <>
      <Helmet>
        <title>Gestão Boa - Sistema Completo para Barbearias | BLACK FRIDAY R$ 9,90</title>
        <meta name="description" content="BLACK FRIDAY! Transforme sua barbearia com o sistema de gestão mais completo do mercado por apenas R$ 9,90. Agendamento online, controle financeiro, gestão de clientes e muito mais." />
        <meta name="keywords" content="sistema barbearia, agendamento online, gestão barbearia, software barbeiro, black friday" />
      </Helmet>
      
      <Header />
      
      <Container>
        <Content>
          {/* Hero Section */}
          <HeroSection>
            <HeroTitle>
              🔥 <span>BLACK FRIDAY</span> Gestão Boa - Tudo por apenas <span>R$ 9,90!</span>
            </HeroTitle>
            <HeroSubtitle>
              A maior promoção do ano está acontecendo AGORA! Aproveite que são vamas limitadas!
            </HeroSubtitle>
            <Button 
              text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
              method={handlePromoClick}
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
              text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
              method={handlePromoClick}
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
                text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
                method={handlePromoClick}
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
                  text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
                  method={handlePromoClick}
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
                text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
                method={handlePromoClick}
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
              despesas desnecessárias... Aproveite a BLACK FRIDAY e tenha acesso completo ao Gestão Boa por apenas R$ 9,90!
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

          {/* Seção de Promoção Black Friday */}
          <PricingSection id="barbershop-promo-section">
            <PricingTitle>🔥 BLACK FRIDAY - TUDO POR APENAS R$ 9,90! 🔥</PricingTitle>
            <div className="black-friday-subtitle">
              A maior promoção do ano! Aproveite antes que acabe!
            </div>
            
            <div className="black-friday-promo-container">
              {/* Contador Regressivo */}
              <div className="promo-countdown">
                <div className="countdown-title">⏰ OFERTA TERMINA EM:</div>
                <div className="countdown-timer">
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.days}</span>
                    <span className="countdown-label">dias</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">horas</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label">min</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label">seg</span>
                  </div>
                </div>
              </div>

              {/* Alerta de Vagas Limitadas */}
              <div className="promo-scarcity">
                <span className="scarcity-icon">🔥</span>
                <span className="scarcity-text">RESTAM APENAS <strong>5 VAGAS</strong> NESTE VALOR!</span>
              </div>

              <div className="promo-package">
                <h3>📦 PACOTE COMPLETO</h3>
                
                <div className="promo-item">
                  <span className="promo-item-name">3 meses de acesso ao sistema</span>
                  <span className="promo-item-price-original">R$ 387,00</span>
                </div>
                
                <div className="promo-item">
                  <span className="promo-item-name">+70 modelos de design de canvas</span>
                  <span className="promo-item-price-original">R$ 49,00</span>
                </div>
                
                <div className="promo-item">
                  <span className="promo-item-name">Consultoria online sobre metas 2026</span>
                  <span className="promo-item-price-original">R$ 99,00</span>
                </div>
                
                <div className="promo-total">
                  <span>Valor Total:</span>
                  <span className="promo-total-original">R$ 535,00</span>
                </div>
                
                <div className="promo-final-price">
                  <span className="promo-label">🎁 BLACK FRIDAY APENAS:</span>
                  <span className="promo-price">R$ 9,90</span>
                </div>
                
                <div className="promo-savings">
                  💰 ECONOMIZE R$ 525,10 (98% OFF)
                </div>
              </div>
              
              <div className="promo-benefits">
                <h4>✅ O que você vai receber:</h4>
                <ul>
                  <li>📅 Sistema de Agendamento Online 24/7</li>
                  <li>💰 Controle Financeiro Completo</li>
                  <li>👥 Gestão de Clientes e Histórico</li>
                  <li>📊 Relatórios e Dashboards</li>
                  <li>💬 Lembretes via WhatsApp</li>
                  <li>🎨 +70 Templates de Canvas para Divulgação</li>
                  <li>🎯 Consultoria para Planejamento de Metas 2026</li>
                  <li>📞 Suporte via WhatsApp</li>
                </ul>
              </div>

              {/* Garantia de 7 dias */}
              <div className="promo-guarantee">
                <div className="guarantee-icon">🛡️</div>
                <div className="guarantee-content">
                  <strong>Garantia de 7 dias</strong>
                  <p>Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.</p>
                </div>
              </div>

              {/* Mini Depoimentos */}
              <div className="promo-testimonials">
                <div className="promo-testimonial">
                  <img src="/PedroArthur.jpg" alt="Pedro Arthur" />
                  <div className="testimonial-text">
                    <p>"Consigo saber com exatidão quantos clientes eu tenho e atendo"</p>
                    <span>Pedro Arthur - Prime Barbershop</span>
                  </div>
                </div>
                <div className="promo-testimonial">
                  <img src="/leandro.png" alt="Leandro Figueiredo" />
                  <div className="testimonial-text">
                    <p>"Aumentei meu faturamento e organizei completamente minha barbearia"</p>
                    <span>Leandro Figueiredo - Barbearia Duque</span>
                  </div>
                </div>
              </div>
              
              <div className="form-button-container">
                <button 
                  type="button"
                  className="form-submit-button promo-button"
                  onClick={handlePromoClick}
                >
                  🎁 PEGAR PROMOÇÃO AGORA - R$ 9,90
                </button>
              </div>
              
              <p className="promo-disclaimer">
                🔒 Pagamento 100% seguro • Acesso imediato • Garantia de 7 dias
              </p>
            </div>
          </PricingSection>

          {/* Guarantee Section */}
          <GuaranteeSection>
            <GuaranteeTitle>🔒 Pagamento 100% Seguro</GuaranteeTitle>
            <GuaranteeDescription>
              Compra protegida via Asaas. Após o pagamento, você receberá acesso imediato ao sistema 
              e todos os bônus da promoção Black Friday. Não perca essa oportunidade única!
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
                  text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
                  method={handlePromoClick}
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
              🔥 Não deixe essa oportunidade passar! 🔥
            </CTATitle>
            <CTADescription>
              Junte-se às centenas de barbearias que já usam o Gestão Boa. 
              Aproveite a Black Friday com 98% de desconto - de R$ 535,00 por apenas R$ 9,90!
            </CTADescription>
            <Button 
              text="🎁 PEGAR PROMOÇÃO - R$ 9,90"
              method={handlePromoClick}
              type="focused"
            />
          </FinalCTASection>
        </Content>
        
        
        {/* Botão CTA fixo no fundo para mobile com mini resumo */}
        <MobileFixedCTAButton>
          <div className="mobile-cta-content">
            <div className="mobile-cta-info">
              <span className="mobile-cta-discount">98% OFF</span>
              <span className="mobile-cta-price">
                <span className="old-price">R$ 535</span>
                <span className="new-price">R$ 9,90</span>
              </span>
            </div>
            <button onClick={handlePromoClick}>
              PEGAR OFERTA
            </button>
          </div>
        </MobileFixedCTAButton>
      </Container>
      
      <Footer />
    </>
  );
};

export default Barbershop;
