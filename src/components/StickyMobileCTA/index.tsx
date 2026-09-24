import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FB_PIXEL } from "../../utils/pixel";

const StickyContainer = styled.div<{ $visible: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid rgba(226, 232, 240, 0.95);
    padding: 10px 16px;
    padding-bottom: max(10px, env(safe-area-inset-bottom, 10px));
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    z-index: 999;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(${({ $visible }) => ($visible ? "0" : "100%")});
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const StickyInfo = styled.div`
  display: flex;
  flex-direction: column;

  .main-text {
    font-size: 0.85rem;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .sub-text {
    font-size: 0.725rem;
    color: #059669;
    font-weight: 600;
  }
`;

const StickyButton = styled.a`
  background: linear-gradient(135deg, #0077b6 0%, #0096c7 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.28);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 119, 182, 0.36);
    color: #ffffff;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const EXCLUDED_ROUTES = new Set([
  "/criar-conta",
  "/terms",
  "/privacy",
  "/privacidade",
  "/regulamento-indicacao",
  "/termos-indicacao",
]);

export const StickyMobileCTA: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece após rolar 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (EXCLUDED_ROUTES.has(location.pathname)) {
    return null;
  }

  return (
    <StickyContainer $visible={visible}>
      <StickyInfo>
        <span className="main-text">⚡ Gestão Boa</span>
        <span className="sub-text">10 dias grátis • Sem cartão</span>
      </StickyInfo>
      <StickyButton
        href="/criar-conta"
        onClick={(e) => {
          e.preventDefault();
          FB_PIXEL.trackCustomEvent("StickyMobileCTAClick", {
            location: "mobile_bottom_bar",
            source_page: location.pathname,
          });
          navigate("/criar-conta");
        }}
      >
        Testar Grátis ➔
      </StickyButton>
    </StickyContainer>
  );
};

export default StickyMobileCTA;
