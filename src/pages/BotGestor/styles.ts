import styled, { keyframes } from "styled-components";

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const messageSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const flowPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

// Container
export const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
  color: #f8fafc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

// Navbar
export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const NavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;

  svg {
    color: #22c55e;
  }

  span {
    color: #64748b;
    font-weight: 400;
  }
`;

export const LogoImage = styled.img`
  height: 32px;
  width: auto;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;

    &:hover {
      color: #f8fafc;
    }
  }
`;

export const NavCTA = styled.button`
  background: #22c55e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #16a34a;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #f8fafc;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(12px);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    animation: ${fadeInUp} 0.3s ease;

    a {
      color: #94a3b8;
      text-decoration: none;
      padding: 0.75rem 0;
      font-size: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);

      &:hover {
        color: #f8fafc;
      }
    }

    button {
      background: #22c55e;
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.5rem;
    }
  }
`;

// Hero Section
export const HeroSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: 
    radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    #0f172a;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  animation: ${fadeInUp} 0.8s ease;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  color: #22c55e;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 968px) {
    margin: 0 auto 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HeroCTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

export const PrimaryCTA = styled.button`
  background: #22c55e;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(34, 197, 94, 0.3);

  &:hover {
    background: #16a34a;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4);
  }
`;

export const SecondaryCTA = styled.button`
  background: transparent;
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

// Phone Mockup
export const PhoneMockupContainer = styled.div`
  display: flex;
  justify-content: center;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 968px) {
    margin-top: 1rem;
  }
`;

export const PhoneMockup = styled.div`
  width: 320px;
  height: 650px;
  background: #1e293b;
  border-radius: 40px;
  padding: 12px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;

  @media (max-width: 768px) {
    width: 280px;
    height: 570px;
    border-radius: 32px;
  }
`;

export const PhoneNotch = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 28px;
  background: #0f172a;
  border-radius: 20px;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: #1e293b;
    border-radius: 50%;
  }
`;

export const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #0a1628;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const WhatsAppHeader = styled.div`
  background: #075e54;
  padding: 2.5rem 1rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const WhatsAppAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #128c7e, #25d366);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
`;

export const WhatsAppGroupInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
  }

  span {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  background: linear-gradient(180deg, #0a1628 0%, #0d1e36 100%);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
`;

export const ChatBubble = styled.div<{ $isBot?: boolean }>`
  max-width: 85%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  line-height: 1.4;
  animation: ${messageSlideIn} 0.5s ease forwards;
  opacity: 0;

  ${props => props.$isBot ? `
    background: linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%);
    border: 1px solid rgba(59, 130, 246, 0.3);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    animation-delay: 0.3s;
  ` : `
    background: #054640;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
    animation-delay: 0s;
  `}

  &:nth-child(2) { animation-delay: 0.6s; }
  &:nth-child(3) { animation-delay: 1.2s; }
  &:nth-child(4) { animation-delay: 1.5s; }
  &:nth-child(5) { animation-delay: 2.1s; }
  &:nth-child(6) { animation-delay: 2.4s; }
`;

export const BotLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: #3b82f6;
  margin-bottom: 0.25rem;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const ChatTime = styled.span`
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  float: right;
  margin-left: 0.5rem;
  margin-top: 0.25rem;
`;

// Authority Section
export const AuthoritySection = styled.section`
  background: #f8fafc;
  padding: 3rem 2rem;
`;

export const AuthorityContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const AuthorityText = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

export const LogosGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const LogoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  min-height: 100px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  img {
    height: 50px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #334155;
  }
`;

// Problem Section
export const ProblemSection = styled.section`
  background: #f1f5f9;
  padding: 5rem 2rem;
`;

export const ProblemContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;
`;

export const DataVisualization = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 2rem;
  position: relative;

  &::before {
    content: 'VS';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #0f172a;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1rem;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border: 4px solid white;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;

    &::before {
      width: 50px;
      height: 50px;
      font-size: 0.9rem;
    }
  }
`;

export const DataCard = styled.div<{ $high?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  background: ${props => props.$high 
    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.1) 100%)' 
    : 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.1) 100%)'};
  border: 1px solid ${props => props.$high ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${props => props.$high ? '#dc2626' : '#16a34a'};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .bar-container {
    height: 140px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .bar {
    width: 80px;
    background: ${props => props.$high 
      ? 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)' 
      : 'linear-gradient(180deg, #22c55e 0%, #16a34a 100%)'};
    border-radius: 12px 12px 0 0;
    height: ${props => props.$high ? '100%' : '100%'};
    transition: height 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px ${props => props.$high 
      ? 'rgba(239, 68, 68, 0.3)' 
      : 'rgba(34, 197, 94, 0.3)'};
  }

  .label {
    font-size: 1.75rem;
    font-weight: 800;
    color: ${props => props.$high ? '#dc2626' : '#16a34a'};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
    font-style: italic;
  }
`;

// Solution Section
export const SolutionSection = styled.section`
  background: white;
  padding: 5rem 2rem;
`;

export const SolutionContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const SolutionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const SolutionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 3rem;
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background: #f8fafc;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid #22c55e;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;

    @media (max-width: 968px) {
      display: none;
    }
  }

  &:last-child::after {
    display: none;
  }
`;

export const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 auto 1rem;
`;

export const StepIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #22c55e;
`;

export const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

export const StepDescription = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
`;

// Technical Section
export const TechnicalSection = styled.section`
  background: #0f172a;
  padding: 5rem 2rem;
`;

export const TechnicalContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const TechnicalTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const TechnicalSubtitle = styled.p`
  font-size: 1.1rem;
  color: #94a3b8;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
`;

export const TechHighlights = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

export const TechBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  color: #f8fafc;
  font-size: 0.9rem;

  svg {
    color: #22c55e;
  }
`;

// Flow Diagram
export const FlowDiagram = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FlowNode = styled.div`
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  min-width: 160px;

  svg {
    color: #22c55e;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 0.9rem;
    color: #f8fafc;
    margin: 0;
  }

  span {
    font-size: 0.75rem;
    color: #64748b;
  }
`;

export const FlowArrow = styled.div`
  color: #22c55e;
  animation: ${flowPulse} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

// LGPD Section
export const LGPDSection = styled.section`
  background: #f8fafc;
  padding: 5rem 2rem;
`;

export const LGPDContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const LGPDTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const LGPDGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LGPDCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

export const LGPDNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22c55e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

export const LGPDLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

export const LGPDDescription = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
`;

// Footer
export const Footer = styled.footer`
  background: #020617;
  padding: 4rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const FooterBrand = styled.div`
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;

    img {
      height: 40px;
      width: auto;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }
  }

  p {
    color: #64748b;
    line-height: 1.7;
    max-width: 400px;
    margin-bottom: 0.5rem;
  }

  .company-info {
    margin-top: 1.5rem;
    font-size: 0.8rem;
    color: #475569;
    line-height: 1.6;
  }
`;

export const FooterLinks = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #f8fafc;
    margin-bottom: 1rem;
  }

  a {
    display: block;
    color: #64748b;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    transition: color 0.2s;

    &:hover {
      color: #22c55e;
    }
  }
`;

export const FooterCopyright = styled.div`
  max-width: 1280px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  color: #475569;
  font-size: 0.875rem;
`;
