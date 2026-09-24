import styled, { keyframes, css } from "styled-components";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Shared Styles
const SectionBase = styled.section`
  padding: 5rem 1rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  font-family: "Outfit", sans-serif;
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

// --- HERO SECTION ---
export const HeroSection = styled.section`
  min-height: 90vh;
  background: radial-gradient(circle at 50% 0%, #1a2332 0%, #0d1117 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 1rem 4rem;
  position: relative;
  overflow: hidden;

  /* Abstract background shapes */
  &::before {
    content: "";
    position: absolute;
    top: -20%;
    left: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.15) 0%,
      transparent 70%
    );
    filter: blur(60px);
    z-index: 0;
    animation: ${float} 8s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10%;
    right: -5%;
    width: 50%;
    height: 50%;
    background: radial-gradient(
      circle,
      rgba(245, 158, 11, 0.1) 0%,
      transparent 70%
    );
    filter: blur(60px);
    z-index: 0;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  max-width: 900px;
  z-index: 1;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  z-index: 1;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const CTAButtonContainer = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
  }
`;

// --- STATS/AUTHORITY STRIP ---
export const AuthorityStrip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  width: 100%;
  margin-top: 3rem;
  z-index: 1;
  flex-wrap: wrap;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    strong {
      font-size: 1.65rem;
      font-weight: 800;
      color: #60a5fa;
      letter-spacing: -0.01em;
    }

    span {
      font-size: 0.85rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 2px;
    }
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 1.5rem 1rem;
  }
`;

// --- ESSENTIALS SECTION ---
export const EssentialsSection = styled(SectionBase)`
  background: #fff;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 4rem;
`;

export const EssentialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const EssentialCard = styled.div`
  background: #f8fafc;
  padding: 2.5rem;
  border-radius: 24px;
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: #fff;
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
    border-color: #e2e8f0;
  }
`;

export const EssentialIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #eff6ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #3b82f6;
  font-size: 1.5rem;
`;

export const EssentialTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
`;

export const EssentialText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

// --- VIDEO SECTION ---
export const VideoSection = styled(SectionBase)`
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  text-align: center;
`;

export const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const VideoTextContent = styled.div`
  text-align: left;
  max-width: 400px;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.125rem;
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

export const VideoContainer = styled.div`
  max-width: 270px;
  width: 100%;
  margin: 0 auto;
  flex-shrink: 0;
  border-radius: 32px;
  padding: 8px;
  border: 1px solid #334155;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  background: #0f172a;

  video {
    width: 100%;
    max-height: 480px;
    height: auto;
    display: block;
    border-radius: 24px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 240px;
    padding: 6px;
    border-radius: 28px;

    video {
      max-height: 420px;
      border-radius: 22px;
    }
  }
`;

export const PlatformBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const PlatformBadge = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: #1e293b;
  font-weight: 600;
  transition: transform 0.2s ease;
  text-align: left;

  &:hover {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    color: #3b82f6;
  }
`;

// --- PRICING SECTION ---
export const PricingSection = styled(SectionBase)`
  background: #0f172a;
  color: #fff;
  text-align: center;

  ${SectionTitle} {
    color: #fff;
  }

  ${SectionSubtitle} {
    color: #94a3b8;
  }
`;

export const PlanTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin: 0 auto 3rem;
  flex-wrap: wrap;
