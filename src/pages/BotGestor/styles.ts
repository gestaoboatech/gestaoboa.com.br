import styled, { keyframes } from "styled-components";

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.98); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }
  50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); }
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
  50% { transform: translateY(-8px); }
`;

const messageSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const flowPulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
`;

// Container
export const Container = styled.div`
  min-height: 100vh;
  background: #0b1120;
  color: #f8fafc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
`;

// Navbar
export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(11, 17, 32, 0.9);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.65rem 1.5rem;

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
  }
`;

export const NavContent = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  color: #f8fafc;
  white-space: nowrap;
  flex-shrink: 0;

  span {
    color: #22c55e;
    font-weight: 600;
  }
`;

export const LogoImage = styled.img`
  height: 26px;
  width: auto;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 960px) {
    display: none;
  }

  a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease;

    &:hover {
      color: #f8fafc;
    }
  }
`;

export const NavCTA = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 0.45rem 0.95rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #f8fafc;
  cursor: pointer;
  padding: 0.4rem;

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 960px) {
    display: ${props => (props.$isOpen ? "flex" : "none")};
    position: fixed;
    top: 55px;
    left: 0;
    right: 0;
    background: rgba(11, 17, 32, 0.98);
    backdrop-filter: blur(16px);
    flex-direction: column;
    padding: 1.25rem;
    gap: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    animation: ${fadeInUp} 0.2s ease;

    a {
      color: #94a3b8;
      text-decoration: none;
      padding: 0.5rem 0;
      font-size: 0.88rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);

      &:hover {
        color: #f8fafc;
      }
    }

    button {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
    }
  }
`;

// Hero Section
export const HeroSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: 
    radial-gradient(circle at 15% 30%, rgba(34, 197, 94, 0.12) 0%, transparent 45%),
    radial-gradient(circle at 85% 60%, rgba(59, 130, 246, 0.12) 0%, transparent 45%),
    #0b1120;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.5;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 6.5rem 1.25rem 3rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3.5rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  animation: ${fadeInUp} 0.7s ease;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4ade80;
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
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  span.highlight {
    background: linear-gradient(135deg, #22c55e 0%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.15rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 580px;

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const PrimaryCTA = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 0.95rem 1.85rem;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(34, 197, 94, 0.5);
  }
`;

export const SecondaryCTA = styled.button`
  background: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.95rem 1.65rem;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

// Phone Mockup (WhatsApp Assistant)
export const PhoneMockupContainer = styled.div`
  display: flex;
  justify-content: center;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 1024px) {
    margin-top: 1rem;
  }
`;

export const PhoneMockup = styled.div`
  width: 340px;
  height: 620px;
  background: #0f172a;
  border-radius: 38px;
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.7),
    0 0 40px rgba(34, 197, 94, 0.15);
  position: relative;

  @media (max-width: 768px) {
    width: 300px;
    height: 570px;
    border-radius: 32px;
  }
`;

export const PhoneNotch = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 24px;
  background: #0b1120;
  border-radius: 16px;
  z-index: 10;
`;

export const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #0a1120;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const WhatsAppHeader = styled.div`
  background: #075e54;
  padding: 2.25rem 0.85rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const WhatsAppAvatar = styled.div`
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #128c7e, #25d366);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

export const WhatsAppGroupInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 0.88rem;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
  }

  span {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    gap: 0.35rem;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #4ade80;
      border-radius: 50%;
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  background: #0b1424;
  background-image: 
    radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  overflow-y: auto;
`;

export const ChatBubble = styled.div<{ $isBot?: boolean }>`
  max-width: 90%;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  font-size: 0.78rem;
  line-height: 1.45;
  animation: ${messageSlideIn} 0.4s ease forwards;

  ${props =>
    props.$isBot
      ? `
    background: #1e293b;
    border: 1px solid rgba(59, 130, 246, 0.35);
    color: #f1f5f9;
    align-self: flex-start;
    border-bottom-left-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  `
      : `
    background: #064e3b;
    color: #f0fdf4;
    align-self: flex-end;
    border-bottom-right-radius: 3px;
  `}

  .tag-highlight {
    color: #38bdf8;
    font-weight: 700;
  }

  .incident-badge {
    display: inline-block;
    padding: 0.15rem 0.4rem;
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #fca5a5;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
  }
`;

export const AudioSimulation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  margin-bottom: 0.35rem;

  .audio-wave {
    flex: 1;
    height: 16px;
    display: flex;
    align-items: center;
    gap: 2px;

    span {
      display: inline-block;
      width: 2px;
      background: #22c55e;
      border-radius: 1px;
    }
  }

  .duration {
    font-size: 0.68rem;
    color: #94a3b8;
  }
