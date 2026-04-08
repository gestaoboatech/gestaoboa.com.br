import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  color: #2d3436;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const Main = styled.main`
  flex: 1;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

export const ContentCard = styled.article`
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  padding: 60px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    padding: 35px 20px;
    border-radius: 16px;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 24px;
    text-align: center;
    letter-spacing: -0.03em;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 48px;
    margin-bottom: 24px;
    line-height: 1.3;
    border-bottom: 2px solid #f1f3f5;
    padding-bottom: 12px;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3436;
    margin-top: 32px;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #00b894;
    margin-top: 24px;
    margin-bottom: 12px;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #4b5563;
    margin-bottom: 20px;
  }

  ul {
    margin: 20px 0;
    padding-left: 20px;
  }

  li {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #4b5563;
    margin-bottom: 12px;
  }

  b {
    color: #1a1a1a;
  }
`;

export const LastUpdated = styled.p`
  text-align: center;
  font-size: 0.9rem !important;
  color: #9ca3af !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  margin-bottom: 48px !important;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

// Keep Content for backward compatibility if needed, but we'll use ContentCard mostly
export const Content = ContentCard; 