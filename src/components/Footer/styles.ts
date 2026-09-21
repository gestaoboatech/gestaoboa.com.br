import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 32px 100px;
    grid-column: span 12;
    align-items: center;
    background-color: #03045E;
    color: #fff;

    a { 
        color: #fff; 
        font-weight: 600; 
        text-decoration: none; 
        transition: color 0.2s ease, opacity 0.2s ease;

        &:hover {
            color: #90e0ef;
            opacity: 0.95;
        }
    }

    .link, .link-mobile {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        font-size: 14px;
    }

    .link-mobile {
        display: none;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
        font-size: 24px;
        color: #fff;
        text-decoration: none;
    }

    .logo img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        margin-bottom: 2px;
    }

    .copyright {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: lighter;
        font-size: 13px;
        gap: 6px;
    }

    @media (max-width: 800px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 40px;
        padding: 24px 20px;

        .link {
            display: none;
        }

        .link-mobile {
            display: flex;
        }

        .link-mobile, .copyright {
            align-items: center;
            text-align: center;
        }

        .logo {
            font-size: 20px;
        }

        .logo img {
            width: 40px;
        }

        .copyright {
            font-size: 12px;
        }
    }
`