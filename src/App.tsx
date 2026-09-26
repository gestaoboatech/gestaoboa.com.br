import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import AnuncioGestaoBoa from "./pages/AnuncioGestaoBoa";
import Barbershop from "./pages/Barbershop";
import Home from "./pages/Home";
import Price from "./pages/Price";
import Privacy from "./pages/Privacy";
import Sales from "./pages/Sales";
import SalaoEstetica from "./pages/SalaoEstetica";
import Solution from "./pages/Solution";
import Terms from "./pages/Terms";
import BlackFriday from "./pages/BlackFriday";
import CriarConta from "./pages/CriarConta";
import BotGestor from "./pages/BotGestor";
import SincaRS from "./pages/SincaRS";
import Influenciador from "./pages/Influenciador";
import RegulamentoIndicacao from "./pages/RegulamentoIndicacao";
import WhatsAppButton from "./components/WhatsAppButton";
import PostHogPageViewTracker from "./components/PostHogPageViewTracker";

function App() {
  return (
    <BrowserRouter>
      <PostHogPageViewTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/preco" element={<Price />} />
        <Route path="/solucao" element={<Solution />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/barbearia" element={<Barbershop />} />
        <Route path="/salao-estetica" element={<SalaoEstetica />} />
        <Route path="/anuncio-gestaoboa" element={<AnuncioGestaoBoa />} />
        <Route path="/black-friday" element={<BlackFriday/>} />
        <Route path="/botgestor" element={<BotGestor />} />
        <Route path="/SincaRS" element={<SincaRS />} />
        <Route path="/sincars" element={<SincaRS />} />
        <Route path="/sinca-rs" element={<SincaRS />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/supremacy10" element={<CriarConta />} />
        <Route path="/supremacy-10" element={<CriarConta />} />
        <Route path="/supremacy" element={<CriarConta />} />
        <Route path="/influenciador" element={<Influenciador />} />
        <Route path="/regulamento-indicacao" element={<RegulamentoIndicacao />} />
        <Route path="/termos-indicacao" element={<RegulamentoIndicacao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
