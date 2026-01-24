import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  MessageSquare,
  Menu,
  X,
  Phone,
  Smartphone,
  Shield,
  Database,
  Activity,
  Lock,
  Bot,
  ArrowRight,
  FileText,
  Mail,
} from "lucide-react";

import {
  Container,
  Navbar,
  NavContent,
  Logo,
  LogoImage,
  NavLinks,
  NavCTA,
  MobileMenuButton,
  MobileMenu,
  HeroSection,
  HeroContent,
  HeroText,
  Badge,
  HeroTitle,
  HeroSubtitle,
  HeroCTAContainer,
  PrimaryCTA,
  SecondaryCTA,
  PhoneMockupContainer,
  PhoneMockup,
  PhoneNotch,
  PhoneScreen,
  WhatsAppHeader,
  WhatsAppAvatar,
  WhatsAppGroupInfo,
  ChatArea,
  ChatBubble,
  BotLabel,
  ChatTime,
  ProblemSection,
  ProblemContent,
  SectionTitle,
  SectionSubtitle,
  DataVisualization,
  DataCard,
  SolutionSection,
  SolutionContent,
  SolutionTitle,
  SolutionSubtitle,
  StepsGrid,
  StepCard,
  StepNumber,
  StepIcon,
  StepTitle,
  StepDescription,
  TechnicalSection,
  TechnicalContent,
  TechnicalTitle,
  TechnicalSubtitle,
  TechHighlights,
  TechBadge,
  FlowDiagram,
  FlowNode,
  FlowArrow,
  LGPDSection,
  LGPDContent,
  LGPDTitle,
  LGPDGrid,
  LGPDCard,
  LGPDNumber,
  LGPDLabel,
  LGPDDescription,
  Footer,
  FooterContent,
  FooterBrand,
  FooterLinks,
  FooterCopyright,
} from "./styles";

