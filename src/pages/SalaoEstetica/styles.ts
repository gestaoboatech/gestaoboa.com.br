import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fff5f8 0%, #fef0f5 50%, #fff9fb 100%);
  color: #2d3436;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const HeroSection = styled.section`
  text-align: center;
  padding: 8rem 0 6rem;

  @media (max-width: 768px) {
    padding: 6rem 0 4rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
  color: #2d3436;
  
  span {
    background: linear-gradient(135deg, #e84393, #fd79a8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #636e72;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

export const ProblemSolutionContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 2rem 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0.5rem;
  }
`;

export const ProblemSection = styled.section`
  background: white;
  padding: 3rem 1.5rem;
  border-radius: 20px;
  margin: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 400px;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-width: unset;
  }
`;

export const ProblemTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #e74c3c;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const ProblemList = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 100%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

export const ProblemItem = styled.div`
  font-size: 1rem;
  padding: 1rem;
  background: #fff5f5;
  border-left: 4px solid #e74c3c;
  border-radius: 8px;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
`;

export const SolutionSection = styled.section`
  background: white;
  padding: 3rem 1.5rem;
  border-radius: 20px;
  margin: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 400px;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-width: unset;
  }
`;

export const SolutionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #27ae60;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const SolutionList = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 100%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

export const SolutionItem = styled.div`
  font-size: 1rem;
  padding: 1rem;
  background: #f0fff4;
  border-left: 4px solid #27ae60;
  border-radius: 8px;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
`;

export const TestimonialsSection = styled.section`
  padding: 6rem 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const TestimonialsTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #e84393, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

export const TestimonialCard = styled.div`
  background: white;
  border: 1px solid rgba(232, 67, 147, 0.15);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(232, 67, 147, 0.08);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(232, 67, 147, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const TestimonialContent = styled.blockquote`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: #636e72;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(232, 67, 147, 0.4);
  }

  div {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    span {
      font-size: 0.9rem;
      opacity: 0.7;
    }
  }
`;

export const OnlineBookingSection = styled.section`
  background: linear-gradient(135deg, #e84393 0%, #fd79a8 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0;
  display: flex;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
    gap: 2rem;
  }
`;

export const OnlineBookingContent = styled.div`
  flex: 1;
  color: white;
`;

export const OnlineBookingTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  .highlight {
    background: linear-gradient(45deg, #fff, #ffe0ec);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const OnlineBookingDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.95;
`;

export const OnlineBookingBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1rem;
    
    &:before {
      content: "✅";
      margin-right: 0.8rem;
      font-size: 1.2rem;
    }
  }
`;

export const OnlineBookingImageContainer = styled.div`
  flex: 1;
  text-align: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    order: -1;
    
    img {
      max-width: 80%;
    }
  }
