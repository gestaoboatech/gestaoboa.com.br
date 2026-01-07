import { useState, useEffect, useRef } from 'react'
import { CheckIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid'
import SalesStyle from './sales'
import GlassStyle from './glass'
import AnimationsStyle from './animations'

const features = [
  {
    name: 'Gestão Financeira Completa',
    description: 'Controle total do fluxo de caixa, contas a pagar e receber, relatórios financeiros detalhados.',
    icon: '💰'
  },
  {
    name: 'Sistema de Vendas Integrado',
    description: 'PDV completo, controle de estoque, emissão de notas fiscais automática.',
    icon: '🛒'
  },
  {
    name: 'Gestão de Clientes',
    description: 'CRM avançado, histórico completo, segmentação inteligente de clientes.',
    icon: '👥'
  },
  {
    name: 'Relatórios Inteligentes',
    description: 'Dashboard em tempo real, relatórios personalizáveis, análises preditivas.',
    icon: '📊'
  },
  {
    name: 'Multi-lojas',
    description: 'Gerencie várias filiais em uma única plataforma com sincronização automática.',
    icon: '🏪'
  },
  {
    name: 'Suporte 24/7',
    description: 'Equipe especializada disponível para te ajudar quando precisar.',
    icon: '🚀'
  }
]

const benefits = [
  'Reduza até 80% do tempo gasto em tarefas administrativas',
  'Aumente suas vendas em até 45% com relatórios inteligentes',
  'Elimine erros humanos com automação completa',
  'Acesse seu negócio de qualquer lugar, a qualquer hora',
  'Integração completa com principais bancos e operadoras',
  'Backup automático e segurança de dados garantida'
]

const testimonials = [
  {
    name: 'Carlos Silva',
    business: 'Loja de Roupas - São Paulo',
    text: 'Depois do GestãoBoa, meu faturamento aumentou 60% em 6 meses. O sistema é incrível!',
    rating: 5
  },
  {
    name: 'Maria Santos',
    business: 'Farmácia - Rio de Janeiro',
    text: 'Economizo 4 horas por dia em tarefas administrativas. Agora posso focar no que realmente importa.',
    rating: 5
  },
  {
    name: 'João Costa',
    business: 'Supermercado - Belo Horizonte',
    text: 'Sistema completo e fácil de usar. Minha equipe aprendeu em poucos dias.',
    rating: 5
  }
]

export default function Sales() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  // Ref para os elementos que devem aparecer com scroll
  const revealRefs = useRef<HTMLElement[]>([])
  
  // Adicionar elementos ao array de refs
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }
    // Observer para animações no scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
    
    // Criar uma cópia das refs no momento da execução do efeito
    const currentRefs = revealRefs.current;
    
    currentRefs.forEach(ref => {
      observer.observe(ref)
    })
    
    return () => {
      currentRefs.forEach(ref => observer.unobserve(ref))
    }
  }, [])
  return (
    <>
      <SalesStyle />
      <GlassStyle />
      <AnimationsStyle />
      <div className="min-h-screen bg-white">
      {/* Hero Section com Vídeo */}
      <section className="relative overflow-hidden bg-gradient-hero py-28">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
        {/* Partículas decorativas */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-500/20 floating-element"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-purple-500/15 floating-element"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-yellow-500/10 floating-element"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-in-up">
              Transforme Seu Negócio em uma
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-float">
                Máquina de Vendas
              </span>
            </h1>            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto animate-slide-in-up delay-200">
              O sistema de gestão mais completo do Brasil. Usado por mais de 50.000 empresários que já transformaram seus negócios.
            </p>
            
            {/* Vídeo de Vendas */}
            <div className="max-w-4xl mx-auto mb-12 animate-slide-in-up delay-300">
              <div className="video-container">
                {!isVideoPlaying ? (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="video-play-button"
                      aria-label="Reproduzir vídeo de demonstração"
                      title="Clique para assistir o vídeo de demonstração"
                    >
                      <PlayIcon className="w-10 h-10 text-white ml-1" />
                    </button>
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-sm md:text-base opacity-80">Veja como o GestãoBoa pode revolucionar seu negócio</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="w-full aspect-video"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="GestãoBoa - Transforme seu negócio"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-up delay-400">
              <button className="btn-primary hover-shine animate-pulse-glow">
                QUERO TRANSFORMAR MEU NEGÓCIO AGORA
              </button>
              <button className="btn-secondary">
                Ver Demonstração Gratuita
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Características Principais */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <div className="text-center mb-20 fade-in-up" ref={addToRefs}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tudo que Seu Negócio Precisa em Um Só Lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistema completo que integra todas as áreas do seu negócio para máxima eficiência e crescimento
            </p>
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card fade-in-up delay-${index * 100 <= 400 ? index * 100 : 400}`}
                ref={addToRefs}
              >
                <div className="text-4xl mb-4 animate-float">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">          <div className="text-center mb-16 fade-in-up" ref={addToRefs}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Resultados Garantidos para Seu Negócio
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Mais de 50.000 empresários já comprovaram estes resultados
            </p>
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-4 glass-effect p-6 rounded-xl fade-in-up delay-${index * 100 <= 400 ? index * 100 : 400}`}
                ref={addToRefs}
              >
                <CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <div className="text-center mb-16 fade-in-up" ref={addToRefs}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investimento que se Paga em 30 Dias
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para o tamanho do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">            {/* Plano Básico */}
            <div className="pricing-card fade-in-up" ref={addToRefs}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">R$ 97</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>Até 1.000 produtos</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>1 usuário</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>Relatórios básicos</span>
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                Começar Agora
              </button>
            </div>            {/* Plano Profissional - Destaque */}
            <div className="pricing-card featured fade-in-up delay-100" ref={addToRefs}>
              <div className="popular-badge">
                MAIS POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Profissional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R$ 197</span>
                <span className="text-blue-200">/mês</span>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>Produtos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>5 usuários</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>Multi-lojas</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 hover-shine">
                QUERO ESTE PLANO
              </button>
            </div>            {/* Plano Enterprise */}
            <div className="pricing-card fade-in-up delay-200" ref={addToRefs}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">R$ 397</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>Tudo do Profissional</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>Usuários ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>API personalizada</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                Falar com Consultor
              </button>
            </div>
          </div>

          <div className="text-center mt-16 fade-in-up" ref={addToRefs}>
            <p className="text-lg text-gray-600 mb-6">
              ✅ 7 dias de teste grátis • ✅ Sem taxa de setup • ✅ Cancele quando quiser
            </p>
            <div className="bg-red-100 border border-red-300 rounded-xl p-8 max-w-2xl mx-auto shadow-warm">
              <p className="text-red-800 font-semibold text-lg">
                🔥 OFERTA ESPECIAL: 50% OFF no primeiro mês para os próximos 100 clientes!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <div className="text-center mb-16 fade-in-up" ref={addToRefs}>
            <h2 className="text-4xl font-bold text-white mb-4">
              O Que Nossos Clientes Estão Dizendo
            </h2>
            <p className="text-xl text-gray-300">
              Histórias reais de transformação e crescimento
            </p>
          </div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card fade-in-up delay-${index * 100 <= 400 ? index * 100 : 400}`}
                ref={addToRefs}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "{testimonial.text}"
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-author-avatar"></div>
                  <div className="testimonial-author-info">
                    <p className="testimonial-author-name">{testimonial.name}</p>
                    <p className="testimonial-author-business">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-cta relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        
        {/* Formas decorativas */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-40 bg-gradient-to-l from-red-500/20 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 fade-in-up" ref={addToRefs}>
            Não Perca Mais Tempo!
          </h2>
          <p className="text-xl text-white/90 mb-12 fade-in-up delay-100" ref={addToRefs}>
            Cada dia que você adia é dinheiro que está deixando na mesa. Mais de 500 empresários se cadastram por semana.
          </p>
          
          <div className="glass-effect rounded-2xl p-10 mb-12 fade-in-up delay-200" ref={addToRefs}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stats-item">
                <div className="stats-number">50.000</div>
                <div className="stats-label">Empresas ativas</div>
              </div>
              <div className="stats-item">
                <div className="stats-number">99.9</div>
                <div className="stats-label">Uptime garantido</div>
              </div>
              <div className="stats-item">
                <div className="stats-number">24/7</div>
                <div className="stats-label">Suporte disponível</div>
              </div>
            </div>
          </div>

          <button className="btn-primary hover-shine animate-pulse-glow mb-8 fade-in-up delay-300" ref={addToRefs}>
            COMEÇAR MINHA TRANSFORMAÇÃO AGORA
          </button>
          
          <p className="text-white/80 text-sm fade-in-up delay-400" ref={addToRefs}>
            🔒 Seus dados estão seguros • 💳 Pagamento 100% seguro • ⚡ Ativação imediata
          </p>
        </div>
      </section>    </div>
    </>
  )
}
