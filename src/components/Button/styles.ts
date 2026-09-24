import styled from "styled-components";

type ContainerType = {
  type: "focused" | "unfocused" | "clean";
  width: string | number | null;
};

export const Container = styled.div<ContainerType>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  padding-top: 13px;
  padding-bottom: 13px;
  font-weight: bold;
  text-decoration: none;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  transition: all cubic-bezier(0.16, 1, 0.3, 1) 0.2s;

  ${(props) =>
    props.type === "focused"
      ? "background-color: #03045E; color: #fff; box-shadow: 0 4px 14px rgba(3, 4, 94, 0.2);"
      : props.type === "clean"
        ? "background-color: transparent; color: #3b82f6; border: none;"
        : "background-color: #fff; color: #03045E; border: 1px solid #03045E; font-weight: bold;"}

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(3, 4, 94, 0.18);
  }

  &:active {
    transform: scale(0.98);
  }

  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid #0077b6;
    outline-offset: 2px;
  }
`;
