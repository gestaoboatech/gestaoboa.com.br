/* eslint-disable no-irregular-whitespace */
import emailjs from "@emailjs/browser";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import ScrollSpy from "react-ui-scrollspy";
import * as yup from "yup";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import CustomTextarea from "../../components/CustomTextArea";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CookieConsentModal from "../../components/CookieConsentModal";
import { UnformErrors } from "../../interfaces/interfaces";
import { FB_PIXEL } from "../../utils/pixel";

import { Helmet } from "react-helmet-async";
import ReactPlayer from "react-player";
import { Banner, Contact, Container, FAQ, Grid, Segments, Solutions } from "./styles";

// Import the carousel styles
import "./performance.css";

const Home: FunctionComponent = () => {
  const formRef = useRef<FormHandles>(null);
  const viewedSections = useRef(new Set<string>());
  
  // Estado do carrossel
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  console.log(isAutoPlaying)
  
  // Atualizar itens por página baseado no tamanho da tela
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);


  // Dados dos segmentos
  const segments = [
    {
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&crop=center",
      alt: "Barbearia",
      title: "Barbearia",
      description: "Você vai liberar tempo na sua rotina para vender mais com um sistema para agendamentos para barbearia, gerenciamento de equipe, controle de estoque, lembretes antes do agendamento para fidelizar os seus clientes e app para barbeiros.",
      features: ["Controle de agenda online", "App para profissionais", "Lembrete para clientes no whatsApp"],
      link: "/barbearia",
      linkText: "Soluções para barbearias"
    },
    {
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&crop=center",
      alt: "Salão de beleza",
      title: "Salão de beleza",
      description: "Seja qual for o tamanho do seu salão de beleza, tenha total controle dos agendamentos, gerencie seus profissionais, fidelize seus clientes e ganhe tempo automatizando a sua gestão.",
      features: ["Controle de agenda online", "Cálculo e pagamento de comissões", "Fluxo de caixa"],
      link: "/salao-estetica",
      linkText: "Soluções para salões de beleza"
    },
    {
      image: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&h=300&fit=crop&crop=center",
      alt: "Clínica de Estética",
      title: "Clínica de Estética",
      description: "Faça a gestão dos seus profissionais e atraia mais clientes para a sua clínica de estética com ferramentas de comunicação e marketing exclusivas, criação de pacotes.",
      features: ["Gestão de pacotes", "Histórico de clientes", "Controle de estoque"],
      link: "/salao-estetica",
      linkText: "Soluções para clínicas de estética"
    },
    {
      image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop&crop=center",
      alt: "Profissionais Autônomos",
      title: "Profissionais Autônomos",
      description: "Organize sua agenda, fidelize clientes e profissionalize seu atendimento com ferramentas especializadas para profissionais autônomos da área de beleza e bem-estar.",
      features: ["Agenda personalizada", "Gestão financeira", "Marketing digital"],
      link: "/solution",
      linkText: "barbearia"
    }
  ];

  // Funções do carrossel
  const nextSegment = () => {
    setCurrentSegmentIndex((prevIndex) => {
      const maxIndex = segments.length - itemsPerPage;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSegment = () => {
    setIsAutoPlaying(false); // Pausa auto-play quando usuário navega manualmente
    setCurrentSegmentIndex((prevIndex) => {
      const maxIndex = segments.length - itemsPerPage;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const handleNextSegment = () => {
    setIsAutoPlaying(false); // Pausa auto-play quando usuário navega manualmente
    nextSegment();
  };

  const goToSegment = (index: number) => {
    setIsAutoPlaying(false); // Pausa auto-play quando usuário navega manualmente
    const maxIndex = segments.length - itemsPerPage;
    setCurrentSegmentIndex(Math.min(index, maxIndex));
  };

  // Função para obter os itens visíveis
  const getVisibleSegments = () => {
    const endIndex = Math.min(currentSegmentIndex + itemsPerPage, segments.length);
    return segments.slice(currentSegmentIndex, endIndex);
  };

  // Rastreia visualização da página quando o componente é montado
  useEffect(() => {
    FB_PIXEL.pageView();

    // Rastrear visualização de conteúdo importante quando a página carrega
    FB_PIXEL.trackCustomEvent("ViewHomePage", {
      page_type: "home",
      content_category: "landing_page",
    });

    // Configurar rastreamento de scrolls para seções importantes
    const handleScroll = () => {
      const sections = ["solution", "contact", "demonstration"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (
          element &&
          isElementInViewport(element) &&
          !viewedSections.current.has(section)
        ) {
          viewedSections.current.add(section);
          FB_PIXEL.trackCustomEvent("ViewSection", {
            section_name: section,
            page: "home",
          });
        }
      });
    };

    const isElementInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    formRef.current?.setErrors({});
    try {
      const schemaLogin = yup
        .object()
        .shape({
          name: yup.string().required("Informe o seu nome"),
          email: yup
            .string()
            .email("Email inválido")
            .required("Informe o seu email"),
          phone: yup.string().required("Informe o seu número de celular"),
          message: yup.string(),
        })
        .required();

      await schemaLogin.validate(data, { abortEarly: false });

      console.log("Passou tudo");

      const emailBody = {
        from_name: formRef.current?.getFieldValue("name"),
        email: formRef.current?.getFieldValue("email"),
        phone: formRef.current?.getFieldValue("phone"),
        message: formRef.current?.getFieldValue("message"),
      };

      emailjs
        .send(
          import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
          import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
          emailBody,
          import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
        )
        .then((res) => {
          if (res && res.status == 200) {
            // Rastreie o evento de lead após o envio bem-sucedido do formulário
            FB_PIXEL.trackLead({
              content_name: "Formulário de Contato",
              content_category: "contato",
              value: 1,
            });

            formRef.current?.clearField("name");
            formRef.current?.clearField("email");
            formRef.current?.clearField("phone");
            formRef.current?.clearField("message");
          }
        });
    } catch (err) {
      const validationErrors: UnformErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
        console.log("validationErrors ", validationErrors);
      }
    }
  };

  // Funções para rastreamento de eventos do Facebook Pixel
  const trackAppDownload = (platform: string) => {
    FB_PIXEL.trackCustomEvent("AppDownloadClick", { platform });
  };

  const trackDemonstrationClick = () => {
    FB_PIXEL.trackStartTrial({
      content_name: "Demonstração",
      content_category: "demonstração",
    });
  };

  return (
    <ScrollSpy>
      <Container>
        <Helmet>
          <title>
            Gestão Boa - Sistema de Gestão completo | Aumente suas Vendas
          </title>
          <meta
            name="description"
            content="Sistema de Gestão completo: agendamentos, controle financeiro, CRM, estoque e comissões. Teste grátis por 20 dias!"
          />
          <meta
            name="keywords"
            content="sistema de gestão, software de gestão, CRM, controle financeiro, agendamento online, gestão de estoque, comissões, gestão de clientes, ERP, sistema para pequenas e micros empresas"
          />
          <meta name="author" content="Gestão Boa" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://gestaoboa.com.br/" />

          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Gestão Boa - Sistema de Gestão completo"
          />
          <meta
            property="og:description"
            content="Sistema de Gestão completo: agendamentos, controle financeiro, CRM, estoque e comissões. Teste grátis por 20 dias!"
          />
          <meta property="og:url" content="https://gestaoboa.com.br/" />
          <meta property="og:site_name" content="Gestão Boa" />
          <meta
            property="og:image"
            content="https://gestaoboa.com.br/cellphone.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Gestão Boa - App de gestão" />
          <meta property="og:locale" content="pt_BR" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Gestão Boa - Sistema de Gestão completo"
          />
          <meta
            name="twitter:description"
            content="Sistema de Gestão completo: agendamentos, controle financeiro, CRM, estoque e comissões. Teste grátis por 20 dias!"
          />
          <meta
            name="twitter:image"
            content="https://gestaoboa.com.br/cellphone.png"
          />
          <meta name="twitter:image:alt" content="Gestão Boa - App de gestão" />

          {/* Additional SEO Meta Tags */}
          <meta name="theme-color" content="#007BFF" />
          <meta name="msapplication-TileColor" content="#007BFF" />
          <meta name="application-name" content="Gestão Boa" />
          <meta name="apple-mobile-web-app-title" content="Gestão Boa" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          {/* Schema.org structured data - Otimizado */}
          <script type="application/ld+json">
            {`{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Gestão Boa","description":"Sistema de Gestão completo com agendamentos, controle financeiro, CRM, estoque e comissões","url":"https://gestaoboa.com.br","applicationCategory":"BusinessApplication","offers":{"@type":"Offer","price":"49.90","priceCurrency":"BRL"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"500"},"review":[{"@type":"Review","author":{"@type":"Person","name":"Pedro Cirilo","jobTitle":"Designer","image":"https://gestaoboa.com.br/pedroCirilo.png"},"reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},"reviewBody":"A equipe é extremamente profissional. Entendem muito bem as demandas e estão sempre atualizados. Já trabalhei com eles na construção de outras plataformas e sites e foram impecáveis! Tenho como grandes parceiros!"},{"@type":"Review","author":{"@type":"Person","name":"Pedro Arthur","jobTitle":"Proprietário da Prime Barbershop","image":"https://gestaoboa.com.br/PedroArthur.jpg"},"reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},"reviewBody":"O app da gestão boa vem me ajudando muito desde o primeiro dia, consigo saber com exatidão quantos clientes eu tenho e atendo, faturamento, venda de produtos, etc."},{"@type":"Review","author":{"@type":"Person","name":"Janaina Christello","jobTitle":"Psicóloga","image":"https://gestaoboa.com.br/WhatsApp Image 2024-07-05 at 10.01.10.jpeg"},"reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},"reviewBody":"O aplicativo ajudou muito a organizar os meus recebimentos e entender quais são os lucros e despesas de forma muito clara e objetiva."}]}`}
          </script>
        </Helmet>
        <Grid>
          <Header />

          {/* Hidden navigation links for Google sitelinks */}
          <nav className="seo-navigation" aria-label="Navegação principal">
            <ul>
              <li>
                <a
                  href="https://gestaoboa.com.br/"
                  title="Cresça com a gestão boa"
                >
                  Home - Cresça com a Gestão Boa
                </a>
              </li>
              <li>
                <a
                  href="https://gestaoboa.com.br/preco"
                  title="Teste gratuito por 20 dias"
                >
                  Teste Gratuito
                </a>
              </li>
              <li>
                <a
                  href="https://gestaoboa.com.br/sobre"
                  title="Fale com especialista"
                >
                  Fale com Especialista
                </a>
              </li>
              <li>
                <a
                  href="https://gestaoboa.com.br/sobre"
                  title="Conheça nossa empresa e equipe"
                >
                  Conheça a Gestão Boa
                </a>
              </li>
              <li>
                <a
                  href="https://gestaoboa.com.br/solucao"
                  title="Funcionalidades e recursos completos"
                >
                  Soluções
                </a>
              </li>
            </ul>
          </nav>

          <Banner id="start">
            <div className="content">
              <h1 className="title">Gestão inteligente para o seu negócio</h1>
              <div className="subtitle">
                Simplifique seus agendamentos e organize comissões com
                facilidade. Gerencie tudo em um app e veja sua receita decolar!
              </div>

              <div className="buttons">
                <a
                  className="button button-link"
                  href="/preco"
                  title="TESTAR GRÁTIS"
                >
                  <Button
                    width="100%"
                    text="TESTAR GRÁTIS!"
                    method={() => {}}
                    type={"focused"}
                  />
                </a>
                <a
                  className="button button-link"
                  href="/solucao"
                  title="SAIBA MAIS"
                >
                  <Button
                    width="99%"
                    text="SAIBA MAIS"
                    method={() => {}}
                    type={"unfocused"}
                  />
                </a>
              </div>
            </div>
            <div className="images">
              <img
                className="cellphone"
                src="/smartphone.png"
                alt="Aplicativo Gestão Boa em smartphone mostrando interface de gestão"
                loading="eager"
                width="300"
                height="600"
              />
              <img
                className="elipse"
                src="/Ellipse.svg"
                alt="Elemento decorativo"
                loading="lazy"
              />
            </div>
          </Banner>

          <Solutions id="solution">
            <div className="metrics-section">
              <h2 className="metrics-title">Números que falam por si</h2>
              <p className="metrics-subtitle">
                Empresas já transformaram sua gestão com a Gestão Boa
              </p>
              
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="metric-value">+100</div>
                  <div className="metric-label">Profissionais cadastrados</div>
                  <div className="metric-description">Confiam na nossa plataforma</div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="metric-value">+12.000</div>
                  <div className="metric-label">Agendamentos</div>
                  <div className="metric-description">Realizados com sucesso</div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="metric-value">+R$ 900 mil</div>
                  <div className="metric-label">Gerenciados</div>
                  <div className="metric-description">Através do app</div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div className="metric-value">90%</div>
                  <div className="metric-label">Satisfação</div>
                  <div className="metric-description">Clientes recomendam</div>
                </div>
              </div>
            </div>

            {/* Benefícios / Soluções */}
            <div className="benefits-section">
              <h2 className="benefits-title">Como a Gestão Boa pode turbinar o seu negócio?</h2>
              <div className="benefits">
                <div className="benefit">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">Agenda Simplificada</h3>
                    <p className="benefit-description">
                      Mantenha seus compromissos sempre à mão. Sistema intuitivo de agendamento com notificações automáticas.
                    </p>
                    <a href="/solucao#agenda" className="benefit-link">Saiba mais →</a>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">Gerenciamento de Produtos</h3>
                    <p className="benefit-description">
                      Controle completo do estoque com análise detalhada de vendas e giro de produtos.
                    </p>
                    <a href="/solucao#produtos" className="benefit-link">Saiba mais →</a>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">Controle Financeiro</h3>
                    <p className="benefit-description">
                      Gestão completa de entradas e saídas com relatórios detalhados por método de pagamento.
                    </p>
                    <a href="/solucao#financeiro" className="benefit-link">Saiba mais →</a>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">Análises Detalhadas</h3>
                    <p className="benefit-description">
                      Dashboard completo com métricas em tempo real para decisões baseadas em dados.
                    </p>
                    <a href="/solucao#analytics" className="benefit-link">Saiba mais →</a>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">Fidelização de Clientes</h3>
                    <p className="benefit-description">
                      Automatize mensagens personalizadas e construa relacionamentos duradouros.
                    </p>
                    <a href="/solucao#clientes" className="benefit-link">Saiba mais →</a>
                  </div>
                </div>

                <div className="benefit">
                  <div className="benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">Gestão de Comissões</h3>
                    <p className="benefit-description">
                      Calcule automaticamente comissões de equipe com total transparência e precisão.
                    </p>
                    <a href="/solucao#comissoes" className="benefit-link">Saiba mais →</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Experimente gratuitamente */}
            <div className="try-free-button-container">
              <a
                className="try-free-button"
                href="/preco"
                title="EXPERIMENTE GRATUITAMENTE"
              >
                <Button
                  width="100%"
                  text="EXPERIMENTE GRATUITAMENTE"
                  method={() => {}}
                  type={"focused"}
                />
              </a>
            </div>

            <div className="testimonies">
              <div className="heading">
                Empreendedores de sucesso já contam com nossa solução: organize,
                cresça e fidelize seus clientes!
              </div>
              <div className="card featured-testimonial">
                <video
                  controls
                  preload="metadata"
                  poster="/leandro-thumbnail.jpg"
                  onPlay={() =>
                    FB_PIXEL.trackCustomEvent("VideoPlay", {
                      video: "depoimentoLeandro",
                      type: "testimonial",
                    })
                  }
                  onPause={() =>
                    FB_PIXEL.trackCustomEvent("VideoPause", {
                      video: "depoimentoLeandro",
                      type: "testimonial",
                    })
                  }
                >
                  <source src="/depoimentoLeandro.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
                <div className="texts">
                  <div className="title">Uso e recomendo</div>
                  <div className="desc">
                    Se tem uma coisa que mudou o jogo aqui na minha barbearia
                    foi começar a usar o Gestão Boa. Antes era tudo no papel, na
                    cabeça ou em planilhas. Hoje eu tenho clareza total dos
                    números, consigo tomar decisões mais inteligentes e garantir
                    a saúde financeira da barbearia. Eu uso e indico para
                    qualquer barbearia que queira crescer com gestão.
                  </div>
                  <div className="person">
                    - Leandro Figueiredo, Proprietário da Barbearia Duque
                  </div>
                </div>
              </div>

              {/* Outros depoimentos em grid fixo */}
              <div className="testimonials-grid">
                
                {/* Depoimento Janaina */}
                <div className="testimonial-card-new" itemScope itemType="https://schema.org/Review">
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-header">
                    <img
                      src="/WhatsApp Image 2024-07-05 at 10.01.10.jpeg"
                      alt="Janaina Christello"
                      className="testimonial-avatar"
                      itemProp="image"
                      loading="lazy"
                    />
                    <div className="testimonial-info">
                      <h4 itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">Janaina Christello</span>
                      </h4>
                      <p itemProp="jobTitle">Psicóloga</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  
                  <h3 className="testimonial-title" itemProp="name">
                    Ficou mais fácil organizar minhas finanças
                  </h3>
                  
                  <p className="testimonial-text" itemProp="reviewBody">
                    O aplicativo ajudou muito a organizar os meus recebimentos e entender quais são os lucros e despesas de forma muito clara e objetiva. Além de conseguir abranger vários objetivos em um só APP como organizar agendamentos que antes usava o Google agenda e também organizar os recebimentos que antes usava o Excel.
                  </p>
                  
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="hidden-rating">
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                </div>

                {/* Depoimento Pedro Cirilo */}
                <div className="testimonial-card-new" itemScope itemType="https://schema.org/Review">
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-header">
                    <img
                      src="/pedroCirilo.png"
                      alt="Pedro Cirilo"
                      className="testimonial-avatar"
                      itemProp="image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/64x64/007BFF/FFFFFF?text=PC";
                      }}
                    />
                    <div className="testimonial-info">
                      <h4 itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">Pedro Cirilo</span>
                      </h4>
                      <p itemProp="jobTitle">Designer</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  
                  <h3 className="testimonial-title" itemProp="name">
                    Grandes parceiros
                  </h3>
                  
                  <p className="testimonial-text" itemProp="reviewBody">
                    A equipe é extremamente profissional. Entendem muito bem as demandas e estão sempre atualizados. Já trabalhei com eles na construção de outras plataformas e sites e foram impecáveis! Tenho como grandes parceiros!
                  </p>
                  
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="hidden-rating">
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                </div>

                {/* Depoimento Pedro Arthur */}
                <div className="testimonial-card-new" itemScope itemType="https://schema.org/Review">
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-header">
                    <img
                      src="/PedroArthur.jpg"
                      alt="Pedro Arthur"
                      className="testimonial-avatar"
                      itemProp="image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/64x64/007BFF/FFFFFF?text=PA";
                      }}
                    />
                    <div className="testimonial-info">
                      <h4 itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">Pedro Arthur</span>
                      </h4>
                      <p itemProp="jobTitle">Proprietário da Prime Barbershop</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  
                  <h3 className="testimonial-title" itemProp="name">
                    Controle total do negócio
                  </h3>
                  
                  <p className="testimonial-text" itemProp="reviewBody">
                    O app da gestão boa vem me ajudando muito desde o primeiro dia, consigo saber com exatidão quantos clientes eu tenho e atendo, faturamento, venda de produtos, etc. Comecei a ter controle não só dos cortes, mas das vendas dos produtos e dos custos. A atenção do suporte também é um ponto importante de citar.
                  </p>
                  
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="hidden-rating">
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                </div>

              </div>
            </div>
            <div className="tutorial" id="demonstration">
              <div className="callout">
                <div className="title">
                  Gestão financeira e vendas <span>na palma da sua mão</span>
                </div>
                <div className="description">
                  Veja nossa demonstração, onde mostramos o passo a passo para
                  adicionar serviço, registrar vendas e custos, agendar
                  serviços, adicionar clientes. Além de ver relatórios que te
                  ajudam a entender seus lucros, melhores clientes e gráficos de
                  vendas.
                </div>

                <div className="buttons">
                  <div className="top">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.beasier&pcampaignid=web_share"
                      className="unfocused"
                      onClick={() => trackAppDownload("Android")}
                    >
                      <img
                        src="/Vector.svg"
                        alt="Ícone Android - baixar app para Android"
                        loading="lazy"
                        width="24"
                        height="24"
                      />
                      ANDROID
                    </a>

                    <div className="or">ou</div>

                    <a
                      href="https://app.gestaoboa.com.br"
                      className="unfocused"
                      onClick={() => trackAppDownload("iOS")}
                    >
                      <img
                        src="/mage_playstore.svg"
                        alt="Ícone da App Store"
                        className="ios-icon"
                        loading="lazy"
                        width="24"
                        height="24"
                      />
                      IOS
                    </a>
                  </div>
                  <a
                    href="https://app.gestaoboa.com.br"
                    className="focused"
                    onClick={trackDemonstrationClick}
                  >
                    Desktop
                  </a>
                </div>
              </div>{" "}
              <div className="player">
                <ReactPlayer
                  className="buying"
                  url="/demonstracao.mp4"
                  width="fit-content"
                  height="85vh"
                  controls={true}
                  loop={true}
                  playing={true}
                  muted
                  onStart={() =>
                    FB_PIXEL.trackCustomEvent("DemoVideoStart", {
                      video: "demonstracao",
                      section: "demonstration",
                    })
                  }
                  onPlay={() =>
                    FB_PIXEL.trackCustomEvent("DemoVideoPlay", {
                      video: "demonstracao",
                      section: "demonstration",
                    })
                  }
                  onPause={() =>
                    FB_PIXEL.trackCustomEvent("DemoVideoPause", {
                      video: "demonstracao",
                      section: "demonstration",
                    })
                  }
                  onProgress={(state) => {
                    const progress = Math.floor(state.played * 100);
                    if (progress === 25 || progress === 50 || progress === 75) {
                      FB_PIXEL.trackCustomEvent("DemoVideoProgress", {
                        video: "demonstracao",
                        progress: `${progress}%`,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </Solutions>

          {/* Segments Section */}
          <Segments id="segments">
            <h2 className="section-title">Segmentos que Atendemos</h2>
            <p className="section-subtitle">
              Oferecemos soluções especializadas para diferentes tipos de negócios de beleza e bem-estar
            </p>
            
            <div 
              className="carousel-container"
            >
              {/* Botão anterior */}
              <button 
                className="carousel-btn carousel-btn-prev" 
                onClick={prevSegment}
                aria-label="Segmento anterior"
              >
                ‹
              </button>
              
              {/* Container dos cards visíveis */}
              <div className="carousel-track">
                {getVisibleSegments().map((segment, index) => (
                  <div key={currentSegmentIndex + index} className="carousel-card">
                    <img 
                      src={segment.image}
                      alt={segment.alt}
                      className="segment-image"
                    />
                    <h3 className="segment-title">{segment.title}</h3>
                    <p className="segment-description">
                      {segment.description}
                    </p>
                    <ul className="segment-features">
                      {segment.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                    <a href={segment.link} className="segment-link">
                      {segment.linkText}
                    </a>
                  </div>
                ))}
              </div>
              
              {/* Botão próximo */}
              <button 
                className="carousel-btn carousel-btn-next" 
                onClick={handleNextSegment}
                aria-label="Próximo segmento"
              >
                ›
              </button>
            </div>
            
            {/* Indicadores de posição */}
            <div className="carousel-indicators">
              {Array.from({ length: Math.ceil(segments.length / itemsPerPage) }, (_, pageIndex) => (
                <button
                  key={pageIndex}
                  className={`carousel-indicator ${Math.floor(currentSegmentIndex / itemsPerPage) === pageIndex ? 'active' : ''}`}
                  onClick={() => goToSegment(pageIndex * itemsPerPage)}
                  aria-label={`Ir para página ${pageIndex + 1}`}
                />
              ))}
            </div>

          </Segments>

          {/* FAQ Section */}
          <FAQ id="faq">
            <h2 className="section-title text-center">Perguntas Frequentes</h2>
            <div className="faq-container">
              <details className="faq-item">
                <summary>
                  O que é a Gestão boa e como ela pode me ajudar?
                </summary>
                <p>
                  A Gestão boa é uma plataforma completa de gestão para o seu
                  negócio. Nós centralizamos tudo o que você precisa em um só
                  lugar: agendamentos online, controle de fluxo de caixa, gestão
                  de clientes (CRM), pagamento de comissões, controle de estoque
                  e muito mais. Nosso objetivo é que você tenha mais tempo e
                  possa tomar decisões inteligentes e fazer sua empresa crescer
                  com segurança e tecnologia.
                </p>
              </details>

              <details className="faq-item">
                <summary>É possível migrar dados de outro sistema?</summary>
                <p>
                  Sim, oferecemos serviço de migração de dados de praticamente
                  qualquer sistema existente para a Gestão Boa.
                </p>
              </details>

              <details className="faq-item">
                <summary>O sistema funciona em dispositivos móveis?</summary>
                <p>
                  Sim! A Gestão Boa é totalmente responsiva e funciona
                  perfeitamente em smartphones e tablets, além de contar com
                  aplicativos nativos para iOS e Android.
                </p>
              </details>

              <details className="faq-item">
                <summary>
                  {" "}
                  Quais são os planos? Existe um período de teste?
                </summary>
                <p>
                  Temos planos flexíveis que se adaptam ao tamanho e à
                  necessidade do seu negócio, começando em R$ 49,90 e indo até
                  R$ 99,90 por mês. Todos os planos incluem as funcionalidades
                  essenciais para uma gestão de ponta. E você pode experimentar
                  gratuitamente por 20 dias, sem necessidade de cartão de
                  crédito!
                </p>
              </details>

              <details className="faq-item">
                <summary>
                  Preciso ter conhecimento técnico para usar o sistema? Como
                  funciona a implantação?
                </summary>
                <p>
                  Não! Nossa plataforma é 100% intuitiva e foi pensada para o
                  dia a dia do empreendedor, não para especialistas em
                  tecnologia. A implantação é simples e nossa equipe está pronta
                  para te auxiliar nos primeiros passos, garantindo que você e
                  seus funcionários consigam usar todas as ferramentas desde o
                  primeiro dia.
                </p>
              </details>

              <details className="faq-item">
                <summary>
                  O sistema é seguro? Meus dados ficam protegidos?
                </summary>
                <p>
                  Sim! Utilizamos criptografia de ponta a ponta, servidores
                  seguros com certificação SSL e backup automático diário. Seus
                  dados são protegidos por protocolos de segurança bancária e
                  nunca são compartilhados com terceiros.
                </p>
              </details>
            </div>
          </FAQ>

          <Contact id="contact">
            {/* */}
            <div className="info">
              <div className="title">
                Entre em contato e acelere seu crescimento!
              </div>
              <div className="links">
                <a href="https://www.instagram.com/gestaoboa/">
                  <img
                    src="/instagram-1@2x.png"
                    alt="Instagram da Gestão Boa - siga-nos nas redes sociais"
                    loading="lazy"
                    width="32"
                    height="32"
                  />
                  @gestaoboa
                </a>
              </div>
            </div>

            <div className="space"></div>

            <div className="form">
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="input-wrapper double">
                  <div className="label">Nome completo</div>
                  <CustomInput width="100%" name="name" placeholder="Nome" />
                </div>
                <div className="input-wrapper">
                  <div className="label">Email</div>
                  <CustomInput
                    width="98%"
                    name="email"
                    placeholder="seumelhoremail@mail.com"
                  />
                </div>
                <div className="input-wrapper">
                  <div className="label">Telefone</div>
                  <CustomInput
                    width="98%"
                    name="phone"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="textarea">
                  <div className="label">Mensagem</div>
                  <CustomTextarea
                    width="100%"
                    name="message"
                    placeholder="Olá, tudo bem?"
                  />
                </div>
              </Form>
              <div className="button">
                <Button
                  width={"100%"}
                  text="Enviar"
                  method={() => formRef.current?.submitForm()}
                  type="focused"
                />
              </div>
            </div>
          </Contact>

          <Footer />
        </Grid>
      </Container>
      <CookieConsentModal />
    </ScrollSpy>
  );
};

export default Home;
