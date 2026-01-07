import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 60px 0 40px;
  
  @media (max-width: 768px) {
    padding: 40px 0 20px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const LeftSection = styled.div`
  color: #ffffff;
  padding: 20px 0;
  
  @media (max-width: 1024px) {
    padding: 20px 0;
  }
`;

export const BlackFridayBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8800 100%);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
    }
  }
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  
  span {
    background: linear-gradient(135deg, #ff6b35 0%, #ffd93d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: #e0e0e0;
  margin-bottom: 32px;
  
  strong {
    color: #ffd93d;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

export const BenefitsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const BenefitCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 107, 53, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
  }
`;

export const BenefitIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`;

export const BenefitTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
`;

export const BenefitDescription = styled.p`
  font-size: 0.85rem;
  line-height: 1.4;
  color: #b0b0b0;
`;

export const RightSection = styled.div`
  position: sticky;
  top: 100px;
  
  @media (max-width: 1024px) {
    position: relative;
    top: 0;
  }
`;

export const FormSection = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 16px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FormSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
  
  strong {
    color: #ff6b35;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
`;

export const PurchaseButtonContainer = styled.div`
  margin-top: 2rem;
`;

export const PurchaseButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8800 100%);
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1.5rem 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  animation: pulse 2s infinite;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.2rem 1.5rem;
  }
`;

export const SecurePaymentText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
`;

export const PriceSection = styled.div`
  background: linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 2px solid #ff6b35;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.15);
`;

export const PriceSectionTitle = styled.h3`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 107, 53, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const PriceItemLabel = styled.span`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
  flex: 1;
`;

export const PriceItemValue = styled.span`
  font-size: 1rem;
  color: #666;
  font-weight: 600;
  text-decoration: line-through;
  opacity: 0.7;
`;

export const TotalSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #ff6b35;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const TotalLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
`;

export const TotalValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #666;
  text-decoration: line-through;
`;

export const BlackFridayPrice = styled.div`
  background: linear-gradient(135deg, #ff6b35 0%, #ff8800 100%);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  margin-top: 12px;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
`;

export const BlackFridayPriceLabel = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

export const BlackFridayPriceValue = styled.div`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const SaveBadge = styled.div`
  background: #ffd93d;
  color: #1a1a2e;
  font-size: 0.95rem;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  margin-top: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const SaveBadgeContainer = styled.div`
  text-align: center;
`;
