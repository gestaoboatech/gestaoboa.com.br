import styled from "styled-components";

type ContainerProps = {
    gridName?: string,
    width?: string,
    height?: string,
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    width: fit-content;
    flex-direction: column;
    grid-area: ${props => props.gridName ? props.gridName : ''};
    position: relative;
    justify-content: flex-start;
    min-height: ${props => props.height ? props.height : "52px" };
    ${props => props.width && "width: "+props.width+";" }
`;

type InputProps = {
    height: string | undefined,
}

export const Input = styled.input<InputProps>`
    width: 100%;
    height: ${props => props.height ? props.height : "52px"};
    background-color: #fff;
    align-self: center;
    transition: all ease 0.3s;
    color: #000 !important;
    border-radius: 10px;
    border: none;

    &:focus {
        outline: 2px solid #00b4d8;
        outline-offset: 1px;
        box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.25);
    }

    @media (max-width: 1450px){
        // padding-left: 5%;
        padding-right: unset;
    }
`;

export const Span = styled.p`
    bottom: -20px;
    font-size: 0.9em;
    color: orange;
    margin: 0px;
    margin-top: 10px;
`;