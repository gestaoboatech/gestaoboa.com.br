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

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
