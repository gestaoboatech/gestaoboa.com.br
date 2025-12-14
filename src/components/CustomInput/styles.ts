import styled from "styled-components";

type ContainerProps = {
    gridName?: string,
    width?: string,
    height?: string,
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    width: 100%;
    flex-direction: column;
    grid-area: ${props => props.gridName ? props.gridName : ''};
    position: relative;
    justify-content: flex-start;
    min-height: ${props => props.height ? props.height : "56px" };
    
    &.input-group {
        width: 100% !important;
    }
`;

type InputProps = {
    height: string | undefined,
}

export const Input = styled.input<InputProps>`
    width: 100%;
    height: ${props => props.height ? props.height : "56px"};
    background-color: #f8f9fa;
    align-self: center;
    transition: all ease 0.3s;
    color: #2d3436 !important;
    border-radius: 12px;
    border: 2px solid #e9ecef;
    padding: 0 20px;
    font-size: 1rem;
    font-family: inherit;

    &::placeholder {
        color: #adb5bd;
        font-weight: 400;
    }

    &:hover {
        border-color: #ced4da;
        background-color: #fff;
    }

    &:focus {
        outline: none;
        border-color: #0077b6;
        background-color: #fff;
        box-shadow: 0 0 0 4px rgba(0, 119, 182, 0.1);
    }

    @media (max-width: 768px) {
        height: ${props => props.height ? props.height : "52px"};
        padding: 0 16px;
        font-size: 0.95rem;
    }
`;

export const Span = styled.p`
    font-size: 0.85rem;
    color: #e74c3c;
    margin: 6px 0 0 4px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
        content: "⚠";
        font-size: 0.9em;
    }
`;