import { useEffect, useState } from "react";
import "./styles.css";

// --- Constantes de Configuração ---
const TOTAL_DURATION = 76000;

// --- Componentes de Cena ---
const LogoBenefitsScene = () => (
  <div id="anuncio-logo-benefits-section" className="anuncio-animation-section">
    <img
      src="3.png"
      alt="Logo Gestão Boa"
      className="anuncio-logo-image"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "https://placehold.co/180x180/0B1B34/FFFFFF?text=Logo";
      }}
    />
    <div className="anuncio-benefits-text-container">
      <p className="anuncio-benefit-text anuncio-benefit-text-1">
        Organize sua barbearia/salão
      </p>
      <p className="anuncio-benefit-text anuncio-benefit-text-2">
        Decisões baseadas em dados
      </p>
      <p className="anuncio-benefit-text anuncio-benefit-text-3">
        Aumente seu faturamento
      </p>
    </div>
  </div>
);

const BeforeAfterScene = () => (
  <div id="anuncio-before-after-section" className="anuncio-animation-section">
    <div className="anuncio-before-after-container">
      <h2 className="anuncio-before-after-title">Transformação Real</h2>
      <div className="anuncio-comparison-grid">
        <div className="anuncio-comparison-side before">
          <h3 className="anuncio-comparison-title">❌ Antes do Gestão Boa</h3>
          <ul className="anuncio-comparison-list">
            <li>Agenda bagunçada</li>
            <li>Perdas no caixa</li>
            <li>Clientes esquecidos</li>
            <li>Sem controle de estoque</li>
            <li>Planilhas confusas</li>
          </ul>
        </div>
        <div className="anuncio-comparison-side after">
          <h3 className="anuncio-comparison-title">✅ Depois do Gestão Boa</h3>
          <ul className="anuncio-comparison-list">
            <li>Agenda organizada</li>
            <li>Controle total do caixa</li>
            <li>Clientes fidelizados</li>
            <li>Estoque controlado</li>
            <li>Relatórios automáticos</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const StatsScene = () => (
  <div id="anuncio-stats-section" className="anuncio-animation-section">
    <div className="anuncio-stats-container">
      <h2 className="anuncio-stats-title">Números que Impressionam</h2>
      <div className="anuncio-stats-grid">
        <div className="anuncio-stat-item">
          <div className="anuncio-stat-number">+1K</div>
          <div className="anuncio-stat-label">Clientes Cadastrados</div>
        </div>
        <div className="anuncio-stat-item">
          <div className="anuncio-stat-number">+500</div>
          <div className="anuncio-stat-label">Agendamentos Realizados</div>
        </div>
        <div className="anuncio-stat-item">
          <div className="anuncio-stat-number">+R$150k</div>
          <div className="anuncio-stat-label">Faturamento Gerenciado</div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesScene = () => (
  <div id="anuncio-features-section" className="anuncio-animation-section">
    <div className="anuncio-features-content">
      <ul className="anuncio-features-list">
        <li className="anuncio-feature-list-item">Controle de caixa</li>
        <li className="anuncio-feature-list-item">Gestão de clientes</li>
        <li className="anuncio-feature-list-item">Comissionamento</li>
        <li className="anuncio-feature-list-item">Gestão de estoque</li>
        <li className="anuncio-feature-list-item">Agenda online</li>
        <li className="anuncio-feature-list-item">Inteligência artificial</li>
      </ul>
      <img
        src="app.png"
        alt="App Gestão Boa"
        className="anuncio-app-image"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/300x400/007BFF/FFFFFF?text=APP";
        }}
      />
    </div>
  </div>
);

const TestimonialScene = () => (
  <div id="anuncio-testimonial-section" className="anuncio-animation-section">
    <div className="anuncio-testimonial-content">
      <img
        src="leandro.png"
        alt="Leandro Figueiredo"
        className="anuncio-testimonial-image"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/200x200/5CADFF/FFFFFF?text=LF";
        }}
      />
      <blockquote className="anuncio-testimonial-text">
        "Hoje tenho clareza total dos números, consigo tomar decisões mais
        inteligentes e garantir a saúde financeira da barbearia."
      </blockquote>
      <cite className="anuncio-testimonial-author">
        Leandro Figueiredo, Barbearia Duque
      </cite>
    </div>
  </div>
);

const CtaScene = () => (
  <div id="anuncio-cta-section" className="anuncio-animation-section">
    <div className="anuncio-cta-container">
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https://gestaoboa.com.br&bgcolor=0B1B34&color=FFFFFF&qzone=1"
        alt="QR Code para começar"
        className="anuncio-qr-code"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/600x600/ffffff/0B1B34?text=QRCode";
        }}
      />
      <h2 className="anuncio-cta-headline">Comece Agora!</h2>
      <p className="anuncio-cta-subheadline">
        Aponte a câmera e revolucione sua gestão.
      </p>
    </div>
  </div>
);

// --- Componente Principal ---

export default function AnuncioGestaoBoa() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Start the first cycle
    setIsPlaying(true);

    // Set up infinite loop
    const loopInterval = setInterval(() => {
      // Start restart animation
      setIsPlaying(false);

      // Reset after a brief pause for smooth transition
      setTimeout(() => {
        setIsPlaying(true);
      }, 500); // Increased to 1 second for smoother transition
    }, TOTAL_DURATION);

    return () => {
      clearInterval(loopInterval);
    };
  }, []);

  return (
    <div className={`anuncio-video-container ${isPlaying ? "is-playing" : ""}`}>
      <LogoBenefitsScene />
      <FeaturesScene />
      <StatsScene />
      <BeforeAfterScene />
      <TestimonialScene />
      <CtaScene />
      {/* <AdScene /> */}
    </div>
  );
}