`;

export const BotLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #38bdf8;
  margin-bottom: 0.25rem;
`;

export const ChatTime = styled.span`
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  float: right;
  margin-left: 0.5rem;
  margin-top: 0.25rem;
`;

// Validation / Authority Bar
export const AuthoritySection = styled.section`
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2.5rem 2rem;
`;

export const AuthorityContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const AuthorityText = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  font-weight: 500;

  strong {
    color: #f8fafc;
  }
`;

export const LogosGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const AuthorityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.25s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(34, 197, 94, 0.3);
    transform: translateY(-2px);
  }

  img {
    height: 32px;
    width: auto;
    object-fit: contain;
  }

  .auth-info {
    text-align: left;

    .auth-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }

    .auth-subtitle {
      font-size: 0.72rem;
      color: #94a3b8;
      margin: 0;
    }
  }
`;

// Section Header Helper
export const SectionBadge = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.2;

  span.highlight {
    background: linear-gradient(135deg, #22c55e 0%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #94a3b8;
  text-align: center;
  max-width: 750px;
  margin: 0 auto 3.5rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
  }
`;

// Problem & Solution Comparison
export const ProblemSection = styled.section`
  background: #0b1120;
  padding: 6rem 2rem;
  position: relative;
`;

export const ProblemContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

export const ComparisonCard = styled.div<{ $isPositive?: boolean }>`
  background: ${props =>
    props.$isPositive
      ? "linear-gradient(145deg, rgba(34, 197, 94, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)"
      : "linear-gradient(145deg, rgba(239, 68, 68, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)"};
  border: 1px solid
    ${props => (props.$isPositive ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)")};
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  .header-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;

    svg {
      color: ${props => (props.$isPositive ? "#22c55e" : "#ef4444")};
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: ${props => (props.$isPositive ? "#cbd5e1" : "#94a3b8")};
      line-height: 1.5;

      svg {
        flex-shrink: 0;
        margin-top: 3px;
        color: ${props => (props.$isPositive ? "#22c55e" : "#ef4444")};
      }
    }
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  background: #0f172a;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const FeaturesContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2.25rem 1.75rem;
  text-align: left;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #22c55e, #38bdf8);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(34, 197, 94, 0.3);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

export const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  margin-bottom: 1.25rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.75rem;
`;

export const FeatureDescription = styled.p`
  font-size: 0.92rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
`;

// Technical Section (How it's developed)
export const TechnicalSection = styled.section`
  background: #0b1120;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const TechnicalContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const TechHighlights = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
`;

export const TechBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  color: #f8fafc;
  font-size: 0.88rem;
  font-weight: 500;

  svg {
    color: #22c55e;
  }
`;

export const FlowDiagram = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 2.5rem 2rem;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

export const FlowNode = styled.div`
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1.5rem 1.25rem;
  border-radius: 16px;
  text-align: center;
  min-width: 175px;
  max-width: 200px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

  svg {
    color: #22c55e;
    margin-bottom: 0.65rem;
  }

  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 0.25rem;
  }

  span {
    font-size: 0.75rem;
    color: #94a3b8;
    line-height: 1.4;
    display: block;
  }
`;

export const FlowArrow = styled.div`
  color: #22c55e;
  animation: ${flowPulse} 2s ease-in-out infinite;

  @media (max-width: 992px) {
    transform: rotate(90deg);
  }
`;

export const ArchitectureDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: left;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const ArchCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;

  .arch-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    svg {
      color: #38bdf8;
    }

    h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }
  }

  p {
    font-size: 0.9rem;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      background: rgba(56, 189, 248, 0.1);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.25);
    }
  }
`;

// Security & LGPD Section
export const LGPDSection = styled.section`
  background: #0f172a;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const LGPDContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const LGPDGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const LGPDCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2.25rem 1.5rem;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const LGPDNumber = styled.div`
  font-size: 2.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22c55e, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

export const LGPDLabel = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.5rem;
`;

export const LGPDDescription = styled.p`
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.55;
  margin: 0;
`;

// Roadmap & Implementation Process
export const RoadmapSection = styled.section`
  background: #0b1120;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const RoadmapContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const RoadmapTimeline = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  position: relative;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const RoadmapCard = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  text-align: left;
  position: relative;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    transform: translateY(-3px);
  }

  .step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .step-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: #22c55e;
      background: rgba(34, 197, 94, 0.1);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
    }

    .duration {
      font-size: 0.8rem;
      color: #94a3b8;
      font-weight: 600;
    }
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 0.6rem;
  }

  p {
    font-size: 0.88rem;
    color: #94a3b8;
    line-height: 1.55;
    margin: 0;
  }
