import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  MessageSquare,
  Menu,
  X,
  Phone,
  Shield,
  Database,
  Activity,
  Lock,
  Bot,
  ArrowRight,
  FileText,
  Mail,
  CheckCircle2,
  Cpu,
  Sparkles,
  AlertTriangle,
  Mic,
  Award,
  Building2,
  Check,
  Server,
  Radio,
  Clock,
  Briefcase,
  ArrowUpRight,
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
  AudioSimulation,
  BotLabel,
  ChatTime,
  AuthoritySection,
  AuthorityContent,
  AuthorityText,
  LogosGrid,
  AuthorityBadge,
  SectionBadge,
  SectionTitle,
  SectionSubtitle,
  ProblemSection,
  ProblemContent,
  ComparisonGrid,
  ComparisonCard,
  FeaturesSection,
  FeaturesContent,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  TechnicalSection,
  TechnicalContent,
  TechHighlights,
  TechBadge,
  FlowDiagram,
  FlowNode,
  FlowArrow,
  ArchitectureDetailsGrid,
  ArchCard,
  LGPDSection,
  LGPDContent,
  LGPDGrid,
  LGPDCard,
  LGPDNumber,
  LGPDLabel,
  LGPDDescription,
  RoadmapSection,
  RoadmapContent,
  RoadmapTimeline,
  RoadmapCard,
  PilotBanner,
  ManagementSection,
  ManagementContent,
  StatsGrid,
  StatCard,
  CaseStudyCard,
  TeamGrid,
  TeamCard,
  QuoteSection,
  QuoteContent,
  QuoteCard,
  Footer,
  FooterContent,
  FooterBrand,
  FooterLinks,
  FooterCopyright,
} from "./styles";

