import React from 'react';
import { useTracking } from '../utils/trackingHooks';
import { trackEvent } from '../utils/behaviorTracking';

// Exemplo de como integrar o tracking na página Home
export const HomeWithTracking: React.FC = () => {
  const { trackEvent: track } = useTracking();

  React.useEffect(() => {
    // Rastrear visualização da página inicial
    track('home_page_view', {
      timestamp: Date.now(),
      source: 'direct'
    });
  }, [track]);

  return (
    <div>
      {/* Hero Section com tracking */}
      <section 
        data-track="section" 
        data-section="hero"
        onLoad={() => track('hero_section_loaded')}
      >
        <h1>Gestão Boa - Sistema de Gestão</h1>
        
        <button
          onClick={() => {
            track('cta_demo_clicked', {
              location: 'hero',
              priority: 'primary'
            });
            // Redirecionar para demo
          }}
          data-track="cta"
          data-cta-type="demo"
        >
          Solicitar Demo
        </button>

        <button
          onClick={() => {
            track('cta_plans_clicked', {
              location: 'hero',
              priority: 'secondary'
            });
            // Redirecionar para planos
          }}
          data-track="cta"
          data-cta-type="plans"
        >
          Ver Planos
        </button>
      </section>

      {/* Seção de benefícios com tracking de scroll */}
      <section 
        data-track="section" 
        data-section="benefits"
        style={{ marginTop: '100vh' }} // Para testar scroll tracking
      >
        <h2>Benefícios</h2>
        
        {/* Cards de benefícios com tracking individual */}
        <div className="benefits-grid">
          {['agenda', 'financeiro', 'clientes', 'relatorios'].map((benefit) => (
            <div
              key={benefit}
              className="benefit-card"
              onClick={() => track('benefit_card_clicked', { benefit })}
              data-track="benefit-card"
              data-benefit={benefit}
            >
              <h3>{benefit}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário de contato com tracking completo */}
      <section data-track="section" data-section="contact">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            track('contact_form_submitted', {
              timestamp: Date.now()
            });
          }}
          onFocus={() => track('contact_form_focused')}
        >
          <input
            type="text"
            placeholder="Nome"
            onFocus={() => track('form_field_focused', { field: 'name' })}
            onChange={() => track('form_field_changed', { field: 'name' })}
          />
          
          <input
            type="email"
            placeholder="Email"
            onFocus={() => track('form_field_focused', { field: 'email' })}
            onChange={() => track('form_field_changed', { field: 'email' })}
          />
          
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
};

// Exemplo de configuração para diferentes páginas
export const trackingConfig = {
  home: {
    sections: ['hero', 'benefits', 'testimonials', 'contact'],
    ctas: ['demo', 'plans', 'contact'],
    conversions: ['demo_request', 'contact_form', 'newsletter_signup']
  },
  pricing: {
    sections: ['plans', 'comparison', 'faq'],
    ctas: ['select_plan', 'contact_sales'],
    conversions: ['plan_selection', 'upgrade_request']
  },
  solution: {
    sections: ['features', 'benefits', 'demo'],
    ctas: ['try_now', 'learn_more'],
    conversions: ['feature_interaction', 'demo_request']
  }
};

// Função para configurar tracking automaticamente baseado na página
export const setupPageTracking = (pageName: keyof typeof trackingConfig) => {
  const config = trackingConfig[pageName];
  
  // Rastrear todas as seções configuradas
  config.sections.forEach(sectionName => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('section_viewed', {
            page: pageName,
            section: sectionName,
            timestamp: Date.now(),
            visibilityRatio: entry.intersectionRatio
          });
        }
      });
    }, { threshold: 0.5 });

    // Observar elementos com data-section
    const elements = document.querySelectorAll(`[data-section="${sectionName}"]`);
    elements.forEach(element => observer.observe(element));
  });

  // Configurar tracking de CTAs
  config.ctas.forEach(ctaType => {
    const elements = document.querySelectorAll(`[data-cta-type="${ctaType}"]`);
    elements.forEach(element => {
      element.addEventListener('click', () => {
        trackEvent('cta_clicked', {
          page: pageName,
          ctaType,
          timestamp: Date.now()
        });
      });
    });
  });
};