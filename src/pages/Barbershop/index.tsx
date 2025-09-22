import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { FB_PIXEL } from '../../utils/pixel';
import './animations.css';
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
  PricingCard,
  PricingPrice,
  PricingPeriod,
  FinalCTASection,
  GuaranteeSection,
  GuaranteeTitle,
  GuaranteeDescription
} from './styles';

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

const Barbershop: React.FC = () => {
  const [planType, setPlanType] = useState<PlanType>("Anual");

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

  // Price data
  const monthlyPrices = {
    Basico: 64.90,
    Crescimento: 89.90,
    Empresarial: 129.90,
  };

  // Função para redirecionar para teste grátis
  const handleFreeTrialClick = () => {
    // Rastreamento do pixel
    FB_PIXEL.trackStartTrial({
      source: "barbershop_page",
      plan_type: planType,
      timestamp: new Date().toISOString(),
    });
    
    FB_PIXEL.trackCustomEvent("FreeTrial_ButtonClick", {
      page: "barbershop",
      plan_selected: planType,
      button_location: "cta",
    });
    
    console.log("Botão de teste grátis clicado!"); // Para debug
    window.open("https://app.gestaoboa.com.br", "_blank");
  };

  // Funções específicas para cada plano
  const handlePlanClick = (planName: string) => {
    // Rastreamento do pixel
    FB_PIXEL.trackStartTrial({
      source: "barbershop_page",
      plan_type: planType,
      plan_name: planName,
      timestamp: new Date().toISOString(),
    });
    
    FB_PIXEL.trackCustomEvent("PlanSelection", {
      page: "barbershop",
      plan_selected: planName,
      plan_type: planType,
      button_location: "pricing_card",
    });
    
    console.log(`Plano ${planName} selecionado!`); // Para debug
    window.open("https://app.gestaoboa.com.br", "_blank");
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
              Transforme sua barbearia no <span>negócio mais organizado</span> da cidade
            </HeroTitle>
            <HeroSubtitle>
              Pare de perder clientes e dinheiro por falta de organização. Junte-se as barbearias que já usam o Gestão Boa e tenha controle total do seu negócio.
            </HeroSubtitle>
            <Button 
              text="TESTE GRÁTIS POR 20 DIAS"
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
          </FeatureSection>

          {/* CTA Section */}
          <CTASection>
            <CTATitle>
              Quanto dinheiro você está perdendo por desorganização?
            </CTATitle>
            <CTADescription>
              Todo dia sem organização é dinheiro que sai do seu bolso. Clientes perdidos, serviços não cobrados, 
              despesas desnecessárias... Teste o Gestão Boa por 20 dias grátis e pare de perder dinheiro.
            </CTADescription>
            <Button 
              text="TESTAR GRÁTIS POR 20 DIAS"
              method={handleFreeTrialClick}
              type="focused"
            />
          </CTASection>

          {/* Pricing Section */}
          <PricingSection>
            <PricingTitle>Escolha o plano ideal para sua barbearia</PricingTitle>
            
            {/* Plan Type Selector */}
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
              {/* Plano Básico */}
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

              {/* Plano Crescimento */}
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

              {/* Plano Empresarial */}
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

          {/* 20 Days Free Trial Section */}
          <GuaranteeSection>
            <GuaranteeTitle>20 dias grátis para testar</GuaranteeTitle>
            <GuaranteeDescription>
              Teste todas as funcionalidades do Gestão Boa por 20 dias completamente grátis. 
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
            </AboutUsContent>
            <AboutUsImageContainer>
              <img src="/time.png" alt="Equipe Gestão Boa - Sílvio, Karine e Victor, fundadores da empresa" />
            </AboutUsImageContainer>
          </AboutUsSection>

          {/* Final CTA */}
          <FinalCTASection>
            <CTATitle>
              Comece hoje mesmo - 20 dias grátis para transformar sua barbearia
            </CTATitle>
            <CTADescription>
              Junte-se a mais as barbearias que já usam o Gestão Boa. 
              Teste todas as funcionalidades por 20 dias sem compromisso e veja a diferença na organização do seu negócio.
            </CTADescription>
            <Button 
              text="COMEÇAR TESTE GRÁTIS AGORA"
              method={handleFreeTrialClick}
              type="focused"
            />
          </FinalCTASection>
        </Content>
      </Container>
      
      <Footer />
    </>
  );
};

export default Barbershop;
