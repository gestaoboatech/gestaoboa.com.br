import { useLocation } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

/** Ativa as animações de entrada em todas as páginas (reinicia a cada rota). */
export default function ScrollReveal() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);
  return null;
}
