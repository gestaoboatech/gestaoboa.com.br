import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

export const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  margin-bottom: 3rem;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  line-height: 1.2;
  
  span {
    color: #3498db;
    background: linear-gradient(135deg, #3498db, #2980b9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: #7f8c8d;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const VideoSection = styled.section`
  text-align: center;
  margin: 4rem 0;
  
  video {
    width: 100%;
    max-width: 800px;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  padding: 4rem 0;
  margin: 4rem 0;
`;

export const TestimonialsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TestimonialCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const TestimonialContent = styled.p`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-style: italic;
  
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
  }
  
  div {
    display: flex;
    flex-direction: column;
    
    strong {
      font-size: 1.1rem;
      color: #2c3e50;
      margin-bottom: 0.2rem;
    }
    
    span {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  }
`;

export const FeatureSection = styled.section`
  padding: 4rem 0;
  margin: 4rem 0;
`;

export const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
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
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

export const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1rem;
`;

export const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0;
  text-align: center;
  color: white;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const PricingSection = styled.section`
  background: white;
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  
  .plan-type-selector {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 50px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
      flex-direction: column;
      max-width: 300px;
      gap: 0.5rem;
    }
  }
  
  .plan-type-button {
    flex: 1;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 25px;
    background: transparent;
    color: #7f8c8d;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    
    &.active {
      background: #3498db;
      color: white;
      box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    }
    
    &:hover {
      background: #e9ecef;
      color: #2c3e50;
    }
    
    &.active:hover {
      background: #2980b9;
      color: white;
    }
    
    .plan-type-discount {
      font-size: 0.7rem;
      font-weight: 700;
      color: #e74c3c;
      background: rgba(231, 76, 60, 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      margin-top: 0.2rem;
    }
    
    &.active .plan-type-discount {
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
    }
    
    @media (max-width: 768px) {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }
  }
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const PricingTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PricingCard = styled.div`
  position: relative;
  padding: 2.5rem 2rem;
  border: 2px solid #e1e8ed;
  border-radius: 16px;
  background: #ffffff;
  transition: all 0.3s ease;
  
  &.featured {
    border-color: #3498db;
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(52, 152, 219, 0.15);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  &.featured:hover {
    transform: scale(1.05) translateY(-5px);
  }
  
  .popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  
  .plan-header {
    margin-bottom: 2rem;
    
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #7f8c8d;
      font-size: 1rem;
    }
  }
  
  .original-price {
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    
    span:first-child {
      display: block;
      font-size: 0.9rem;
      color: #7f8c8d;
      text-decoration: line-through;
    }
    
    .savings {
      display: block;
      font-size: 0.8rem;
      color: #27ae60;
      font-weight: 700;
      margin-top: 0.2rem;
    }
  }
  
  .plan-features {
    list-style: none;
    padding: 0;
    margin: 2rem 0 0 0;
    text-align: left;
    
    li {
      padding: 0.5rem 0;
      color: #2c3e50;
      font-size: 0.95rem;
      
      &:first-child {
        padding-top: 0;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    
    &.featured {
      transform: none;
    }
    
    &:hover, &.featured:hover {
      transform: translateY(-3px);
    }
  }
`;

export const PricingPrice = styled.div`
  margin-bottom: 1rem;
  
  span {
    display: block;
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 0.5rem;
    
    &.period {
      display: inline;
      font-size: 1.2rem;
      margin-left: 0.5rem;
      margin-bottom: 0;
    }
  }
  
  strong {
    font-size: 2.5rem;
    color: #3498db;
    font-weight: 700;
    line-height: 1;
  }
`;

export const PricingPeriod = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 500;
`;

export const GuaranteeSection = styled.section`
  background: #e8f5e8;
  padding: 3rem 2rem;
  border-radius: 16px;
  margin: 3rem 0;
  text-align: center;
  border: 2px solid #27ae60;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const GuaranteeTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #27ae60;
`;

export const GuaranteeDescription = styled.p`
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
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

export const AboutUsSection = styled.section`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 4rem 2rem;
  border-radius: 20px;
  margin: 4rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 1rem;
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
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const FounderCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1rem;
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
    max-width: 90%;
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
