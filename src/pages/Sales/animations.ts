import { createGlobalStyle, keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(255, 193, 7, 0.6); }
  50% { box-shadow: 0 0 50px rgba(255, 193, 7, 0.9); }
`;

const AnimationsStyle = createGlobalStyle`
  /* Classes de delay para elementos */
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }

  /* Classe popular para o plano destacado */
  .popular-badge {
    background-color: #fbbf24;
    color: #000;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 700;
    display: inline-block;
    margin-bottom: 1rem;
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }
`;

export default AnimationsStyle;
