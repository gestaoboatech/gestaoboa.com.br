import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  Share2,
  Ticket,
  ShieldCheck,
  CheckCircle2,
  Users,
  Smartphone,
  Award,
  ArrowRight,
  ChevronDown,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { createInfluencer } from '../../services/userApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';

interface FAQItemData {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItemData[] = [
  {
    question: 'Quanto custa para se tornar um parceiro afiliado do Gestão Boa?',
    answer:
      'Absolutamente nada! O cadastro no programa é 100% gratuito. Não há taxa de adesão, mensalidade ou qualquer cobrança. Você só tem a ganhar indicando um sistema que realmente transforma a rotina dos estabelecimentos de beleza.',
  },
  {
    question: 'Como funciona a comissão de 10% recorrente?',
    answer:
      'Diferente de cursos ou infoprodutos onde a comissão é paga uma única vez, no Gestão Boa a comissão é RECORRENTE. Isso significa que enquanto o salão, barbearia ou clínica indicado mantiver a assinatura ativa no sistema, você recebe 10% de cada mensalidade paga, todo santo mês, direto no seu PIX.',
  },
  {
    question: 'Como e quando recebo minhas comissões?',
    answer:
      'Os repasses são realizados mensalmente de forma automática e transparente direto na chave PIX que você cadastrar neste formulário. Sem burocracia, sem limites absurdos para saque e sem taxas ocultas.',
  },
  {
    question: 'Eu preciso dar suporte ou ensinar os clientes a usarem o sistema?',
    answer:
      'Não! O seu papel é apenas recomendar e divulgar seu cupom ou link. Toda a implantação, treinamento, suporte ao cliente e resolução de dúvidas são feitos integralmente pela equipe oficial de especialistas do Gestão Boa.',
  },
  {
    question: 'Como o sistema rastreia as indicações feitas por mim?',
    answer:
      'Ao se cadastrar, você define seu código de cupom exclusivo e recebe um link de indicação personalizado. Quando o salão ou clínica cria a conta usando seu cupom ou através do seu link, ele é imediatamente vinculado ao seu perfil de parceiro para sempre.',
  },
  {
    question: 'Onde posso divulgar meu cupom e link de parceiro?',
    answer:
      'Você tem total liberdade: pode divulgar no Instagram (Stories, Reels, Bio, Direct), TikTok, canal no YouTube, grupos de WhatsApp e Telegram, em cursos presenciais ou online para cabeleireiros, manicures, barbeiros ou esteticistas, e até indicar diretamente para amigos donos de estabelecimentos.',
  },
  {
    question: 'Por que o nicho de beleza e estética tem alta retenção?',
    answer:
      'Porque quando um salão ou clínica cadastra seus clientes, histórico de atendimentos e comissões no Gestão Boa, o sistema se torna o coração da operação dele. Eles não trocam de sistema facilmente, o que garante estabilidade e previsibilidade de renda para você a longo prazo.',
  },
];

interface RealTestimonial {
  name: string;
  role: string;
  avatar: string;
  title: string;
  quote: string;
  tag: string;
}

const REAL_TESTIMONIALS: RealTestimonial[] = [
  {
    name: 'Marcela',
    role: 'Proprietária do Studio Marcela Hair',
    avatar: '/Marcela.jpeg',
    title: 'Revolucionou meu salão!',
    quote:
      'O sistema mudou completamente a organização do meu salão. Minhas clientes adoram agendar online pelo link e eu não preciso mais ficar atendendo WhatsApp o dia inteiro. Recomendo muito!',
    tag: 'Salão de Beleza',
  },
  {
    name: 'Pedro Arthur',
    role: 'Proprietário da Prime Barbershop',
    avatar: '/PedroArthur.jpg',
    title: 'Controle total do negócio',
    quote:
      'O app da gestão boa vem me ajudando muito desde o primeiro dia, consigo saber com exatidão quantos clientes eu tenho e atendo, faturamento, venda de produtos, etc. Comecei a ter controle não só dos cortes, mas das vendas dos produtos e dos custos. A atenção do suporte também é um ponto importante de citar.',
    tag: 'Barbearia',
  },
  {
    name: 'Gustavo Fonseca',
    role: 'Barbeiro Profissional',
    avatar: '/gustavo.png',
    title: 'Fora de série!',
    quote:
      'Fora de série, fora de série mesmo! Eu te chamo, tu me responde. Tinha muito receio, pois já contratei outros serviços e não tinha esse retorno pra tirar minhas dúvidas. Tu responde, tira minhas dúvidas, não faz corpo mole, e me mostra tudo certinho. Cara, tá show de bola!',
    tag: 'Barbearia',
  },
  {
    name: 'Leandro Figueiredo',
    role: 'Proprietário da Barbearia Duque',
    avatar: '/leandro-thumbnail.jpg',
    title: 'Uso e recomendo',
    quote:
      'Se tem uma coisa que mudou o jogo aqui na minha barbearia foi começar a usar o Gestão Boa. Antes era tudo no papel, na cabeça ou em planilhas. Hoje eu tenho clareza total dos números, consigo tomar decisões mais inteligentes e garantir a saúde financeira da barbearia. Eu uso e indico para qualquer barbearia que queira crescer com gestão.',
    tag: 'Barbearia',
  },
  {
    name: 'Lucas Cunha',
    role: 'Proprietário do Autêntica Barbearia',
    avatar: '/lucas-thumbnail.jpg',
    title: 'Atendimento de altíssima qualidade',
    quote:
      'O que realmente se destaca no Gestão Boa é o atendimento. O suporte é rápido, eficiente e muito humanizado. Sempre que precisei de ajuda para esclarecer dúvidas ou configurar recursos, o time me atendeu prontamente e com excelente atenção.',
    tag: 'Barbearia',
  },
];

const Influenciador: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    pix_key: '',
    discount_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Simulator State
  const [referredClients, setReferredClients] = useState<number>(20);
  const avgSubscriptionPrice = 99.9; // Valor médio mensal de assinatura
  const commissionRate = 0.1; // 10%
  const monthlyEarnings = Math.round(referredClients * avgSubscriptionPrice * commissionRate);
  const annualEarnings = monthlyEarnings * 12;

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);

  // Animated counter hook
  const useCounter = (target: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
      if (!hasStarted) return;
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [hasStarted, target, duration]);

    return { count, ref };
  };

  const counter1 = useCounter(100, 1800);
  const counter2 = useCounter(10, 1200);
  const counter3 = useCounter(100, 1500);

  // Phone formatting (99) 99999-9999
  const formatPhone = (val: string) => {
    const numbers = val.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'discount_code' ? value.toUpperCase().replace(/[^A-Z0-9_-]/g, '') : value,
    }));
  };

  // Auto-generate code helper
  const handleAutoGenerateCode = () => {
    let base = formData.name
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    if (!base) base = 'BELEZA';
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const suggestedCode = `${base.slice(0, 8)}${randomSuffix}`;
    setFormData((prev) => ({ ...prev, discount_code: suggestedCode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError('Você deve aceitar os termos do programa para continuar.');
      return;
    }
    setLoading(true);
    setError('');

    let finalCode = formData.discount_code.trim();
    if (!finalCode) {
      let base = formData.name
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '') || 'GB';
      finalCode = `${base.slice(0, 8)}${Math.floor(10 + Math.random() * 90)}`;
    }

    try {
      const payload = {
        ...formData,
        discount_code: finalCode,
      };
      const result = await createInfluencer(payload);
      if (result.error) {
        setError(result.error);
      } else {
        setFormData(payload);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = `${window.location.origin}/criar-conta?cupom=${formData.discount_code}`;

  const copyToClipboard = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Oi! Se você tem salão de beleza, barbearia ou clínica de estética, precisa conhecer o Gestão Boa! É o sistema mais completo para agendamento online no WhatsApp, controle de comandas e comissões.\n\nUse meu cupom exclusivo *${formData.discount_code}* para se cadastrar e testar gratuitamente: ${shareUrl}`
  );

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="hotmart-affiliate-page">
      <Helmet>
        <title>Programa de Afiliados e Influenciadores | Gestão Boa</title>
        <meta
          name="description"
          content="Transforme sua audiência no nicho de beleza e estética em renda recorrente mensal. Seja um parceiro oficial do Gestão Boa, ganhe 10% todo mês direto no PIX e tenha materiais prontos para divulgar."
        />
        <meta
          property="og:title"
          content="Programa de Afiliados Gestão Boa — 10% Recorrente no Nicho de Beleza"
        />
        <meta
          property="og:description"
          content="Ganhe comissões recorrentes todo mês no PIX indicando o Gestão Boa para salões de beleza, barbearias e clínicas de estética."
        />
      </Helmet>

      <Header />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Hotmart Affiliates Style)                                */}
      {/* ========================================================================= */}
      <section className="aff-hero">
        <div className="aff-hero-container">
          <div className="aff-hero-content">
            <div className="aff-pill-badge">
              <Sparkles size={16} className="text-amber-500" />
              <span>Programa Oficial de Parceiros & Afiliados</span>
            </div>

            <h1 className="aff-hero-title">
              Transforme sua audiência de beleza em{' '}
              <span className="aff-gradient-text">renda recorrente todo mês</span>
            </h1>

            <p className="aff-hero-subtitle">
              Seja um embaixador do <strong>Gestão Boa</strong>. Indique o sistema de gestão mais
              fácil e completo para salões, barbearias e clínicas de estética, e receba{' '}
              <strong>10% de comissão todo mês</strong> direto no seu PIX enquanto eles forem
              assinantes.
            </p>

            <div className="aff-hero-actions">
              <button type="button" className="aff-btn-primary" onClick={scrollToForm}>
                Quero ser um parceiro agora
                <ArrowRight size={18} />
              </button>

              <button type="button" className="aff-btn-secondary" onClick={scrollToSimulator}>
                <TrendingUp size={18} />
                Simular meus ganhos
              </button>
            </div>

            <div className="aff-hero-trust-row">
              <div className="aff-trust-item">
                <CheckCircle2 size={18} className="aff-trust-icon" />
                <span>Cadastro 100% gratuito</span>
              </div>
              <div className="aff-trust-item">
                <CheckCircle2 size={18} className="aff-trust-icon" />
                <span>Sem limite de indicações</span>
              </div>
              <div className="aff-trust-item">
                <CheckCircle2 size={18} className="aff-trust-icon" />
                <span>Repasses automáticos no PIX</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="aff-hero-visual">
            <div className="aff-visual-card aff-visual-primary">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=700&fit=crop&crop=center"
                alt="Salão de beleza profissional moderno"
                className="aff-visual-img"
              />
              <div className="aff-visual-floating-badge aff-badge-top">
                <span className="aff-badge-icon">💇‍♀️</span>
                <div>
                  <p className="aff-badge-title">Salões & Clínicas</p>
                  <p className="aff-badge-desc">Mais de 1 milhão de estabelecimentos</p>
                </div>
              </div>
              <div className="aff-visual-floating-badge aff-badge-bottom">
                <div className="aff-pix-icon">⚡ PIX</div>
                <div>
                  <p className="aff-badge-title">10% Todo Mês</p>
                  <p className="aff-badge-desc">Comissão recorrente na sua conta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS COUNTER STRIP                                                    */}
      {/* ========================================================================= */}
      <section className="aff-stats-strip">
        <div className="aff-stats-container">
          <div className="aff-stat-card" ref={counter1.ref}>
            <div className="aff-stat-number">+{counter1.count}</div>
            <div className="aff-stat-label">Profissionais e salões ativos</div>
          </div>

          <div className="aff-stat-divider" />

          <div className="aff-stat-card" ref={counter2.ref}>
            <div className="aff-stat-number">{counter2.count}%</div>
            <div className="aff-stat-label">Comissão recorrente todo mês</div>
          </div>

          <div className="aff-stat-divider" />

          <div className="aff-stat-card" ref={counter3.ref}>
            <div className="aff-stat-number">R$ 0</div>
            <div className="aff-stat-label">Custo para participar do programa</div>
          </div>

          <div className="aff-stat-divider" />

          <div className="aff-stat-card">
            <div className="aff-stat-number">100%</div>
            <div className="aff-stat-label">Suporte técnico feito por nós</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS IN 3 STEPS (Inspired by Hotmart)                         */}
      {/* ========================================================================= */}
      <section className="aff-section aff-steps-section">
        <div className="aff-container">
          <div className="aff-section-header">
            <span className="aff-section-tag">Passo a Passo Simples</span>
            <h2 className="aff-section-title">Como funciona o Programa de Parceiros?</h2>
            <p className="aff-section-subtitle">
              Você só precisa seguir 3 passos para transformar suas recomendações em faturamento
              mensal.
            </p>
          </div>

          <div className="aff-steps-grid">
            <div className="aff-step-card">
              <div className="aff-step-number">01</div>
              <div className="aff-step-icon-box">
                <Users size={28} />
              </div>
              <h3>Cadastre-se gratuitamente</h3>
              <p>
                Crie sua conta de parceiro em menos de 1 minuto no formulário abaixo. Sem taxas,
                sem burocracia e com a sua chave PIX configurada.
              </p>
            </div>

            <div className="aff-step-card">
              <div className="aff-step-number">02</div>
              <div className="aff-step-icon-box">
                <Ticket size={28} />
              </div>
              <h3>Pegue seu Cupom e Link</h3>
              <p>
                Gere um código exclusivo (ex: SEUNOME10) com desconto especial para seu público e um
                link seguro com rastreamento automático.
              </p>
            </div>

            <div className="aff-step-card">
              <div className="aff-step-number">03</div>
              <div className="aff-step-icon-box">
                <TrendingUp size={28} />
              </div>
              <h3>Divulgue e lucre todo mês</h3>
              <p>
                Compartilhe no Instagram, TikTok, WhatsApp ou cursos. Enquanto os salões indicados
                estiverem ativos, 10% da mensalidade cai no seu PIX!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BEAUTY & AESTHETICS NICHES                                            */}
      {/* ========================================================================= */}
      <section className="aff-section aff-niches-section">
        <div className="aff-container">
          <div className="aff-section-header">
            <span className="aff-section-tag">Mercado em Alta</span>
            <h2 className="aff-section-title">
              Feito sob medida para quem fala com o mercado de estética
            </h2>
            <p className="aff-section-subtitle">
              O Gestão Boa resolve as maiores dores diárias de quem trabalha com beleza. Por isso, a
              conversão é altíssima e o cancelamento é mínimo!
            </p>
          </div>

          <div className="aff-niches-grid">
            <div className="aff-niche-card">
              <div className="aff-niche-header">
                <div className="aff-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&crop=center"
                    alt="Salão de Beleza"
                    className="aff-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Salões de Beleza</h4>
                  <span className="aff-niche-badge">Cabeleireiros & Coloristas</span>
                </div>
              </div>
              <p className="aff-niche-pain">
                <strong>O que resolve:</strong> Elimina as brigas por comandas de papel, calcula
                automaticamente a divisão de comissões de auxiliares e cabeleireiros e organiza a
                agenda de toda a equipe.
              </p>
              <ul className="aff-niche-list">
                <li>Divisão automática de comissões</li>
                <li>Comandas integradas e fechamento de caixa</li>
                <li>Controle de produtos e estoque interno</li>
              </ul>
            </div>

            <div className="aff-niche-card">
              <div className="aff-niche-header">
                <div className="aff-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&crop=center"
                    alt="Barbearia"
                    className="aff-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Barbearias</h4>
                  <span className="aff-niche-badge">Barbeiros & Studios</span>
                </div>
              </div>
              <p className="aff-niche-pain">
                <strong>O que resolve:</strong> Acaba com os furos de horário com envio automático
                de lembretes pelo WhatsApp e permite que os clientes agendem online sozinhos 24 horas
                por dia.
              </p>
              <ul className="aff-niche-list">
                <li>Link de agendamento online no Instagram</li>
                <li>Lembretes automáticos anti-furo no WhatsApp</li>
                <li>Ranking de faturamento por barbeiro</li>
              </ul>
            </div>

            <div className="aff-niche-card">
              <div className="aff-niche-header">
                <div className="aff-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&h=300&fit=crop&crop=center"
                    alt="Clínica de Estética"
                    className="aff-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Clínicas de Estética</h4>
                  <span className="aff-niche-badge">Biomédicos & Esteticistas</span>
                </div>
              </div>
              <p className="aff-niche-pain">
                <strong>O que resolve:</strong> Organiza fichas de anamnese, histórico de sessões
                de procedimentos estéticos, pacotes contratados e parcelamentos sem complicação.
              </p>
              <ul className="aff-niche-list">
                <li>Ficha de anamnese e fotos antes/depois</li>
                <li>Gestão de pacotes e sessões de tratamentos</li>
                <li>Controle financeiro e recorrência</li>
              </ul>
            </div>

            <div className="aff-niche-card">
              <div className="aff-niche-header">
                <div className="aff-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop&crop=center"
                    alt="Esmalterias & Nails"
                    className="aff-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Esmalterias & Nails</h4>
                  <span className="aff-niche-badge">Nail Designers & Manicures</span>
                </div>
              </div>
              <p className="aff-niche-pain">
                <strong>O que resolve:</strong> Facilita a cobrança, impede que a cliente esqueça o
                horário da manutenção e calcula o lucro real por atendimento na palma da mão.
              </p>
              <ul className="aff-niche-list">
                <li>Lembretes de retorno e manutenção de unhas</li>
                <li>Controle de faturamento direto no celular</li>
                <li>Organização de horários sem atender telefone</li>
              </ul>
            </div>

            <div className="aff-niche-card">
              <div className="aff-niche-header">
                <div className="aff-niche-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&crop=center"
                    alt="Lash & Micropigmentação"
                    className="aff-niche-thumb"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4>Lash & Micropigmentação</h4>
                  <span className="aff-niche-badge">Lash Designers & Sobrancelhas</span>
                </div>
              </div>
              <p className="aff-niche-pain">
                <strong>O que resolve:</strong> Adeus à perda de tempo respondendo mensagens no meio
                do procedimento. O link inteligente na bio preenche a grade de atendimento sozinha.
              </p>
              <ul className="aff-niche-list">
                <li>Autonomia total para a cliente agendar</li>
                <li>Confirmações instantâneas</li>
                <li>Histórico detalhado de mapeamentos e estilos</li>
              </ul>
            </div>

            <div className="aff-niche-card aff-niche-cta-card">
              <div className="aff-niche-cta-content">
                <Sparkles size={36} className="text-amber-400" />
                <h4>Fala com algum desses públicos?</h4>
                <p>
                  Seus seguidores já estão precisando de um sistema como esse hoje. Indique o Gestão
                  Boa e garanta comissões recorrentes.
                </p>
                <button type="button" className="aff-btn-primary" onClick={scrollToForm}>
                  Pegar meu cupom agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 6 VALUE PILLARS (Inspired by Hotmart's Benefits Grid)                 */}
      {/* ========================================================================= */}
      <section className="aff-section aff-benefits-section">
        <div className="aff-container">
          <div className="aff-section-header">
            <span className="aff-section-tag">Vantagens Exclusivas</span>
            <h2 className="aff-section-title">
              Por que ser um parceiro afiliado do Gestão Boa?
            </h2>
            <p className="aff-section-subtitle">
              Compare as vantagens com outros programas e veja por que a recorrência no mercado de
              beleza é o melhor modelo de monetização.
            </p>
          </div>

          <div className="aff-benefits-grid">
            <div className="aff-benefit-card">
              <div className="aff-benefit-icon-wrapper">
                <DollarSign size={24} />
              </div>
              <h3>1. Renda Recorrente Mensal</h3>
              <p>
                Você não ganha apenas no primeiro mês. Enquanto a barbearia ou salão continuar usando
                o Gestão Boa, você recebe 10% de todas as mensalidades pagas, mês após mês.
              </p>
            </div>

            <div className="aff-benefit-card">
              <div className="aff-benefit-icon-wrapper">
                <Zap size={24} />
              </div>
              <h3>2. Pagamentos Rápidos no PIX</h3>
              <p>
                Sem intermediários complicados, taxas abusivas de saque ou prazos de 60 dias. Seus
                repasses de comissão caem com segurança e pontualidade na chave PIX cadastrada.
              </p>
            </div>

            <div className="aff-benefit-card">
              <div className="aff-benefit-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <h3>3. Zero Suporte ou Treinamento</h3>
              <p>
                Você não precisa ensinar ninguém a usar o sistema ou responder chamados técnicos.
                Nossa equipe de especialistas assume 100% do onboarding e suporte ao cliente.
              </p>
            </div>

            <div className="aff-benefit-card">
              <div className="aff-benefit-icon-wrapper">
                <Smartphone size={24} />
              </div>
              <h3>4. Facilidade para Quem Assina</h3>
              <p>
                O Gestão Boa roda liso no celular, no tablet ou no computador. É super simples de
                aprender, mesmo para quem não tem familiaridade com tecnologia.
              </p>
            </div>

            <div className="aff-benefit-card">
              <div className="aff-benefit-icon-wrapper">
                <Share2 size={24} />
              </div>
              <h3>5. Materiais Prontos de Apoio</h3>
              <p>
                Fornecemos sugestões de roteiros para Stories, vídeos de demonstração rápida, copys
                para WhatsApp e argumentos persuasivos para você só copiar e divulgar.
              </p>
            </div>

            <div className="aff-benefit-card">
              <div className="aff-benefit-icon-wrapper">
                <Award size={24} />
              </div>
              <h3>6. Altíssima Taxa de Retenção</h3>
              <p>
                Diferente de cursos ou e-books, um sistema de gestão vira a espinha dorsal do salão.
                A taxa de cancelamento é baixíssima, garantindo estabilidade aos seus ganhos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE RECURRING REVENUE SIMULATOR                                */}
      {/* ========================================================================= */}
      <section className="aff-section aff-simulator-section" ref={simulatorRef}>
        <div className="aff-container">
          <div className="aff-simulator-card">
            <div className="aff-simulator-header">
              <div className="aff-pill-badge">
                <TrendingUp size={16} />
                <span>Simulador de Ganhos no PIX</span>
              </div>
              <h2>Quanto você pode faturar como parceiro?</h2>
              <p>
                Arraste a barra abaixo e veja a projeção da sua renda mensal recorrente com base no
                número de salões e clínicas que você indicar.
              </p>
            </div>

            <div className="aff-simulator-body">
              <div className="aff-slider-container">
                <div className="aff-slider-labels">
                  <span className="aff-slider-title">Quantidade de estabelecimentos indicados:</span>
                  <span className="aff-slider-current">{referredClients} salões / clínicas</span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={referredClients}
                  onChange={(e) => setReferredClients(Number(e.target.value))}
                  className="aff-range-input"
                />

                <div className="aff-slider-ticks">
                  <span>5 salões</span>
                  <span>50 salões</span>
                  <span>100 salões</span>
                  <span>150 salões</span>
                </div>
              </div>

              <div className="aff-simulator-results">
                <div className="aff-result-box aff-result-monthly">
                  <span className="aff-result-caption">Sua comissão recorrente todo mês</span>
                  <div className="aff-result-val">
                    R$ {monthlyEarnings.toLocaleString('pt-BR')}
                    <span className="aff-result-period">/mês</span>
                  </div>
                  <span className="aff-result-pill">⚡ Depositado no PIX</span>
                </div>

                <div className="aff-result-box aff-result-annual">
                  <span className="aff-result-caption">Ganho estimado em 1 ano</span>
                  <div className="aff-result-val">
                    R$ {annualEarnings.toLocaleString('pt-BR')}
                    <span className="aff-result-period">/ano</span>
                  </div>
                  <span className="aff-result-subtext">Sem precisar atender nenhum cliente</span>
                </div>
              </div>

              <div className="aff-simulator-footer">
                <p>
                  💡 <strong>Exemplo real:</strong> Indicando apenas{' '}
                  <strong>{referredClients} profissionais</strong> (ou turmas de cursos de manicure,
                  barbearia ou lash), você constrói uma renda passiva mensal garantida sem precisar
                  criar produto ou dar suporte!
                </p>
                <button type="button" className="aff-btn-primary" onClick={scrollToForm}>
                  Quero começar a lucrar agora
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SOCIAL PROOF / TESTIMONIALS (Hotmart 5 Stars Style)                    */}
      {/* ========================================================================= */}
      <section className="aff-section aff-testimonials-section">
        <div className="aff-container">
          <div className="aff-section-header">
            <span className="aff-section-tag">Depoimentos Reais da Plataforma</span>
            <h2 className="aff-section-title">Clientes reais que amam e não cancelam</h2>
            <p className="aff-section-subtitle">
              Veja a satisfação de quem usa o Gestão Boa no dia a dia. É por essa retenção que suas comissões continuam caindo todo mês no seu PIX.
            </p>
          </div>

          <div className="aff-testimonials-grid">
            {REAL_TESTIMONIALS.map((t, i) => (
              <div key={i} className="aff-testimonial-card">
                <div className="aff-testimonial-card-top">
                  <div className="aff-stars-row">
                    {'★★★★★'.split('').map((star, sIdx) => (
                      <span key={sIdx} className="aff-star">
                        {star}
                      </span>
                    ))}
                  </div>
                  <span className="aff-testimonial-tag">{t.tag}</span>
                </div>

                <h4 className="aff-testimonial-title">"{t.title}"</h4>
                <p className="aff-testimonial-quote">{t.quote}</p>

                <div className="aff-testimonial-author">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="aff-author-avatar-img"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://placehold.co/64x64/007BFF/FFFFFF?text=${t.name.charAt(0)}`;
                    }}
                  />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. REGISTRATION FORM / COUPON GENERATOR (High Conversion)                 */}
      {/* ========================================================================= */}
      <section className="aff-section aff-form-section" ref={formRef}>
        <div className="aff-container">
          <div className="aff-form-wrapper">
            {success ? (
              <div className="aff-success-box">
                <div className="aff-success-badge">🎉</div>
                <h2>Parabéns! Cadastro Realizado com Sucesso</h2>
                <p className="aff-success-desc">
                  Seu código de parceiro exclusivo foi gerado e já está ativado no sistema Gestão Boa
                  para rastrear todas as suas indicações.
                </p>

                {/* Cupom Box */}
                <div className="aff-copy-card">
                  <span className="aff-copy-tag">Seu Cupom de Desconto Exclusivo</span>
                  <div className="aff-copy-value">{formData.discount_code}</div>
                  <button
                    type="button"
                    className="aff-btn-copy"
                    onClick={() => copyToClipboard(formData.discount_code, 'code')}
                  >
                    {copiedCode ? (
                      <>
                        <Check size={16} /> Cupom Copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copiar Cupom
                      </>
                    )}
                  </button>
                </div>

                {/* Link Box */}
                <div className="aff-copy-card aff-link-card">
                  <span className="aff-copy-tag">Seu Link Direto de Indicação</span>
                  <div className="aff-link-display">
                    <input type="text" readOnly value={shareUrl} />
                    <button
                      type="button"
                      className="aff-btn-copy"
                      onClick={() => copyToClipboard(shareUrl, 'link')}
                    >
                      {copiedLink ? (
                        <>
                          <Check size={16} /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Share Button */}
                <a
                  href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aff-btn-whatsapp"
                >
                  <span>💬</span> Compartilhar Mensagem Pronta no WhatsApp
                </a>

                <button
                  type="button"
                  className="aff-btn-reset"
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: '',
                      surname: '',
                      phone: '',
                      pix_key: '',
                      discount_code: '',
                    });
                    setAcceptedTerms(false);
                  }}
                >
                  Cadastrar outro parceiro ou influenciador
                </button>
              </div>
            ) : (
              <div className="aff-form-card">
                <div className="aff-form-header">
                  <div className="aff-pill-badge">
                    <Ticket size={16} />
                    <span>Cadastre-se Gratuitamente</span>
                  </div>
                  <h2>Gere seu código de parceiro exclusivo</h2>
                  <p>
                    Preencha os dados abaixo para criar seu cupom e configurar sua chave PIX para os
                    repasses mensais automáticos.
                  </p>
                </div>

                <form className="aff-form" onSubmit={handleSubmit}>
                  <div className="aff-form-grid">
                    <div className="aff-input-group">
                      <label htmlFor="name">Nome *</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Ex: Bianca"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="aff-input-group">
                      <label htmlFor="surname">Sobrenome *</label>
                      <input
                        id="surname"
                        type="text"
                        name="surname"
                        placeholder="Ex: Ramos"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="aff-input-group">
                    <label htmlFor="phone">WhatsApp / Celular com DDD *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>

                  <div className="aff-input-group">
                    <label htmlFor="pix_key">Chave PIX para Recebimento das Comissões *</label>
                    <input
                      id="pix_key"
                      type="text"
                      name="pix_key"
                      placeholder="CPF, CNPJ, Telefone, E-mail ou Chave Aleatória"
                      value={formData.pix_key}
                      onChange={handleChange}
                      required
                    />
                    <span className="aff-input-help">
                      Seus 10% de comissão recorrente serão transferidos diretamente para esta chave.
                    </span>
                  </div>

                  <div className="aff-input-group">
                    <div className="aff-label-row">
                      <label htmlFor="discount_code">Código de Desconto Desejado (Cupom) *</label>
                      <button
                        type="button"
                        className="aff-btn-auto-code"
                        onClick={handleAutoGenerateCode}
                      >
                        ⚡ Gerar sugestão
                      </button>
                    </div>
                    <input
                      id="discount_code"
                      type="text"
                      name="discount_code"
                      placeholder="Ex: BIANCA10"
                      value={formData.discount_code}
                      onChange={handleChange}
                      required
                      className="aff-input-code"
                    />
                    <span className="aff-input-help">
                      Dica: escolha uma palavra curta e fácil de lembrar para seus seguidores (ex:{' '}
                      {formData.name ? `${formData.name.toUpperCase()}10` : 'SEUNOME10'}).
                    </span>
                  </div>

                  <div className="aff-checkbox-row">
                    <input
                      type="checkbox"
                      id="accept-terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      required
                    />
                    <label htmlFor="accept-terms">
                      Li e concordo com o{' '}
                      <a
                        href="/regulamento-indicacao"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Regulamento e Termos do Programa de Indicação
                      </a>{' '}
                      do Gestão Boa.
                    </label>
                  </div>

                  {error && <div className="aff-error-banner">{error}</div>}

                  <button type="submit" className="aff-btn-submit" disabled={loading}>
                    {loading ? (
                      'Gerando seu cupom exclusivo...'
                    ) : (
                      <>
                        Criar meu Cupom e Começar a Ganhar
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAQ ACCORDION (Inspired by Hotmart)                                   */}
      {/* ========================================================================= */}
      <section className="aff-section aff-faq-section">
        <div className="aff-container">
          <div className="aff-section-header">
            <span className="aff-section-tag">Tire Suas Dúvidas</span>
            <h2 className="aff-section-title">Perguntas Frequentes sobre o Programa</h2>
            <p className="aff-section-subtitle">
              Tudo o que você precisa saber para começar a faturar com tranquilidade e transparência.
            </p>
          </div>

          <div className="aff-faq-container">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`aff-faq-item ${isOpen ? 'aff-faq-open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="aff-faq-question">
                    <span className="aff-faq-q-text">{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`aff-faq-chevron ${isOpen ? 'aff-chevron-rotated' : ''}`}
                    />
                  </div>
                  {isOpen && <div className="aff-faq-answer">{item.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CTA BANNER (Hotmart Style)                                      */}
      {/* ========================================================================= */}
      <section className="aff-final-cta">
        <div className="aff-container">
          <div className="aff-cta-content">
            <h2>Pronto para monetizar sua audiência no mercado da beleza?</h2>
            <p>
              Não deixe dinheiro na mesa. Cadastre-se agora mesmo, gere seu cupom exclusivo e comece
              a receber comissões recorrentes no PIX todo mês.
            </p>
            <button type="button" className="aff-btn-cta-large" onClick={scrollToForm}>
              🚀 Quero meu Cupom de Parceiro Agora
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Influenciador;
