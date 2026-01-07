// Utilitário para o Facebook Pixel
declare global {
  interface Window {
    fbq?: any;
  }
}

// Definindo um tipo para os parâmetros do Facebook Pixel
type PixelEventParams = Record<string, string | number | boolean>;

/**
 * Facebook Pixel Event Tracking
 */
export const FB_PIXEL = {
  /**
   * Rastreia um evento de visualização de página padrão
   */
  pageView: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  },

  /**
   * Rastreia um evento de lead quando alguém envia um formulário de contato
   * @param {object} data Dados opcionais para enviar com o evento
   */
  trackLead: (data?: PixelEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', data || {});
    }
  },

  /**
   * Rastreia um evento de início de teste/demonstração
   * @param {object} data Dados opcionais para enviar com o evento
   */
  trackStartTrial: (data?: PixelEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'StartTrial', data || {});
    }
  },

  /**
   * Rastreia quando um usuário se registra
   * @param {object} data Dados opcionais para enviar com o evento
   */
  trackCompleteRegistration: (data?: PixelEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', data || {});
    }
  },

  /**
   * Rastreia um evento personalizado
   * @param {string} name Nome do evento
   * @param {object} data Dados para enviar com o evento
   */
  trackCustomEvent: (name: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', name, data || {});
    }
  },

  /**
   * Rastreia um evento de visualização de conteúdo
   * @param {object} data Dados para enviar com o evento
   */
  trackViewContent: (data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', data || {});
    }
  },

  /**
   * Rastreia um evento de contato iniciado
   * @param {object} data Dados para enviar com o evento
   */
  trackContact: (data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', data || {});
    }
  },

  /**
   * Rastreia um evento de agendamento
   * @param {object} data Dados para enviar com o evento
   */
  trackSchedule: (data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule', data || {});
    }
  },

  /**
   * Rastreia quando um usuário inicia um checkout ou processo de conversão
   * @param {object} data Dados para enviar com o evento
   */
  trackInitiateCheckout: (data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', data || {});
    }
  }
};
