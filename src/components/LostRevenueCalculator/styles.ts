import styled from "styled-components";

export const CalculatorContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  grid-column: span 12;
  padding: 80px 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 50%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%);
    top: 20px;
    left: 10%;
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const HeaderArea = styled.div`
  text-align: center;
  max-width: 780px;
  margin-bottom: 48px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #ecfdf5;
    color: #059669;
    border: 1px solid #a7f3d0;
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 16px;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.25;
    margin: 0 0 16px 0;

    span {
      background: linear-gradient(135deg, #059669, #10b981);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    font-size: 1.1rem;
    color: #475569;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.75rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

export const CalcCard = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  max-width: 1050px;
  width: 100%;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 0 1px rgba(226, 232, 240, 0.8);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 24px;
  }
`;

export const InputsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 0.95rem;
      font-weight: 600;
      color: #1e293b;
    }

    .value-pill {
      background: #f1f5f9;
      color: #0369a1;
      font-weight: 700;
      font-size: 1rem;
      padding: 4px 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
  }

  input[type="range"] {
    width: 100%;
    accent-color: #059669;
    cursor: pointer;
    height: 6px;
    border-radius: 4px;
    background: #e2e8f0;
  }

  .range-limits {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

export const ResultCol = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: -40px;
    right: -40px;
    width: 140px;
    height: 140px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0) 70%);
    border-radius: 50%;
  }
`;

export const StatBlock = styled.div`
  margin-bottom: 20px;

  .stat-label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .lost-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: #f87171;
    margin-bottom: 4px;
  }

  .recovered-value {
    font-size: 2.25rem;
    font-weight: 900;
    color: #34d399;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .stat-sub {
    font-size: 0.85rem;
    color: #cbd5e1;
    line-height: 1.4;
  }
`;

export const ROIHighlight = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);

  .roi-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .roi-desc {
    font-size: 0.825rem;
    color: #94a3b8;
    line-height: 1.45;
  }
`;

export const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #10b981;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  }
`;
