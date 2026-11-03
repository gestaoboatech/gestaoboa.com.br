import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  loginUser,
  loginUserWithPhone,
  registerUser,
  createCompany,
  createService,
  createEmployee,
  createOwnerProfessional,
  createEnterpriseShift,
  EnterpriseBranch,
  getEnterpriseBranches,
  DEFAULT_ENTERPRISE_BRANCHES,
} from "../../services/userApi";
import { FB_PIXEL } from "../../utils/pixel";
import "./styles.css";

export interface PresetServiceItem {
  id: string;
  name: string;
  price: string;
  duration: number;
  selected: boolean;
}

export interface ProfessionalItem {
  id: string;
  name: string;
  phone: string;
  password?: string;
  commission: number;
}

export interface DaySchedule {
  dayId: number;
  name: string;
  shortName: string;
  isOpen: boolean;
  startTime: string;
  endTime: string;
}

export const DEFAULT_SCHEDULE: DaySchedule[] = [
  { dayId: 2, name: "Segunda-feira", shortName: "Seg", isOpen: true, startTime: "09:00", endTime: "20:00" },
  { dayId: 3, name: "Terça-feira", shortName: "Ter", isOpen: true, startTime: "09:00", endTime: "20:00" },
  { dayId: 4, name: "Quarta-feira", shortName: "Qua", isOpen: true, startTime: "09:00", endTime: "20:00" },
  { dayId: 5, name: "Quinta-feira", shortName: "Qui", isOpen: true, startTime: "09:00", endTime: "20:00" },
  { dayId: 6, name: "Sexta-feira", shortName: "Sex", isOpen: true, startTime: "09:00", endTime: "20:00" },
  { dayId: 7, name: "Sábado", shortName: "Sáb", isOpen: true, startTime: "09:00", endTime: "20:00" },
  { dayId: 1, name: "Domingo", shortName: "Dom", isOpen: false, startTime: "09:00", endTime: "14:00" },
];

export const NICHE_PRESETS: Record<string, PresetServiceItem[]> = {
  barbearia: [
    { id: "cabelo", name: "Cabelo", price: "35,00", duration: 30, selected: true },
    { id: "barba", name: "Barba", price: "25,00", duration: 30, selected: true },
    { id: "cabelo-barba", name: "Cabelo + Barba", price: "55,00", duration: 45, selected: true },
    { id: "degrade", name: "Degradê / Fade", price: "40,00", duration: 35, selected: true },
    { id: "sobrancelha", name: "Sobrancelha na navalha", price: "15,00", duration: 15, selected: true },
    { id: "corte-tesoura", name: "Corte na tesoura", price: "45,00", duration: 40, selected: true },
    { id: "barboterapia", name: "Barboterapia com toalha quente", price: "40,00", duration: 35, selected: true },
    { id: "pezinho", name: "Pezinho / Acabamento", price: "15,00", duration: 15, selected: true },
    { id: "pigmentacao", name: "Pigmentação de Barba", price: "30,00", duration: 25, selected: false },
    { id: "platinado", name: "Platinado / Nevou", price: "120,00", duration: 90, selected: false },
    { id: "selagem", name: "Selagem / Alisamento", price: "80,00", duration: 60, selected: false },
    { id: "corte-infantil", name: "Corte Infantil", price: "35,00", duration: 30, selected: false },
  ],
  salao: [
    { id: "corte-fem", name: "Corte Feminino", price: "60,00", duration: 45, selected: true },
    { id: "escova", name: "Escova Modelada", price: "45,00", duration: 35, selected: true },
    { id: "lavagem-secagem", name: "Lavagem Especial + Secagem", price: "35,00", duration: 25, selected: true },
    { id: "hidratacao", name: "Hidratação Profunda", price: "70,00", duration: 45, selected: true },
    { id: "nutricao", name: "Nutrição e Reconstrução", price: "90,00", duration: 50, selected: true },
    { id: "manicure", name: "Manicure Tradicional", price: "35,00", duration: 30, selected: true },
    { id: "pedicure", name: "Pedicure Tradicional", price: "40,00", duration: 40, selected: true },
    { id: "design-sobrancelha", name: "Design de Sobrancelha", price: "30,00", duration: 20, selected: true },
    { id: "coloracao", name: "Coloração / Tintura Completa", price: "110,00", duration: 75, selected: false },
    { id: "mechas", name: "Mechas / Luzes / Balayage", price: "220,00", duration: 120, selected: false },
    { id: "botox", name: "Botox Capilar", price: "130,00", duration: 75, selected: false },
    { id: "progressiva", name: "Progressiva / Selagem Térmica", price: "160,00", duration: 90, selected: false },
    { id: "penteado", name: "Penteado para Festas", price: "120,00", duration: 60, selected: false },
  ],
  manicure: [
    { id: "manicure", name: "Manicure Tradicional", price: "35,00", duration: 30, selected: true },
    { id: "pedicure", name: "Pedicure Tradicional", price: "40,00", duration: 40, selected: true },
    { id: "combo-pe-mao", name: "Combo Pé e Mão", price: "70,00", duration: 60, selected: true },
    { id: "esmalte-gel", name: "Esmaltação em Gel", price: "60,00", duration: 45, selected: true },
    { id: "spa-pes", name: "Spa dos Pés com Esfoliação", price: "55,00", duration: 40, selected: true },
    { id: "alongamento-fibra", name: "Alongamento em Fibra de Vidro", price: "150,00", duration: 120, selected: false },
    { id: "alongamento-gel", name: "Alongamento em Gel", price: "140,00", duration: 120, selected: false },
    { id: "manutencao-along", name: "Manutenção de Alongamento", price: "90,00", duration: 75, selected: false },
    { id: "blindagem", name: "Blindagem de Unhas", price: "75,00", duration: 50, selected: false },
    { id: "remocao", name: "Remoção de Alongamento", price: "40,00", duration: 30, selected: false },
  ],
  estetica: [
    { id: "limpeza-pele", name: "Limpeza de Pele Profunda", price: "120,00", duration: 60, selected: true },
    { id: "design-sobrancelha-est", name: "Design de Sobrancelha Simples", price: "30,00", duration: 20, selected: true },
    { id: "design-henna", name: "Design com Henna", price: "45,00", duration: 30, selected: true },
    { id: "drenagem-corp", name: "Drenagem Linfática Corporal", price: "90,00", duration: 50, selected: true },
    { id: "massagem-relax", name: "Massagem Relaxante com Óleos", price: "100,00", duration: 50, selected: true },
    { id: "depilacao-buco", name: "Depilação Buço / Facial", price: "25,00", duration: 15, selected: true },
    { id: "brow-lamination", name: "Brow Lamination", price: "90,00", duration: 45, selected: false },
    { id: "extensao-cilios", name: "Extensão / Alongamento de Cílios", price: "140,00", duration: 90, selected: false },
    { id: "lash-lifting", name: "Lash Lifting", price: "90,00", duration: 45, selected: false },
    { id: "depilacao-perna", name: "Depilação Meia Perna / Completa", price: "60,00", duration: 40, selected: false },
    { id: "peeling-diamante", name: "Peeling de Diamante", price: "110,00", duration: 45, selected: false },
    { id: "massagem-modeladora", name: "Massagem Modeladora", price: "95,00", duration: 50, selected: false },
  ],
  tatuagem: [
    { id: "tatuagem-sessao", name: "Sessão de Tatuagem (1 hora)", price: "200,00", duration: 60, selected: true },
    { id: "tatuagem-delicada", name: "Tatuagem Delicada / Flash", price: "120,00", duration: 40, selected: true },
    { id: "piercing-aplicacao", name: "Aplicação de Piercing", price: "70,00", duration: 30, selected: true },
    { id: "troca-joia", name: "Troca de Joia / Perfuração", price: "40,00", duration: 20, selected: true },
    { id: "avaliacao-tattoo", name: "Avaliação e Criação de Projeto", price: "0,00", duration: 20, selected: true },
    { id: "retoque-tattoo", name: "Retoque de Tatuagem", price: "60,00", duration: 30, selected: false },
  ],
  podologia: [
    { id: "podologia-tradicional", name: "Tratamento Tradicional de Podologia", price: "90,00", duration: 50, selected: true },
    { id: "unha-encravada", name: "Correção de Unha Encravada", price: "80,00", duration: 40, selected: true },
    { id: "calosidades", name: "Desbaste de Calosidades", price: "70,00", duration: 35, selected: true },
    { id: "spa-podologico", name: "Spa dos Pés Podológico", price: "75,00", duration: 45, selected: true },
    { id: "micoses", name: "Tratamento de Micoses", price: "85,00", duration: 40, selected: false },
    { id: "reflexologia", name: "Reflexologia Podal", price: "80,00", duration: 40, selected: false },
  ],
  maquiagem: [
    { id: "make-social", name: "Maquiagem Social", price: "120,00", duration: 60, selected: true },
    { id: "make-festa", name: "Maquiagem para Festas e Eventos", price: "150,00", duration: 60, selected: true },
    { id: "make-teste", name: "Teste de Maquiagem", price: "90,00", duration: 45, selected: true },
    { id: "dia-noiva", name: "Pacote Dia da Noiva", price: "450,00", duration: 180, selected: false },
    { id: "make-express", name: "Maquiagem Express / Dia a Dia", price: "80,00", duration: 35, selected: false },
    { id: "sobrancelha-make", name: "Design de Sobrancelha com Maquiagem", price: "35,00", duration: 25, selected: false },
  ],
  outros: [
    { id: "atendimento-padrao", name: "Atendimento Principal", price: "50,00", duration: 30, selected: true },
    { id: "avaliacao", name: "Consulta / Avaliação", price: "0,00", duration: 30, selected: true },
    { id: "procedimento-esp", name: "Procedimento Especial", price: "100,00", duration: 45, selected: true },
    { id: "retorno", name: "Retorno / Revisão", price: "0,00", duration: 20, selected: true },
    { id: "pacote-sessao", name: "Pacote / Sessão Avulsa", price: "80,00", duration: 40, selected: false },
    { id: "atendimento-vip", name: "Atendimento Domiciliar / VIP", price: "120,00", duration: 60, selected: false },
  ],
};

