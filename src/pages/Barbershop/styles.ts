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
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
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
      font-size: 1.5rem;
      font-weight: 700;
      color: #3b82f6;
    }

    span {
      font-size: 0.875rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 1.5rem;
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
  max-width: 300px;
  flex-shrink: 0;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  background: #000;

  video {
    width: 100%;
    height: auto;
    display: block;
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

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
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
  padding: 2.5rem 2rem;
  border-radius: 24px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  min-height: 420px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.2);
  }

  ${(props) =>
    props.$featured &&
    css`
      transform: scale(1.05);
      z-index: 2;
      box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);

      @media (max-width: 1024px) {
        transform: none;
      }
    `}

  @media (max-width: 768px) {
    min-height: auto;
    padding: 2rem 1.5rem;
  }
`;

export const PlanBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b82f6;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
`;

export const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 2rem;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: #94a3b8;
  }
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;

  li {
    margin-bottom: 1rem;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    gap: 0.75rem;

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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  button {
    width: 100%;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    padding: 1.25rem 2rem;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

// Legacy exports to prevent crashes if I miss any imports in index.tsx before I update it
// I will just map them to Empty divs or similar if strictly needed, but I plan to replace index.tsx fully.
// However, to be safe during the transition, I'll export them as aliases.

export const HeroTitle_Legacy = HeroTitle;
// ... I will actually just fully replace index.tsx immediately after, so I don't need to support legacy styles
// IF I am confident. Given the user context, I should just assume standard exports.
