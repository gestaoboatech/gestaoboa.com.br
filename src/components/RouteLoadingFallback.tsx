import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const FallbackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(0, 119, 182, 0.15);
  z-index: 99999;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: 45%;
  height: 100%;
  background: linear-gradient(90deg, #0077b6 0%, #00b4d8 50%, #90e0ef 100%);
  border-radius: 2px;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export const RouteLoadingFallback: React.FC = () => {
  return (
    <FallbackContainer role="progressbar" aria-label="Carregando página">
      <ProgressBar />
    </FallbackContainer>
  );
};

export default RouteLoadingFallback;
