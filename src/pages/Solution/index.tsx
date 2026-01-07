import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container, Content } from "./styles";
import "../../styles/feature-animations.css";

const Solution = () => {
  useEffect(() => {
    // Função para fazer scroll suave para a seção
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove o # do hash
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          // Remove highlight de todas as seções
          document.querySelectorAll(".feature-item").forEach((item) => {
            item.classList.remove("highlighted");
          });

          // Aguarda um pouco para garantir que a página foi renderizada
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // Adiciona highlight na seção atual
            element.classList.add("highlighted");

            // Remove o highlight após 3 segundos
            setTimeout(() => {
              element.classList.remove("highlighted");
            }, 3000);
          }, 100);
        }
      }
    };

    // Função para animações de scroll reveal
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observa todos os elementos com classe reveal-element
    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach((el) => observer.observe(el));

    // Executa quando a página carrega
    scrollToSection();

    // Escuta mudanças no hash da URL
    const handleHashChange = () => {
      scrollToSection();
    };

    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);
  return (
    <Container>
      <Helmet>
        <title>
          App de Agendamentos e Gestão Financeira | Gestão Boa - Sistema
          Completo
        </title>
        <meta
          name="description"
          content="Melhor app de agendamentos e gestão financeira do Brasil! Sistema completo para organizar agenda, controlar finanças, CRM e estoque. Link personalizado de agendamentos incluído! Teste grátis 20 dias!"
        />
        <meta
          name="keywords"
          content="app de agendamentos, app para gestão financeira, aplicativo agendamento, app controle financeiro, sistema agendamento online, app gestão negócio, aplicativo financeiro empresarial, software agendamento, app caixa, gestão financeira app, agenda digital, controle de caixa app, link personalizado agendamento, agendamento 24h"
        />
        <meta name="author" content="Gestão Boa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gestaoboa.com.br/solucao" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="App de Agendamentos e Gestão Financeira | Gestão Boa"
        />
        <meta
          property="og:description"
          content="Melhor app de agendamentos e gestão financeira! Sistema completo para organizar agenda, controlar finanças, CRM e estoque. Link personalizado de agendamentos incluído!"
        />
        <meta property="og:url" content="https://gestaoboa.com.br/solucao" />
        <meta property="og:site_name" content="Gestão Boa" />
        <meta
          property="og:image"
          content="https://gestaoboa.com.br/Agenda.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Soluções de gestão da Gestão Boa - Agenda, Finanças, CRM"
        />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="App de Agendamentos e Gestão Financeira | Gestão Boa"
        />
        <meta
          name="twitter:description"
          content="Melhor app de agendamentos e gestão financeira! Sistema completo para organizar agenda, controlar finanças, CRM e estoque. Link personalizado incluído!"
        />
        <meta
          name="twitter:image"
          content="https://gestaoboa.com.br/Agenda.png"
        />
        <meta
          name="twitter:image:alt"
          content="Soluções de gestão da Gestão Boa"
        />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#007BFF" />
        <meta name="application-name" content="Gestão Boa" />

        {/* Schema.org structured data for Mobile Application */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: "Gestão Boa - App de Agendamentos e Gestão Financeira",
            description:
              "O melhor app de agendamentos e gestão financeira para pequenos e micro empresas. Controle agenda, finanças, clientes e estoque em um só lugar.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "iOS, Android, Web",
            offers: {
              "@type": "Offer",
              price: "49.90",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2025-12-31",
            },
            downloadUrl: [
              "https://play.google.com/store/apps/details?id=com.beasier",
              "https://app.gestaoboa.com.br",
            ],
            screenshot: [
              "https://gestaoboa.com.br/Agenda.png",
              "https://gestaoboa.com.br/Caixa.png",
              "https://gestaoboa.com.br/cellphone.png",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "500",
              bestRating: "5",
              worstRating: "1",
            },
            creator: {
              "@type": "Organization",
              name: "BEasier Tech",
              url: "https://gestaoboa.com.br",
            },
            keywords: [
              "app de agendamentos",
              "app para gestão financeira",
              "aplicativo agendamento",
              "app controle financeiro",
              "sistema agendamento online",
              "app gestão negócio",
            ],
          })}
        </script>

        {/* Schema.org structured data for Software Application focused on scheduling */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Gestão Boa - App de Agendamentos",
            description:
              "App de agendamentos profissional com notificações automáticas, agenda inteligente e integração completa com sistema de vendas e pagamentos.",
            applicationCategory: "SchedulingApplication",
            operatingSystem: "Web, iOS, Android",
            offers: {
              "@type": "Offer",
              price: "49.90",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
            },
            featureList: [
              "Agendamento online automático",
              "Link personalizado de agendamentos",
              "Notificações por WhatsApp",
              "Sincronização de agenda",
              "Gestão de horários disponíveis",
              "Relatórios de agendamentos",
              "Integração com pagamentos",
            ],
            provider: {
              "@type": "Organization",
              name: "BEasier Tech",
              url: "https://gestaoboa.com.br",
            },
          })}
        </script>

        {/* Schema.org structured data for Financial Management Software */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Gestão Boa - App para Gestão Financeira",
            description:
              "App para gestão financeira empresarial com controle de caixa, relatórios avançados, gestão de vendas e análise de desempenho financeiro em tempo real.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web, iOS, Android",
            offers: {
              "@type": "Offer",
              price: "49.90",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
            },
            featureList: [
              "Controle de fluxo de caixa",
              "Relatórios financeiros detalhados",
              "Gestão de vendas e despesas",
              "Análise de lucratividade",
              "Controle de formas de pagamento",
              "Dashboard financeiro em tempo real",
            ],
            provider: {
              "@type": "Organization",
              name: "BEasier Tech",
              url: "https://gestaoboa.com.br",
            },
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
                name: "Soluções",
                item: "https://gestaoboa.com.br/solucao",
              },
            ],
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
                name: "Por que escolher este app de agendamentos em vez de outros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nosso app de agendamentos se destaca por ter notificações automáticas por WhatsApp, sincronização em tempo real, interface super intuitiva e integração completa com gestão financeira. Além disso, oferecemos suporte brasileiro 24/7 e preços acessíveis para pequenos negócios. É o app de agendamentos mais completo do Brasil!",
                },
              },
              {
                "@type": "Question",
                name: "Como este app para gestão financeira pode melhorar meu negócio?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nosso app para gestão financeira oferece controle total do seu caixa em tempo real, relatórios automáticos de vendas e despesas, análise de lucratividade por produto/serviço e dashboard inteligente. Você vai ter clareza total dos números do seu negócio e poderá tomar decisões mais assertivas para aumentar a lucratividade.",
                },
              },
              {
                "@type": "Question",
                name: "É possível migrar dados de outro sistema de gestão?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, oferecemos serviço completo de migração de dados de praticamente qualquer sistema existente para a Gestão Boa. Nossa equipe técnica cuida de todo o processo, garantindo que você não perca nenhuma informação importante.",
                },
              },
              {
                "@type": "Question",
                name: "O sistema funciona em dispositivos móveis e tablets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! A Gestão Boa é totalmente responsiva e funciona perfeitamente em smartphones e tablets, além de contar com aplicativos nativos para iOS e Android. Você pode gerenciar seu negócio de qualquer lugar.",
                },
              },
              {
                "@type": "Question",
                name: "Quais tipos de relatórios o sistema oferece?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nossa solução oferece relatórios completos de vendas, análises financeiras, relatórios de produtos mais vendidos, desempenho de funcionários, métricas de clientes e muito mais. Todos os relatórios podem ser exportados e personalizados conforme sua necessidade.",
                },
              },
              {
                "@type": "Question",
                name: "O sistema integra com outras ferramentas que já uso?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, a Gestão Boa possui integrações com diversas ferramentas populares como WhatsApp para comunicação com clientes, sistemas de pagamento, e APIs para conectar com outros softwares que você já utiliza no seu negócio.",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <Header />
      <Content>
        <section className="hero">
          <h1>
            Melhor App de Agendamentos e Gestão Financeira
          </h1>
          <p>
            Descubra o app que facilita seus agendamentos online e gestão
            financeira. Organize sua agenda, crie seu link personalizado de agendamentos, controle seu caixa e
            faça seu negócio crescer com o melhor sistema de gestão!
          </p>
        </section>

        <section className="benefits-grid reveal-element">
          <div className="benefits-container">
            <h2>Por que escolher a Gestão Boa?</h2>
            <p className="subtitle">
              Descubra os diferenciais que fazem da Gestão Boa a melhor escolha para seu negócio
            </p>
            
            <div className="benefits-list">
              <div className="benefit-card reveal-element">
                <div className="benefit-icon">⚡</div>
                <h3>Setup em 5 Minutos</h3>
                <p>Configure seu sistema completo em apenas alguns cliques. Sem complicações, sem demora.</p>
              </div>
              
              <div className="benefit-card reveal-element">
                <div className="benefit-icon">📱</div>
                <h3>Apps Nativos</h3>
                <p>Aplicativos para iOS e Android + versão web. Gerencie de qualquer lugar, a qualquer hora.</p>
              </div>
              
              <div className="benefit-card reveal-element">
                <div className="benefit-icon">🔗</div>
                <h3>Link Personalizado</h3>
                <p>Seu próprio link de agendamentos para compartilhar em redes sociais e cartão digital.</p>
              </div>
              
              <div className="benefit-card reveal-element">
                <div className="benefit-icon">📊</div>
                <h3>Relatórios Inteligentes</h3>
                <p>Dashboards e análises automáticas para tomar as melhores decisões do seu negócio.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div id="agenda" className="feature-item reveal-element modern-hover">
            <img
              src="/Agenda.png"
              alt="App de Agendamentos Inteligente - Interface completa de agendamento online com calendário e notificações automáticas"
              className="animate-float"
            />
            <div className="feature-content">
              <h2>App de Agendamentos Profissional</h2>
              <p>O app de agendamento perfeito para o seu negócio</p>
              <ul>
                <li>
                  <strong>Agendamento online automático</strong> - Clientes
                  marcam direto pelo app
                </li>
                <li>
                  <strong>Notificações inteligentes por WhatsApp</strong> -
                  Lembre automaticamente clientes e funcionários
                </li>
                <li>
                  <strong>Agenda sincronizada em tempo real</strong> - Acesse de
                  qualquer dispositivo
                </li>
                <li>
                  <strong>Gestão completa de horários</strong> - Controle
                  disponibilidade e bloqueios
                </li>
                <li>
                  <strong>Relatórios de agendamentos</strong> - Analise
                  performance e ocupação
                </li>
              </ul>
            </div>
          </div>

          <div id="link-agendamentos" className="feature-item reverse reveal-element modern-hover">
            <div className="video-container">
              <video
                controls
                preload="metadata"
              >
                <source src="/agenda online.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos. 
              </video>
            </div>
            <div className="feature-content">
              <h2>Link Personalizado de Agendamentos</h2>
              <p>Permita que seus clientes agendem 24/7 através de um link personalizado:</p>
              <ul>
                <li>
                  <strong>Link personalizado exclusivo</strong> - Ex: agendamento.gestaoboa.com.br/seunegocio
                </li>
                <li>
                  <strong>Agendamento 24 horas por dia</strong> - Clientes agendam mesmo quando você está dormindo
                </li>
                <li>
                  <strong>Reduz ligações desnecessárias</strong> - Menos interrupções no seu dia a dia
                </li>
                <li>
                  <strong>Confirmação automática por WhatsApp</strong> - Cliente recebe confirmação na hora
                </li>
                <li>
                  <strong>Integração total com sua agenda</strong> - Sincroniza automaticamente com seu calendário
                </li>
                <li>
                  <strong>Compartilhe em qualquer lugar</strong> - Instagram, Facebook, cartão de visita digital
                </li>
              </ul>
              <div className="feature-highlight">
                <p>💡 <strong>Dica:</strong> Coloque seu link personalizado na bio do Instagram e no status do WhatsApp para receber agendamentos automáticos!</p>
              </div>
            </div>
          </div>

          <div id="financeiro" className="feature-item reverse reveal-element modern-hover">
            <img
              src="/Caixa.png"
              alt="App para Gestão Financeira - Dashboard completo de controle de caixa, vendas e despesas empresariais"
              className="animate-float"
            />
            <div className="feature-content">
              <h2>Gestão Financeira Completa</h2>
              <p>O app de gestão financeira mais completo para seu negócio:</p>
              <ul>
                <li>
                  <strong>Controle de caixa em tempo real</strong> - Monitore
                  entradas e saídas instantaneamente
                </li>
                <li>
                  <strong>App de controle financeiro avançado</strong> -
                  Relatórios detalhados e análises profundas
                </li>
                <li>
                  <strong>Gestão de vendas e despesas integrada</strong> - Tudo
                  conectado em um só lugar
                </li>
                <li>
                  <strong>Dashboard financeiro inteligente</strong> - Visualize
                  a saúde financeira do negócio
                </li>
                <li>
                  <strong>Análise de lucratividade por serviço</strong> -
                  Descubra quais são mais rentáveis
                </li>
              </ul>
            </div>
          </div>

          <div id="clientes" className="feature-item reveal-element modern-hover">
            <img
              src="/Clientes.jpeg"
              alt="CRM Gestão de Clientes - Sistema de cadastro e relacionamento com histórico completo"
              className="animate-float"
            />
            <div className="feature-content">
              <h2>Gestão de Clientes (CRM)</h2>
              <p>Fortaleça seu relacionamento com clientes:</p>
              <ul>
                <li>
                  <strong>Cadastro completo de clientes</strong> - Base de dados
                  organizada e segura
                </li>
                <li>
                  <strong>Histórico de atendimentos</strong> - Acompanhe todo
                  relacionamento com o cliente
                </li>
                <li>
                  <strong>Sistema de fidelização</strong> - Programe recompensas
                  e benefícios automáticos
                </li>
                <li>
                  <strong>Comunicação automatizada</strong> - Envie mensagens
                  personalizadas via WhatsApp
                </li>
              </ul>
            </div>
          </div>

          <div id="produtos" className="feature-item reverse reveal-element modern-hover">
            <img
              src="/produtos.jpeg"
              alt="Gestão de Produtos e Estoque - Controle de inventário em tempo real com relatórios"
              className="animate-float"
            />
            <div className="feature-content">
              <h2>Gestão de Produtos e Estoque</h2>
              <p>Controle seu estoque com precisão:</p>
              <ul>
                <li>
                  <strong>Cadastro completo de produtos</strong> - Gerencie
                  informações detalhadas de cada item
                </li>
                <li>
                  <strong>Controle de estoque em tempo real</strong> - Monitore
                  quantidades disponíveis instantaneamente
                </li>
                <li>
                  <strong>Relatórios de vendas por produto</strong> -
                  Identifique produtos mais vendidos e rentáveis
                </li>
                <li>
                  <strong>Alertas de estoque baixo</strong> - Receba
                  notificações para reposição
                </li>
              </ul>
            </div>
          </div>

          <div id="analytics" className="feature-item reveal-element modern-hover">
            <img
              src="/comissões.jpeg"
              alt="Analytics e Relatórios Empresariais - Dashboard com métricas e análises de desempenho"
              className="animate-float"
            />
            <div className="feature-content">
              <h2>Análises e Relatórios Avançados</h2>
              <p>Tome decisões baseadas em dados:</p>
              <ul>
                <li>
                  <strong>Relatórios detalhados de vendas</strong> - Análise
                  completa do faturamento por período
                </li>
                <li>
                  <strong>Análise de desempenho</strong> - Métricas de
                  produtividade e crescimento
                </li>
                <li>
                  <strong>Métricas de crescimento</strong> - Acompanhe a
                  evolução do seu negócio
                </li>
                <li>
                  <strong>Insights sobre clientes</strong> - Entenda
                  comportamentos e preferências
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cta reveal-element">
          <h2>
            Comece a Usar o Melhor App de Agendamentos e Gestão Financeira Hoje!
          </h2>
          <p>
            Junte-se aos diversos empresários que já usam nosso app para
            organizar agendamentos e controlar as finanças. Teste grátis por 20
            dias!
          </p>
          <div className="buttons">
            <a href="/preco" className="primary-button shine-effect">
              Testar App Grátis
            </a>
            <a href="https://wa.me/5553999461550" className="secondary-button shine-effect">
              Falar com Especialista
            </a>
          </div>
        </section>

        <section id="faq" className="faq">
          <h2 className="section-title text-center">
            Perguntas Frequentes sobre Nossas Soluções
          </h2>
          <div className="faq-container">
            <details className="faq-item">
              <summary>
                Por que escolher este app de agendamentos em vez de outros?
              </summary>
              <p>
                Nosso app de agendamentos se destaca por ter notificações
                automáticas por WhatsApp, sincronização em tempo real, interface
                super intuitiva e integração completa com gestão financeira.
                Além disso, oferecemos suporte brasileiro 24/7 e preços
                acessíveis para pequenos negócios. É o app de agendamentos mais
                completo do Brasil!
              </p>
            </details>

            <details className="faq-item">
              <summary>
                Como este app para gestão financeira pode melhorar meu negócio?
              </summary>
              <p>
                Nosso app para gestão financeira oferece controle total do seu
                caixa em tempo real, relatórios automáticos de vendas e
                despesas, análise de lucratividade por produto/serviço e
                dashboard inteligente. Você vai ter clareza total dos números do
                seu negócio e poderá tomar decisões mais assertivas para
                aumentar a lucratividade.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                É possível migrar dados de outro sistema de gestão?
              </summary>
              <p>
                Sim, oferecemos serviço completo de migração de dados de
                praticamente qualquer sistema existente para a Gestão Boa. Nossa
                equipe técnica cuida de todo o processo, garantindo que você não
                perca nenhuma informação importante.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                O sistema funciona em dispositivos móveis e tablets?
              </summary>
              <p>
                Sim! A Gestão Boa é totalmente responsiva e funciona
                perfeitamente em smartphones e tablets, além de contar com
                aplicativos nativos para iOS e Android. Você pode gerenciar seu
                negócio de qualquer lugar.
              </p>
            </details>

            <details className="faq-item">
              <summary>Quais tipos de relatórios o sistema oferece?</summary>
              <p>
                Nossa solução oferece relatórios completos de vendas, análises
                financeiras, relatórios de produtos mais vendidos, desempenho de
                funcionários, métricas de clientes e muito mais. Todos os
                relatórios podem ser exportados e personalizados conforme sua
                necessidade.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                Como funciona o link personalizado de agendamentos?
              </summary>
              <p>
                O link personalizado permite que seus clientes agendem diretamente através de um endereço exclusivo (ex: agendamento.gestaoboa.com.br/seunegocio). Você pode compartilhar este link no Instagram, WhatsApp Status, cartão de visita digital ou qualquer lugar. Os clientes podem agendar 24 horas por dia e recebem confirmação automática por WhatsApp. O agendamento sincroniza automaticamente com sua agenda no sistema.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                O sistema integra com outras ferramentas que já uso?
              </summary>
              <p>
                Sim, a Gestão Boa possui integrações com diversas ferramentas
                populares como WhatsApp para comunicação com clientes, sistemas
                de pagamento, e APIs para conectar com outros softwares que você
                já utiliza no seu negócio.
              </p>
            </details>
          </div>
        </section>
      </Content>

      <Footer />
    </Container>
  );
};

export default Solution;