`;

export const PlanTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.$active ? "#3b82f6" : "#1e293b")};
  border: 2px solid ${(props) => (props.$active ? "#3b82f6" : "#334155")};
  border-radius: 14px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: ${(props) =>
    props.$active
      ? "0 6px 20px rgba(59, 130, 246, 0.4)"
      : "0 2px 8px rgba(0, 0, 0, 0.2)"};

  &:hover {
    border-color: #60a5fa;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PlanTypeDiscount = styled.span<{ $active: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => (props.$active ? "#1e293b" : "#93c5fd")};
  background-color: ${(props) => (props.$active ? "#ffffff" : "rgba(59, 130, 246, 0.2)")};
  padding: 2px 8px;
  border-radius: 9999px;
  transition: all 0.3s ease;
`;

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1360px;
  margin: 0 auto;
  align-items: stretch;
  padding: 0 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const PlanCard = styled.div<{ $featured?: boolean }>`
  background: ${(props) =>
    props.$featured
      ? "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)"
      : "#1e293b"};
  border: 1px solid ${(props) => (props.$featured ? "#3b82f6" : "#334155")};
  padding: 2.75rem 1.85rem 2.25rem;
  border-radius: 26px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 20px 45px -10px rgba(59, 130, 246, 0.3);
  }

  ${(props) =>
    props.$featured &&
    css`
      transform: scale(1.03);
      z-index: 2;
      box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.35);

      &:hover {
        transform: scale(1.03) translateY(-6px);
      }

      @media (max-width: 1200px) {
        transform: none;

        &:hover {
          transform: translateY(-6px);
        }
      }
    `}

  @media (max-width: 1200px) {
    padding: 2.25rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
  }
`;

export const PlanBadge = styled.span`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b82f6;
  color: #fff;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
`;

export const PlanName = styled.h3`
  font-size: 1.55rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: #fff;
`;

export const PlanUserLimit = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.85rem;
  width: fit-content;
`;

export const PriceContainer = styled.div`
  margin-bottom: 1.75rem;
`;

export const OriginalPriceStrikethrough = styled.div`
  font-size: 0.88rem;
  color: #64748b;
  text-decoration: line-through;
  margin-bottom: 3px;
`;

export const PlanPrice = styled.div`
  font-size: 2.75rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  display: flex;
  align-items: baseline;

  span.currency {
    font-size: 1.35rem;
    font-weight: 600;
    margin-right: 4px;
  }

  span.period {
    font-size: 1rem;
    font-weight: 400;
    color: #94a3b8;
    margin-left: 4px;
  }
`;

export const DailyPriceSmall = styled.div`
  font-size: 0.82rem;
  color: #94a3b8;
  margin-top: 5px;
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.25rem 0;
  flex: 1;

  li {
    margin-bottom: 1rem;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    font-size: 0.98rem;

    svg {
      color: #3b82f6;
      flex-shrink: 0;
    }
  }
`;

// --- TESTIMONIALS ---
export const TestimonialsSection = styled(SectionBase)`
  background: #f8fafc;
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TestimonialCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const ReviewsSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #1e293b;

  span {
    color: #f59e0b;
  }
`;

// --- FAQ / ADDITIONAL SECTIONS ---
export const FAQSection = styled(SectionBase)`
  background: #fff;
  max-width: 800px;
  margin: 0 auto;
`;

export const FinalCTASection = styled.div`
  background: radial-gradient(circle at 50% 100%, #1e293b 0%, #0f172a 100%);
  padding: 6rem 1rem;
  text-align: center;
  color: #fff;

  h2 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: #94a3b8;
    margin-bottom: 3rem;
    font-size: 1.25rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const MobileFixedCTAButton = styled.div`
  display: none !important;
`;

// Legacy exports to prevent crashes if I miss any imports in index.tsx before I update it
// I will just map them to Empty divs or similar if strictly needed, but I plan to replace index.tsx fully.
// However, to be safe during the transition, I'll export them as aliases.

export const HeroTitle_Legacy = HeroTitle;

// =============================================
// WHATSAPP SECTION - BARBERSHOP
// =============================================

const countPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.04); }
  100% { transform: scale(1); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

export const WhatsAppSection = styled.section`
  width: 100%;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 50%, #ffffff 100%);
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
    top: -150px;
    right: -100px;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(37, 211, 102, 0.06) 0%, transparent 70%);
    bottom: -100px;
    left: -100px;
    border-radius: 50%;
    filter: blur(50px);
    pointer-events: none;
  }

  .whatsapp-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 960px) {
    padding: 60px 16px;
    .whatsapp-inner {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
`;

export const WhatsAppContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 960px) {
    text-align: center;
    align-items: center;
  }
