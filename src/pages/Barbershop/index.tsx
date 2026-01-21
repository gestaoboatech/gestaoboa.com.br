import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { FB_PIXEL } from "../../utils/pixel";
import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  TicketIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline"; // Importing icons for features

import {
  Container,
  Content,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  CTAButtonContainer,
  AuthorityStrip,
  EssentialsSection,
  EssentialsGrid,
  EssentialCard,
  EssentialIcon,
  EssentialTitle,
  EssentialText,
  SectionTitle,
  SectionSubtitle,
  PricingSection,
  PricingGrid,
  PlanCard,
  PlanBadge,
  PlanName,
  PlanPrice,
  PlanFeatures,
  TestimonialsSection,
  TestimonialGrid,
  TestimonialCard,
  ReviewsSummary,
  FinalCTASection,
  MobileFixedCTAButton,
  VideoSection,
  VideoWrapper,
  VideoTextContent,
  VideoContainer,
  PlatformBadges,
  PlatformBadge,
} from "./styles";

const Barbershop: React.FC = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    FB_PIXEL.trackCustomEvent("BarbershopStartFree", {
      page: "barbershop",
      timestamp: new Date().toISOString(),
    });
    navigate("/criar-conta");
  };

  const handleSelectPlan = (planName: string) => {
    FB_PIXEL.trackCustomEvent("BarbershopSelectPlan", {
      page: "barbershop",
      plan: planName,
      timestamp: new Date().toISOString(),
    });
    navigate(`/criar-conta?plano=${planName}`);
  };

  useEffect(() => {
    FB_PIXEL.pageView();
    FB_PIXEL.trackCustomEvent("ViewBarbershopPage", {
      page: "barbershop",
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Gestão Boa - O Sistema Definitivo para Barbearias</title>
        <meta
          name="description"
          content="Automatize sua barbearia com agendamento online 24h, lembretes no WhatsApp e gestão financeira completa."
        />
      </Helmet>

      <Header />

      <Container>
        <Content>
          {/* HERO SECTION */}
          <HeroSection>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: "1000px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <HeroTitle>
                Sua barbearia lotada.
                <br />
                <span>Sem você atender o celular.</span>
              </HeroTitle>
              <HeroSubtitle>
                Pare de perder tempo no WhatsApp. Tenha um sistema de
                agendamento online, lembretes automáticos e controle financeiro
                completo. Profissionalize seu negócio hoje.
              </HeroSubtitle>

              <CTAButtonContainer>
                <Button
                  text="Começar Grátis Agora"
                  method={handleStartFree}
                  type="focused"
                  style={{ padding: "1.25rem 2.5rem", fontSize: "1.1rem" }}
                />
              </CTAButtonContainer>

              <p
                style={{
                  marginTop: "1.5rem",
                  color: "#64748b",
                  fontSize: "0.9rem",
                }}
              >
                ✨ Teste grátis por 20 dias • Sem cartão de crédito
              </p>
            </div>

            <AuthorityStrip>
              <div>
                <strong>+R$1.000.000,00</strong>
                <span>Reais gerenciados</span>
              </div>
              <div>
                <strong>+16k</strong>
                <span>Agendamentos</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Avaliação Média</span>
              </div>
            </AuthorityStrip>
          </HeroSection>

          {/* ESSENTIALS SECTION */}
          <EssentialsSection>
            <SectionTitle>Tudo que você precisa para crescer</SectionTitle>
            <SectionSubtitle>
              Simplificamos a gestão para você focar no que importa: o corte.
            </SectionSubtitle>

            <EssentialsGrid>
              <EssentialCard>
                <EssentialIcon>
                  <CalendarDaysIcon style={{ width: "28px" }} />
                </EssentialIcon>
                <EssentialTitle>Agenda Online 24h</EssentialTitle>
                <EssentialText>
                  Seus clientes agendam sozinhos pelo seu link personalizado, a
                  qualquer hora do dia ou da noite.
                </EssentialText>
              </EssentialCard>

              <EssentialCard>
                <EssentialIcon>
                  <ChatBubbleBottomCenterTextIcon style={{ width: "28px" }} />
                </EssentialIcon>
                <EssentialTitle>Lembretes WhatsApp</EssentialTitle>
                <EssentialText>
                  O sistema avisa seus clientes automaticamente. Reduza os furos
                  na agenda em até 90%.
                </EssentialText>
              </EssentialCard>

              <EssentialCard>
                <EssentialIcon>
                  <CurrencyDollarIcon style={{ width: "28px" }} />
                </EssentialIcon>
                <EssentialTitle>Gestão Financeira</EssentialTitle>
                <EssentialText>
                  Saiba exatamente quanto faturou, suas despesas e o lucro
                  líquido do dia, semana ou mês.
                </EssentialText>
              </EssentialCard>

              <EssentialCard>
                <EssentialIcon>
                  <ChartBarIcon style={{ width: "28px" }} />
                </EssentialIcon>
                <EssentialTitle>Comissões Automáticas</EssentialTitle>
                <EssentialText>
                  Cálculo automático de comissões para sua equipe. Adeus
                  planilhas e contas no papel.
                </EssentialText>
              </EssentialCard>

              <EssentialCard>
                <EssentialIcon>
                  <HeartIcon style={{ width: "28px" }} />
                </EssentialIcon>
                <EssentialTitle>Fidelização de Clientes</EssentialTitle>
                <EssentialText>
                  Mantenha seus clientes voltando com programas de fidelidade e
                  acompanhamento de histórico completo.
                </EssentialText>
              </EssentialCard>

              <EssentialCard>
                <EssentialIcon>
                  <TicketIcon style={{ width: "28px" }} />
                </EssentialIcon>
                <EssentialTitle>Cupons Personalizados</EssentialTitle>
                <EssentialText>
                  Crie cupons de desconto exclusivos para atrair novos clientes
                  e aumentar suas vendas.
                </EssentialText>
              </EssentialCard>
            </EssentialsGrid>
          </EssentialsSection>

          {/* VIDEO DEMO SECTION */}
          <VideoSection>
            <VideoWrapper>
              <VideoContainer>
                <video autoPlay muted loop playsInline>
                  <source src="/video app.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </VideoContainer>

              <VideoTextContent>
                <h2>Veja o App em Ação</h2>
                <p>
                  Um sistema completo, simples e intuitivo. Disponível onde você
                  precisar.
                </p>

                <PlatformBadges>
                  <PlatformBadge
                    href="https://play.google.com/store/apps/details?id=com.beasier"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DevicePhoneMobileIcon />
                    Android
                  </PlatformBadge>
                  <PlatformBadge
                    href="https://testflight.apple.com/join/bxbJmd2c"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DevicePhoneMobileIcon />
                    iOS (iPhone/iPad)
                  </PlatformBadge>
                  <PlatformBadge
                    href="https://app.gestaoboa.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ComputerDesktopIcon />
                    Desktop (Web)
                  </PlatformBadge>
                </PlatformBadges>
              </VideoTextContent>
            </VideoWrapper>
          </VideoSection>

          {/* PRICING SECTION */}
          <PricingSection>
            <SectionTitle>Planos transparentes</SectionTitle>
            <SectionSubtitle>
              Escolha a melhor opção para o seu momento. Mude quando quiser.
            </SectionSubtitle>

            <PricingGrid>
              {/* PLANO BÁSICO */}
              <PlanCard>
                <PlanName>Básico</PlanName>
                <PlanPrice>
                  R$ 49<span>,90/mês</span>
                </PlanPrice>
                <PlanFeatures>
                  <li>
                    <CheckCircleIcon width={20} /> Agenda Online 24h
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Lembretes via WhatsApp
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> CRM com Histórico de Clientes
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Controle Financeiro
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> 1 Profissional
                  </li>
                </PlanFeatures>
                <Button
                  text="Começar Teste Grátis"
                  method={() => handleSelectPlan("basico")}
                  type="clean"
                  style={{
                    width: "100%",
                    border: "1px solid #334155",
                    color: "white",
                    padding: "1rem 1.5rem",
                    fontSize: "1rem",
                  }}
                />
              </PlanCard>

              {/* PLANO CRESCIMENTO */}
              <PlanCard $featured>
                <PlanBadge>MAIS POPULAR</PlanBadge>
                <PlanName>Crescimento</PlanName>
                <PlanPrice>
                  R$ 68<span>,90/mês</span>
                </PlanPrice>
                <PlanFeatures>
                  <li>
                    <CheckCircleIcon width={20} />{" "}
                    <strong>Tudo do Básico +</strong>
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Comissões Automáticas
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Gestão de Equipe
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Relatórios de Desempenho
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Até 3 Profissionais
                  </li>
                </PlanFeatures>
                <Button
                  text="Escolher Plano Crescimento"
                  method={() => handleSelectPlan("crescimento")}
                  type="focused"
                  style={{
                    width: "100%",
                    padding: "1rem 1.5rem",
                    fontSize: "1rem",
                  }}
                />
              </PlanCard>

              {/* PLANO EMPRESARIAL */}
              <PlanCard>
                <PlanName>Empresarial</PlanName>
                <PlanPrice>
                  R$ 99<span>,90/mês</span>
                </PlanPrice>
                <PlanFeatures>
                  <li>
                    <CheckCircleIcon width={20} />{" "}
                    <strong>Tudo do Crescimento +</strong>
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Profissionais Ilimitados
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Gestão Completa de Equipe
                  </li>
                  <li>
                    <CheckCircleIcon width={20} /> Suporte Prioritário
                  </li>
                </PlanFeatures>
                <Button
                  text="Começar Teste Grátis"
                  method={() => handleSelectPlan("empresarial")}
                  type="clean"
                  style={{
                    width: "100%",
                    border: "1px solid #334155",
                    color: "white",
                    padding: "1rem 1.5rem",
                    fontSize: "1rem",
                  }}
                />
              </PlanCard>
            </PricingGrid>
          </PricingSection>

          {/* TESTIMONIALS */}
          <TestimonialsSection>
            <ReviewsSummary>
              <div style={{ display: "flex" }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} width={20} color="#f59e0b" />
                ))}
              </div>
              <span>4.9/5</span> baseado em 500+ avaliações
            </ReviewsSummary>
            <SectionTitle>Quem usa, cresce.</SectionTitle>

            <TestimonialGrid>
              <TestimonialCard>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#475569",
                    marginBottom: "1.5rem",
                  }}
                >
                  "Antes eu perdia uns 3, 4 clientes por semana porque esquecia
                  de confirmar. Agora o sistema manda lembrete sozinho. Meu
                  faturamento subiu 40%!"
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <img
                    src="/leandro.png"
                    alt="Leandro"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                  <div>
                    <strong style={{ display: "block", color: "#0f172a" }}>
                      Leandro Figueiredo
                    </strong>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
                      Barbearia Duque
                    </span>
                  </div>
                </div>
              </TestimonialCard>

              <TestimonialCard>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#475569",
                    marginBottom: "1.5rem",
                  }}
                >
                  "Não aguento mais cliente ligando no meio do corte. Agora
                  mando o link e pronto. Mudou minha vida."
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <img
                    src="/PedroArthur.jpg"
                    alt="Pedro"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                  <div>
                    <strong style={{ display: "block", color: "#0f172a" }}>
                      Pedro Arthur
                    </strong>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
                      Prime Barbershop
                    </span>
                  </div>
                </div>
              </TestimonialCard>
            </TestimonialGrid>
          </TestimonialsSection>

          {/* FINAL CTA */}
          <FinalCTASection>
            <h2>Comece a transformar sua barbearia hoje.</h2>
            <p>Teste gratuito de 20 dias. Sem compromisso.</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                text="Criar Minha Conta Grátis"
                method={handleStartFree}
                type="focused"
                style={{ padding: "1.25rem 3rem", fontSize: "1.2em" }}
              />
            </div>
          </FinalCTASection>

          <MobileFixedCTAButton>
            <button onClick={handleStartFree}>Começar Grátis Agora</button>
          </MobileFixedCTAButton>
        </Content>
      </Container>

      <Footer />
    </>
  );
};

export default Barbershop;
