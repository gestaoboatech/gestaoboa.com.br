import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import "./styles.css";

const About = () => {
  useEffect(() => {
    // Simple animation for elements with fade-in class
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleDemoClick = () => {
    window.open("https://wa.me/5553999461550", "_blank");
  };

  const [activeFounder, setActiveFounder] = useState("silvio");
  const [hoveredFounder, setHoveredFounder] = useState("");

  return (
    <>
      <Helmet>
        <title>
          Sobre a Gestão Boa - História, Equipe e Missão | Sistema de Gestão Empresarial
        </title>
        <meta
          name="description"
          content="Conheça a história da Gestão Boa: de uma ideia no IFRS ao sistema de gestão que transforma negócios. Nossa equipe, missão e valores que revolucionam a gestão."
        />
        <meta
          name="keywords"
          content="sobre gestão boa, história da empresa, equipe gestão boa, missão visão valores, fundadores gestão boa, empresa de tecnologia, startup brasileira, sistema de gestão"
        />
        <meta name="author" content="Gestão Boa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gestaoboa.com.br/sobre" />

        {/* Person-specific meta tags for Silvio Quintana */}
        <meta name="DC.creator" content="Silvio Quintana" />
        <meta name="article:author" content="Silvio Quintana" />
        <meta name="profile:first_name" content="Silvio" />
        <meta name="profile:last_name" content="Quintana" />
        <meta name="profile:username" content="Silvio Quintana" />

        {/* Open Graph Meta Tags focused on Silvio Quintana */}
        <meta property="og:type" content="profile" />
        <meta
          property="og:title"
          content="Sobre a Gestão Boa - História, Equipe e Missão"
        />
        <meta
          property="og:description"
          content="Conheça a história da Gestão Boa: de uma ideia no IFRS ao sistema de gestão que transforma negócios. Nossa equipe, missão e valores."
        />
        <meta property="og:url" content="https://gestaoboa.com.br/sobre" />
        <meta property="og:site_name" content="Gestão Boa" />
        <meta property="og:image" content="https://gestaoboa.com.br/time.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Equipe da Gestão Boa - Fundadores e colaboradores"
        />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sobre a Gestão Boa - História, Equipe e Missão"
        />
        <meta
          name="twitter:description"
          content="Conheça a história da Gestão Boa: de uma ideia no IFRS ao sistema de gestão que transforma negócios."
        />
        <meta
          name="twitter:image"
          content="https://gestaoboa.com.br/time.png"
        />
        <meta
          name="twitter:image:alt"
          content="Equipe da Gestão Boa - Fundadores e colaboradores"
        />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#007BFF" />
        <meta name="application-name" content="Gestão Boa" />

        {/* Schema.org structured data focused on Silvio Quintana */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Silvio Quintana",
            alternateName: ["Sílvio Quintana", "Silvio Quintana CEO", "Silvio Quintana Gestão Boa"],
            jobTitle: "CEO e Fundador",
            description: "Silvio Quintana é CEO e fundador da Gestão Boa, empreendedor visionário que revolucionou a gestão empresarial no Brasil. Líder em inovação tecnológica e sistemas de gestão para pequenas e médias empresas.",
            worksFor: {
              "@type": "Organization",
              name: "Gestão Boa",
              url: "https://gestaoboa.com.br",
              description: "Sistema de gestão completo que transforma a administração de pequenos e médios negócios"
            },
            foundingDate: "2023",
            nationality: "Brazilian",
            knowsAbout: [
              "Gestão Empresarial",
              "Sistemas de Gestão", 
              "Empreendedorismo",
              "Tecnologia",
              "Inovação",
              "Liderança",
              "Startup",
              "SaaS"
            ],
            colleague: [
              {
                "@type": "Person",
                name: "Karine Quintana",
                jobTitle: "CFO e Cofundadora"
              },
              {
                "@type": "Person", 
                name: "Victor Amaral",
                jobTitle: "CTO e Cofundador"
              }
            ],
            award: ["1º lugar na pré-incubação da FURG", "3º lugar no Startup Day Pelotas 2026"],
            alumniOf: "IFRS",
            url: "https://gestaoboa.com.br/sobre",
            sameAs: [
              "https://gestaoboa.com.br/sobre",
              "https://www.instagram.com/gestaoboa/"
            ]
          })}
        </script>

        {/* Additional Organization schema for context */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Gestão Boa",
            description:
              "Sistema de gestão completo que transforma a administração de pequenos e médios negócios",
            url: "https://gestaoboa.com.br",
            logo: "https://gestaoboa.com.br/beasier-1-1-1@2x.png",
            foundingDate: "2023",
            founder: {
              "@type": "Person",
              name: "Silvio Quintana",
              jobTitle: "CEO e Fundador",
              description: "Empreendedor visionário e CEO da Gestão Boa"
            },
            employee: [
              {
                "@type": "Person",
                name: "Silvio Quintana", 
                jobTitle: "CEO e Fundador"
              },
              {
                "@type": "Person",
                name: "Karine Quintana",
                jobTitle: "CFO e Cofundadora"
              },
              {
                "@type": "Person",
                name: "Victor Amaral",
                jobTitle: "CTO e Cofundador"
              }
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "BR",
              addressRegion: "RS"
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+55-53-999461550",
              contactType: "customer service",
              availableLanguage: "Portuguese"
            },
            sameAs: ["https://www.instagram.com/gestaoboa/"]
          })}
        </script>
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
                name: "Sobre",
                item: "https://gestaoboa.com.br/sobre",
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sobre a Gestão Boa",
            description:
              "Conheça a história da Gestão Boa: de uma ideia no IFRS ao sistema de gestão que transforma negócios. Nossa equipe, missão e valores.",
            url: "https://gestaoboa.com.br/sobre",
            about: {
              "@type": "Person",
              name: "Silvio Quintana",
              jobTitle: "CEO e Fundador da Gestão Boa"
            },
            mainEntity: {
              "@type": "Person",
              name: "Silvio Quintana",
              jobTitle: "CEO e Fundador",
              worksFor: {
                "@type": "Organization",
                name: "Gestão Boa"
              }
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://gestaoboa.com.br"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Sobre",
                  item: "https://gestaoboa.com.br/sobre",
                },
              ],
            },
          })}
        </script>
      </Helmet>
      <Header />
      <div className="about-page">
        {/* Enhanced Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="pre-title">Conheça a Gestão Boa</span>
            <h1 className="hero-title">
              Tecnologia que <span className="highlight">transforma</span>{" "}
              sonhos em negócios de sucesso
            </h1>
            <p className="hero-subtitle">
              Ajudando empreendedores brasileiros a organizarem seus negócios.
            </p>
            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() =>
                  window.open("https://app.gestaoboa.com.br", "_blank")
                }
              >
                Testar grátis
              </button>
              <button className="secondary-button" onClick={handleDemoClick}>
                Falar com suporte
              </button>
            </div>
          </div>
          <div className="hero-pattern"></div>
        </section>

        {/* Mission Statement */}
        <section className="mission-statement">
          <div className="container">
            <p className="mission-text">
              "Nossa missão é democratizar o acesso à tecnologia de gestão,
              tornando simples o que antes era complexo."
            </p>
          </div>
        </section>

        {/* Awards Section */}
        <section className="awards-section">
          <div className="awards-container">
            <div className="award-pair">
              <div className="award-number">1°</div>
              <div className="award-text">
                Colocada na pré-incubação de Rio Grande (2023)
              </div>
            </div>
            <div className="award-pair">
              <div className="award-number">2°</div>
              <div className="award-text">
                Acelerada no 5° ciclo do startup in lab Fecormécio-RS (2024)
              </div>
            </div>
            <div className="award-pair">
              <div className="award-number">3°</div>
              <div className="award-text">
                Selecionada para o Tecnopuc Garage POA (2025)
              </div>
            </div>
            <div className="award-pair">
              <div className="award-number">3°</div>
              <div className="award-text">
                Colocada no Startup Day em Pelotas (2026)
              </div>
            </div>
          </div>
        </section>

        {/* Updated History Section */}
        <section className="content-section history-section">
          <div className="section-header">
            <span className="section-badge">Nossa Jornada</span>
            <h2>De uma ideia nas salas do IFRS para um sistema de sucesso</h2>
            <p className="section-subtitle">
              Uma trajetória de inovação e superação
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item fade-in">
              <div className="timeline-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="timeline-content">
                <h3>A Descoberta</h3>
                <p>
                  Identificamos uma necessidade urgente entre empreendedores:
                  sistemas de gestão acessíveis e intuitivos. Entre planilhas
                  confusas e cadernos de anotações, vimos a oportunidade de
                  transformar a realidade de pequenos negócios com tecnologia
                  descomplicada.
                </p>
              </div>
            </div>

            <div className="timeline-item fade-in">
              <div className="timeline-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="timeline-content">
                <h3>A Validação</h3>
                <p>
                  Conquistamos o 1º lugar na pré-incubação da FURG, um momento
                  decisivo que confirmou nosso potencial. Este reconhecimento
                  nos deu a confiança para seguir em frente com determinação e
                  propósito ainda maiores.
                </p>
              </div>
            </div>

            <div className="timeline-item fade-in">
              <div className="timeline-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <div className="timeline-content">
                <h3>O Crescimento</h3>
                <p>
                  No 5º ciclo do Startup in Lab da fercomércio-RS, absorvemos
                  conhecimentos que impulsionaram nossa evolução. Culminando no
                  Demoday em Porto Alegre, onde apresentamos ao mercado como a
                  Gestão Boa está revolucionando a administração de negócios no
                  setor de beleza e estética.
                </p>
              </div>
            </div>

            <div className="timeline-item fade-in">
              <div className="timeline-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="timeline-content">
                <h3>O Presente</h3>
                <p>
                  Hoje somos parceiros estratégicos de empreendedores. Nossa
                  plataforma não apenas organiza negócios, mas liberta tempo e
                  energia para que nossos clientes possam focar no que realmente
                  importa: fazer seu negócio prosperar e crescer com
                  tranquilidade. 🚀
                </p>
              </div>
            </div>

            <div className="timeline-item fade-in">
              <div className="timeline-icon">
                <i className="fas fa-brain"></i>
              </div>
              <div className="timeline-content">
                <h3>Tecnopuc Garage 2025</h3>
                <p>
                  Em 2025, fomos selecionados para o Tecnopuc Garage, o processo
                  de ideação de negócios do Tecnopuc em Porto Alegre. Uma
                  oportunidade única de refinar nossa visão estratégica e 
                  conectar com o ecossistema de inovação da PUCRS, fortalecendo
                  ainda mais nossa capacidade de transformar a gestão de
                  pequenos negócios no Brasil.
                </p>
              </div>
            </div>

            <div className="timeline-item fade-in">
              <div className="timeline-icon">
                <i className="fas fa-medal"></i>
              </div>
              <div className="timeline-content">
                <h3>3° Lugar no Startup Day Pelotas 2026</h3>
                <p>
                  Em 2026, conquistamos o 3° lugar no Startup Day em Pelotas,
                  competindo entre diversas startups inovadoras da região.
                  Esse reconhecimento reforça a solidez do nosso modelo de
                  negócio e a relevância da Gestão Boa no ecossistema de
                  empreendedorismo e inovação do sul do Brasil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Team Section with Interactive Hover */}
        <section className="content-section team-section">
          <div className="floating-element left"></div>
          <div className="floating-element right"></div>

          <div className="section-header">
            <span className="section-badge">Fundadores</span>
            <h2>Mentes criativas por trás da revolução</h2>
            <p className="section-subtitle">
              Uma equipe apaixonada por resolver problemas reais
            </p>
          </div>

          <div className="interactive-team-container">
            <div className="team-image-container fade-in">
              <div
                className={`team-image-wrapper ${
                  hoveredFounder ? "has-hover" : ""
                }`}
              >
                <img
                  src="/time.png"
                  alt="Equipe da Gestão Boa - Fundadores Sílvio, Karine e Victor desenvolvendo sistema de gestão"
                  className="team-image"
                  useMap="#founders-map"
                />
                <div
                  className={`founder-overlay victor ${
                    hoveredFounder === "victor" ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`founder-overlay karine ${
                    hoveredFounder === "karine" ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`founder-overlay silvio ${
                    hoveredFounder === "silvio" ? "active" : ""
                  }`}
                ></div>
              </div>
              <map name="founders-map">
                <area
                  shape="rect"
                  coords="0,0,180,400"
                  alt="Victor"
                  onMouseEnter={() => {
                    setActiveFounder("victor");
                    setHoveredFounder("victor");
                  }}
                  onMouseLeave={() => setHoveredFounder("")}
                />
                <area
                  shape="rect"
                  coords="181,0,350,400"
                  alt="Karine"
                  onMouseEnter={() => {
                    setActiveFounder("karine");
                    setHoveredFounder("karine");
                  }}
                  onMouseLeave={() => setHoveredFounder("")}
                />
                <area
                  shape="rect"
                  coords="351,0,550,400"
                  alt="Sílvio"
                  onMouseEnter={() => {
                    setActiveFounder("silvio");
                    setHoveredFounder("silvio");
                  }}
                  onMouseLeave={() => setHoveredFounder("")}
                />
              </map>

              <div className="founder-indicators">
                <div
                  className={`indicator ${
                    activeFounder === "victor" ? "active" : ""
                  }`}
                  onClick={() => setActiveFounder("victor")}
                  onMouseEnter={() => setHoveredFounder("victor")}
                  onMouseLeave={() => setHoveredFounder("")}
                >
                  <span>Victor</span>
                </div>
                <div
                  className={`indicator ${
                    activeFounder === "karine" ? "active" : ""
                  }`}
                  onClick={() => setActiveFounder("karine")}
                  onMouseEnter={() => setHoveredFounder("karine")}
                  onMouseLeave={() => setHoveredFounder("")}
                >
                  <span>Karine</span>
                </div>
                <div
                  className={`indicator ${
                    activeFounder === "silvio" ? "active" : ""
                  }`}
                  onClick={() => setActiveFounder("silvio")}
                  onMouseEnter={() => setHoveredFounder("silvio")}
                  onMouseLeave={() => setHoveredFounder("")}
                >
                  <span>Sílvio</span>
                </div>
              </div>
            </div>

            <div className="team-cards-container">
              <h3 className="team-category-title">Liderança Visionária</h3>
              <div className="team-cards">
                <div
                  className={`team-card fade-in ${
                    activeFounder === "victor" ? "active" : ""
                  }`}
                >
                  <div className="card-header">
                    <h4>Victor Amaral</h4>
                    <span className="role">CTO</span>
                  </div>
                  <div className="card-body">
                    <p>
                      Maestro tecnológico que orquestra nossas equipes de
                      desenvolvimento e projetos. Sua visão técnica combinada
                      com habilidades em gestão de pessoas impulsiona nossa
                      capacidade de inovação contínua.
                    </p>
                  </div>
                </div>

                <div
                  className={`team-card fade-in ${
                    activeFounder === "karine" ? "active" : ""
                  }`}
                >
                  <div className="card-header">
                    <h4>Karine Quintana</h4>
                    <span className="role">CFO</span>
                  </div>
                  <div className="card-body">
                    <p>
                      Mente estratégica por trás das finanças e do crescimento.
                      Representa a Gestão Boa em eventos de inovação e lidera
                      nossas iniciativas de marketing digital, elevando
                      constantemente nossa presença no mercado.
                    </p>
                  </div>
                </div>

                <div
                  className={`team-card fade-in ${
                    activeFounder === "silvio" ? "active" : ""
                  }`}
                >
                  <div className="card-header">
                    <h4>Sílvio Quintana</h4>
                    <span className="role">CEO</span>
                  </div>
                  <div className="card-body">
                    <p>
                      Arquiteto de ideias que dá vida e direção à Gestão Boa.
                      Navega com maestria entre desenvolvimento tecnológico,
                      vendas e estratégia, sempre vislumbrando o próximo passo
                      inovador que transformará o mercado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Scroll Section */}
        <section className="content-section team-members-section">
          <div className="section-header">
            <span className="section-badge">Nossa Equipe</span>
            <h2>Equipe de alta performance</h2>
            <p className="section-subtitle">
              Conheça os talentos que fazem a Gestão Boa acontecer todos os dias
            </p>
          </div>

          <div className="team-scroll-container fade-in">
            <div className="team-scroll-track">
              <div className="team-member-card">
                <img
                  src="/bruno.png"
                  alt="Bruno Nascimento - Tech Lead da Gestão Boa, especialista em desenvolvimento de software"
                />
                <div className="member-info">
                  <h3 className="member-name">Bruno Nascimento</h3>
                  <span className="member-role">Tech Lead</span>
                </div>
              </div>

              <div className="team-member-card">
                <img
                  src="/Bruno W.jpg"
                  alt="Bruno Wellar - Desenvolvedor Mobile da Gestão Boa, especialista em aplicativos móveis"
                />
                <div className="member-info">
                  <h3 className="member-name">Bruno Wellar</h3>
                  <span className="member-role">Desenvolvedor Mobile</span>
                </div>
              </div>

              <div className="team-member-card">
                <img
                  src="/kaiane.jpeg"
                  alt="Kaiane Bittencourt - Gestora de Marketing da Gestão Boa, especialista em marketing digital"
                />
                <div className="member-info">
                  <h3 className="member-name">Kaiane Bittencourt</h3>
                  <span className="member-role">Gestora de Marketing</span>
                </div>
              </div>

              <div className="team-member-card">
                <img
                  src="/eduardo.jpg"
                  alt="Eduardo Gonçalves - Desenvolvedor Mobile da Gestão Boa, especialista em desenvolvimento iOS e Android"
                />
                <div className="member-info">
                  <h3 className="member-name">Eduardo Gonçalves</h3>
                  <span className="member-role">Desenvolvedor Mobile</span>
                </div>
              </div>

              <div className="team-member-card">
                <img
                  src="/Py.jpg"
                  alt="Gustavo Py - Desenvolvedor Backend da Gestão Boa, especialista em arquitetura de sistemas"
                />
                <div className="member-info">
                  <h3 className="member-name">Gustavo Py</h3>
                  <span className="member-role">Desenvolvedor Backend</span>
                </div>
              </div>

              <div className="team-member-card">
                <img
                  src="/marcelo.png"
                  alt="Marcelo - Comercial da Gestão Boa, especialista em vendas e relacionamento com clientes"
                />
                <div className="member-info">
                  <h3 className="member-name">Marcelo</h3>
                  <span className="member-role">Comercial</span>
                </div>
              </div>

              <div className="team-member-card">
                <img
                  src="/evelyn.jpeg"
                  alt="Evelyn - Desenvolvedora Full Stack da Gestão Boa, especialista em desenvolvimento web"
                />
                <div className="member-info">
                  <h3 className="member-name">Evelyn</h3>
                  <span className="member-role">Desenvolvimento Full Stack</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Culture Section */}
        <section className="content-section culture-section">
          <div className="section-header">
            <span className="section-badge">Nossa Essência</span>
            <h2>Cultivando inovação em cada interação</h2>
            <p className="section-subtitle">
              Os valores que nos guiam todos os dias
            </p>
          </div>

          <div className="culture-content fade-in">
            <div className="culture-values">
              <div className="value-item">
                <span className="value-icon">💡</span>
                <h4>Inovação Constante</h4>
                <p>
                  Buscamos sempre as melhores soluções para os desafios dos
                  nossos clientes
                </p>
              </div>
              <div className="value-item">
                <span className="value-icon">🤝</span>
                <h4>Colaboração Sem Barreiras</h4>
                <p>
                  Acreditamos no poder da criatividade coletiva sem hierarquias
                  limitantes
                </p>
              </div>
              <div className="value-item">
                <span className="value-icon">🚀</span>
                <h4>Excelência Acessível</h4>
                <p>Democratizamos a tecnologia para que todos possam crescer</p>
              </div>
            </div>

            <p>
              Na Gestão Boa, nossa estrutura organizacional adhocrática elimina
              barreiras hierárquicas, permitindo que ideias inovadoras surjam de
              qualquer lugar. Desde nosso CEO até cada desenvolvedor,
              trabalhamos lado a lado porque entendemos que grandes soluções
              podem vir de qualquer pessoa.
            </p>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="cta-section fade-in">
          <div className="cta-pattern left"></div>
          <div className="cta-pattern right"></div>
          <h2>Pronto para transformar seu negócio?</h2>
          <p>
            Junte-se aos milhares de empreendedores que já descobriram como a
            gestão eficiente pode impulsionar resultados
          </p>
          <div className="cta-buttons">
            <button
              className="cta-button primary"
              onClick={() =>
                window.open("https://beasier.vercel.app", "_blank")
              }
            >
              Teste Grátis
            </button>
            <button className="cta-button secondary" onClick={handleDemoClick}>
              Falar com especialista
            </button>
          </div>
        </section>

        {/* Testimonials Section - New */}
        <section className="content-section testimonials-section">
          <div className="section-header">
            <span className="section-badge">Depoimentos</span>
            <h2>O que dizem nossos clientes</h2>
          </div>

          <div className="testimonials-container">
            <div className="testimonial fade-in">
              <div className="quote-mark">"</div>
              <p className="testimonial-text2">
                "Fora de série, fora de série mesmo! Eu te chamo, tu me responde.
                Tinha muito receio, pois já contratei outros serviços e não tinha
                esse retorno pra tirar minhas dúvidas. Poderia ser um sistema
                funcional, mas quando eu tinha dúvidas, eles não supriam. Tu
                responde, tira minhas dúvidas, não faz corpo mole, e me mostra
                tudo certinho. Cara, tá show de bola!"
              </p>
              <div className="testimonial-author">
                <p className="author-name">Gustavo Fonseca</p>
                <p className="author-business">Cliente Gestão Boa</p>
              </div>
            </div>

            <div className="testimonial fade-in">
              <div className="quote-mark">"</div>
              <p className="testimonial-text2">
                “Muito fácil de operar, fiquei feliz com uma coisa que eu não
                sabia o barbeiro consegue lançar no caixa a comanda pelo celular
                dele muito prático”
              </p>
              <div className="testimonial-author">
                <p className="author-name">Leandro Figueiredo</p>
                <p className="author-business">Barbearia Duque - Pelotas RS</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