const BotGestor: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    window.open(
      "https://wa.me/5553999461550?text=Olá! Gostaria de saber mais sobre o BotGestor.",
      "_blank"
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>BotGestor - Inteligência para Operações Portuárias | Gestão Boa</title>
        <meta
          name="description"
          content="Sistema de IA que monitora grupos de WhatsApp portuários. Transforme conversas em dados gerenciais. Validado via FAPERGS & Inova RS."
        />
        <meta name="keywords" content="portos, whatsapp, ia, inteligência artificial, gestão portuária, rio grande, fapergs" />
      </Helmet>

      <Container>
        {/* NAVBAR */}
        <Navbar>
          <NavContent>
            <Logo onClick={() => window.location.href = '/'}>
              <LogoImage src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
              Gestão Boa <span>| BotGestor</span>
            </Logo>

            <NavLinks>
              <a href="#problema" onClick={(e) => { e.preventDefault(); scrollToSection("problema"); }}>
                O Desafio
              </a>
              <a href="#solucao" onClick={(e) => { e.preventDefault(); scrollToSection("solucao"); }}>
                Funciona no WhatsApp
              </a>
              <a href="#seguranca" onClick={(e) => { e.preventDefault(); scrollToSection("seguranca"); }}>
                Segurança
              </a>
            </NavLinks>

            <NavCTA onClick={handleContactClick}>
              <Phone size={18} />
              Falar com Consultor
            </NavCTA>

            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MobileMenuButton>
          </NavContent>

          <MobileMenu $isOpen={mobileMenuOpen}>
            <a href="#problema" onClick={(e) => { e.preventDefault(); scrollToSection("problema"); }}>
              O Desafio
            </a>
            <a href="#solucao" onClick={(e) => { e.preventDefault(); scrollToSection("solucao"); }}>
              Funciona no WhatsApp
            </a>
            <a href="#seguranca" onClick={(e) => { e.preventDefault(); scrollToSection("seguranca"); }}>
              Segurança
            </a>
            <button onClick={handleContactClick}>
              Falar com Consultor
            </button>
          </MobileMenu>
        </Navbar>

        {/* HERO SECTION */}
        <HeroSection>
          <HeroContent>
            <HeroText>
              <Badge>🏆 Projeto Validado via FAPERGS & Inova RS</Badge>
              <HeroTitle>
                Cada mensagem no grupo é uma decisão que você pode estar perdendo.
              </HeroTitle>
              <HeroSubtitle>
                Enquanto você lê isso, centenas de mensagens sobre sua operação 
                estão sendo ignoradas. O BotGestor captura, organiza e transforma 
                o caos do WhatsApp em inteligência acionável — sem que ninguém 
                precise mudar como trabalha.
              </HeroSubtitle>
              <HeroCTAContainer>
                <PrimaryCTA onClick={handleContactClick}>
                  <MessageSquare size={20} />
                  Quero Ver Funcionando
                </PrimaryCTA>
                <SecondaryCTA onClick={() => scrollToSection("solucao")}>
                  Entenda a Mágica
                </SecondaryCTA>
              </HeroCTAContainer>
            </HeroText>

            <PhoneMockupContainer>
              <PhoneMockup>
                <PhoneNotch />
                <PhoneScreen>
                  <WhatsAppHeader>
                    <WhatsAppAvatar>⚓</WhatsAppAvatar>
                    <WhatsAppGroupInfo>
                      <h4>🚢 Operação Porto RG</h4>
                      <span>Silencioso • Ativo agora</span>
                    </WhatsAppGroupInfo>
                  </WhatsAppHeader>

                  <ChatArea>
                    <ChatBubble>
                      <strong>João (Portão 4):</strong><br />
                      Portão travou de novo! Fila de 8 caminhões parada 😤
                      <ChatTime>14:32</ChatTime>
                    </ChatBubble>

                    <ChatBubble $isBot>
                      <BotLabel><Bot size={12} /> BotGestor</BotLabel>
                      <div>
                        🚨 <strong>Incidente #INC-442</strong> criado<br />
                        📍 Local: Portão 4 | Prioridade: Alta<br />
                        ✅ Manutenção notificada automaticamente
                      </div>
                      <ChatTime>14:32</ChatTime>
                    </ChatBubble>

                    <ChatBubble>
                      <strong>Diretor Carlos:</strong><br />
                      @botgestor status MSC Giulia
                      <ChatTime>14:45</ChatTime>
                    </ChatBubble>

                    <ChatBubble $isBot>
                      <BotLabel><Bot size={12} /> BotGestor</BotLabel>
                      <div>
                        📊 <strong>MSC Giulia</strong> — Operação Normal<br />
                        ⏱️ ETA: 16:30 (+15min do previsto)<br />
                        📦 847/1.200 containers (71%)<br />
                        <a href="#" style={{ color: "#3b82f6" }}>📄 Baixar Relatório PDF</a>
                      </div>
                      <ChatTime>14:45</ChatTime>
                    </ChatBubble>

                    <ChatBubble>
                      <strong>Ana (Supervisor Noturno):</strong><br />
                      Equipe confirmada pra virada ✅
                      <ChatTime>15:02</ChatTime>
                    </ChatBubble>

                    <ChatBubble $isBot>
                      <BotLabel><Bot size={12} /> BotGestor</BotLabel>
                      <div>
                        ✓ Registro: Equipe noturna confirmada<br />
                        📋 Adicionado ao relatório do turno
                      </div>
                      <ChatTime>15:02</ChatTime>
                    </ChatBubble>
                  </ChatArea>
                </PhoneScreen>
              </PhoneMockup>
            </PhoneMockupContainer>
          </HeroContent>
        </HeroSection>

        {/* AUTHORITY SECTION */}
        {/* <AuthoritySection>
          <AuthorityContent>
            <AuthorityText>
              Tecnologia nascida no ecossistema de inovação gaúcho — conectando Rio Grande ao futuro
            </AuthorityText>
            <LogosGrid>
              <LogoItem>
                <img src="/logo-portos-rs.png" alt="Portos RS" />
              </LogoItem>
              <LogoItem>
                <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
                <span>Gestão Boa</span>
              </LogoItem>
              <LogoItem>
                <img src="/logo-fapergs.png" alt="FAPERGS" />
              </LogoItem>
              <LogoItem>
                <img src="/logo-innovatio-furg.png" alt="Innovatio FURG" />
              </LogoItem>
            </LogosGrid>
          </AuthorityContent>
        </AuthoritySection> */}

        {/* PROBLEM SECTION */}
        <ProblemSection id="problema">
          <ProblemContent>
            <SectionTitle>O scroll infinito está custando dinheiro.</SectionTitle>
            <SectionSubtitle>
              Todo dia, sua equipe troca <strong>milhares de mensagens</strong> sobre operações, 
              incidentes e decisões críticas. Mas quando você precisa de um 
              dado específico... está perdido no limbo de 47 grupos. 
              <br /><br />
              <em>Auditorias? Um pesadelo. Relatórios? Planilhas manuais. Padrões? Invisíveis.</em>
            </SectionSubtitle>

            <DataVisualization>
              <DataCard $high>
                <h3>📱 Realidade Atual</h3>
                <div className="bar-container">
                  <div className="bar" />
                </div>
                <div className="label">+2.000 msgs/dia</div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  Conversas que viram fumaça
                </p>
              </DataCard>
              <DataCard>
                <h3>📊 Com BotGestor</h3>
                <div className="bar-container">
                  <div className="bar" />
                </div>
                <div className="label">100% Indexado</div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  Tudo vira dado pesquisável
                </p>
              </DataCard>
            </DataVisualization>
          </ProblemContent>
        </ProblemSection>

        {/* SOLUTION SECTION */}
        <SolutionSection id="solucao">
          <SolutionContent>
            <SolutionTitle>A mágica acontece sem ninguém perceber.</SolutionTitle>
            <SolutionSubtitle>
              Zero treinamento. Zero mudança de hábito. O bot entra no grupo e pronto — 
              sua operação ganha um cérebro.
            </SolutionSubtitle>

            <StepsGrid>
              <StepCard>
                <StepNumber>1</StepNumber>
                <StepIcon>
                  <Smartphone size={32} />
                </StepIcon>
                <StepTitle>Entra Silencioso</StepTitle>
                <StepDescription>
                  O BotGestor é adicionado como membro do grupo. 
                  Ninguém precisa fazer nada diferente — a equipe continua usando o 
                  WhatsApp normalmente.
                </StepDescription>
              </StepCard>

              <StepCard>
                <StepNumber>2</StepNumber>
                <StepIcon>
                  <Shield size={32} />
                </StepIcon>
                <StepTitle>Anonimiza Tudo</StepTitle>
                <StepDescription>
                  Nomes, CPFs e dados sensíveis são removidos instantaneamente. 
                  O que importa é o <strong>conteúdo operacional</strong>, não quem disse.
                </StepDescription>
              </StepCard>

              <StepCard>
                <StepNumber>3</StepNumber>
                <StepIcon>
                  <Database size={32} />
                </StepIcon>
                <StepTitle>Indexa e Classifica</StepTitle>
                <StepDescription>
                  IA identifica incidentes, confirmações, solicitações e métricas 
                  automaticamente. Tudo vira dado estruturado.
                </StepDescription>
              </StepCard>

              <StepCard>
                <StepNumber>4</StepNumber>
                <StepIcon>
                  <Activity size={32} />
                </StepIcon>
                <StepTitle>Gera Inteligência</StepTitle>
                <StepDescription>
                  Relatórios PDF, alertas automáticos e dashboards em tempo real. 
                  Você toma decisões com base em <strong>dados, não em achismos</strong>.
                </StepDescription>
              </StepCard>
            </StepsGrid>
          </SolutionContent>
        </SolutionSection>

        {/* TECHNICAL SECTION */}
        <TechnicalSection id="seguranca">
          <TechnicalContent>
            <TechnicalTitle>Segurança de quem lida com dados sensíveis.</TechnicalTitle>
            <TechnicalSubtitle>
              Desenvolvido para atender os requisitos mais rigorosos do setor público. 
              Cada byte é tratado com o respeito que dados operacionais merecem.
            </TechnicalSubtitle>

            <TechHighlights>
              <TechBadge>
                <Lock size={18} />
                AES-256 (Padrão Militar)
              </TechBadge>
              <TechBadge>
                <Shield size={18} />
                Guardrails Anti-Alucinação
              </TechBadge>
              <TechBadge>
                <Database size={18} />
                PostgreSQL Gerenciado
              </TechBadge>
              <TechBadge>
                <Activity size={18} />
                Automação n8n
              </TechBadge>
            </TechHighlights>

            <FlowDiagram>
              <FlowNode>
                <MessageSquare size={28} />
                <h4>Grupos WhatsApp</h4>
                <span>Entrada de dados</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={24} />
              </FlowArrow>

              <FlowNode>
                <Shield size={28} />
                <h4>Camada LGPD</h4>
                <span>Anonimização</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={24} />
              </FlowArrow>

              <FlowNode>
                <Database size={28} />
                <h4>Motor de IA</h4>
                <span>Classificação NLP</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={24} />
              </FlowArrow>

              <FlowNode>
                <FileText size={28} />
                <h4>Outputs</h4>
                <span>PDF • Dashboard • Alertas</span>
              </FlowNode>
            </FlowDiagram>
          </TechnicalContent>
        </TechnicalSection>

        {/* LGPD SECTION */}
        <LGPDSection>
          <LGPDContent>
            <LGPDTitle>Compliance não é opcional. É fundação.</LGPDTitle>

            <LGPDGrid>
              <LGPDCard>
                <LGPDNumber>90</LGPDNumber>
                <LGPDLabel>Dias e Fim</LGPDLabel>
                <LGPDDescription>
                  Dados expiram automaticamente. Sem armazenamento eterno, 
                  sem risco de vazamento histórico.
                </LGPDDescription>
              </LGPDCard>

              <LGPDCard>
                <LGPDNumber>Zero</LGPDNumber>
                <LGPDLabel>Dados Pessoais</LGPDLabel>
                <LGPDDescription>
                  Nenhum nome. Nenhum CPF. Nenhum RG. 
                  Apenas o conteúdo operacional importa para nós.
                </LGPDDescription>
              </LGPDCard>

              <LGPDCard>
                <LGPDNumber>24/7</LGPDNumber>
                <LGPDLabel>Vigilância Ativa</LGPDLabel>
                <LGPDDescription>
                  Sistema monitorado em tempo real por nossa equipe. 
                  Se algo sair do normal, sabemos antes de você.
                </LGPDDescription>
              </LGPDCard>
            </LGPDGrid>
          </LGPDContent>
        </LGPDSection>

        {/* FOOTER */}
        <Footer>
          <FooterContent>
            <FooterBrand>
              <div className="footer-logo">
                <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
                <h3>Gestão Boa</h3>
              </div>
              <p>
                Startup de tecnologia focada em soluções de gestão inteligente. 
                Nascida em Rio Grande-RS, conectada à FURG e validada pelo ecossistema 
                de inovação gaúcho através da FAPERGS e Inova RS.
              </p>
              <div className="company-info">
                <div>Razão Social: BEASIER INOVA SIMPLES (I.S.)</div>
                <div>CNPJ: 53.909.852/0001-62</div>
              </div>
            </FooterBrand>

            <FooterLinks>
              <h4>Produto</h4>
              <a href="#solucao" onClick={(e) => { e.preventDefault(); scrollToSection("solucao"); }}>
                Como Funciona
              </a>
              <a href="#seguranca" onClick={(e) => { e.preventDefault(); scrollToSection("seguranca"); }}>
                Segurança
              </a>
              <a href="#problema" onClick={(e) => { e.preventDefault(); scrollToSection("problema"); }}>
                O Desafio
              </a>
            </FooterLinks>

            <FooterLinks>
              <h4>Contato</h4>
              <a href="mailto:contato@gestaoboa.com.br">
                <Mail size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                contato@gestaoboa.com.br
              </a>
              <a href="https://wa.me/5553999461550" target="_blank" rel="noopener noreferrer">
                <Phone size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                +55 53 99946-1550
              </a>
            </FooterLinks>
          </FooterContent>

          <FooterCopyright>
            © 2025 Gestão Boa. Todos os direitos reservados.
          </FooterCopyright>
        </Footer>
      </Container>
    </>
  );
};

export default BotGestor;
