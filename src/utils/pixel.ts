// Utilitário para o Facebook Pixel com suporte a Advanced Matching
declare global {
  interface Window {
    fbq?: any;
  }
}

export const META_PIXEL_ID = "2092801744674334";

// Definindo um tipo para os parâmetros do Facebook Pixel
type PixelEventParams = Record<string, string | number | boolean | null | undefined>;

export interface AdvancedMatchingData {
  em?: string; // Email (lowercase, trimmed)
  ph?: string; // Phone (numbers only with country code, e.g. 5511999999999)
  fn?: string; // First name (lowercase)
  ln?: string; // Last name (lowercase)
  ct?: string; // City (lowercase)
  st?: string; // State (2-letter lowercase)
  zp?: string; // Zip/Postal code
  country?: string; // 2-letter country code (e.g. 'br')
  external_id?: string; // Unique external ID (user ID)
}

/**
 * Função utilitária para normalizar e hashear strings com SHA-256 no browser
 */
export async function sha256(value: string): Promise<string> {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(trimmed);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (err) {
    console.warn("SHA-256 hash error:", err);
    return "";
  }
}

/**
 * Facebook Pixel Event Tracking com suporte a Advanced Matching
 */
export const FB_PIXEL = {
  /**
   * Configura dados do usuário para Advanced Matching no Meta Pixel.
   * O Meta Pixel aceita dados normalizados (e-mail minúsculo, telefone com DDI)
   * e faz o hash internamente, mas aqui também preparamos os dados higienizados.
   */
  setUser: (userData: AdvancedMatchingData) => {
    if (typeof window !== "undefined" && window.fbq) {
      const cleanData: Record<string, string> = {};
      if (userData.em) cleanData.em = userData.em.trim().toLowerCase();
      if (userData.ph) {
        let phone = userData.ph.replace(/\D/g, "");
        if (phone.length === 10 || phone.length === 11) {
          phone = `55${phone}`;
        }
        cleanData.ph = phone;
      }
      if (userData.fn) cleanData.fn = userData.fn.trim().toLowerCase();
      if (userData.ln) cleanData.ln = userData.ln.trim().toLowerCase();
      if (userData.ct) cleanData.ct = userData.ct.trim().toLowerCase();
      if (userData.st) cleanData.st = userData.st.trim().toLowerCase();
      if (userData.zp) cleanData.zp = userData.zp.replace(/\D/g, "");
      if (userData.country) cleanData.country = userData.country.trim().toLowerCase();
      if (userData.external_id) cleanData.external_id = String(userData.external_id);

      window.fbq("init", META_PIXEL_ID, cleanData);
    }
  },

  /**
   * Rastreia um evento de visualização de página padrão
   */
  pageView: () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  },

  /**
   * Rastreia um evento de lead quando alguém envia um formulário de contato
   * @param {object} data Dados opcionais para enviar com o evento
   */
  trackLead: (data?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", data || {});
    }
  },

  /**
   * Rastreia um evento de início de teste/demonstração
   * @param {object} data Dados opcionais para enviar com o evento
   */
  trackStartTrial: (data?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "StartTrial", data || {});
    }
  },

  /**
   * Rastreia quando um usuário se registra
   * @param {object} data Dados opcionais para enviar com o evento
   */
  trackCompleteRegistration: (data?: PixelEventParams) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration", data || {});
    }
  },

  /**
   * Rastreia um evento personalizado
   * @param {string} name Nome do evento
   * @param {object} data Dados para enviar com o evento
   */
  trackCustomEvent: (name: string, data?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", name, data || {});
    }
  },

  /**
   * Rastreia um evento de visualização de conteúdo
   * @param {object} data Dados para enviar com o evento
   */
  trackViewContent: (data?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", data || {});
    }
  },

  /**
   * Rastreia um evento de contato iniciado
   * @param {object} data Dados para enviar com o evento
   */
  trackContact: (data?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Contact", data || {});
    }
  },

  /**
   * Rastreia um evento de agendamento
   * @param {object} data Dados para enviar com o evento
   */
  trackSchedule: (data?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Schedule", data || {});
    }
  },

  /**
   * Rastreia quando um usuário inicia um checkout ou processo de conversão
   * @param {object} data Dados para enviar com o evento
   */
  trackInitiateCheckout: (data?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", data || {});
    }
  },
};