function getPresetsForBranch(branchName: string): PresetServiceItem[] {
  const lower = (branchName || "").toLowerCase();
  if (lower.includes("barb")) return NICHE_PRESETS.barbearia;
  if (lower.includes("manicur") || lower.includes("pedicur") || lower.includes("unha")) return NICHE_PRESETS.manicure;
  if (lower.includes("podol")) return NICHE_PRESETS.podologia;
  if (lower.includes("maquia") || lower.includes("noiva")) return NICHE_PRESETS.maquiagem;
  if (lower.includes("tatu") || lower.includes("pierc")) return NICHE_PRESETS.tatuagem;
  if (lower.includes("salão") || lower.includes("salao") || lower.includes("cabel")) return NICHE_PRESETS.salao;
  if (lower.includes("estét") || lower.includes("estet") || lower.includes("spa") || lower.includes("cilios") || lower.includes("sobrancelha")) return NICHE_PRESETS.estetica;
  return NICHE_PRESETS.outros;
}



// Google Ads Conversion Tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function gtag_report_conversion(url?: string) {
  const callback = function () {
    if (typeof url !== "undefined") {
      window.location.href = url;
    }
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-17761069351/6u6iCL3zj8gbEKfSkZVC",
      event_callback: callback,
    });
  }

  return false;
}

const IOS_APP_URL = "https://apps.apple.com/br/app/gest%C3%A3o-boa/id6741593872";
const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.beasier";

const GooglePlayIcon: React.FC<{ width?: string | number; height?: string | number }> = ({
  width = 18,
  height = 18,
}) => (
  <svg
    viewBox="0 0 512 512"
    width={width}
    height={height}
    style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
  >
    <path
      fill="#4285F4"
      d="M47.7 24.3C45.3 26.9 44 31 44 36.3v439.4c0 5.3 1.3 9.4 3.7 12l1.4 1.3L273.8 264.3v-5.6L49.1 23l-1.4 1.3z"
    />
    <path
      fill="#FBBC04"
      d="M348.6 339.2l-74.8-74.9v-5.6l74.8-74.9 1.7 1 88.6 50.3c25.3 14.4 25.3 37.9 0 52.3l-88.6 50.8-1.7 1z"
    />
    <path
      fill="#EA4335"
      d="M350.3 338.2L273.8 261.7 47.7 487.8c8.3 8.8 22.1 9.9 37.7 1l264.9-150.6z"
    />
    <path
      fill="#34A853"
      d="M350.3 173.8L85.4 23.2C69.8 14.3 56 15.4 47.7 24.2l226.1 226.1 76.5-76.5z"
    />
  </svg>
);

const AppleIcon: React.FC<{ width?: string | number; height?: string | number }> = ({
  width = 18,
  height = 18,
}) => (
  <svg
    viewBox="0 0 170 170"
    width={width}
    height={height}
    fill="currentColor"
    style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
  >
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.66-7.85-11.87-14.32-6.53-10.01-11.66-20.93-15.38-32.77-3.72-11.84-5.58-23.08-5.58-33.72 0-14.57 3.59-26.68 10.77-36.33 7.18-9.65 16.32-14.61 27.42-14.88 4.69 0 10.03 1.25 16.02 3.75 5.99 2.5 9.68 3.81 11.07 3.93 1.74-.23 5.67-1.63 11.78-4.22 6.11-2.58 11.51-3.79 16.19-3.63 12.3.66 22.09 5.34 29.37 14.06-10.68 6.42-15.91 15.24-15.71 26.47.2 8.71 3.59 16.08 10.18 22.11 6.59 6.03 14.37 9.53 23.33 10.5-2.4 7.41-5.34 14.73-8.83 21.96zM119.22 33.74c0-7.3 2.66-14.18 7.99-20.64 5.33-6.46 11.88-10.74 19.64-12.85-.22 1.31-.44 2.62-.66 3.93-1.09 6.86-3.87 13.34-8.34 19.44-4.47 6.1-9.97 10.46-16.5 13.08-.66-1-1.32-1.98-1.99-2.96h-.14z" />
  </svg>
);

type PlanType = "basico" | "crescimento" | "empresarial" | "ilimitado" | "black-friday" | "supremacy10" | "alemdocorte";

const ASAAS_PLAN_LINKS = {
  basico: "https://www.asaas.com/c/sjf0bqiql2cgglm2",
  crescimento: "https://www.asaas.com/c/fodhi5rv7zos2blm",
  empresarial: "https://www.asaas.com/c/2anme44rr5pvp8vq",
  ilimitado: "https://www.asaas.com/c/isjsvgixp3bzyxmz",
};

const PLAN_CONFIG: Record<
  PlanType,
  {
    name: string;
    usersLimit: string;
    originalPrice: string;
    price: string;
    discountPriceVal: number;
    paymentLink: string;
    discount?: string;
  }
> = {
  basico: {
    name: "Básico",
    usersLimit: "1 Profissional",
    originalPrice: "R$ 79,90/mês",
    price: "R$ 71,91/mês",
    discountPriceVal: 71.91,
    paymentLink: ASAAS_PLAN_LINKS["basico"],
    discount: "10% OFF",
  },
  crescimento: {
    name: "Crescimento",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 99,90/mês",
    price: "R$ 89,91/mês",
    discountPriceVal: 89.91,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "10% OFF",
  },
  empresarial: {
    name: "Empresarial",
    usersLimit: "4-6 Profissionais",
    originalPrice: "R$ 129,90/mês",
    price: "R$ 116,91/mês",
    discountPriceVal: 116.91,
    paymentLink: ASAAS_PLAN_LINKS["empresarial"],
    discount: "10% OFF",
  },
  ilimitado: {
    name: "Ilimitado",
    usersLimit: "Profissionais Ilimitados",
    originalPrice: "R$ 179,90/mês",
    price: "R$ 161,91/mês",
    discountPriceVal: 161.91,
    paymentLink: ASAAS_PLAN_LINKS["ilimitado"],
    discount: "10% OFF",
  },
  "black-friday": {
    name: "Black Friday",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 535,00",
    price: "R$ 9,90",
    discountPriceVal: 9.9,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "98% OFF",
  },
  supremacy10: {
    name: "Além do Corte",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 99,90/mês",
    price: "R$ 89,91/mês",
    discountPriceVal: 89.91,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "Exclusivo",
  },
  alemdocorte: {
    name: "Além do Corte",
    usersLimit: "2-3 Profissionais",
    originalPrice: "R$ 99,90/mês",
    price: "R$ 89,91/mês",
    discountPriceVal: 89.91,
    paymentLink: ASAAS_PLAN_LINKS["crescimento"],
    discount: "Exclusivo",
  },
};

const SCALE_OPTIONS = [
  { id: 1, name: "MEI", description: "Microempreendedor Individual" },
  { id: 2, name: "ME", description: "Microempresa" },
  { id: 3, name: "Startup", description: "Empresa de tecnologia" },
  { id: 4, name: "Outro", description: "Outros tipos de empresa" },
];

const formatInitialPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  if (!cleaned) return "";
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  }
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

