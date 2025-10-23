// Sistema de rastreamento comportamental personalizado
interface UserBehaviorEvent {
  type: string;
  element?: string;
  timestamp: number;
  page: string;
  data?: Record<string, unknown>;
}

class BehaviorTracker {
  private events: UserBehaviorEvent[] = [];
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initializeTracking() {
    // Rastreamento de cliques
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      this.trackEvent({
        type: 'click',
        element: this.getElementSelector(target),
        timestamp: Date.now(),
        page: window.location.pathname,
        data: {
          x: event.clientX,
          y: event.clientY,
          text: target.textContent?.slice(0, 100)
        }
      });
    });

    // Rastreamento de scroll
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackEvent({
          type: 'scroll',
          timestamp: Date.now(),
          page: window.location.pathname,
          data: {
            scrollY: window.scrollY,
            scrollPercent: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
          }
        });
      }, 250);
    });

    // Rastreamento de tempo na página
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      this.trackEvent({
        type: 'page_exit',
        timestamp: Date.now(),
        page: window.location.pathname,
        data: {
          timeOnPage: Date.now() - startTime
        }
      });
      this.sendEvents();
    });

    // Rastreamento de formulários
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent({
        type: 'form_submit',
        element: this.getElementSelector(form),
        timestamp: Date.now(),
        page: window.location.pathname,
        data: {
          formId: form.id,
          formAction: form.action
        }
      });
    });

    // Rastreamento de interação com elementos específicos
    this.trackSpecificElements();

    // Enviar eventos periodicamente
    setInterval(() => {
      this.sendEvents();
    }, 30000); // A cada 30 segundos
  }

  private trackSpecificElements() {
    // Rastrear botões de CTA
    const ctaButtons = document.querySelectorAll('[data-track="cta"]');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.trackEvent({
          type: 'cta_click',
          element: this.getElementSelector(button as HTMLElement),
          timestamp: Date.now(),
          page: window.location.pathname,
          data: {
            ctaText: button.textContent,
            ctaType: button.getAttribute('data-cta-type')
          }
        });
      });
    });

    // Rastrear visualização de seções importantes
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.trackEvent({
            type: 'section_view',
            element: this.getElementSelector(entry.target as HTMLElement),
            timestamp: Date.now(),
            page: window.location.pathname,
            data: {
              sectionId: entry.target.id,
              visibilityRatio: entry.intersectionRatio
            }
          });
        }
      });
    }, { threshold: 0.5 });

    // Observar seções importantes
    const sections = document.querySelectorAll('[data-track="section"]');
    sections.forEach(section => observer.observe(section));
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  private trackEvent(event: UserBehaviorEvent) {
    this.events.push(event);
    
    // Limitar o número de eventos em memória
    if (this.events.length > 100) {
      this.sendEvents();
    }
  }

  private async sendEvents() {
    if (this.events.length === 0) return;

    try {
      const payload = {
        sessionId: this.sessionId,
        userId: this.userId,
        events: [...this.events],
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        url: window.location.href
      };

      // Enviar para seu próprio endpoint de analytics
      await fetch('/api/analytics/behavior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Limpar eventos após envio bem-sucedido
      this.events = [];
    } catch (error) {
      console.error('Erro ao enviar eventos de comportamento:', error);
    }
  }

  // Métodos públicos para rastreamento customizado
  public trackCustomEvent(type: string, data?: Record<string, unknown>) {
    this.trackEvent({
      type: `custom_${type}`,
      timestamp: Date.now(),
      page: window.location.pathname,
      data
    });
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }

  public trackConversion(type: string, value?: number) {
    this.trackEvent({
      type: 'conversion',
      timestamp: Date.now(),
      page: window.location.pathname,
      data: {
        conversionType: type,
        value: value
      }
    });
  }
}

// Exportar instância singleton
export const behaviorTracker = new BehaviorTracker();

// Funções utilitárias para usar nos componentes
export const trackEvent = (type: string, data?: Record<string, unknown>) => {
  behaviorTracker.trackCustomEvent(type, data);
};

export const trackConversion = (type: string, value?: number) => {
  behaviorTracker.trackConversion(type, value);
};

export const setUserId = (userId: string) => {
  behaviorTracker.setUserId(userId);
};