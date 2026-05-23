import styled, { keyframes } from "styled-components";

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 180, 216, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(0, 180, 216, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 180, 216, 0);
  }
`;

export const CalculatorContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: span 12;
  justify-self: center;
  width: calc(100% - 40px);
  max-width: 1100px; /* Reduced slightly for compact look */
  margin: 2.5rem auto; /* Reduced margin */
  padding: 2.25rem 2rem; /* Reduced padding */
  background: #ffffff;
  border-radius: 20px; /* More delicate border radius */
  box-shadow: 0 15px 35px -15px rgba(3, 4, 94, 0.05);
  border: 1px solid #e2e8f0;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Soft radial glow backgrounds inside the calculator card */
  &::before {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.04) 0%, rgba(0, 180, 216, 0) 70%);
    top: -50px;
    right: -50px;
    border-radius: 50%;
    filter: blur(35px);
    pointer-events: none;
  }

  .calc-title {
    font-size: 1.85rem; /* Reduced title size */
    font-weight: 800;
    color: #03045e;
    margin-bottom: 0.4rem;
  }

  .calc-subtitle {
    font-size: 0.95rem; /* Reduced subtitle size */
    color: #64748b;
    margin-bottom: 2rem; /* Reduced margin */
    max-width: 650px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
    margin: 1.5rem auto;
    width: calc(100% - 30px);

    .calc-title {
      font-size: 1.5rem;
    }
    .calc-subtitle {
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem; /* Reduced gap */
  width: 100%;
  text-align: left;
  position: relative;
  z-index: 2;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const CalculatorInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Reduced gap */
  background: #f8fafc;
  padding: 1.75rem; /* Reduced padding */
  border-radius: 16px;
  border: 1px solid #f1f5f9;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-weight: 700;
      color: #1e293b;
      font-size: 0.95rem; /* Slightly smaller label */
    }

    .value-display {
      font-size: 1.1rem; /* Slightly smaller display */
      font-weight: 800;
      color: #0077b6;
      background: rgba(0, 119, 182, 0.06);
      padding: 3px 10px;
      border-radius: 6px;
      border: 1px solid rgba(0, 119, 182, 0.12);
    }
  }

  /* Sliders custom styling */
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 6px; /* Thinner line */
    border-radius: 3px;
    background: #e2e8f0;
    outline: none;
    margin: 8px 0;
    transition: background 0.3s;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px; /* Smaller thumb */
      height: 20px;
      border-radius: 50%;
      background: #0077b6;
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(0, 119, 182, 0.25);
      transition: transform 0.1s, background-color 0.2s;

      &:hover {
        transform: scale(1.1);
        background: #03045e;
      }
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #0077b6;
      cursor: pointer;
      border: none;
      box-shadow: 0 3px 8px rgba(0, 119, 182, 0.25);
      transition: transform 0.1s, background-color 0.2s;

      &:hover {
        transform: scale(1.1);
        background: #03045e;
      }
    }

    &:disabled {
      background: #e2e8f0;
      opacity: 0.5;
      &::-webkit-slider-thumb {
        background: #94a3b8;
        cursor: not-allowed;
        box-shadow: none;
      }
      &::-moz-range-thumb {
        background: #94a3b8;
        cursor: not-allowed;
        box-shadow: none;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
    gap: 1.25rem;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  width: 100%;
  box-sizing: border-box;
  
  label.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
  }
  
  label.switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider-switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e1;
    transition: .3s;
    border-radius: 22px;
  }
  
  .slider-switch:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
  }
  
  input:checked + .slider-switch {
    background-color: #0077b6;
  }
  
  input:checked + .slider-switch:before {
    transform: translateX(18px);
  }
  
  .switch-label-group {
    display: flex;
    flex-direction: column;
    text-align: left;
    
    .switch-text {
      font-size: 0.9rem;
      font-weight: 700;
      color: #1e293b;
    }
    
    .switch-subtext {
      font-size: 0.75rem;
      color: #64748b;
    }
  }
`;

export const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  background: #e2e8f0;
  padding: 3px;
  border-radius: 10px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const TabItem = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? "#ffffff" : "transparent"};
  color: ${props => props.$active ? "#03045e" : "#64748b"};
  font-weight: ${props => props.$active ? "700" : "500"};
  border: none;
  padding: 8px 4px; /* Slightly more compact */
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.8rem; /* Smaller font */
  transition: all 0.2s ease;
  box-shadow: ${props => props.$active ? "0 3px 6px rgba(0,0,0,0.04)" : "none"};

  &:hover {
    color: #03045e;
    background: ${props => props.$active ? "#ffffff" : "rgba(255, 255, 255, 0.4)"};
  }
`;

export const CalculatorResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #03045e 0%, #0077b6 100%);
  color: #ffffff;
  padding: 1.75rem; /* Reduced padding */
  border-radius: 16px;
  box-shadow: 0 12px 25px rgba(3, 4, 94, 0.12);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
    bottom: -60px;
    right: -60px;
    border-radius: 50%;
    pointer-events: none;
  }

  .results-header {
    font-size: 1.1rem; /* Smaller size */
    font-weight: 700;
    margin-bottom: 1.25rem; /* Reduced margin */
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .results-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem; /* Reduced card spacing for compact height */
    margin-bottom: 1.75rem;
  }

  @media (max-width: 960px) {
    padding: 1.5rem;
  }
`;

export const ResultCard = styled.div<{ $highlight?: boolean }>`
  background: ${props => props.$highlight ? "rgba(0, 180, 216, 0.15)" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid ${props => props.$highlight ? "rgba(0, 180, 216, 0.25)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 12px;
  padding: 0.75rem 1rem; /* More compact padding */
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; /* Smaller icon wrapper */
    height: 36px;
    background: ${props => props.$highlight ? "rgba(0, 180, 216, 0.2)" : "rgba(255, 255, 255, 0.08)"};
    border-radius: 8px;
    font-size: 1.1rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    text-align: left;

    .label {
      font-size: 0.8rem; /* Smaller font */
      color: rgba(255, 255, 255, 0.75);
      font-weight: 500;
    }

    .value {
      font-size: 1.25rem; /* Smaller font */
      font-weight: 800;
      color: ${props => props.$highlight ? "#00f5d4" : "#ffffff"};
    }
  }

  @media (max-width: 600px) {
    padding: 0.6rem 0.8rem;

    .icon-wrapper {
      width: 32px;
      height: 32px;
      font-size: 1rem;
    }

    .info .value {
      font-size: 1.1rem;
    }
  }
`;

export const CalculatorCTA = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00b4d8;
  color: #03045e;
  text-decoration: none;
  font-weight: 800;
  font-size: 1rem; /* Slightly smaller */
  padding: 13px; /* More compact */
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 180, 216, 0.25);
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 2;
  position: relative;
  
  animation: ${pulseGlow} 2.5s infinite;

  &:hover {
    background: #ffffff;
    color: #03045e;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;
