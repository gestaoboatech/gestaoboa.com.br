import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import WhatsAppButton from "./components/WhatsAppButton";
import PostHogPageViewTracker from "./components/PostHogPageViewTracker";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsentModal from "./components/CookieConsentModal";
import RouteLoadingFallback from "./components/RouteLoadingFallback";
import StickyMobileCTA from "./components/StickyMobileCTA";

// Lazy-loaded routes for optimal initial bundle size
const About = lazy(() => import("./pages/About"));
const AnuncioGestaoBoa = lazy(() => import("./pages/AnuncioGestaoBoa"));
const Barbershop = lazy(() => import("./pages/Barbershop"));
const Price = lazy(() => import("./pages/Price"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Sales = lazy(() => import("./pages/Sales"));
const SalaoEstetica = lazy(() => import("./pages/SalaoEstetica"));
const Solution = lazy(() => import("./pages/Solution"));
const Terms = lazy(() => import("./pages/Terms"));
const BlackFriday = lazy(() => import("./pages/BlackFriday"));
const CriarConta = lazy(() => import("./pages/CriarConta"));
const BotGestor = lazy(() => import("./pages/BotGestor"));
const SincaRS = lazy(() => import("./pages/SincaRS"));
const Influenciador = lazy(() => import("./pages/Influenciador"));
const RegulamentoIndicacao = lazy(() => import("./pages/RegulamentoIndicacao"));

function PromoRedirect() {
  const [searchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  newParams.set("cupom", "ALEMDOCORTE");
  return <Navigate to={`/criar-conta?${newParams.toString()}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PostHogPageViewTracker />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/preco" element={<Price />} />
          <Route path="/solucao" element={<Solution />} />
          <Route path="/vendas" element={<Sales />} />
          <Route path="/barbearia" element={<Barbershop />} />
          <Route path="/salao-estetica" element={<SalaoEstetica />} />
          <Route path="/salao-esetica" element={<Navigate to="/salao-estetica" replace />} />
          <Route path="/anuncio-gestaoboa" element={<AnuncioGestaoBoa />} />
          <Route path="/black-friday" element={<BlackFriday />} />
          <Route path="/botgestor" element={<BotGestor />} />
          <Route path="/SincaRS" element={<SincaRS />} />
          <Route path="/sincars" element={<SincaRS />} />
          <Route path="/sinca-rs" element={<SincaRS />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/supremacy10" element={<PromoRedirect />} />
          <Route path="/supremacy-10" element={<PromoRedirect />} />
          <Route path="/supremacy" element={<PromoRedirect />} />
          <Route path="/alemdocorte" element={<PromoRedirect />} />
          <Route path="/alem-do-corte" element={<PromoRedirect />} />
          <Route path="/influenciador" element={<Influenciador />} />
          <Route path="/regulamento-indicacao" element={<RegulamentoIndicacao />} />
          <Route path="/termos-indicacao" element={<RegulamentoIndicacao />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <CookieConsentModal />
      <StickyMobileCTA />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
