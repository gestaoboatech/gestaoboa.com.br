import styled from "styled-components";

export const Container = styled.div<{ isMenuOpen?: boolean }>`
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    grid-column: span 12;
    padding: 12px;
    padding-left: 5%;
	padding-right: 5%;
    position: fixed;
    z-index: 200;
    background-color: #ffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    right: 0;
    min-height: 70px;

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
            padding: 8px 16px;
            border-radius: 6px;
            background: #90e0ef;
            transition: all 0.3s ease;

            &:hover {
                background: #caf0f8;
                transform: translateY(-2px);
            }
        }
    }

    @media (max-width: 1030px) {
        width: 96%;
        padding: 12px 20px;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 10;
        min-height: 60px;
    }

    @media (max-width: 800px){
        padding: 10px 15px;
        min-height: 55px;
    }

    @media (max-width: 750px){
        padding: 8px 15px;
        min-height: 50px;
    }

    @media (max-width: 480px) {
        padding: 6px 10px;
        min-height: 45px;
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
    gap: 18px;
    font-family: "Montserrat";
    cursor: pointer;
    
    @media (max-width: 1030px) {
        flex: 1;
        justify-content: flex-start;
    }
    
    @media (max-width: 480px) {
        gap: 12px;
        flex: 1;
    }
`

export const LogoImg = styled.img`
    width: 79.73px;

    @media (max-width: 1030px){
        width: 60px;
    }

    @media (max-width: 800px){
        width: 50px;
    }
    
    @media (max-width: 480px) {
        width: 45px;
    }
`

export const Title = styled.div`
    font-size: 32px;
    color: #03045E;

    @media (max-width: 1030px){
        font-size: 28px;
    }

    @media (max-width: 800px){
        font-size: 26px;
    }
    
    @media (max-width: 480px) {
        font-size: 22px;
    }
    
    @media (max-width: 360px) {
        font-size: 20px;
    }
`

export const Links = styled.div`
    display: flex;
    gap: 30px;
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
    width: 32px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 300;
    align-items: center;

    span {
        width: 32px;
        height: 3px;
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
        width: 28px;
        height: 20px;
        
        span {
            width: 28px;
            height: 2.5px;
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