const BotGestor: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppQuote = (customMsg?: string) => {
    const text = customMsg
      ? encodeURIComponent(customMsg)
      : encodeURIComponent(
          "Olá Sílvio! Gostaria de fazer um orçamento para a solução do PortosBot / PortosBot para minha operação."
        );
    window.open(`https://wa.me/5553999461550?text=${text}`, "_blank");
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
        <title>PortosBot | Inteligência Artificial e Monitoramento para WhatsApp Operacional</title>
        <meta
          name="description"
          content="Transforme conversas e áudios de grupos de WhatsApp em dados estruturados, despacho imediato de ocorrências e inteligência estratégica com IA generativa."
        />
        <meta
          name="keywords"
          content="PortosBot, PortosBot, inteligência artificial whatsapp, n8n automação, monitoramento portuário, postgresql pgvector, gestão operacional, software house rio grande"
        />
        <link rel="canonical" href="https://gestaoboa.com.br/botgestor" />
      </Helmet>

      <Container>
        {/* NAVBAR */}
        <Navbar>
          <NavContent>
            <Logo onClick={() => (window.location.href = "/")}>
              <LogoImage src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
              Gestão Boa <span>| PortosBot</span>
            </Logo>

            <NavLinks>
              <a href="#solucao" onClick={(e) => { e.preventDefault(); scrollToSection("solucao"); }}>
                Solução
              </a>
              <a href="#funcionalidades" onClick={(e) => { e.preventDefault(); scrollToSection("funcionalidades"); }}>
                Recursos
              </a>
              <a href="#tecnologia" onClick={(e) => { e.preventDefault(); scrollToSection("tecnologia"); }}>
                Tecnologia
              </a>
              <a href="#seguranca" onClick={(e) => { e.preventDefault(); scrollToSection("seguranca"); }}>
                Segurança
              </a>
              <a href="#metodologia" onClick={(e) => { e.preventDefault(); scrollToSection("metodologia"); }}>
                Cronograma
              </a>
              <a href="#gestao" onClick={(e) => { e.preventDefault(); scrollToSection("gestao"); }}>
                Gestão
              </a>
            </NavLinks>

            <NavCTA onClick={() => handleWhatsAppQuote()}>
              <Phone size={14} />
              Fazer Orçamento
            </NavCTA>

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </MobileMenuButton>
          </NavContent>

          <MobileMenu $isOpen={mobileMenuOpen}>
            <a href="#solucao" onClick={(e) => { e.preventDefault(); scrollToSection("solucao"); }}>
              Solução
            </a>
            <a href="#funcionalidades" onClick={(e) => { e.preventDefault(); scrollToSection("funcionalidades"); }}>
              Recursos
            </a>
            <a href="#tecnologia" onClick={(e) => { e.preventDefault(); scrollToSection("tecnologia"); }}>
              Tecnologia
            </a>
            <a href="#seguranca" onClick={(e) => { e.preventDefault(); scrollToSection("seguranca"); }}>
              Segurança
            </a>
            <a href="#metodologia" onClick={(e) => { e.preventDefault(); scrollToSection("metodologia"); }}>
              Cronograma
            </a>
            <a href="#gestao" onClick={(e) => { e.preventDefault(); scrollToSection("gestao"); }}>
              Gestão
            </a>
            <button onClick={() => handleWhatsAppQuote()}>
              <Phone size={15} />
              Fazer Orçamento no WhatsApp
            </button>
          </MobileMenu>
        </Navbar>

        {/* HERO SECTION */}
        <HeroSection id="solucao">
          <HeroContent>
            <HeroText>
              <Badge>
                <Award size={16} /> Projeto Validado na Prática • Apresentado à Diretoria da Portos RS
              </Badge>
              <HeroTitle>
                Transforme o fluxo do WhatsApp em <span className="highlight">dados estruturados</span> e ações operacionais imediatas.
              </HeroTitle>
              <HeroSubtitle>
                O <strong>PortosBot</strong> atua como um assistente operacional inteligente: monitora grupos,
                sanitiza dados com proteção LGPD, detecta ocorrências críticas em tempo real via tags operacionais, transcreve áudios
                e oferece consultas gerenciais em linguagem natural com Inteligência Artificial.
              </HeroSubtitle>
              <HeroCTAContainer>
                <PrimaryCTA onClick={() => handleWhatsAppQuote("Olá Sílvio! Gostaria de fazer um orçamento do PortosBot para nossa operação.")}>
                  <Phone size={20} />
                  Fazer Orçamento no WhatsApp
                </PrimaryCTA>
                <SecondaryCTA onClick={() => scrollToSection("tecnologia")}>
                  <Cpu size={18} />
                  Entenda a Tecnologia
                </SecondaryCTA>
              </HeroCTAContainer>
            </HeroText>

            {/* INTERACTIVE WHATSAPP MOCKUP */}
            <PhoneMockupContainer>
              <PhoneMockup>
                <PhoneNotch />
                <PhoneScreen>
                  <WhatsAppHeader>
                    <WhatsAppAvatar>🚢</WhatsAppAvatar>
                    <WhatsAppGroupInfo>
                      <h4>Operação Portuária & Cais</h4>
                      <span>PortosBot ativo • Monitorando</span>
                    </WhatsAppGroupInfo>
                  </WhatsAppHeader>

                  <ChatArea>
                    <ChatBubble>
                      <strong>Inspetor Marcelo:</strong><br />
                      <span className="tag-highlight">#problema</span> Balança 03 travou o leitor de pesagem. Fila de carretas acumulando no acesso sul.
                      <ChatTime>10:14</ChatTime>
                    </ChatBubble>

                    <ChatBubble $isBot>
                      <BotLabel><Bot size={13} /> PortosBot IA</BotLabel>
                      <div>
                        <span className="incident-badge">🚨 Incidente #INC-724 Aberto</span><br />
                        <strong>Classificação:</strong> Infraestrutura / Acesso<br />
                        <strong>Ação:</strong> Setor de Manutenção Notificado Imediatamente<br />
                        <strong>Registro:</strong> Gravado em PostgreSQL com log auditável
                      </div>
                      <ChatTime>10:14</ChatTime>
                    </ChatBubble>

                    <ChatBubble>
                      <strong>Supervisão Noturna:</strong>
                      <AudioSimulation>
                        <Mic size={14} color="#22c55e" />
                        <div className="audio-wave">
                          <span style={{ height: "6px" }} />
                          <span style={{ height: "14px" }} />
                          <span style={{ height: "9px" }} />
                          <span style={{ height: "16px" }} />
                          <span style={{ height: "11px" }} />
                          <span style={{ height: "8px" }} />
                          <span style={{ height: "15px" }} />
                          <span style={{ height: "12px" }} />
                          <span style={{ height: "5px" }} />
                        </div>
                        <span className="duration">0:18</span>
                      </AudioSimulation>
                      <em>Transcrição: "Manutenção concluída no berço 2, operação de atracação liberada normalmente."</em>
                      <ChatTime>10:22</ChatTime>
                    </ChatBubble>

                    <ChatBubble $isBot>
                      <BotLabel><Bot size={13} /> PortosBot IA</BotLabel>
                      <div>
                        ✅ <strong>Áudio indexado & vetorizado</strong><br />
                        ✓ Status atualizado: Berço 2 Liberado<br />
                        ✓ Adicionado ao resumo do turno
                      </div>
                      <ChatTime>10:22</ChatTime>
                    </ChatBubble>

                    <ChatBubble>
                      <strong>Diretoria (Chat Privado):</strong><br />
                      @PortosBot qual o status das ocorrências de hoje?
                      <ChatTime>10:35</ChatTime>
                    </ChatBubble>

                    <ChatBubble $isBot>
                      <BotLabel><Sparkles size={13} /> IA Generativa (PGVector)</BotLabel>
                      <div>
                        📊 <strong>Resumo do Dia (10:35):</strong><br />
                        • Total de mensagens processadas: 342<br />
                        • Incidentes detectados: 1 (#INC-724 - tempo de resposta: 4 min)<br />
                        • Áudios transcritos: 18<br />
                        • Cais 1 e 2 em fluxo 100% normal
                      </div>
                      <ChatTime>10:35</ChatTime>
                    </ChatBubble>
                  </ChatArea>
                </PhoneScreen>
              </PhoneMockup>
            </PhoneMockupContainer>
          </HeroContent>
        </HeroSection>

        {/* AUTHORITY & VALIDATION SECTION */}
        <AuthoritySection>
          <AuthorityContent>
            <AuthorityText>
              Tecnologia desenvolvida e validada no <strong>ecossistema gaúcho de inovação e tecnologia portuária</strong>
            </AuthorityText>
            <LogosGrid>
              <AuthorityBadge>
                <Award size={26} color="#38bdf8" />
                <div className="auth-info">
                  <div className="auth-title">Portos RS</div>
                  <div className="auth-subtitle">Apresentado à Diretoria (Nov/2025)</div>
                </div>
              </AuthorityBadge>

              <AuthorityBadge>
                <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
                <div className="auth-info">
                  <div className="auth-title">Gestão Boa</div>
                  <div className="auth-subtitle">Software House & SaaS</div>
                </div>
              </AuthorityBadge>

              <AuthorityBadge>
                <Building2 size={26} color="#22c55e" />
                <div className="auth-info">
                  <div className="auth-title">Oceantec</div>
                  <div className="auth-subtitle">Parque Científico e Tecnológico</div>
                </div>
              </AuthorityBadge>

             
            </LogosGrid>
          </AuthorityContent>
        </AuthoritySection>

        {/* PROBLEM VS SOLUTION SECTION */}
        <ProblemSection>
          <ProblemContent>
            <SectionBadge>O Desafio Operacional</SectionBadge>
            <SectionTitle>
              O WhatsApp é a espinha dorsal da sua operação. <br />
              Mas mensagens perdidas custam <span className="highlight">tempo e dinheiro</span>.
            </SectionTitle>
            <SectionSubtitle>
              Centenas de profissionais trocam mensagens e áudios urgentes todos os dias. Sem um assistente automatizado, 
              ocorrências vitais se perdem em conversas paralelas, atrasando a tomada de decisão da diretoria e gerando falhas operacionais.
            </SectionSubtitle>

            <ComparisonGrid>
              <ComparisonCard>
                <div className="header-box">
                  <AlertTriangle size={24} />
                  <h3>Como Funciona Sem o PortosBot</h3>
                </div>
                <ul>
                  <li>
                    <X size={18} />
                    <span><strong>Incidentes perdidos no scroll:</strong> Avisos urgentes de falhas ou paradas se misturam a centenas de conversas informais.</span>
                  </li>
                  <li>
                    <X size={18} />
                    <span><strong>Áudios sem indexação:</strong> Instruções críticas passadas por áudio não podem ser pesquisadas ou auditadas posteriormente.</span>
                  </li>
                  <li>
                    <X size={18} />
                    <span><strong>Atraso no escalonamento:</strong> Quem precisa agir demora minutos ou horas para ser notificado de uma falha de campo.</span>
                  </li>
                  <li>
                    <X size={18} />
                    <span><strong>Relatórios manuais e falhos:</strong> A diretoria depende de planilhas construídas no final do dia baseadas em lembranças.</span>
                  </li>
                  <li>
                    <X size={18} />
                    <span><strong>Vulnerabilidade de dados (LGPD):</strong> Números de documentos, dados pessoais e conversas expostos sem nenhum mascaramento.</span>
                  </li>
                </ul>
              </ComparisonCard>

              <ComparisonCard $isPositive>
                <div className="header-box">
                  <CheckCircle2 size={24} />
                  <h3>Com a Inteligência do PortosBot</h3>
                </div>
                <ul>
                  <li>
                    <Check size={18} />
                    <span><strong>Detecção instantânea via hashtags:</strong> Tags como <code>#problema</code> ou <code>#ocorrencia</code> acionam gatilhos imediatos de alta prioridade.</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span><strong>Transcrição automática de voz:</strong> Cada segundo de áudio vira texto indexado, vetorizado e pesquisável no PostgreSQL.</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span><strong>Despacho automático de responsáveis:</strong> O setor responsável recebe o alerta direcionado no momento exato em que a mensagem chega.</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span><strong>Chatbot IA para Diretores:</strong> Gestores consultam o histórico das operações privadamente em linguagem natural quando quiserem.</span>
                  </li>
                  <li>
                    <Check size={18} />
                    <span><strong>Conformidade rigorosa com a LGPD:</strong> Sanitização em tempo real de CPFs, e-mails e RGs com criptografia militar AES-256.</span>
                  </li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
          </ProblemContent>
        </ProblemSection>

        {/* FEATURES SECTION */}
        <FeaturesSection id="funcionalidades">
          <FeaturesContent>
            <SectionBadge>Recursos Principais</SectionBadge>
            <SectionTitle>
              Tudo o que sua gestão precisa, <br />
              <span className="highlight">sem mudar a rotina</span> da equipe de campo.
            </SectionTitle>
            <SectionSubtitle>
              O sistema se integra nativamente ao WhatsApp já utilizado pelas equipes operacionais, 
              sem necessidade de novos aplicativos ou treinamentos complexos.
            </SectionSubtitle>

            <FeaturesGrid>
              <FeatureCard>
                <FeatureIcon>
                  <AlertTriangle size={28} />
                </FeatureIcon>
                <FeatureTitle>Detecção e Registro Automático</FeatureTitle>
                <FeatureDescription>
                  Reconhecimento automatizado de ocorrências operacionais através de hashtags como <code>#problema</code> ou <code>#ocorrencia</code> e processamento de linguagem natural (NLP).
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <Mic size={28} />
                </FeatureIcon>
                <FeatureTitle>Transcrição de Áudios Operacionais</FeatureTitle>
                <FeatureDescription>
                  Converte mensagens de voz em texto em tempo real, indexando o conteúdo para busca semântica instantânea e facilitando auditorias e relatórios de turnos.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <Radio size={28} />
                </FeatureIcon>
                <FeatureTitle>Encaminhamento Imediato de Crises</FeatureTitle>
                <FeatureDescription>
                  Notificação automática dos setores responsáveis no exato momento da detecção de um incidente crítico, reduzindo drasticamente o tempo de resposta da operação.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FileText size={28} />
                </FeatureIcon>
                <FeatureTitle>Geração de Relatórios Automatizados</FeatureTitle>
                <FeatureDescription>
                  Compilação periódica de resumos diários, status de berços, movimentações e histórico de ocorrências gerados de forma automática e entregues aos gestores.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <Bot size={28} />
                </FeatureIcon>
                <FeatureTitle>Chatbot IA Privativo para Gestores</FeatureTitle>
                <FeatureDescription>
                  Canal privativo para diretores realizarem consultas em linguagem natural ("quais foram as ocorrências do cais sul hoje?") com respostas contextuais imediatas.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <Shield size={28} />
                </FeatureIcon>
                <FeatureTitle>Proteção de Dados & Conformidade LGPD</FeatureTitle>
                <FeatureDescription>
                  Sanitização automatizada de informações pessoais (CPF, RG, e-mail) antes da gravação, mantendo estrita conformidade legal com a legislação brasileira.
                </FeatureDescription>
              </FeatureCard>
            </FeaturesGrid>
          </FeaturesContent>
        </FeaturesSection>

        {/* TECHNICAL ARCHITECTURE & HOW IT'S DEVELOPED */}
        <TechnicalSection id="tecnologia">
          <TechnicalContent>
            <SectionBadge>Engenharia & Arquitetura</SectionBadge>
            <SectionTitle>
              Como a tecnologia é desenvolvida e <span className="highlight">arquitetada</span>
            </SectionTitle>
            <SectionSubtitle>
              Uma infraestrutura robusta, orientada a eventos assíncronos, microsserviços modernos 
              e inteligência artificial generativa com busca vetorial de alta precisão.
            </SectionSubtitle>

            <TechHighlights>
              <TechBadge>
                <Activity size={18} />
                Automação e Orquestração em n8n
              </TechBadge>
              <TechBadge>
                <Database size={18} />
                PostgreSQL + PGVector (Embeddings)
              </TechBadge>
              <TechBadge>
                <Sparkles size={18} />
                OpenAI + LangChain (Ada Embeddings)
              </TechBadge>
              <TechBadge>
                <Server size={18} />
                Servidor Dedicado em Nuvem de Alta Disponibilidade
              </TechBadge>
              <TechBadge>
                <Lock size={18} />
                Criptografia AES-256 Militar
              </TechBadge>
            </TechHighlights>

            {/* FLOW DIAGRAM */}
            <FlowDiagram>
              <FlowNode>
                <MessageSquare size={26} />
                <h4>Grupos WhatsApp</h4>
                <span>Mensagens e áudios operacionais em tempo real</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={22} />
              </FlowArrow>

              <FlowNode>
                <Activity size={26} />
                <h4>Orquestrador n8n</h4>
                <span>Roteamento de eventos e detecção de hashtags (#problema)</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={22} />
              </FlowArrow>

              <FlowNode>
                <Shield size={26} />
                <h4>Filtro & Sanitização</h4>
                <span>Mascaramento LGPD e transcrição de áudios</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={22} />
              </FlowArrow>

              <FlowNode>
                <Sparkles size={26} />
                <h4>IA & LangChain</h4>
                <span>Geração de Embeddings e busca semântica PGVector</span>
              </FlowNode>

              <FlowArrow>
                <ArrowRight size={22} />
              </FlowArrow>

              <FlowNode>
                <FileText size={26} />
                <h4>Outputs & Gestão</h4>
                <span>Alertas em tempo real, relatórios e chat privado</span>
              </FlowNode>
            </FlowDiagram>

            {/* ARCHITECTURE DETAILS */}
            <ArchitectureDetailsGrid>
              <ArchCard>
                <div className="arch-header">
                  <Activity size={22} />
                  <h3>Orquestração via n8n</h3>
                </div>
                <p>
                  O n8n atua como o cérebro condutor dos fluxos de trabalho. Ele escuta webhooks da API do WhatsApp, 
                  gerencia filas de mensageria, distribui tarefas para transcrição de áudio e dispara notificações imediatas aos setores responsáveis sem gargalos.
                </p>
                <div className="tech-tags">
                  <span>Webhooks Resilientes</span>
                  <span>Filas Assíncronas</span>
                  <span>Alta Escalabilidade</span>
                </div>
              </ArchCard>

              <ArchCard>
                <div className="arch-header">
                  <Database size={22} />
                  <h3>PostgreSQL + PGVector</h3>
                </div>
                <p>
                  Combinação de confiabilidade relacional SQL com busca vetorial de alta dimensionalidade. Cada mensagem e transcrição é convertida em vetores semânticos, 
                  permitindo que a IA compreenda o contexto operacional histórico com extrema velocidade.
                </p>
                <div className="tech-tags">
                  <span>Busca Vetorial</span>
                  <span>Logs Estruturados</span>
                  <span>Indexação HNSW</span>
                </div>
              </ArchCard>

              <ArchCard>
                <div className="arch-header">
                  <Sparkles size={22} />
                  <h3>LangChain & OpenAI</h3>
                </div>
                <p>
                  A camada de inteligência generativa utiliza os modelos de embeddings da OpenAI gerenciados via LangChain. 
                  Isso permite consultas em linguagem natural com guardrails anti-alucinação, garantindo que o bot só responda com base nos fatos registrados.
                </p>
                <div className="tech-tags">
                  <span>Ada Embeddings</span>
                  <span>Guardrails RAG</span>
                  <span>Respostas Confiáveis</span>
                </div>
              </ArchCard>
            </ArchitectureDetailsGrid>
          </TechnicalContent>
        </TechnicalSection>

        {/* SECURITY & LGPD */}
        <LGPDSection id="seguranca">
          <LGPDContent>
            <SectionBadge>Conformidade & Governança</SectionBadge>
            <SectionTitle>
              Segurança rigorosa e conformidade com a <span className="highlight">LGPD</span>
            </SectionTitle>
            <SectionSubtitle>
              Desenvolvido para atender aos mais altos padrões de segurança institucional e governamental, 
              garantindo que dados operacionais sensíveis permaneçam confidenciais e protegidos.
            </SectionSubtitle>

            <LGPDGrid>
              <LGPDCard>
                <LGPDNumber>AES-256</LGPDNumber>
                <LGPDLabel>Criptografia Militar</LGPDLabel>
                <LGPDDescription>
                  Dados criptografados de ponta a ponta, tanto em repouso nos bancos de dados quanto em trânsito pela rede.
                </LGPDDescription>
              </LGPDCard>

              <LGPDCard>
                <LGPDNumber>100%</LGPDNumber>
                <LGPDLabel>Sanitização Automática</LGPDLabel>
                <LGPDDescription>
                  Remoção e mascaramento preventivo de documentos pessoais (CPF, RG, telefones e e-mails) de todos os logs.
                </LGPDDescription>
              </LGPDCard>

              <LGPDCard>
                <LGPDNumber>Guard</LGPDNumber>
                <LGPDLabel>Anti-Alucinação</LGPDLabel>
                <LGPDDescription>
                  Guardrails estritos que impedem a inteligência artificial de inventar dados ou vazar contextos operacionais restritos.
                </LGPDDescription>
              </LGPDCard>

              <LGPDCard>
                <LGPDNumber>Rotinas</LGPDNumber>
                <LGPDLabel>Descarte Programado</LGPDLabel>
                <LGPDDescription>
                  Expurgo automático de logs após o período de retenção estipulado pela governança do cliente (ex: 90 dias).
                </LGPDDescription>
              </LGPDCard>
            </LGPDGrid>
          </LGPDContent>
        </LGPDSection>

        {/* IMPLEMENTATION ROADMAP (14 WEEKS) */}
        <RoadmapSection id="metodologia">
          <RoadmapContent>
            <SectionBadge>Metodologia de Implantação</SectionBadge>
            <SectionTitle>
              Cronograma de desenvolvimento estruturado em <span className="highlight">14 semanas</span>
            </SectionTitle>
            <SectionSubtitle>
              Uma abordagem de engenharia ágil, com marcos bem definidos e validação prática em ambiente 
              controlado antes do lançamento definitivo.
            </SectionSubtitle>

            <RoadmapTimeline>
              <RoadmapCard>
                <div className="step-header">
                  <span className="step-badge">Etapa 1</span>
                  <span className="duration">3 Semanas</span>
                </div>
                <h4>Adaptação & Levantamento de Requisitos</h4>
                <p>
                  Mapeamento dos grupos, regras de escalonamento por setor, definição de hashtags operacionais e parametrização dos guardrails de segurança.
                </p>
              </RoadmapCard>

              <RoadmapCard>
                <div className="step-header">
                  <span className="step-badge">Etapa 2</span>
                  <span className="duration">2 Semanas</span>
                </div>
                <h4>Infraestrutura em Nuvem & WhatsApp API</h4>
                <p>
                  Provisionamento do servidor dedicado, instalação do PostgreSQL com extensão PGVector e configuração de número oficial exclusivo para o Bot.
                </p>
              </RoadmapCard>

              <RoadmapCard>
                <div className="step-header">
                  <span className="step-badge">Etapa 3</span>
                  <span className="duration">4 Semanas</span>
                </div>
                <h4>Estrutura N8N & Eficiência da IA</h4>
                <p>
                  Construção e ajuste dos fluxos n8n, integração com transcrição de áudios, pipeline de embeddings vetoriais e refinamento das respostas da IA.
                </p>
              </RoadmapCard>

              <RoadmapCard>
                <div className="step-header">
                  <span className="step-badge">Etapa 4</span>
                  <span className="duration">5 Semanas</span>
                </div>
                <h4>Implementação Prática & Homologação</h4>
                <p>
                  Testes em campo, validação de alertas e relatórios em tempo real, calibração com feedback dos gestores e ativação plena do sistema.
                </p>
              </RoadmapCard>
            </RoadmapTimeline>

            <PilotBanner>
              <div className="pilot-text">
                <h4>
                  <Clock size={20} color="#22c55e" />
                  Homologação Controlada: 3 Semanas de Piloto em Modo de Escuta
                </h4>
                <p>
                  Antes da expansão total, o PortosBot opera em modo silencioso monitorando as conversas, gerando relatórios de teste e permitindo que a diretoria valide a precisão dos dados em um ambiente 100% seguro.
                </p>
              </div>
              <PrimaryCTA onClick={() => handleWhatsAppQuote("Olá Sílvio! Gostaria de entender como funciona a fase de teste piloto do PortosBot.")}>
                Saber Mais
              </PrimaryCTA>
            </PilotBanner>
          </RoadmapContent>
        </RoadmapSection>

        {/* MANAGEMENT, TRACK RECORD & TEAM */}
        <ManagementSection id="gestao">
          <ManagementContent>
            <SectionBadge>Sobre a Gestão Boa</SectionBadge>
            <SectionTitle>
              Maturidade comprovada em <span className="highlight">engenharia de software</span> e inovação
            </SectionTitle>
            <SectionSubtitle>
              Fundada em 2024, a <strong>Gestão Boa</strong> é residente no Parque Tecnológico <strong>Oceantec</strong> e graduada pela 
              incubadora <strong>Innovatio (FURG)</strong>. Aliamos visão estratégica de negócios a uma engenharia de software de ponta.
            </SectionSubtitle>

            {/* STATS */}
            <StatsGrid>
              <StatCard>
                <div className="stat-value">+40</div>
                <div className="stat-title">Empresas Atendidas</div>
                <p className="stat-desc">Negócios ativos no SaaS próprio da Gestão Boa</p>
              </StatCard>

              <StatCard>
                <div className="stat-value">R$ 3M+</div>
                <div className="stat-title">Receita Movimentada</div>
                <p className="stat-desc">Volume financeiro gerido através de nossos clientes</p>
              </StatCard>

              <StatCard>
                <div className="stat-value">+45.000</div>
                <div className="stat-title">Mensagens de WhatsApp</div>
                <p className="stat-desc">Enviadas com sucesso por nossas automações só em 2026</p>
              </StatCard>

              <StatCard>
                <div className="stat-value">100%</div>
                <div className="stat-title">Software House Própria</div>
                <p className="stat-desc">Do levantamento de requisitos ao deploy em nuvem e stores</p>
              </StatCard>
            </StatsGrid>

            {/* FLAGSHIP CASE STUDY: CLIMACTA */}
            <CaseStudyCard>
              <div>
                <span className="case-tag">Case de Sucesso • Software House</span>
                <h3>Plataforma Climacta (Mobile Android & iOS)</h3>
                <p>
                  Desenvolvemos uma solução mobile completa para a plataforma <strong>Climacta</strong>, voltada para o monitoramento remoto de talhões agrícolas de alta precisão. 
                  O projeto compreendeu desde a arquitetura de dados e UX até a publicação nas lojas de aplicativos.
                </p>
                <div className="case-features">
                  <span>Gestão de Fazendas e Talhões</span>
                  <span>Monitoramento Climático em Tempo Real</span>
                  <span>Emissão de Alertas e Notificações</span>
                  <span>Geração de Relatórios em PDF</span>
                  <span>Gestão de Irrigação e Fertilizantes</span>
                  <span>Equipamentos e Safras</span>
                </div>
              </div>

              <div className="case-highlight-box">
                <div className="icon-wrap">
                  <Briefcase size={28} />
                </div>
                <h4>Engenharia de Alta Confiabilidade</h4>
                <p>
                  Projetos complexos desenvolvidos com rigor técnico, garantindo disponibilidade contínua em ambientes operacionais críticos.
                </p>
              </div>
            </CaseStudyCard>

            {/* LEADERSHIP TEAM */}
            <SectionBadge>Corpo Diretivo</SectionBadge>
            <SectionTitle style={{ marginBottom: "2.5rem" }}>
              Liderança técnica, de produto e governança
            </SectionTitle>

            <TeamGrid>
              <TeamCard>
                <div className="team-header">
                  <img src="/silvio.png" alt="Sílvio Gularte Quintana" />
                  <div className="team-info">
                    <h4>Sílvio Gularte Quintana</h4>
                    <div className="role">CEO & Liderança de Produto (CPO)</div>
                    <div className="academic">Técnico em Informática • Graduando em Administração</div>
                  </div>
                </div>
                <p>
                  Especialista em negócios e visão de produto. Atua diretamente na engenharia de requisitos, 
                  no desenho funcional das interfaces e na coordenação dos testes de campo com os usuários operacionais.
                </p>
              </TeamCard>

              <TeamCard>
                <div className="team-header">
                  <img src="/victor.png" alt="Victor Tavares do Amaral" />
                  <div className="team-info">
                    <h4>Victor Tavares do Amaral</h4>
                    <div className="role">CTO & Arquitetura de Software</div>
                    <div className="academic">Técnico em Informática • Graduando em Sistemas de Informação</div>
                  </div>
                </div>
                <p>
                  Especialista em Engenharia e Arquitetura de Software e liderança de times de tecnologia. 
                  Supervisiona os processos de CI/CD, pipelines de nuvem e a integridade de banco de dados e inteligência artificial.
                </p>
              </TeamCard>

              <TeamCard>
                <div className="team-header">
                  <img src="/karine.png" alt="Karine Gularte Quintana" />
                  <div className="team-info">
                    <h4>Karine Gularte Quintana</h4>
                    <div className="role">CFO & Governança Executiva</div>
                    <div className="academic">Pós-Graduada em Inovação em Negócios • Graduada em Oceanologia</div>
                  </div>
                </div>
                <p>
                  Técnica em Geoprocessamento com pós-graduação em empreendedorismo. 
                  Responsável pela governança corporativa, compliance, monitoramento de metas do plano de trabalho e prestação de contas.
                </p>
              </TeamCard>
            </TeamGrid>
          </ManagementContent>
        </ManagementSection>

        {/* QUOTATION REQUEST SECTION (ORÇAMENTO VIA WHATSAPP) */}
        <QuoteSection id="orcamento">
          <QuoteContent>
            <QuoteCard>
              <SectionBadge>Orçamento Sob Medida</SectionBadge>
              <h2>Pronto para levar inteligência e controle para o WhatsApp da sua operação?</h2>
              <p className="quote-lead">
                Cada empresa possui fluxos, volumes e setores operacionais específicos. 
                Nossa equipe elabora um projeto customizado de acordo com o porte da sua operação, 
                com infraestrutura em nuvem dedicada, período de piloto controlado e suporte completo.
              </p>

              <div className="benefits-row">
                <div className="benefit-item">
                  <CheckCircle2 size={16} />
                  <span>Infraestrutura Dedicada</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={16} />
                  <span>Piloto de 3 Semanas Incluso</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={16} />
                  <span>Conformidade Total com LGPD</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={16} />
                  <span>Suporte e Manutenção Especializada</span>
                </div>
              </div>

              <div className="cta-wrapper">
                <button
                  className="quote-cta-btn"
                  onClick={() => handleWhatsAppQuote("Olá Sílvio! Gostaria de solicitar um orçamento personalizado para o PortosBot.")}
                >
                  <Phone size={24} />
                  Fazer Orçamento no WhatsApp
                </button>
                <div className="guarantee-note">
                  Resposta direta com o CEO Sílvio Quintana • Sem compromisso
                </div>
              </div>
            </QuoteCard>
          </QuoteContent>
        </QuoteSection>

        {/* FOOTER */}
        <Footer>
          <FooterContent>
            <FooterBrand>
              <div className="footer-logo">
                <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
                <h3>Gestão Boa</h3>
              </div>
              <p>
                Soluções inteligentes de software e inteligência artificial para operações complexas. 
                Sediada no Parque Tecnológico Oceantec (FURG), Rio Grande - RS.
              </p>
              <div className="company-info">
                <div>Razão Social: BEASIER INOVA SIMPLES (I.S.)</div>
                <div>CNPJ: 53.909.852/0001-62</div>
                <div>Localização: Parque Oceantec • FURG • Rio Grande - RS</div>
              </div>
            </FooterBrand>

            <FooterLinks>
              <h4>Navegação</h4>
              <a href="#solucao" onClick={(e) => { e.preventDefault(); scrollToSection("solucao"); }}>
                A Solução
              </a>
              <a href="#funcionalidades" onClick={(e) => { e.preventDefault(); scrollToSection("funcionalidades"); }}>
                Funcionalidades
              </a>
              <a href="#tecnologia" onClick={(e) => { e.preventDefault(); scrollToSection("tecnologia"); }}>
                Tecnologia & IA
              </a>
              <a href="#seguranca" onClick={(e) => { e.preventDefault(); scrollToSection("seguranca"); }}>
                Segurança LGPD
              </a>
              <a href="#metodologia" onClick={(e) => { e.preventDefault(); scrollToSection("metodologia"); }}>
                Cronograma de 14 Semanas
              </a>
              <a href="#gestao" onClick={(e) => { e.preventDefault(); scrollToSection("gestao"); }}>
                Sobre a Gestão
              </a>
            </FooterLinks>

            <FooterLinks>
              <h4>Contato Direto</h4>
              <a href="mailto:contato@gestaoboa.com.br">
                <Mail size={16} style={{ marginRight: 8 }} />
                contato@gestaoboa.com.br
              </a>
              <a
                href="https://wa.me/5553999461550"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={16} style={{ marginRight: 8 }} />
                +55 (53) 99946-1550
              </a>
              <a
                href="#orcamento"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("orcamento");
                }}
              >
                <ArrowUpRight size={16} style={{ marginRight: 8 }} />
                Solicitar Proposta Comercial
              </a>
            </FooterLinks>
          </FooterContent>

          <FooterCopyright>
            <div>© {new Date().getFullYear()} Gestão Boa. Todos os direitos reservados.</div>
            <div>PortosBot / PortosBot — Inteligência Operacional para WhatsApp</div>
          </FooterCopyright>
        </Footer>
      </Container>
    </>
  );
};

export default BotGestor;
