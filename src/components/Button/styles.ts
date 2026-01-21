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
  transition: all ease 0.5s;

  ${(props) =>
    props.type === "focused"
      ? "background-color: #03045E; color: #fff;"
      : props.type === "clean"
        ? "background-color: transparent; color: #3b82f6; border: none;"
        : "background-color: #fff; color: #03045E; border: 1px solid #03045E; font-weight: bold;"}
`;