const CriarConta: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Timer regressivo de 24 horas para oferta exclusiva
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const STORAGE_KEY = "gestaoboa_promo_countdown_deadline_v1";
    let targetTime: number;

    const saved = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > now) {
        targetTime = parsed;
      } else {
        // Se expirou, reinicia mais 24 horas para manter o senso de urgência
        targetTime = now + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      }
    } else {
      targetTime = now + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const current = Date.now();
      const diff = Math.max(0, targetTime - current);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimerPad = (n: number) => n.toString().padStart(2, "0");

  const location = useLocation();
  const navState = (location.state as any) || {};
  const navigate = useNavigate();

  const planParam = (searchParams.get("plano") || navState.plan) as PlanType | null;
  const cupomParam = searchParams.get("cupom") || searchParams.get("desconto");
  const eventoParam = searchParams.get("evento") || searchParams.get("parceria") || searchParams.get("origem");
  const planoParam = searchParams.get("plano") || navState.plan;
  const parceriaParam = searchParams.get("parceria");
  const origemParam = searchParams.get("origem") || navState.origem;
  const refParam = searchParams.get("ref");

  // Dados pré-preenchidos de formulários externos (ex: /barbearia, /salao-estetica)
  const prefilledFullName = navState.fullName || searchParams.get("nome_completo") || "";
  const prefilledName = navState.name || searchParams.get("nome") || searchParams.get("name") || prefilledFullName;
  const prefilledSurname = navState.surname || searchParams.get("sobrenome") || searchParams.get("surname") || "";
  const prefilledEmail = navState.email || searchParams.get("email") || "";
  const rawPhone = navState.phone || searchParams.get("telefone") || searchParams.get("phone") || "";
  const prefilledCompany = navState.companyName || searchParams.get("empresa") || searchParams.get("barbearia") || "";
  const ramoParam = (navState.category || searchParams.get("ramo") || searchParams.get("segmento") || "").toLowerCase();
  const colaboradoresParam = navState.colaboradores || searchParams.get("colaboradores") || "";

  const isAlemDoCorte =
    cupomParam?.toUpperCase() === "ALEMDOCORTE" ||
    cupomParam?.toUpperCase() === "ALEM_DO_CORTE" ||
    cupomParam?.toUpperCase() === "ALEM-DO-CORTE" ||
    planoParam?.toUpperCase() === "ALEMDOCORTE" ||
    parceriaParam?.toUpperCase() === "ALEMDOCORTE" ||
    origemParam?.toUpperCase() === "ALEMDOCORTE" ||
    eventoParam?.toLowerCase() === "alemdocorte" ||
    eventoParam?.toLowerCase() === "alem-do-corte" ||
    eventoParam?.toLowerCase() === "alem_do_corte" ||
    searchParams.has("alemdocorte") ||
    searchParams.has("alem-do-corte") ||
    searchParams.has("alem_do_corte") ||
    refParam?.toUpperCase() === "ALEMDOCORTE" ||
    window.location.pathname.toLowerCase().includes("alemdocorte") ||
    window.location.pathname.toLowerCase().includes("alem-do-corte");

  const isSupremacyCupomParam =
    cupomParam?.toUpperCase() === "SUPREMACY10" ||
    cupomParam?.toUpperCase() === "SUPREMACY" ||
    planoParam?.toUpperCase() === "SUPREMACY10" ||
    parceriaParam?.toUpperCase() === "SUPREMACY10" ||
    origemParam?.toUpperCase() === "SUPREMACY10" ||
    eventoParam?.toLowerCase() === "supremacy" ||
    searchParams.has("supremacy") ||
    searchParams.has("supremacy10") ||
    refParam?.toUpperCase() === "SUPREMACY10" ||
    window.location.pathname.toLowerCase().includes("supremacy");

  const isSupremacy10 = isAlemDoCorte || isSupremacyCupomParam;
  const isSupremacy = isSupremacy10;

  const initialPlanKey: PlanType = isSupremacy10
    ? planParam && PLAN_CONFIG[planParam]
      ? planParam
      : "alemdocorte"
    : planParam && PLAN_CONFIG[planParam]
    ? planParam
    : "crescimento";

  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanType>(initialPlanKey);
  const plan = selectedPlanKey;
  const planConfig = PLAN_CONFIG[plan];

  // Steps: 1: Conta | 2: Empresa | 3: Serviços | 4: Equipe | 5: Horários | 6: Pronto!
  const [currentStep, setCurrentStep] = useState(1);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [enterpriseToken, setEnterpriseToken] = useState<string | null>(null);
  const [createdEnterpriseId, setCreatedEnterpriseId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [servicesList, setServicesList] = useState<PresetServiceItem[]>(NICHE_PRESETS.barbearia);
  const [serviceSearch, setServiceSearch] = useState("");
  const [filterOnlySelected, setFilterOnlySelected] = useState(false);
  const [savingServicesText, setSavingServicesText] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Step 4: Equipe / Profissionais
  const [professionalsList, setProfessionalsList] = useState<ProfessionalItem[]>([]);
  const [newProfName, setNewProfName] = useState("");
  const [newProfPhone, setNewProfPhone] = useState("");
  const [newProfPassword, setNewProfPassword] = useState("123456");
  const [newProfCommission, setNewProfCommission] = useState("50");
  const [profError, setProfError] = useState<string | null>(null);
  const [savingProfText, setSavingProfText] = useState("");

  // Step 5: Horários
  const [scheduleList, setScheduleList] = useState<DaySchedule[]>(DEFAULT_SCHEDULE);
  const [savingScheduleText, setSavingScheduleText] = useState("");

  const [formData, setFormData] = useState({
    fullName: prefilledFullName || (prefilledSurname ? `${prefilledName} ${prefilledSurname}` : prefilledName),
    name: prefilledName,
    surname: prefilledSurname,
    email: prefilledEmail,
    phone: formatInitialPhone(rawPhone),
    password: "",
    terms: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  // Determinar porte da empresa com base em colaboradores
  const initialScale = (() => {
    if (colaboradoresParam === "1") return SCALE_OPTIONS[0]; // MEI
    if (colaboradoresParam === "2-3" || colaboradoresParam === "4-6") return SCALE_OPTIONS[1]; // ME
    if (colaboradoresParam === "7+") return SCALE_OPTIONS[1]; // ME
    return SCALE_OPTIONS[0];
  })();

  const [companyName, setCompanyName] = useState(prefilledCompany);
  const [discountCode, setDiscountCode] = useState(
    isSupremacy10 ? "ALEMDOCORTE" : cupomParam ? cupomParam.toUpperCase() : ""
  );

  const [selectedCategory, setSelectedCategory] = useState<EnterpriseBranch | null>(
    DEFAULT_ENTERPRISE_BRANCHES[0]
  );
  const [selectedScale, setSelectedScale] = useState<typeof SCALE_OPTIONS[0] | null>(initialScale);
  const [categories, setCategories] = useState<EnterpriseBranch[]>(DEFAULT_ENTERPRISE_BRANCHES);

  useEffect(() => {
    const rawCupom = searchParams.get("cupom") || searchParams.get("desconto");
    const isSupremacyCupom = rawCupom?.toUpperCase() === "SUPREMACY10" || rawCupom?.toUpperCase() === "SUPREMACY";

    if (isSupremacyCupom || searchParams.has("supremacy10") || searchParams.has("supremacy")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("supremacy10");
      newParams.delete("supremacy");
      newParams.delete("desconto");
      newParams.set("cupom", "ALEMDOCORTE");
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    }
  }, [searchParams, location.pathname, navigate]);

  useEffect(() => {
    FB_PIXEL.pageView();
    FB_PIXEL.trackCustomEvent("ViewCriarContaPage", {
      is_supremacy: isSupremacy10,
      plano: selectedPlanKey,
    });
  }, []);

  // Sincroniza dados pré-preenchidos se chegarem via navegação
  useEffect(() => {
    if (prefilledName || prefilledSurname || prefilledEmail || rawPhone) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || (prefilledSurname ? `${prefilledName} ${prefilledSurname}` : prefilledName),
        name: prev.name || prefilledName,
        surname: prev.surname || prefilledSurname,
        email: prev.email || prefilledEmail,
        phone: prev.phone || formatInitialPhone(rawPhone),
      }));
    }
    if (prefilledCompany) {
      setCompanyName((prev: string) => prev || prefilledCompany);
    }
  }, [prefilledName, prefilledSurname, prefilledEmail, rawPhone, prefilledCompany]);

  useEffect(() => {
    if (isSupremacy10 && (!discountCode || discountCode === "SUPREMACY10")) {
      setDiscountCode("ALEMDOCORTE");
    }
  }, [isSupremacy10]);

  // Persistência de Rascunho no LocalStorage
  const DRAFT_STORAGE_KEY = "gb_onboarding_draft_v1";

  // Carrega o rascunho salvo ao abrir a página
  useEffect(() => {
    try {
      const savedDraftRaw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!savedDraftRaw) return;

      const draft = JSON.parse(savedDraftRaw);
      if (draft && typeof draft === "object") {
        if (draft.formData) {
          setFormData((prev) => ({
            ...prev,
            fullName: draft.formData.fullName || prev.fullName,
            name: draft.formData.name || prev.name,
            surname: draft.formData.surname || prev.surname,
            email: draft.formData.email || prev.email,
            phone: draft.formData.phone || prev.phone,
          }));
        }
        if (draft.companyName) setCompanyName(draft.companyName);
        if (draft.userToken) setUserToken(draft.userToken);
        if (draft.userId) setUserId(draft.userId);
        if (draft.enterpriseToken) setEnterpriseToken(draft.enterpriseToken);
        if (draft.createdEnterpriseId) setCreatedEnterpriseId(draft.createdEnterpriseId);
        if (draft.selectedCategory) setSelectedCategory(draft.selectedCategory);
        if (draft.servicesList && Array.isArray(draft.servicesList) && draft.servicesList.length > 0) {
          setServicesList(draft.servicesList);
        }
        if (draft.professionalsList && Array.isArray(draft.professionalsList)) {
          setProfessionalsList(draft.professionalsList);
        }
        if (draft.scheduleList && Array.isArray(draft.scheduleList)) {
          setScheduleList(draft.scheduleList);
        }
        // Se já avançou de etapa e tem token/dados, restaura o passo
        if (draft.currentStep && draft.currentStep > 1 && (draft.userToken || draft.formData?.name)) {
          setCurrentStep(draft.currentStep);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar rascunho do onboarding:", e);
    }
  }, []);

  // Salva o rascunho sempre que os dados principais mudarem
  useEffect(() => {
    // Se já chegou no passo final de sucesso, limpa o rascunho
    if (currentStep === 6) {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (e) {}
      return;
    }

    try {
      // Salva apenas se o usuário já começou a preencher algo
      if (
        formData.fullName ||
        formData.email ||
        formData.phone ||
        companyName ||
        userToken ||
        currentStep > 1
      ) {
        const draft = {
          currentStep,
          formData: {
            fullName: formData.fullName,
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            phone: formData.phone,
          },
          companyName,
          userToken,
          userId,
          enterpriseToken,
          createdEnterpriseId,
          selectedCategory,
          servicesList,
          professionalsList,
          scheduleList,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      }
    } catch (e) {
      console.error("Erro ao salvar rascunho do onboarding:", e);
    }
  }, [
    currentStep,
    formData.fullName,
    formData.name,
    formData.surname,
    formData.email,
    formData.phone,
    companyName,
    userToken,
    userId,
    enterpriseToken,
    createdEnterpriseId,
    selectedCategory,
    servicesList,
    professionalsList,
    scheduleList,
  ]);

  // Carrega categorias e ajusta pré-seleção baseada no ramoParam
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEnterpriseBranches();
        if (fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories);

          if (ramoParam === "salao" || ramoParam === "salao-estetica" || ramoParam === "estetica") {
            const salaoCat = fetchedCategories.find(
              (c) =>
                c.name.toLowerCase().includes("salão") ||
                c.name.toLowerCase().includes("salao") ||
                c.name.toLowerCase().includes("cabeleireiro") ||
                c.name.toLowerCase().includes("estética") ||
                c.name.toLowerCase().includes("estetica")
            );
            if (salaoCat) {
              setSelectedCategory(salaoCat);
              setServicesList(getPresetsForBranch(salaoCat.name));
              return;
            }
          }

          if (ramoParam === "manicure" || ramoParam === "unhas") {
            const manCat = fetchedCategories.find((c) => c.name.toLowerCase().includes("manicure"));
            if (manCat) {
              setSelectedCategory(manCat);
              setServicesList(getPresetsForBranch(manCat.name));
              return;
            }
          }

          const barbeariaCat = fetchedCategories.find((c) => c.name.toLowerCase().includes("barbearia"));
          if (barbeariaCat) {
            setSelectedCategory(barbeariaCat);
            setServicesList(getPresetsForBranch(barbeariaCat.name));
          } else {
            setSelectedCategory(fetchedCategories[0]);
            setServicesList(getPresetsForBranch(fetchedCategories[0].name));
          }
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [ramoParam]);

  // Atualiza presets quando a categoria selecionada mudar
  const handleSelectCategory = (cat: EnterpriseBranch) => {
    setSelectedCategory(cat);
    setServicesList(getPresetsForBranch(cat.name));
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (!cleaned) return "";
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    }
    if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (name === "terms" && checked) {
        setTermsError(false);
        if (error === "Você precisa aceitar os termos de uso para continuar.") {
          setError(null);
        }
      }
      return;
    }

    let formattedValue = value;
    if (name === "phone") {
      formattedValue = formatPhone(value);
      setPhoneError(false);
    }

    if (name === "email") {
      setEmailError(false);
    }

    if (name === "password") {
      if (value.length >= 6) {
        setPasswordError(false);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  // Extrai nome e sobrenome de forma inteligente
  const getResolvedNameAndSurname = () => {
    const rawFullName = (formData.fullName || formData.name).trim();
    if (!rawFullName) {
      return { firstName: "", lastName: " " };
    }

    const parts = rawFullName.split(/\s+/);
    if (parts.length > 1) {
      return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
      };
    }

    return {
      firstName: rawFullName,
      lastName: formData.surname.trim() || " ",
    };
  };

  const handlePasswordBlur = () => {
    if (formData.password.length > 0 && formData.password.length < 6) {
      setPasswordError(true);
    }
  };

  const handleEmailBlur = () => {
    if (formData.email.trim()) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      setEmailError(!isValid);
    }
  };

  // SUBMIT DO PASSO 1: CADASTRO UNIFICADO COM ATIVAÇÃO DIRETA (ZERO ATRITO DE SMS)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { firstName, lastName } = getResolvedNameAndSurname();
    const rawPhoneDigits = formData.phone.replace(/\D/g, "");
    let hasError = false;

    if (!firstName) {
      setError("Por favor, digite seu nome completo para continuar.");
      hasError = true;
    }

    if (!rawPhoneDigits || rawPhoneDigits.length < 10) {
      setPhoneError(true);
      if (!hasError) setError("Por favor, insira um celular/WhatsApp válido com DDD.");
      hasError = true;
    }

    if (formData.email.trim()) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      if (!isValidEmail) {
        setEmailError(true);
        if (!hasError) setError("Por favor, insira um e-mail válido.");
        hasError = true;
      }
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError(true);
      if (!hasError) setError("A senha deve ter pelo menos 6 caracteres.");
      hasError = true;
    }

    if (!formData.terms) {
      setTermsError(true);
      if (!hasError) setError("Você precisa aceitar os termos de uso para continuar.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      const userData = {
        name: firstName,
        surname: lastName,
        document: "",
        email: cleanEmail || undefined,
        password: formData.password,
        birthday: "",
        phone: rawPhoneDigits,
        gender: "",
        cep: "",
        address: "",
        address_number: "",
        city: "",
        district: "",
        send_email: Boolean(cleanEmail),
        skip_verification: true,
        cupom: discountCode || (isSupremacy10 ? "ALEMDOCORTE" : undefined),
      };

      const result = await registerUser(userData);
      if (result.error) {
        const errMsg = typeof result.error === "object" ? result.error.message : result.error;
        if (typeof errMsg === "string" && errMsg.includes("user already exists")) {
          // segue para login
        } else {
          throw new Error(errMsg ?? "Erro ao registrar usuário");
        }
      }

      FB_PIXEL.trackStartTrial({
        content_name: isSupremacy10 ? "Registro Além do Corte" : "Registro Criar Conta",
        plan: selectedPlanKey,
      });

      let loginResult = await loginUserWithPhone(rawPhoneDigits, formData.password);
      if (loginResult.error && cleanEmail) {
        loginResult = await loginUser(cleanEmail, formData.password);
      }

      if (loginResult.error) {
        const errMsg = typeof loginResult.error === "object" ? loginResult.error.message : loginResult.error;
        throw new Error(errMsg ?? "Erro ao realizar login automático");
      }

      const receivedToken = loginResult.token;
      const receivedId = loginResult.id || loginResult?.user?.id || (result as any)?.id;

      setUserToken(receivedToken);
      if (receivedId) setUserId(receivedId);

      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar o registro");
      console.error("Erro no registro do usuário:", err);
    } finally {
      setLoading(false);
    }
  };

  // SUBMIT DO PASSO 2: CRIAÇÃO DA EMPRESA
  const handleCompanySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!companyName.trim()) {
      setError("Por favor, digite o nome do seu negócio.");
      return;
    }

    const scaleToUse = selectedScale || SCALE_OPTIONS[0];
    let categoryToUse = selectedCategory;

    if (!categoryToUse) {
      categoryToUse =
        categories.find((c) => c.name.toLowerCase().includes("barbearia")) ||
        categories[0] ||
        DEFAULT_ENTERPRISE_BRANCHES[0];
    }

    setLoading(true);
    setError(null);

    try {
      const companyData = {
        name: companyName.trim(),
        id_scale: Number(scaleToUse.id),
        branches: [Number(categoryToUse.id)],
        image: "",
        discount_code: discountCode || undefined,
      };

      const result = await createCompany(userToken!, companyData);
      if (result.error) {
        throw new Error(result.error.message ?? "Erro ao criar empresa");
      }

      const entId = (result as any)?.enterprise?.id || (result as any)?.id || null;
      const newToken = (result as any)?.token || userToken;

      setCreatedEnterpriseId(entId);
      setEnterpriseToken(newToken);
      if (newToken) {
        setUserToken(newToken);
      }

      // Trigger Google Ads conversion event
      gtag_report_conversion();

      // Trigger Meta Pixel conversion events
      FB_PIXEL.trackCompleteRegistration({
        content_name: companyName.trim(),
        status: "success",
        plan: planConfig?.name || selectedPlanKey,
        category: categoryToUse.name,
      });

      // Avança para serviços (Passo 3)
      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar empresa");
      console.error("Error creating company:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers de Serviços (Passo 3)
  const handleToggleService = (id: string) => {
    setServicesList((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, selected: !srv.selected } : srv))
    );
  };

  const handleServiceFieldChange = (
    id: string,
    field: "name" | "price" | "duration",
    value: string | number
  ) => {
    setServicesList((prev) =>
      prev.map((srv) => {
        if (srv.id !== id) return srv;
        if (field === "duration") {
          const num = Math.max(5, Math.min(480, Number(value) || 30));
          return { ...srv, duration: num };
        }
        return { ...srv, [field]: String(value), selected: true };
      })
    );
  };

  const handleAddCustomService = (initialName?: string) => {
    const newId = `custom-${Date.now()}`;
    const nameToAdd = typeof initialName === "string" ? initialName.trim() : "";
    setServicesList((prev) => [
      ...prev,
      {
        id: newId,
        name: nameToAdd,
        price: "35,00",
        duration: 30,
        selected: true,
      },
    ]);
    if (nameToAdd) {
      setServiceSearch("");
    }
  };

  const handleRemoveService = (id: string) => {
    setServicesList((prev) => prev.filter((srv) => srv.id !== id));
  };

  // SUBMIT DO PASSO 3: SALVAR SERVIÇOS E AVANÇAR PARA EQUIPE (Passo 4)
  const handleSaveServices = async () => {
    const activeServices = servicesList.filter((s) => s.selected && s.name.trim().length > 0);
    if (activeServices.length === 0) {
      setCurrentStep(4);
      return;
    }

    setLoading(true);
    setError(null);
    setSavingServicesText("Preparando seus serviços...");

    try {
      const tokenToUse = enterpriseToken || userToken;
      if (tokenToUse) {
        for (let i = 0; i < activeServices.length; i++) {
          const srv = activeServices[i];
          setSavingServicesText(`Salvando (${i + 1}/${activeServices.length}): ${srv.name}...`);

          const numericPrice = parseFloat(
            srv.price.replace(/[^\d,.-]/g, "").replace(",", ".")
          );
          const validPrice = !isNaN(numericPrice) && numericPrice > 0 ? numericPrice : 35;
          const validDuration =
            !isNaN(Number(srv.duration)) && Number(srv.duration) > 0 ? Number(srv.duration) : 30;

          try {
            await createService(tokenToUse, {
              name: srv.name.trim(),
              duration_minutes: validDuration,
              sale_price: validPrice,
              cost_price: 0,
              id_enterprise: createdEnterpriseId || undefined,
              service_type: "standard",
              show_on_booking: true,
            });
          } catch (srvErr) {
            console.error(`Erro ao criar serviço ${srv.name}:`, srvErr);
          }
        }
      }

      // Avança para Passo 4: Profissionais da Equipe
      setCurrentStep(4);
    } catch (err) {
      console.error("Erro ao salvar serviços:", err);
      setCurrentStep(4);
    } finally {
      setLoading(false);
      setSavingServicesText("");
    }
  };

  // Handlers do Passo 4: Profissionais da Equipe
  const handleAddProfessional = () => {
    setProfError(null);
    if (!newProfName.trim()) {
      setProfError("Por favor, digite o nome do profissional.");
      return;
    }
    const cleanPhone = newProfPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setProfError("Por favor, digite um celular/WhatsApp válido com DDD.");
      return;
    }

    const commissionNum = Math.max(0, Math.min(100, Number(newProfCommission) || 50));
    const newId = `prof-${Date.now()}`;

    setProfessionalsList((prev) => [
      ...prev,
      {
        id: newId,
        name: newProfName.trim(),
        phone: formatPhone(newProfPhone),
        password: newProfPassword.trim() || "123456",
        commission: commissionNum,
      },
    ]);

    setNewProfName("");
    setNewProfPhone("");
    setNewProfPassword("123456");
    setNewProfCommission("50");
  };

  const handleRemoveProfessional = (id: string) => {
    setProfessionalsList((prev) => prev.filter((p) => p.id !== id));
  };

  // SUBMIT DO PASSO 4: SALVAR PROFISSIONAIS E AVANÇAR PARA HORÁRIOS (Passo 5)
  const handleSaveProfessionals = async () => {
    setLoading(true);
    setProfError(null);
    setSavingProfText("Configurando profissionais da equipe...");

    try {
      const tokenToUse = enterpriseToken || userToken;
      if (tokenToUse && createdEnterpriseId) {
        // Garante criação do perfil profissional do dono da empresa
        await createOwnerProfessional(tokenToUse, createdEnterpriseId);

        // Cria os profissionais cadastrados
        const ownerPhoneClean = formData.phone.replace(/\D/g, "");

        for (let i = 0; i < professionalsList.length; i++) {
          const prof = professionalsList[i];
          const profPhoneClean = prof.phone.replace(/\D/g, "");

          // Se o profissional for ele mesmo (mesmo celular), o perfil já foi criado via createOwnerProfessional
          if (ownerPhoneClean && profPhoneClean && ownerPhoneClean === profPhoneClean) {
            continue;
          }

          setSavingProfText(`Adicionando (${i + 1}/${professionalsList.length}): ${prof.name}...`);
          try {
            await createEmployee(tokenToUse, {
              enterprise_id: createdEnterpriseId,
              name: prof.name,
              phone: prof.phone,
              password: prof.password || "123456",
              commission: prof.commission,
            });
          } catch (e) {
            console.error("Erro ao criar funcionário:", e);
          }
        }
      }

      // Avança para o Passo 5: Horário de Funcionamento
      setCurrentStep(5);
    } catch (err) {
      console.error("Erro no passo de profissionais:", err);
      setCurrentStep(5);
    } finally {
      setLoading(false);
      setSavingProfText("");
    }
  };

  // Handlers do Passo 5: Horário de Funcionamento
  const handleScheduleToggle = (dayId: number) => {
    setScheduleList((prev) =>
      prev.map((day) => (day.dayId === dayId ? { ...day, isOpen: !day.isOpen } : day))
    );
  };

  const handleScheduleTimeChange = (dayId: number, field: "startTime" | "endTime", value: string) => {
    setScheduleList((prev) =>
      prev.map((day) => (day.dayId === dayId ? { ...day, [field]: value } : day))
    );
  };

  const handleApplySchedulePreset = (presetType: "seg-sab" | "seg-sex" | "todos") => {
    if (presetType === "seg-sab") {
      setScheduleList([
        { dayId: 2, name: "Segunda-feira", shortName: "Seg", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 3, name: "Terça-feira", shortName: "Ter", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 4, name: "Quarta-feira", shortName: "Qua", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 5, name: "Quinta-feira", shortName: "Qui", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 6, name: "Sexta-feira", shortName: "Sex", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 7, name: "Sábado", shortName: "Sáb", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 1, name: "Domingo", shortName: "Dom", isOpen: false, startTime: "09:00", endTime: "14:00" },
      ]);
    } else if (presetType === "seg-sex") {
      setScheduleList([
        { dayId: 2, name: "Segunda-feira", shortName: "Seg", isOpen: true, startTime: "08:00", endTime: "19:00" },
        { dayId: 3, name: "Terça-feira", shortName: "Ter", isOpen: true, startTime: "08:00", endTime: "19:00" },
        { dayId: 4, name: "Quarta-feira", shortName: "Qua", isOpen: true, startTime: "08:00", endTime: "19:00" },
        { dayId: 5, name: "Quinta-feira", shortName: "Qui", isOpen: true, startTime: "08:00", endTime: "19:00" },
        { dayId: 6, name: "Sexta-feira", shortName: "Sex", isOpen: true, startTime: "08:00", endTime: "19:00" },
        { dayId: 7, name: "Sábado", shortName: "Sáb", isOpen: false, startTime: "09:00", endTime: "18:00" },
        { dayId: 1, name: "Domingo", shortName: "Dom", isOpen: false, startTime: "09:00", endTime: "14:00" },
      ]);
    } else if (presetType === "todos") {
      setScheduleList([
        { dayId: 2, name: "Segunda-feira", shortName: "Seg", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 3, name: "Terça-feira", shortName: "Ter", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 4, name: "Quarta-feira", shortName: "Qua", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 5, name: "Quinta-feira", shortName: "Qui", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 6, name: "Sexta-feira", shortName: "Sex", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 7, name: "Sábado", shortName: "Sáb", isOpen: true, startTime: "09:00", endTime: "20:00" },
        { dayId: 1, name: "Domingo", shortName: "Dom", isOpen: true, startTime: "09:00", endTime: "18:00" },
      ]);
    }
  };

  // SUBMIT DO PASSO 5: SALVAR HORÁRIO E AVANÇAR PARA TUDO PRONTO / LINK DE AGENDAMENTO (Passo 6)
  const handleSaveSchedule = async () => {
    setLoading(true);
    setError(null);
    setSavingScheduleText("Salvando horário de funcionamento...");

    try {
      const tokenToUse = enterpriseToken || userToken;
      if (tokenToUse && createdEnterpriseId) {
        const openDays = scheduleList.filter((d) => d.isOpen);
        for (let i = 0; i < openDays.length; i++) {
          const day = openDays[i];
          setSavingScheduleText(`Salvando horário (${day.name})...`);
          await createEnterpriseShift(tokenToUse, {
            enterprise_id: createdEnterpriseId,
            day_id: day.dayId,
            user_id: userId || 0,
            start_time: day.startTime,
            end_time: day.endTime,
            works_at_lunch: true,
          });
        }
      }

      // Concluiu os horários -> Avança para a tela final de sucesso e link de agendamento!
      setCurrentStep(6);
    } catch (err) {
      console.error("Erro ao salvar horário:", err);
      setCurrentStep(6);
    } finally {
      setLoading(false);
      setSavingScheduleText("");
    }
  };

  const handleCopyBookingLink = () => {
    const bookingUrl = `https://agendamentos.gestaoboa.com.br/?enterprise_id=${createdEnterpriseId || ""}`;
    navigator.clipboard.writeText(bookingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getDirectAppUrl = () => {
    const token = userToken || enterpriseToken || "";
    const id = userId || "";
    if (token && id) {
      return `https://app.gestaoboa.com.br/?token=${encodeURIComponent(token)}&id=${encodeURIComponent(String(id))}`;
    }
    return "https://app.gestaoboa.com.br";
  };

  const getWhatsAppMessageUrl = () => {
    const phoneClean = formData.phone.replace(/\D/g, "");
    const bookingUrl = `https://agendamentos.gestaoboa.com.br/?enterprise_id=${createdEnterpriseId || ""}`;
    const msg = `🎉 Olá ${formData.name || ""}! Sua empresa ${companyName} foi criada com sucesso na Gestão Boa.\n\n🔗 Link da sua agenda online:\n${bookingUrl}\n\n💻 Acessar painel web:\nhttps://app.gestaoboa.com.br\n\n📲 Baixe o app no seu celular na Google Play ou App Store!`;
    return `https://wa.me/55${phoneClean}?text=${encodeURIComponent(msg)}`;
  };

  const renderStepIndicator = () => {
    // Cálculo do percentual concluído (1 a 6)
    // Passo 1: ~15%
    // Passo 2: ~35%
    // Passo 3: ~55%
    // Passo 4: ~75%
    // Passo 5: ~90%
    // Passo 6: 100%
    const percentages: Record<number, number> = {
      1: 15,
      2: 35,
      3: 55,
      4: 75,
      5: 90,
      6: 100,
    };
    const currentPercent = percentages[currentStep] || 15;

    return (
      <div className="signup-progress-wrapper">
        <div className="signup-progress-info">
          <span className="signup-progress-label">Progresso do cadastro</span>
          <span className="signup-progress-number">{currentPercent}% concluído</span>
        </div>
        <div className="signup-progress-track">
          <div
            className="signup-progress-fill"
            style={{ width: `${currentPercent}%` }}
          />
        </div>
      </div>
    );
  };

  const renderCompanyStepContent = () => {
    return (
      <form onSubmit={handleCompanySubmit} className="company-form-step unified-company-step">
        <div className="company-step-header">
          <div className="step-badge-pill">⚡ Passo 2 de 5 • Configuração Rápida</div>
          <h3>Dados do seu Estabelecimento</h3>
          <p className="step-description">
            Digite o nome do seu negócio e selecione o ramo de atuação.
          </p>
        </div>

        <div className="company-field-block">
          <label className="company-field-label" htmlFor="companyNameInput">
            Nome do Estabelecimento *
          </label>
          <div className="input-wrapper">
            <input
              id="companyNameInput"
              type="text"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Ex: Barbearia do João, Studio Bella..."
              className="company-input"
              autoFocus
              required
            />
          </div>
        </div>

        <div className="company-field-block">
          <label className="company-field-label">Ramo de Atuação</label>
          <div className="compact-chips-grid">
            {categories.map((category) => {
              const isSelected = selectedCategory?.id === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`compact-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectCategory(category)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="company-field-block">
          <label className="company-field-label">Tamanho da Equipe / Porte</label>
          <div className="compact-chips-grid">
            {SCALE_OPTIONS.map((scale) => {
              const isSelected = selectedScale?.id === scale.id;
              return (
                <button
                  key={scale.id}
                  type="button"
                  className={`compact-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedScale(scale)}
                >
                  <strong>{scale.name}</strong>
                  <span>• {scale.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="company-field-block">
          <label className="company-field-label">
            Plano Desejado {isSupremacy10 ? "(com 10% OFF Exclusivo)" : ""}:
          </label>
          <div
            className="options-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
              gap: "8px",
            }}
          >
            {(["basico", "crescimento", "empresarial", "ilimitado"] as PlanType[]).map((pKey) => {
              const conf = PLAN_CONFIG[pKey];
              const isSelected =
                selectedPlanKey === pKey ||
                (selectedPlanKey === "alemdocorte" && pKey === "crescimento") ||
                (selectedPlanKey === "supremacy10" && pKey === "crescimento");
              return (
                <div
                  key={pKey}
                  className={`option-card ${isSelected ? "selected" : ""}`}
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    cursor: "pointer",
                    border: isSelected ? "2px solid #0077b6" : "1px solid #cbd5e1",
                    borderRadius: "10px",
                    background: isSelected ? "#f0f9ff" : "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                  onClick={() => setSelectedPlanKey(pKey)}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: isSelected ? "#0077b6" : "#334155",
                    }}
                  >
                    {conf.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: isSelected ? "#0284c7" : "#64748b",
                    }}
                  >
                    {conf.usersLimit}
                  </span>
                  <span style={{ textDecoration: "line-through", fontSize: "0.7rem", color: "#94a3b8" }}>
                    {conf.originalPrice}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#10b981" }}>
                    {conf.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="company-field-block">
          <div className="coupon-inline-box">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Cupom de Desconto (opcional)"
              className="company-input"
              readOnly={Boolean(isSupremacy10 || cupomParam)}
              disabled={Boolean(isSupremacy10 || cupomParam)}
            />
          </div>
          {isSupremacy &&
            (discountCode.toUpperCase() === "ALEMDOCORTE" ||
              discountCode.toUpperCase() === "SUPREMACY10") && (
              <p className="supremacy-applied-helper">
                ✓ Cupom ALEMDOCORTE aplicado (10% OFF em qualquer plano)!
              </p>
            )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="company-actions">
          <button type="submit" className="submit-btn final-btn" disabled={loading}>
            {loading ? <span className="loading-spinner"></span> : "Criar Empresa e Configurar Serviços →"}
          </button>
        </div>
      </form>
    );
  };

  const renderServicesStepContent = () => {
    const selectedCount = servicesList.filter((s) => s.selected && s.name.trim().length > 0).length;
    const allSelected = servicesList.length > 0 && servicesList.every((s) => s.selected);
    const branchLabel = selectedCategory?.name || "seu segmento";

    const filteredServices = servicesList.filter((srv) => {
      if (filterOnlySelected && !srv.selected) return false;
      if (serviceSearch.trim()) {
        return srv.name.toLowerCase().includes(serviceSearch.trim().toLowerCase());
      }
      return true;
    });

    return (
      <div className="services-onboarding-step">
        <div className="services-step-header">
          <div className="services-success-pill">
            🎉 Empresa <strong>{companyName}</strong> criada com sucesso!
          </div>
          <div className="step-badge-pill">⚡ Passo 3 de 5 • Catálogo de Serviços</div>
          <h3>Configure seus Serviços de {branchLabel}</h3>
          <p className="step-description">
            Personalizamos uma ampla variedade de serviços populares para <strong>{branchLabel}</strong>.
            Marque os que você oferece, ajuste os valores ou busque pelo nome:
          </p>
        </div>

        {/* Barra de Busca e Filtros Rápidos */}
        <div className="services-search-and-filters">
          <div className="services-search-box">
            <span className="services-search-icon">🔍</span>
            <input
              type="text"
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              placeholder={`Buscar entre os ${servicesList.length} serviços disponíveis...`}
              className="services-search-input"
            />
            {serviceSearch && (
              <button
                type="button"
                className="services-search-clear-btn"
                onClick={() => setServiceSearch("")}
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          <div className="services-filter-pills">
            <button
              type="button"
              className={`filter-pill-btn ${!filterOnlySelected ? "active" : ""}`}
              onClick={() => setFilterOnlySelected(false)}
            >
              Todos ({servicesList.length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filterOnlySelected ? "active" : ""}`}
              onClick={() => setFilterOnlySelected(true)}
            >
              Apenas Selecionados ({selectedCount})
            </button>
          </div>
        </div>

        <div className="services-toolbar">
          <span className="services-count-badge">
            ✅ <strong>{selectedCount}</strong>{" "}
            {selectedCount === 1 ? "serviço selecionado" : "serviços selecionados"}
          </span>
          <button
            type="button"
            className="services-select-all-btn"
            onClick={() => setServicesList((prev) => prev.map((s) => ({ ...s, selected: !allSelected })))}
          >
            {allSelected ? "Desmarcar todos" : "Selecionar todos"}
          </button>
        </div>

        <div className="preset-services-list">
          {filteredServices.length === 0 ? (
            <div className="empty-services-search">
              <p>Nenhum serviço encontrado com "{serviceSearch}".</p>
              <button
                type="button"
                className="add-quick-service-btn"
                onClick={() => handleAddCustomService(serviceSearch)}
              >
                + Criar serviço "{serviceSearch}"
              </button>
            </div>
          ) : (
            filteredServices.map((srv) => (
              <div
                key={srv.id}
                className={`preset-service-card ${srv.selected ? "active" : "inactive"}`}
              >
                <div className="preset-service-top">
                  <label className="preset-service-check">
                    <input
                      type="checkbox"
                      checked={srv.selected}
                      onChange={() => handleToggleService(srv.id)}
                    />
                  </label>

                  <div className="preset-service-name-wrap">
                    <label className="preset-mini-label">Nome do Serviço</label>
                    <input
                      type="text"
                      value={srv.name}
                      onChange={(e) => handleServiceFieldChange(srv.id, "name", e.target.value)}
                      placeholder="Nome do serviço"
                      className="preset-name-input"
                    />
                  </div>

                  {srv.id.startsWith("custom-") && (
                    <button
                      type="button"
                      className="preset-remove-btn"
                      onClick={() => handleRemoveService(srv.id)}
                      title="Remover serviço"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="preset-service-bottom">
                  <div className="preset-field-group">
                    <label className="preset-mini-label">Valor (R$)</label>
                    <div className="preset-price-input-wrap">
                      <span className="currency-prefix">R$</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={srv.price}
                        onChange={(e) => handleServiceFieldChange(srv.id, "price", e.target.value)}
                        placeholder="35,00"
                        className="preset-price-input"
                      />
                    </div>
                  </div>

                  <div className="preset-field-group">
                    <label className="preset-mini-label">Tempo de Duração</label>
                    <div className="preset-duration-control">
                      <button
                        type="button"
                        className="duration-step-btn"
                        onClick={() =>
                          handleServiceFieldChange(srv.id, "duration", Math.max(5, srv.duration - 5))
                        }
                        title="Diminuir 5 minutos"
                      >
                        −
                      </button>
                      <select
                        value={srv.duration}
                        onChange={(e) =>
                          handleServiceFieldChange(srv.id, "duration", Number(e.target.value))
                        }
                        className="preset-duration-select"
                      >
                        {[10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90, 120, 180].map((min) => (
                          <option key={min} value={min}>
                            {min} min
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="duration-step-btn"
                        onClick={() =>
                          handleServiceFieldChange(srv.id, "duration", Math.min(240, srv.duration + 5))
                        }
                        title="Aumentar 5 minutos"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          className="add-custom-service-btn"
          onClick={() => handleAddCustomService()}
        >
          + Adicionar outro serviço
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="services-onboarding-actions">
          <button
            type="button"
            className="submit-btn final-btn"
            onClick={handleSaveServices}
            disabled={loading}
          >
            {loading ? (
              <span className="saving-services-status">
                <span className="loading-spinner"></span>
                <span>{savingServicesText || "Salvando serviços..."}</span>
              </span>
            ) : selectedCount > 0 ? (
              `Salvar ${selectedCount} ${selectedCount === 1 ? "Serviço" : "Serviços"} e Continuar para Equipe →`
            ) : (
              "Continuar para Equipe →"
            )}
          </button>

          <button
            type="button"
            className="skip-services-btn"
            onClick={() => setCurrentStep(4)}
            disabled={loading}
          >
            Pular por enquanto e configurar depois →
          </button>
        </div>
      </div>
    );
  };

  // PASSO 4: ADICIONAR PROFISSIONAIS DA EQUIPE (NOME, NÚMERO, SENHA E COMISSÃO)
  const renderProfessionalsStepContent = () => {
    return (
      <div className="professionals-onboarding-step">
        <div className="company-step-header">
          <div className="step-badge-pill">⚡ Passo 4 de 5 • Equipe & Profissionais</div>
          <h3>Adicione os Profissionais da sua Equipe</h3>
          <p className="step-description">
            Cadastre quem atende com você para liberar a agenda e controle de comissões individual.
            Se você trabalha sozinho, basta clicar em continuar!
          </p>
        </div>

        {/* Card de Cadastro Rápido de Profissional */}
        <div className="add-prof-card">
          <div className="add-prof-title">
            <span>👤</span>
            <strong>Novo Profissional</strong>
          </div>

          <div className="prof-inputs-grid">
            <div className="form-group prof-field">
              <label htmlFor="newProfName">Nome Completo *</label>
              <input
                type="text"
                id="newProfName"
                value={newProfName}
                onChange={(e) => {
                  setNewProfName(e.target.value);
                  if (profError) setProfError(null);
                }}
                placeholder="Ex: Pedro Lucas"
              />
            </div>

            <div className="form-group prof-field">
              <label htmlFor="newProfPhone">Número / WhatsApp *</label>
              <input
                type="tel"
                id="newProfPhone"
                value={newProfPhone}
                onChange={(e) => {
                  setNewProfPhone(formatPhone(e.target.value));
                  if (profError) setProfError(null);
                }}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </div>

            <div className="form-group prof-field">
              <label htmlFor="newProfPassword">Senha de Acesso</label>
              <input
                type="text"
                id="newProfPassword"
                value={newProfPassword}
                onChange={(e) => setNewProfPassword(e.target.value)}
                placeholder="Padrão: 123456"
              />
            </div>

            <div className="form-group prof-field">
              <label htmlFor="newProfCommission">Comissão (%)</label>
              <div className="commission-input-wrap">
                <input
                  type="number"
                  id="newProfCommission"
                  min="0"
                  max="100"
                  value={newProfCommission}
                  onChange={(e) => setNewProfCommission(e.target.value)}
                  placeholder="50"
                />
                <span className="percent-suffix">%</span>
              </div>
            </div>
          </div>

          {profError && <div className="field-error-text prof-inline-error">{profError}</div>}

          <button
            type="button"
            className="add-prof-action-btn"
            onClick={handleAddProfessional}
          >
            + Adicionar Profissional à Lista
          </button>
        </div>

        {/* Lista de Profissionais Adicionados */}
        {professionalsList.length > 0 && (
          <div className="added-profs-section">
            <div className="added-profs-header">
              <span>👥 Profissionais adicionados ({professionalsList.length}):</span>
            </div>
            <div className="added-profs-list">
              {professionalsList.map((prof) => (
                <div key={prof.id} className="added-prof-chip">
                  <div className="prof-avatar-circle">
                    {prof.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="prof-chip-info">
                    <strong>{prof.name}</strong>
                    <span>{prof.phone} • {prof.commission}% comissão</span>
                  </div>
                  <button
                    type="button"
                    className="prof-chip-remove"
                    onClick={() => handleRemoveProfessional(prof.id)}
                    title="Remover profissional"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="services-onboarding-actions" style={{ marginTop: "18px" }}>
          <button
            type="button"
            className="submit-btn final-btn"
            onClick={handleSaveProfessionals}
            disabled={loading}
          >
            {loading ? (
              <span className="saving-services-status">
                <span className="loading-spinner"></span>
                <span>{savingProfText || "Salvando equipe..."}</span>
              </span>
            ) : professionalsList.length > 0 ? (
              `Salvar ${professionalsList.length} Profissional(is) e Definir Horários →`
            ) : (
              "Trabalho Sozinho (Continuar para Horários) →"
            )}
          </button>

          <button
            type="button"
            className="skip-services-btn"
            onClick={() => setCurrentStep(5)}
            disabled={loading}
          >
            Pular por enquanto e adicionar equipe depois →
          </button>
        </div>
      </div>
    );
  };

  // PASSO 5: HORÁRIO DE FUNCIONAMENTO (PADRÃO SEG A SÁB 09:00 ÀS 20:00)
  const renderScheduleStepContent = () => {
    return (
      <div className="schedule-onboarding-step">
        <div className="company-step-header">
          <div className="step-badge-pill">⚡ Passo 5 de 5 • Horário de Funcionamento</div>
          <h3>Horário de Funcionamento</h3>
          <p className="step-description">
            Definimos por padrão <strong>Segunda a Sábado das 09:00 às 20:00</strong>.
            Ajuste os dias abertos e horários como preferir:
          </p>
        </div>

        {/* Atalhos Rápidos */}
        <div className="schedule-presets-row">
          <span className="schedule-presets-label">⚡ Predefinições:</span>
          <button
            type="button"
            className="schedule-preset-btn active"
            onClick={() => handleApplySchedulePreset("seg-sab")}
          >
            Seg a Sáb (09h - 20h)
          </button>
          <button
            type="button"
            className="schedule-preset-btn"
            onClick={() => handleApplySchedulePreset("seg-sex")}
          >
            Seg a Sex (08h - 19h)
          </button>
          <button
            type="button"
            className="schedule-preset-btn"
            onClick={() => handleApplySchedulePreset("todos")}
          >
            Todos os dias
          </button>
        </div>

        {/* Lista de Dias da Semana */}
        <div className="schedule-days-list">
          {scheduleList.map((day) => (
            <div key={day.dayId} className={`schedule-day-row ${day.isOpen ? "open" : "closed"}`}>
              <label className="schedule-day-toggle">
                <input
                  type="checkbox"
                  checked={day.isOpen}
                  onChange={() => handleScheduleToggle(day.dayId)}
                />
                <span className="toggle-switch-slider"></span>
              </label>

              <div className="schedule-day-name">
                <strong>{day.name}</strong>
              </div>

              {day.isOpen ? (
                <div className="schedule-day-times">
                  <div className="time-input-group">
                    <span className="time-label">Das</span>
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => handleScheduleTimeChange(day.dayId, "startTime", e.target.value)}
                      className="time-picker-input"
                    />
                  </div>
                  <div className="time-input-group">
                    <span className="time-label">às</span>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => handleScheduleTimeChange(day.dayId, "endTime", e.target.value)}
                      className="time-picker-input"
                    />
                  </div>
                </div>
              ) : (
                <div className="schedule-closed-badge">
                  <span>Fechado</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="services-onboarding-actions" style={{ marginTop: "18px" }}>
          <button
            type="button"
            className="submit-btn final-btn"
            onClick={handleSaveSchedule}
            disabled={loading}
          >
            {loading ? (
              <span className="saving-services-status">
                <span className="loading-spinner"></span>
                <span>{savingScheduleText || "Salvando horários..."}</span>
              </span>
            ) : (
              "Concluir e Ver Meu Link de Agendamento 🚀"
            )}
          </button>

          <button
            type="button"
            className="skip-services-btn"
            onClick={() => setCurrentStep(6)}
            disabled={loading}
          >
            Manter horário padrão e avançar →
          </button>
        </div>
      </div>
    );
  };

  // PASSO 6: TELA FINAL DE SUCESSO, ATIVAÇÃO E LINK DE AGENDAMENTO
  const renderSuccessStepContent = () => {
    const bookingUrl = `https://agendamentos.gestaoboa.com.br/?enterprise_id=${createdEnterpriseId || ""}`;
    const directAppUrl = getDirectAppUrl();
    const asaasUrl =
      planConfig?.paymentLink && createdEnterpriseId
        ? `${planConfig.paymentLink}${planConfig.paymentLink.includes("?") ? "&" : "?"}externalReference=${createdEnterpriseId}`
        : planConfig?.paymentLink;

    return (
      <div className="success-onboarding-card">
        <div className="success-header-celebration">
          <div className="celebration-badge">🎉 PARABÉNS!</div>
          <h2>Sua empresa está pronta para receber agendamentos!</h2>
          <div className="trial-active-pill">
            <span className="pulse-dot"></span>
            <strong>10 Dias de Teste Grátis Ativados sem Cartão</strong>
          </div>
          <p className="success-subdesc">
            Seu sistema <strong>Gestão Boa</strong> para <strong>{companyName}</strong> já está configurado com
            serviços, profissionais, horários e link de agendamento online.
          </p>
        </div>

        {/* Card do Link de Agendamento Online em Grande Destaque */}
        <div className="booking-link-highlight-box">
          <div className="booking-link-header">
            <span className="booking-link-icon">🔗</span>
            <div>
              <strong>Seu Link de Agendamento Online:</strong>
              <p>Compartilhe no seu Instagram ou WhatsApp para seus clientes agendarem 24h por dia:</p>
            </div>
          </div>
          <div className="booking-link-action-row">
            <input type="text" readOnly value={bookingUrl} className="booking-url-input" />
            <button
              type="button"
              className={`copy-link-btn ${copiedLink ? "copied" : ""}`}
              onClick={handleCopyBookingLink}
            >
              {copiedLink ? "✓ Copiado!" : "Copiar Link"}
            </button>
          </div>
        </div>

        {/* Botão Primário: Entrar no App Logado */}
        <div className="direct-access-action-wrapper">
          <a
            href={directAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="direct-access-primary-btn"
          >
            <span>Acessar Painel Agora no Navegador 🚀</span>
            <small>Entrada direta sem precisar digitar senha</small>
          </a>
        </div>

        {/* WhatsApp & Suporte */}
        <div className="onboarding-support-row">
          <a
            href={getWhatsAppMessageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-quick-link-btn"
          >
            <span>📲 Abrir resumo no meu WhatsApp</span>
          </a>
          <a
            href={`https://wa.me/5551989020478?text=${encodeURIComponent(`Olá! Acabei de criar minha conta na Gestão Boa para a empresa ${companyName}. Gostaria de suporte para começar!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-support-btn"
          >
            <span>💬 Falar com Suporte Gestão Boa</span>
          </a>
        </div>

        {/* Download dos Apps */}
        <div className="app-download-final-section">
          <h4>Prefere usar pelo celular? Baixe o app:</h4>
          <div className="app-download-badges final-badges">
            <a
              href={IOS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-badge-btn"
              title="Baixar na App Store"
            >
              <AppleIcon width={22} height={22} />
              <div className="app-store-btn-labels">
                <span className="app-store-sub">Disponível na</span>
                <span className="app-store-main">App Store</span>
              </div>
            </a>

            <a
              href={ANDROID_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-badge-btn play-store-badge-btn"
              title="Baixar no Google Play"
            >
              <GooglePlayIcon width={22} height={22} />
              <div className="app-store-btn-labels">
                <span className="app-store-sub">Disponível no</span>
                <span className="app-store-main">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Opção Opcional de Assinatura Definitiva com Desconto */}
        {asaasUrl && (
          <div className="optional-checkout-banner">
            <div className="optional-checkout-content">
              <div>
                <strong>Deseja ativar seu plano definitivo agora com 10% OFF?</strong>
                <p>
                  Plano <strong>{planConfig.name}</strong> por <strong>{planConfig.price}</strong> com garantia
                  incondicional de 7 dias.
                </p>
              </div>
              <a
                href={asaasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="activate-plan-secondary-btn"
              >
                Garantir Desconto do Plano →
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="signup-page">
      <Helmet>
        <title>
          {isSupremacy10
            ? "Além do Corte evento em Pelotas - Criar Conta | Gestão Boa"
            : "Criar Conta | Teste Grátis de 10 Dias - Gestão Boa"}
        </title>
        <meta
          name="description"
          content={
            isSupremacy10
              ? "Crie sua conta exclusiva de Além do Corte na Gestão Boa com 10% de desconto em todos os planos."
              : "Crie sua conta na Gestão Boa e experimente por 10 dias grátis sem cartão de crédito. Agendamento online, financeiro e controle total."
          }
        />
        <link rel="canonical" href="https://gestaoboa.com.br/criar-conta" />
      </Helmet>

      {/* Banner de Oferta Exclusiva com Timer Regressivo de 24h */}
      <div className="exclusive-offer-topbar">
        <div className="exclusive-offer-container">
          <div className="exclusive-offer-left">
            <span className="offer-fire-badge">🔥 Condição especial de Novembro</span>
          </div>
          <div className="exclusive-offer-timer-box">
            <span className="timer-caption">Expira em:</span>
            <div className="timer-digits-row">
              <div className="timer-digit-unit">
                <span className="digit-val">{formatTimerPad(timeLeft.hours)}</span>
                <span className="digit-lbl">h</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-digit-unit">
                <span className="digit-val">{formatTimerPad(timeLeft.minutes)}</span>
                <span className="digit-lbl">m</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-digit-unit highlight-sec">
                <span className="digit-val">{formatTimerPad(timeLeft.seconds)}</span>
                <span className="digit-lbl">s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="signup-header">
        <div className="header-content">
          <div className="header-brand-group">
            <a href="/" className="logo">
              <img src="/beasier-1-1-1@2x.png" alt="Gestão Boa" />
            </a>
            <div className="header-official-badge">
              <span className="official-dot" />
              <span>
                Cadastro Oficial • <strong>Gestão Boa</strong>
              </span>
            </div>
          </div>
          <div className="header-actions">
            {planConfig && (
              <div className="plan-badge">
                {planConfig.discount && <span className="discount-badge">{planConfig.discount}</span>}
                <span className="plan-name">Plano {planConfig.name}</span>
                <span className="plan-price">
                  {planConfig.originalPrice && (
                    <span className="original-price">{planConfig.originalPrice}</span>
                  )}
                  {planConfig.price}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="signup-main">
        <div className="signup-container">
          {/* Left Side - Info */}
          <div className="signup-info">
            {isSupremacy10 ? (
              <>
                <div className="gestao-boa-pill-tag">✨ SISTEMA GESTÃO BOA</div>
                <h1>
                  Bem-vindo ao Gestão Boa, participante do{" "}
                  <span className="highlight">Além do Corte</span>!
                </h1>
                <p className="info-description">
                  Crie sua conta em menos de 1 minuto, cadastre seus serviços em 1 clique e aproveite 10% de
                  desconto em todos os planos!
                </p>

                <div className="supremacy-promo-card">
                  <div className="supremacy-tag">
                    <span>🏆 BENEFÍCIO EXCLUSIVO</span>
                  </div>
                  <div className="supremacy-content">
                    <div className="supremacy-discount-header">
                      <span className="supremacy-discount-num">10% OFF</span>
                      <span className="supremacy-discount-txt">em todos os planos</span>
                    </div>
                    <div className="supremacy-coupon-box">
                      <span>Cupom aplicado:</span>
                      <strong>ALEMDOCORTE</strong>
                    </div>
                  </div>
                </div>
              </>
            ) : selectedPlanKey === "black-friday" ? (
              <>
                <div className="gestao-boa-pill-tag">✨ CADASTRO OFICIAL GESTÃO BOA</div>
                <h1>
                  🔥 Aproveite a <span className="highlight">Black Friday</span>
                </h1>
                <p className="info-description">
                  Garanta acesso completo ao sistema por apenas R$ 9,90 e transforme a gestão do seu negócio!
                </p>
              </>
            ) : (
              <>
                <div className="gestao-boa-pill-tag">✨ CADASTRO OFICIAL GESTÃO BOA</div>
                <h1>
                  Comece sua jornada com o <span className="highlight">Gestão Boa</span>
                </h1>
                <p className="info-description">
                  Simplifique a agenda, equipe e horário do seu estabelecimento em poucos minutos.
                </p>
              </>
            )}

            {/* Galeria Visual de Nichos (Beleza, Barbearia, Salão, Estética) */}
            <div className="beauty-niches-visual-grid">
              <div className="beauty-niche-card">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=450&h=300&fit=crop&crop=center&q=80"
                  alt="Barbearia e Corte Masculino"
                  loading="lazy"
                />
                <div className="beauty-niche-overlay">
                  <span className="niche-badge">Barbearias</span>
                  <span className="niche-detail">Agendamento & Cadeiras</span>
                </div>
              </div>
              <div className="beauty-niche-card">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=450&h=300&fit=crop&crop=center&q=80"
                  alt="Salão de Beleza e Cabelo"
                  loading="lazy"
                />
                <div className="beauty-niche-overlay">
                  <span className="niche-badge">Salões de Beleza</span>
                  <span className="niche-detail">Cortes & Mechas</span>
                </div>
              </div>
              <div className="beauty-niche-card">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=450&h=300&fit=crop&crop=center&q=80"
                  alt="Estética e Tratamentos"
                  loading="lazy"
                />
                <div className="beauty-niche-overlay">
                  <span className="niche-badge">Clínicas de Estética</span>
                  <span className="niche-detail">Tratamentos Faciais</span>
                </div>
              </div>
              <div className="beauty-niche-card">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=450&h=300&fit=crop&crop=center&q=80"
                  alt="Unhas e Esmalteria"
                  loading="lazy"
                />
                <div className="beauty-niche-overlay">
                  <span className="niche-badge">Manicure & Nails</span>
                  <span className="niche-detail">Alongamentos & Spa</span>
                </div>
              </div>
            </div>

            {selectedPlanKey === "black-friday" && (
              <div className="guarantee-box">
                <span className="guarantee-icon">🛡️</span>
                <div>
                  <strong>Garantia de 7 dias</strong>
                  <p>Se não gostar, devolvemos 100% do seu dinheiro</p>
                </div>
              </div>
            )}

            <div className="app-download-box">
              <div className="app-download-info">
                <strong>Baixe nosso aplicativo</strong>
                <p>Disponível para iOS e Android</p>
              </div>
              <div className="app-download-badges">
                <a
                  href={IOS_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-badge-btn"
                  title="Baixar na App Store"
                >
                  <AppleIcon width={20} height={20} />
                  <div className="app-store-btn-labels">
                    <span className="app-store-sub">Disponível na</span>
                    <span className="app-store-main">App Store</span>
                  </div>
                </a>

                <a
                  href={ANDROID_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-badge-btn play-store-badge-btn"
                  title="Baixar no Google Play"
                >
                  <GooglePlayIcon width={20} height={20} />
                  <div className="app-store-btn-labels">
                    <span className="app-store-sub">Disponível no</span>
                    <span className="app-store-main">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Form Wrapper */}
          <div className="signup-form-wrapper">
            {renderStepIndicator()}

            <div className="form-card">

              {/* Context Bar */}
              <div className="form-brand-context-bar">
                <div className="form-brand-context-left">
                  <span className="form-brand-shield">🛡️</span>
                  <span>
                    Cadastro na <strong>Gestão Boa</strong>
                  </span>
                </div>
                <span className="form-brand-time-badge">⏱️ Rápido • 1 min</span>
              </div>

              {isSupremacy10 && currentStep === 1 && (
                <div className="mobile-promo-callout">
                  <span>
                    🏆 <strong>Além do Corte evento em Pelotas</strong>
                  </span>
                  <span className="mobile-promo-pill">Cupom ALEMDOCORTE • 10% OFF</span>
                </div>
              )}

              {/* Step 1: Create Account */}
              {currentStep === 1 && (
                <>
                  <div className="form-header">
                    <h2>Crie sua conta na Gestão Boa</h2>
                    <p>Preencha seus dados para liberar seu teste gratuito de 10 dias imediatamente:</p>
                  </div>

                  <form onSubmit={handleSubmit} className="signup-form" noValidate>
                    <div className="form-group">
                      <label htmlFor="fullName">Seu Nome Completo *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ex: Carlos Silva"
                        autoFocus
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">WhatsApp / Celular *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className={phoneError ? "input-error" : ""}
                        required
                      />
                      {phoneError && (
                        <span className="field-error-text">
                          Por favor, insira um celular/WhatsApp válido com DDD.
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Seu E-mail <small style={{ color: "#64748b", fontWeight: 400 }}>(recomendado)</small>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                        placeholder="seu@email.com"
                        className={emailError ? "input-error" : ""}
                      />
                      {emailError && (
                        <span className="field-error-text">Por favor, insira um e-mail válido.</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Crie uma Senha *</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handlePasswordBlur}
                          placeholder="Mínimo 6 caracteres"
                          className={passwordError ? "input-error" : ""}
                          required
                        />
                        <button
                          type="button"
                          className="toggle-password-btn"
                          onClick={() => setShowPassword((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                      </div>
                      {passwordError && (
                        <span className="field-error-text">A senha deve ter pelo menos 6 caracteres.</span>
                      )}
                    </div>

                    <div className="terms-wrapper">
                      <div className={`checkbox-group ${termsError ? "checkbox-group-error" : ""}`}>
                        <input
                          type="checkbox"
                          id="terms"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                        />
                        <label htmlFor="terms">
                          Li e concordo com os{" "}
                          <a href="/terms" target="_blank" rel="noopener noreferrer">
                            Termos de Uso
                          </a>{" "}
                          e{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer">
                            Política de Privacidade
                          </a>
                        </label>
                      </div>
                      {termsError && (
                        <span className="terms-error-text">
                          Você precisa aceitar os termos de uso para continuar.
                        </span>
                      )}
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        "Criar Minha Conta e Continuar →"
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* Step 2: Company Setup */}
              {currentStep === 2 && renderCompanyStepContent()}

              {/* Step 3: Services Setup */}
              {currentStep === 3 && renderServicesStepContent()}

              {/* Step 4: Team / Professionals Setup */}
              {currentStep === 4 && renderProfessionalsStepContent()}

              {/* Step 5: Schedule / Working Hours Setup */}
              {currentStep === 5 && renderScheduleStepContent()}

              {/* Step 6: Success & Immediate Activation with Online Booking Link */}
              {currentStep === 6 && renderSuccessStepContent()}
            </div>

            {currentStep < 6 && (
              <div className="signup-bottom-links">
                <p className="login-link">
                  Já tem uma conta na Gestão Boa?{" "}
                  <a href="https://app.gestaoboa.com.br">Fazer login</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="signup-footer">
        <div className="footer-content">
          <p>© 2025 Gestão Boa. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="/terms">Termos de Uso</a>
            <a href="/privacy">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CriarConta;
