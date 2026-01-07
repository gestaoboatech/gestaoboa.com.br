import { loadStripe, Stripe } from "@stripe/stripe-js";

// Chave pública do Stripe (deve ser configurada nas variáveis de ambiente)
const STRIPE_PUBLIC_KEY =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_...";

// Instância do Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export const stripeConfig = {
  publicKey: STRIPE_PUBLIC_KEY,
  options: {
    stripeAccount: undefined, // Para conectar contas
  },
};
