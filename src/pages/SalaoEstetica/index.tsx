import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FB_PIXEL } from '../../utils/pixel';
import './animations.css';
import '../Barbershop/form.css';
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
  GuaranteeSection,
  GuaranteeTitle,
  GuaranteeDescription,
  CTAButtonContainer,
  MobileFixedCTAButton
} from './styles';

type PlanType = "Anual" | "Semestral" | "Mensal";

// Preços mensais base (igual página de preços)
const monthlyPrices = {
  Basico: 64.90,
  Standard: 89.90,
  Premium: 129.90,
};

// Descontos por tipo de plano
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

// Calcular preço com desconto
const calculatePrice = (basePrice: number, planType: PlanType) => {
  const discount = getDiscount(planType);
  return basePrice * (1 - discount);
};

const SalaoEstetica: React.FC = () => {
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<PlanType>("Anual");

  // Função para navegar para a página de criar conta
  const handlePromoClick = () => {
    FB_PIXEL.trackCustomEvent("TrialStartClick", {
      page: "salao_estetica",
      timestamp: new Date().toISOString(),
    });
    navigate('/criar-conta');
  };

  // Funções para cada plano específico
  const handlePlanClick = (plan: 'basico' | 'standard' | 'premium') => {
    FB_PIXEL.trackCustomEvent("TrialStartClick", {
      page: "salao_estetica",
      plan: plan,
      planType: planType,
      timestamp: new Date().toISOString(),
    });
    navigate(`/criar-conta?plano=${plan}`);
  };

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
              Pare de <span>perder dinheiro</span> com agendamentos bagunçados e clientes esquecidos
            </HeroTitle>
            <HeroSubtitle>
              O sistema que já ajudou +300 salões e clínicas de estética a aumentar o faturamento em até 40% com agendamento online e controle financeiro automático
            </HeroSubtitle>
            <Button 
              text="💅 TESTAR GRÁTIS POR 20 DIAS"
              method={handlePromoClick}
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
          
          {/* CTA Button após problemas/soluções */}
          <CTAButtonContainer>
            <Button 
              text="💅 TESTAR GRÁTIS POR 20 DIAS"
              method={handlePromoClick}
              type="focused"
            />
          </CTAButtonContainer>

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
              
              {/* CTA Button na seção de agendamento */}
              <CTAButtonContainer>
                <Button 
                  text="💅 TESTAR GRÁTIS POR 20 DIAS"
                  method={handlePromoClick}
                  type="focused"
                />
              </CTAButtonContainer>
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
            
            {/* CTA Button após recursos */}
            <CTAButtonContainer>
              <Button 
                text="💅 TESTAR GRÁTIS POR 20 DIAS"
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
              Todo dia sem organização é dinheiro que sai do seu bolso. Clientes perdidas, procedimentos não cobrados, 
              despesas desnecessárias... Teste o Gestão Boa grátis por 20 dias e veja a diferença!
            </CTADescription>
          </CTASection>

          {/* Seção de Preços */}
          <PricingSection id="salao-pricing">
            <PricingTitle>Escolha o plano ideal para seu salão ou clínica</PricingTitle>
            <div className="black-friday-subtitle">
              Teste grátis por 20 dias. Sem compromisso, cancele quando quiser.
            </div>
            
            {/* Switch de tipo de plano */}
            <div className="plan-type-selector">
              {[
                { type: "Anual" as PlanType, discount: "24% off" },
                { type: "Semestral" as PlanType, discount: "15% off" },
                { type: "Mensal" as PlanType },
              ].map((plan) => (
                <button
                  key={plan.type}
                  className={`plan-type-button ${planType === plan.type ? "active" : ""}`}
                  onClick={() => setPlanType(plan.type)}
                >
                  <span>{plan.type}</span>
                  {plan.discount && (
                    <span className="plan-type-discount">{plan.discount}</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="pricing-plans-grid">
              {/* Plano Básico */}
              <div className="pricing-plan-card">
                <div className="plan-header-simple">
                  <h3>Básico</h3>
                  <p>Ideal para profissionais solo</p>
                </div>
                <div className="plan-price-simple">
                  <span className="price-label">
                    {planType === "Mensal" ? "Por mês" : planType === "Semestral" ? "6x de" : "12x de"}
                  </span>
                  <span className="price-value">
                    R$ {calculatePrice(monthlyPrices.Basico, planType).toFixed(2).replace(".", ",")}
                  </span>
                  {planType !== "Mensal" && (
                    <span className="price-original">
                      De R$ {monthlyPrices.Basico.toFixed(2).replace(".", ",")}/mês
                    </span>
                  )}
                </div>
                <ul className="plan-features-simple">
                  <li>✅ Agendamento online 24/7</li>
                  <li>✅ Controle financeiro</li>
                  <li>✅ Gestão de clientes</li>
                  <li>✅ Relatórios básicos</li>
                  <li>✅ Lembretes WhatsApp</li>
                  <li>✅ 1 usuário</li>
                  <li>✅ Suporte via WhatsApp</li>
                </ul>
                <button 
                  type="button"
                  className="plan-button"
                  onClick={() => handlePlanClick('basico')}
                >
                  TESTAR GRÁTIS 20 DIAS
                </button>
              </div>

              {/* Plano Standard - Destaque */}
              <div className="pricing-plan-card featured">
                <div className="popular-tag">MAIS POPULAR</div>
                <div className="plan-header-simple">
                  <h3>Standard</h3>
                  <p>Para salões com equipe</p>
                </div>
                <div className="plan-price-simple">
                  <span className="price-label">
                    {planType === "Mensal" ? "Por mês" : planType === "Semestral" ? "6x de" : "12x de"}
                  </span>
                  <span className="price-value">
                    R$ {calculatePrice(monthlyPrices.Standard, planType).toFixed(2).replace(".", ",")}
                  </span>
                  {planType !== "Mensal" && (
                    <span className="price-original">
                      De R$ {monthlyPrices.Standard.toFixed(2).replace(".", ",")}/mês
                    </span>
                  )}
                </div>
                <ul className="plan-features-simple">
                  <li>✅ Tudo do Básico +</li>
                  <li>✅ Gestão de equipe</li>
                  <li>✅ Comissões automáticas</li>
                  <li>✅ Controle de estoque</li>
                  <li>✅ Relatórios avançados</li>
                  <li>✅ Até 3 usuários</li>
                  <li>✅ Suporte prioritário</li>
                </ul>
                <button 
                  type="button"
                  className="plan-button featured"
                  onClick={() => handlePlanClick('standard')}
                >
                  TESTAR GRÁTIS 20 DIAS
                </button>
              </div>

              {/* Plano Premium */}
              <div className="pricing-plan-card">
                <div className="plan-header-simple">
                  <h3>Premium</h3>
                  <p>Para clínicas e redes</p>
                </div>
                <div className="plan-price-simple">
                  <span className="price-label">
                    {planType === "Mensal" ? "Por mês" : planType === "Semestral" ? "6x de" : "12x de"}
                  </span>
                  <span className="price-value">
                    R$ {calculatePrice(monthlyPrices.Premium, planType).toFixed(2).replace(".", ",")}
                  </span>
                  {planType !== "Mensal" && (
                    <span className="price-original">
                      De R$ {monthlyPrices.Premium.toFixed(2).replace(".", ",")}/mês
                    </span>
                  )}
                </div>
                <ul className="plan-features-simple">
                  <li>✅ Tudo do Standard +</li>
                  <li>✅ Usuários ilimitados</li>
                  <li>✅ Relatórios via WhatsApp</li>
                  <li>✅ Gerente de conta dedicado</li>
                  <li>✅ Onboarding personalizado</li>
                  <li>✅ Lembretes para clientes</li>
                  <li>✅ Lembretes para equipe</li>
                </ul>
                <button 
                  type="button"
                  className="plan-button"
                  onClick={() => handlePlanClick('premium')}
                >
                  TESTAR GRÁTIS 20 DIAS
                </button>
              </div>
            </div>

            {/* Garantia */}
            <div className="pricing-guarantee">
              <div className="guarantee-icon">🛡️</div>
              <div className="guarantee-content">
                <strong>Teste sem risco por 20 dias</strong>
                <p>Não precisa de cartão de crédito. Se não gostar, é só não continuar.</p>
              </div>
            </div>
          </PricingSection>

          {/* Guarantee Section */}
          <GuaranteeSection>
            <GuaranteeTitle>🔒 Segurança e Confiança</GuaranteeTitle>
            <GuaranteeDescription>
              Seus dados estão protegidos com criptografia de ponta. Já ajudamos mais de 300 salões e clínicas 
              a organizarem seus negócios. Teste grátis e veja a diferença!
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
                  text="💅 TESTAR GRÁTIS POR 20 DIAS"
                  method={handlePromoClick}
                  type="focused"
                />
              </CTAButtonContainer>
            </AboutUsContent>
            <AboutUsImageContainer>
              <img src="/time.png" alt="Equipe Gestão Boa - Sílvio, Karine e Victor, fundadores da empresa" />
            </AboutUsImageContainer>
          </AboutUsSection>

         
        </Content>
        
        {/* Botão CTA fixo no fundo para mobile */}
        <MobileFixedCTAButton>
          <div className="mobile-cta-content">
            <div className="mobile-cta-info">
              <span className="mobile-cta-highlight">20 DIAS GRÁTIS</span>
              <span className="mobile-cta-text">Teste sem compromisso</span>
            </div>
            <button onClick={handlePromoClick}>
              COMEÇAR AGORA
            </button>
          </div>
        </MobileFixedCTAButton>
      </Container>
      
      <Footer />
    </>
  );
};

export default SalaoEstetica;
