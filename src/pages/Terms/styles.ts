import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;  
    flex-direction: column;
    background-color: #fff;
    text-align: left;
    font-size: 18px;
    color: #000;
`

export const Content = styled.div`
    display: flex;  
    flex-direction: column;
    background-color: #fff;
    text-align: left;
    font-size: 18px;
    color: #000;
    padding-left: 107px;
    padding-right: 107px;
    padding-bottom: 100px;

    @media (max-width: 800px){
        padding-left: 30px;
        padding-right: 30px;
    }
`