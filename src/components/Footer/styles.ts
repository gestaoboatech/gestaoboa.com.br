import styled from "styled-components";

export const Container = styled.footer`
    width: 100%;
    grid-column: span 12;
    background-color: #03045E;
    color: #ffffff;
    padding: 48px 5% 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    a { 
        color: #caf0f8; 
        font-weight: 500; 
        text-decoration: none; 
        font-size: 0.9rem;
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-block;

        &:hover {
            color: #90e0ef;
            transform: translateX(2px);
        }
    }
`;

export const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.2fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 36px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);

    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
        gap: 30px;

        .brand-col {
            grid-column: span 2;
        }
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 28px;

        .brand-col {
            grid-column: span 1;
            text-align: center;
            align-items: center;
        }
    }
`;

export const FooterCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    &.brand-col {
        gap: 14px;
    }

    h4 {
        font-size: 1rem;
        font-weight: 700;
        color: #ffffff;
        margin: 0 0 4px 0;
        letter-spacing: 0.3px;
        position: relative;
    }

    .logo-link {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.35rem;
        font-weight: 700;
        color: #ffffff;
        text-decoration: none;

        &:hover {
            transform: none;
            color: #90e0ef;
        }

        img {
            width: 44px;
            height: 44px;
            object-fit: contain;
        }
    }

    .tagline {
        color: rgba(255, 255, 255, 0.75);
        font-size: 0.88rem;
        line-height: 1.6;
        margin: 0;
        max-width: 340px;
    }

    @media (max-width: 600px) {
        align-items: center;
        text-align: center;

        .tagline {
            max-width: 100%;
        }

        a:hover {
            transform: none;
        }
    }
`;

export const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 20px auto 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.65);
    flex-wrap: wrap;
    gap: 12px;

    .company-info {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .dot {
            opacity: 0.4;
        }
    }

    .copyright-text {
        font-weight: 400;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        justify-content: center;
        gap: 8px;

        .company-info {
            justify-content: center;
        }
    }
`;