`;

export const WhatsAppBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const WhatsAppHeading = styled.h2`
  font-size: 2.6rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.18;
  margin: 0;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

export const WhatsAppDescription = styled.p`
  font-size: 1.08rem;
  color: #475569;
  line-height: 1.65;
  margin: 0;
  max-width: 520px;

  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

export const WhatsAppCounter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  padding: 14px 22px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06);
  width: fit-content;
  animation: ${countPulse} 4s ease-in-out infinite;

  .counter-number {
    font-size: 2.2rem;
    font-weight: 900;
    color: #2563eb;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }

  .counter-label {
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.35;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .counter-number {
      font-size: 1.8rem;
    }
    .counter-label {
      font-size: 0.82rem;
    }
  }
`;

export const WhatsAppFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 4px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const WhatsAppFeatureCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  text-align: left;

  &:hover {
    background: #ffffff;
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -8px rgba(37, 99, 235, 0.12);
    border-color: rgba(37, 99, 235, 0.3);
  }

  .feature-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(37, 99, 235, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }

  &:hover .feature-icon {
    background: #2563eb;
    border-color: #2563eb;
    transform: scale(1.06);
  }

  .feature-title {
    font-size: 0.98rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
  }

  .feature-desc {
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

export const WhatsAppCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 16px 34px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.28);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  width: fit-content;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(37, 99, 235, 0.38);
    filter: brightness(1.06);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    font-size: 0.95rem;
    padding: 14px 24px;
  }
`;

export const WhatsAppMockupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${floatAnimation} 6s ease-in-out infinite;

  @media (max-width: 960px) {
    order: -1;
  }
`;

export const WAChatMockup = styled.div`
  width: 100%;
  max-width: 380px;
  background: #0f172a;
  border-radius: 38px;
  padding: 16px 8px 12px;
  box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.08);
  border: 3px solid #1e293b;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  text-align: left;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 35px 80px -15px rgba(15, 23, 42, 0.3);
  }

  .phone-notch {
    width: 75px;
    height: 12px;
    background: #000000;
    border-radius: 10px;
    margin: 0 auto 12px;
  }

  .phone-screen {
    border-radius: 26px;
    overflow: hidden;
    background: #efeae2;
  }
`;

export const WAChatHeader = styled.div`
  background: #008069;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #008069;
    font-weight: 800;
    font-size: 1.05rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .info {
    flex: 1;

    strong {
      display: block;
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 600;
    }

    span {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.75rem;
      color: #d1fae5;
    }
  }

  .bot-tag {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
`;

export const WAChatBody = styled.div`
  background: #efeae2;
  background-image: radial-gradient(#d1d7db 1.5px, transparent 1.5px);
  background-size: 16px 16px;
  padding: 1.15rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const WABubble = styled.div<{ $outgoing?: boolean }>`
  max-width: 90%;
  align-self: ${(props) => (props.$outgoing ? "flex-end" : "flex-start")};
  background: ${(props) => (props.$outgoing ? "#d9fdd3" : "#ffffff")};
  color: #111b21;
  padding: 0.75rem 0.95rem 0.55rem;
  border-radius: ${(props) =>
    props.$outgoing ? "14px 14px 2px 14px" : "14px 14px 14px 2px"};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 0.86rem;
  line-height: 1.45;
  position: relative;

  .bubble-badge {
    display: inline-block;
    background: ${(props) =>
      props.$outgoing ? "rgba(37, 99, 235, 0.1)" : "rgba(37, 99, 235, 0.1)"};
    color: #2563eb;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    margin-bottom: 6px;
    text-transform: uppercase;
  }

  .time {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
    font-size: 0.68rem;
    color: #667781;
    margin-top: 5px;

    svg {
      width: 14px;
      height: 14px;
      color: #53bdeb;
    }
  }
`;