`;

export const FeatureSection = styled.section`
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #e84393, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  border: 1px solid rgba(232, 67, 147, 0.12);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(232, 67, 147, 0.06);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(232, 67, 147, 0.15);
    border-color: rgba(232, 67, 147, 0.25);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const FeatureCardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #e84393;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #636e72;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const CTASection = styled.section`
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(232, 67, 147, 0.08), rgba(253, 121, 168, 0.12));
  border-radius: 30px;
  margin: 4rem 0;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    margin: 2rem 0;
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #e84393, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CTADescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #636e72;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const PricingSection = styled.section`
  padding: 6rem 0;

  .plan-type-selector {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .plan-type-button {
    background: white;
    border: 2px solid rgba(232, 67, 147, 0.2);
    border-radius: 15px;
    padding: 1rem 2rem;
    color: #2d3436;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    min-width: 120px;
    box-shadow: 0 2px 10px rgba(232, 67, 147, 0.08);

    &:hover {
      background: rgba(232, 67, 147, 0.05);
      border-color: rgba(232, 67, 147, 0.4);
    }

    &.active {
      background: linear-gradient(135deg, #e84393, #fd79a8);
      border-color: #e84393;
      color: white;
      transform: scale(1.05);
    }

    span:first-child {
      font-weight: 600;
      font-size: 1rem;
    }

    .plan-type-discount {
      font-size: 0.8rem;
      background: rgba(232, 67, 147, 0.15);
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
      color: #e84393;
    }
    
    &.active .plan-type-discount {
      background: rgba(255, 255, 255, 0.25);
      color: white;
    }
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const PricingTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #e84393, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PricingCard = styled.div`
  background: white;
  border: 1px solid rgba(232, 67, 147, 0.15);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(232, 67, 147, 0.08);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(232, 67, 147, 0.18);
  }

  &.featured {
    transform: scale(1.05);
    border-color: #e84393;
    box-shadow: 0 20px 40px rgba(232, 67, 147, 0.2);

    .popular-badge {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #e84393, #fd79a8);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.8rem;
      letter-spacing: 1px;
    }
  }

  .plan-header {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #e84393;
    }

    p {
      color: #636e72;
      font-size: 0.9rem;
    }
  }

  .original-price {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    font-size: 0.9rem;

    span:first-child {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .savings {
      background: linear-gradient(135deg, #4cd964, #2ecc71);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-weight: 600;
      font-size: 0.8rem;
    }
  }

  .plan-features {
    list-style: none;
    text-align: left;
    margin-top: 2rem;

    li {
      padding: 0.5rem 0;
      font-size: 0.9rem;
      border-bottom: 1px solid rgba(232, 67, 147, 0.1);
      color: #2d3436;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    &.featured {
      transform: none;
    }
  }
`;

export const PricingPrice = styled.div`
  margin: 1.5rem 0;

  span:first-child {
    display: block;
    font-size: 0.9rem;
    color: #636e72;
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 2.5rem;
    color: #e84393;
    font-weight: 700;
  }

  .period {
    font-size: 1rem;
    color: #636e72;
  }

  @media (max-width: 768px) {
    strong {
      font-size: 2rem;
    }
  }
`;

export const PricingPeriod = styled.p`
  font-size: 0.9rem;
  color: #636e72;
  margin-bottom: 2rem;
`;

export const GuaranteeSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(232, 67, 147, 0.08), rgba(253, 121, 168, 0.12));
  border-radius: 20px;
  margin: 4rem 0;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin: 2rem 0;
  }
`;

export const GuaranteeTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #e84393;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const GuaranteeDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #636e72;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const AboutUsSection = styled.section`
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  border: 1px solid rgba(232, 67, 147, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 30px;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #e84393, #fd79a8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &::after {
    content: '🎯';
    position: absolute;
    top: 28px;
    left: 38px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 2rem 1rem;
    gap: 2rem;
    margin: 2rem 0 0 0;
    
    &::before,
    &::after {
      top: 15px;
      left: 20px;
    }
  }
`;

export const AboutUsContent = styled.div`
  flex: 1;
  color: #2d3436;
`;

export const AboutUsLabel = styled.div`
  color: #e84393;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  margin-left: 60px;
  
  @media (max-width: 768px) {
    margin-left: 50px;
  }
`;

export const AboutUsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #2d3436;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const AboutUsDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #636e72;
`;

export const AboutUsHighlight = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 500;
  color: #2d3436;
`;

export const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const FounderCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(232, 67, 147, 0.15);
  box-shadow: 0 4px 15px rgba(232, 67, 147, 0.08);
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 0.3rem;
  }
  
  .role {
    font-size: 0.9rem;
    color: #e84393;
    font-weight: 500;
    margin-bottom: 0.8rem;
    display: block;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #636e72;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const AboutUsImageContainer = styled.div`
  flex: 1;
  text-align: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(232, 67, 147, 0.15);
    border: 3px solid rgba(232, 67, 147, 0.1);
  }
  
  @media (max-width: 768px) {
    img {
      max-width: 70%;
    }
  }
`;

export const FinalCTASection = styled.section`
  background: linear-gradient(135deg, #e84393 0%, #fd79a8 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0;
  text-align: center;
  color: white;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Estilo para containers de botões CTA espalhados pela página
export const CTAButtonContainer = styled.div`
  text-align: center;
  margin: 40px 0;
  padding: 20px;
  
  @media (max-width: 768px) {
    margin: 30px auto;
    padding: 15px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    margin: 20px auto;
    padding: 10px;
  }
`;

// Botão CTA fixo no fundo para mobile
export const MobileFixedCTAButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 12px 15px;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 107, 157, 0.3);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  display: none;
  
  .mobile-cta-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .mobile-cta-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .mobile-cta-highlight {
    font-size: 14px;
    font-weight: 800;
    color: #ff6b9d;
    letter-spacing: 0.5px;
  }
  
  .mobile-cta-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  button {
    padding: 12px 24px;
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
    transition: all 0.3s ease;
    white-space: nowrap;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 157, 0.6);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    display: block;
  }
  
  @media (max-width: 380px) {
    padding: 10px 12px;
    
    .mobile-cta-highlight {
      font-size: 12px;
    }
    
    .mobile-cta-text {
      font-size: 11px;
    }
    
    button {
      padding: 10px 16px;
      font-size: 12px;
    }
  }
`;