`;

export const PilotBanner = styled.div`
  margin-top: 3rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  text-align: left;

  @media (max-width: 868px) {
    flex-direction: column;
    text-align: center;
  }

  .pilot-text {
    h4 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (max-width: 868px) {
        justify-content: center;
      }
    }

    p {
      font-size: 0.95rem;
      color: #cbd5e1;
      margin: 0;
      line-height: 1.6;
    }
  }
`;

// Management & Track Record (Gestão Boa & Cases)
export const ManagementSection = styled.section`
  background: #0f172a;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const ManagementContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  text-align: center;

  .stat-value {
    font-size: 2.75rem;
    font-weight: 800;
    color: #22c55e;
    margin-bottom: 0.5rem;
  }

  .stat-title {
    font-size: 1rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 0.35rem;
  }

  .stat-desc {
    font-size: 0.82rem;
    color: #94a3b8;
    margin: 0;
  }
`;

export const CaseStudyCard = styled.div`
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  text-align: left;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 2rem;
  }

  .case-tag {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.85rem;
    font-weight: 800;
    color: #f8fafc;
    margin: 0 0 1rem;
  }

  p {
    font-size: 0.98rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .case-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;

    span {
      font-size: 0.82rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      color: #cbd5e1;
    }
  }

  .case-highlight-box {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;

    .icon-wrap {
      width: 60px;
      height: 60px;
      background: rgba(34, 197, 94, 0.15);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #22c55e;
      margin: 0 auto 1rem;
    }

    h4 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.5rem;
    }

    p {
      font-size: 0.88rem;
      color: #94a3b8;
      margin: 0;
    }
  }
`;

// Team Section
export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: left;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.25rem 1.75rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(34, 197, 94, 0.3);
    background: rgba(255, 255, 255, 0.04);
  }

  .team-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.25rem;

    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #22c55e;
    }

    .team-info {
      h4 {
        font-size: 1.2rem;
        font-weight: 700;
        color: #f8fafc;
        margin: 0 0 0.25rem;
      }

      .role {
        font-size: 0.85rem;
        color: #22c55e;
        font-weight: 600;
        margin: 0 0 0.25rem;
      }

      .academic {
        font-size: 0.75rem;
        color: #94a3b8;
        margin: 0;
      }
    }
  }

  p {
    font-size: 0.88rem;
    color: #cbd5e1;
    line-height: 1.6;
    margin: 0;
    flex: 1;
  }
`;

// CTA & Quotation Request Section (Orçamento via WhatsApp)
export const QuoteSection = styled.section`
  background: radial-gradient(circle at center, #1e293b 0%, #0b1120 100%);
  padding: 7rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const QuoteContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const QuoteCard = styled.div`
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 28px;
  padding: 3.5rem 3rem;
  box-shadow: 
    0 25px 60px -15px rgba(0, 0, 0, 0.7),
    0 0 50px rgba(34, 197, 94, 0.15);

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #f8fafc;
    margin-bottom: 1.25rem;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 1.85rem;
    }
  }

  p.quote-lead {
    font-size: 1.15rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .benefits-row {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 2.75rem;

    .benefit-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #cbd5e1;
      background: rgba(255, 255, 255, 0.04);
      padding: 0.5rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.08);

      svg {
        color: #22c55e;
      }
    }
  }

  .cta-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .quote-cta-btn {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    border: none;
    padding: 1.15rem 2.5rem;
    border-radius: 14px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s;
    box-shadow: 0 8px 30px rgba(34, 197, 94, 0.45);
    animation: ${glow} 3s ease-in-out infinite;

    &:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 12px 40px rgba(34, 197, 94, 0.6);
    }

    @media (max-width: 600px) {
      width: 100%;
      justify-content: center;
      font-size: 1.05rem;
      padding: 1rem 1.5rem;
    }
  }

  .guarantee-note {
    font-size: 0.85rem;
    color: #64748b;
    margin-top: 0.5rem;
  }
`;

// Footer
export const Footer = styled.footer`
  background: #060913;
  padding: 4.5rem 2rem 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const FooterBrand = styled.div`
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;

    img {
      height: 38px;
      width: auto;
    }

    h3 {
      font-size: 1.35rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }
  }

  p {
    color: #94a3b8;
    line-height: 1.7;
    max-width: 440px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
  }

  .company-info {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.6;
    border-left: 2px solid rgba(34, 197, 94, 0.4);
    padding-left: 0.75rem;
  }
`;

export const FooterLinks = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 1.25rem;
  }

  a {
    display: flex;
    align-items: center;
    color: #94a3b8;
    text-decoration: none;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    transition: color 0.2s;

    &:hover {
      color: #22c55e;
    }
  }
`;

export const FooterCopyright = styled.div`
  max-width: 1280px;
  margin: 3.5rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 0.85rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
`;
