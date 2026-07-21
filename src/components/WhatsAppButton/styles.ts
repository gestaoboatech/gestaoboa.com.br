import styled, { keyframes } from "styled-components";

// Keyframe animations
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const tooltipSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px) translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(-50%);
  }
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) both, ${float} 4s ease-in-out infinite;
  animation-delay: 1s, 1.8s; // wait 1s before showing, then start floating

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(220, 220, 220, 0.5);
  color: #1a1a1a;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: "";
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.95);
    border-right: 1px solid rgba(220, 220, 220, 0.5);
    border-top: 1px solid rgba(220, 220, 220, 0.5);
  }

  span {
    color: #128C7E;
    font-size: 11px;
    display: block;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    display: none; // Hide tooltip on mobile to avoid overlapping UI
  }
`;

export const FloatingButton = styled.a`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: -1;
    animation: ${pulse} 2s infinite;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: currentColor;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 10px 28px rgba(37, 211, 102, 0.5);
    background: linear-gradient(135deg, #2ae771 0%, #14a090 100%);

    svg {
      transform: scale(1.1) rotate(5deg);
    }

    & + ${Tooltip} {
      opacity: 1;
      transform: translateY(-50%) translateX(-5px);
      animation: ${tooltipSlide} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;

    svg {
      width: 26px;
      height: 26px;
    }
  }
`;
