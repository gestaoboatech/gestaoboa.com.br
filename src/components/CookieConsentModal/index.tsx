import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const CookieConsentModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent !== "true") {
      setIsVisible(true);
    }
    // O Facebook Pixel já está carregado no index.html, então não fazemos nada aqui
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
    
    // Opcional: Rastrear o evento de consentimento
    if (window.fbq) {
      window.fbq('track', 'CookieConsent');
    }
    console.log("Consentimento de cookies aceito!");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent-modal">
      <div className="cookie-consent-content">
        <p>
          Nós usamos cookies para melhorar sua experiência e para fins de marketing. Ao continuar, você concorda com o uso de cookies. Saiba mais em nossa{" "}
          <Link to="/privacidade" className="cookie-privacy-link">
            Política de Privacidade
          </Link>
          .
        </p>
        <button onClick={handleAccept} className="cookie-accept-button">
          Aceitar e Fechar
        </button>
      </div>
    </div>
  );
};

export default CookieConsentModal;
