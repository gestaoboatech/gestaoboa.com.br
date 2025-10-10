import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: white;
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
  
  span {
    background: linear-gradient(135deg, #ff6b9d, #c44569);
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
  opacity: 0.9;
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
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

export const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 107, 157, 0.2);
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
  opacity: 0.9;

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
    border: 2px solid rgba(255, 107, 157, 0.5);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    background: linear-gradient(45deg, #ff6b6b, #ffa726);
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
  background: linear-gradient(135deg, #ff6b9d, #c44569);
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(255, 107, 157, 0.2);
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
  color: #ff6b9d;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const CTASection = styled.section`
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(196, 69, 105, 0.1));
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
  background: linear-gradient(135deg, #ff6b9d, #c44569);
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
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 1rem 2rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    min-width: 120px;

    &:hover {
      background: rgba(255, 107, 157, 0.2);
      border-color: rgba(255, 107, 157, 0.5);
    }

    &.active {
      background: linear-gradient(135deg, #ff6b9d, #c44569);
      border-color: #ff6b9d;
      transform: scale(1.05);
    }

    span:first-child {
      font-weight: 600;
      font-size: 1rem;
    }

    .plan-type-discount {
      font-size: 0.8rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
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
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(255, 107, 157, 0.2);
  }

  &.featured {
    transform: scale(1.05);
    border-color: #ff6b9d;
    box-shadow: 0 20px 40px rgba(255, 107, 157, 0.3);

    .popular-badge {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #ff6b9d, #c44569);
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
      color: #ff6b9d;
    }

    p {
      opacity: 0.7;
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
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

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
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 2.5rem;
    color: #ff6b9d;
    font-weight: 700;
  }

  .period {
    font-size: 1rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    strong {
      font-size: 2rem;
    }
  }
`;

export const PricingPeriod = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 2rem;
`;

export const GuaranteeSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(76, 217, 100, 0.1);
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
  color: #4cd964;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const GuaranteeDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const AboutUsSection = styled.section`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 30px;
    width: 40px;
    height: 40px;
    background: #e74c3c;
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
  color: white;
`;

export const AboutUsLabel = styled.div`
  color: #e74c3c;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const AboutUsDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  opacity: 0.95;
  color: #bdc3c7;
`;

export const AboutUsHighlight = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 500;
  color: white;
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.3rem;
  }
  
  .role {
    font-size: 0.9rem;
    color: #e74c3c;
    font-weight: 500;
    margin-bottom: 0.8rem;
    display: block;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #bdc3c7;
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
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    border: 3px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    img {
      max-width: 70%;
    }
  }
`;

export const FinalCTASection = styled.section`
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0;
  text-align: center;
  color: white;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;
