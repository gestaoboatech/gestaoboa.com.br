import styled from "styled-components";

export const ComparisonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  grid-column: span 12;
  padding: 80px 24px;
  background: #f8fafc;
`;

export const ComparisonHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin-bottom: 48px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #eff6ff;
    color: #0284c7;
    border: 1px solid #bae6fd;
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
      color: #0077b6;
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

export const TableWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  overflow-x: auto;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(226, 232, 240, 0.9);
`;

export const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;

  th, td {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
  }

  th {
    font-weight: 700;
    color: #334155;
    background: #f8fafc;
    vertical-align: middle;
  }

  .col-feature {
    width: 34%;
    font-weight: 600;
    color: #1e293b;
  }

  .col-gestaoboa {
    width: 26%;
    background: #eff6ff;
    border-left: 2px solid #0077b6;
    border-right: 2px solid #0077b6;
    text-align: center;
    position: relative;

    &.th-header {
      background: #0077b6;
      color: #ffffff;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 24px 20px;

      .brand-title {
        font-size: 1.25rem;
        font-weight: 800;
        margin-bottom: 4px;
      }
      .badge-tag {
        display: inline-block;
        background: #ffffff;
        color: #0077b6;
        font-size: 0.75rem;
        font-weight: 800;
        padding: 2px 10px;
        border-radius: 100px;
        text-transform: uppercase;
      }
    }
  }

  .col-competitors {
    width: 20%;
    text-align: center;
    color: #64748b;
  }

  .col-manual {
    width: 20%;
    text-align: center;
    color: #64748b;
  }

  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: #dcfce7;
    color: #15803d;
    border-radius: 50%;
    font-weight: 800;
    font-size: 0.9rem;
  }

  .cross-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: #fee2e2;
    color: #b91c1c;
    border-radius: 50%;
    font-weight: 800;
    font-size: 0.9rem;
  }

  .feature-sub {
    display: block;
    font-size: 0.8rem;
    font-weight: 400;
    color: #64748b;
    margin-top: 4px;
  }

  .highlight-text {
    font-weight: 700;
    color: #0077b6;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 14px 16px;
      font-size: 0.85rem;
    }
    .col-feature {
      width: 40%;
    }
  }
`;

export const ComparisonFooter = styled.div`
  margin-top: 36px;
  text-align: center;

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #0077b6;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.05rem;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(0, 119, 182, 0.35);

    &:hover {
      background: #023e8a;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 119, 182, 0.5);
    }
  }
`;
