import styled from "styled-components";

export const Container = styled.div<{ isMenuOpen?: boolean }>`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    grid-column: span 12;
    padding: 8px 5%;
    position: fixed;
    z-index: 200;
    background-color: #ffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    top: 0;
    left: 0;
    right: 0;
    min-height: 54px;

    &::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: ${({ isMenuOpen }) => isMenuOpen ? 1 : 0};
        visibility: ${({ isMenuOpen }) => isMenuOpen ? 'visible' : 'hidden'};
        transition: all 0.3s ease-in-out;
        z-index: 200;
        pointer-events: ${({ isMenuOpen }) => isMenuOpen ? 'auto' : 'none'};
    }

    nav {
        .pricing {
            color: #03045E;
            font-weight: bold;
            padding: 6px 12px;
            border-radius: 4px;
            background: #90e0ef;
            transition: all 0.3s ease;

            &:hover {
                background: #caf0f8;
                transform: translateY(-1px);
            }
        }
    }

    @media (max-width: 1030px) {
        width: 100%;
        padding: 8px 20px;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 10;
        min-height: 48px;
    }

    @media (max-width: 800px){
        padding: 6px 15px;
        min-height: 46px;
    }

    @media (max-width: 750px){
        padding: 6px 15px;
        min-height: 44px;
    }

    @media (max-width: 480px) {
        padding: 4px 10px;
        min-height: 40px;
    }

    @media (max-width: 768px) {
        nav {
            .pricing {
                width: 100%;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
`

export const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Montserrat";
    cursor: pointer;
    
    @media (max-width: 1030px) {
        flex: 1;
        justify-content: flex-start;
    }
    
    @media (max-width: 480px) {
        gap: 8px;
        flex: 1;
    }
`

export const LogoImg = styled.img`
    width: 48px;

    @media (max-width: 1030px){
        width: 40px;
    }

    @media (max-width: 800px){
        width: 36px;
    }
    
    @media (max-width: 480px) {
        width: 32px;
    }
`

export const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: #03045E;

    @media (max-width: 1030px){
        font-size: 19px;
    }

    @media (max-width: 800px){
        font-size: 18px;
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
    }
    
    @media (max-width: 360px) {
        font-size: 15px;
    }
`

export const Links = styled.div`
    display: flex;
    gap: 20px;
    color: #03045E;
    transition: all ease 0.5s;
    border-bottom: 1px solid transparent;

    :hover {
        font-weight: bold;
        border-bottom: 1px solid #03045E;
    }

    @media (max-width: 1030px){
        display: none;
    }
`

export const LinkItem = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: #03045E !important;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: color 0.2s ease;

    &:hover {
        color: #0077b6 !important;
    }
`

export const TestNow = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 1030px){
        display: none;
    }
`

export const MenuButton = styled.button<{ isOpen: boolean }>`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 300;
    align-items: center;

    span {
        width: 24px;
        height: 2px;
        background: #03045E;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        &:first-child {
            transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
        }

        &:nth-child(2) {
            opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
            transform: ${({ isOpen }) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
        }

        &:nth-child(3) {
            transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }

    @media (max-width: 1030px) {
        display: flex;
        margin-left: auto;
    }
    
    @media (max-width: 480px) {
        width: 22px;
        height: 16px;
        
        span {
            width: 22px;
            height: 2px;
        }
    }
`;

export const MobileLinks = styled.div<{ isOpen: boolean }>`
    display: none;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 80%;
    max-width: 300px;
    background: #fff;
    padding: 80px 20px 20px;
    transition: right 0.3s ease-in-out;
    z-index: 250;
    box-shadow: ${({ isOpen }) => isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none'};

    ${LinkItem} {
        padding: 15px 0;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        text-align: center;
        transition: all 0.3s ease;

        &:hover {
            color: #90e0ef !important;
        }

        &.pricing {
            margin: 10px 0;
            display: block;
        }
    }

    a:last-child {
        margin-top: 20px;
    }

    @media (max-width: 1030px) {
        display: flex;
    }
    
    @media (max-width: 480px) {
        width: 85%;
        max-width: 280px;
        padding: 70px 15px 15px;
        
        ${LinkItem} {
            padding: 12px 0;
            font-size: 16px;
        }
    }
    
    @media (max-width: 360px) {
        width: 90%;
        max-width: 250px;
        padding: 60px 10px 10px;
        
        ${LinkItem} {
            padding: 10px 0;
            font-size: 15px;
        }
    }
`;

export const ButtonLink = styled.a`
    text-decoration: none;
    display: block;
`;