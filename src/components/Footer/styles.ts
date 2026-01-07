import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 46px;
    padding-left: 100px;
    padding-right: 100px;
    grid-column: span 12;
    align-items: center;
    background-color: #03045E;
    color: #fff;

    a { color: #fff; font-weight: bold; text-decoration: none; }

    .link, .link-mobile {
        display: flex;
        flex-direction: column;
        gap: 12px;
        justify-content: center;
        font-size: 16px;
    }

    .link-mobile {
        display: none;
    }

    .logo {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        font-size: 32px;
        justify-content: center;
        align-items: center;
    }

    .logo img {
        width: 79px;
        margin-bottom: -10px;
    }

    .copyright {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-weight: lighter;
        font-size: 16px;
        gap: 12px;
    }

    @media (max-width: 800px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 60px;
        padding-left: 30px;
        padding-right: 30px;

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
    }
`