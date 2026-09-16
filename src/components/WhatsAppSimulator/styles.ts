import styled, { keyframes } from "styled-components";

const typingAnimation = keyframes`
  0% { transform: translateY(0px); opacity: 0.4; }
  28% { transform: translateY(-5px); opacity: 0.8; }
  44% { transform: translateY(0px); opacity: 0.4; }
`;

export const PhoneContainer = styled.div`
  width: 320px;
  height: 520px;
  background-color: #efeae2;
  border-radius: 36px;
  border: 8px solid #1e293b;
  box-shadow: 0 20px 40px -15px rgba(3, 4, 94, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  .chat-footer {
    height: 50px;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 12px;
    border-top: 1px solid #e1e3e6;

    .input-placeholder {
      flex: 1;
      background-color: #ffffff;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 14px;
      color: #94a3b8;
    }

    .mic-icon {
      font-size: 18px;
      color: #64748b;
    }
  }
`;

export const PhoneHeader = styled.div`
  background-color: #075e54;
  color: #ffffff;
  padding: 8px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .status-bar {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    opacity: 0.9;
    font-weight: 500;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;

    .back-arrow {
      font-size: 20px;
      cursor: pointer;
      margin-right: -4px;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #128c7e;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 13px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .details {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 14px;
        font-weight: 600;
      }

      .status {
        font-size: 11px;
        opacity: 0.8;
      }
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .date-badge {
    align-self: center;
    background-color: rgba(255, 255, 255, 0.85);
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    margin-bottom: 8px;
  }
`;

export const MessageBubble = styled.div<{ $sender: "system" | "user" }>`
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13.5px;
  line-height: 1.4;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word;

  ${({ $sender }) =>
    $sender === "system"
      ? `
        align-self: flex-start;
        background-color: #ffffff;
        color: #1e293b;
        border-top-left-radius: 2px;
      `
      : `
        align-self: flex-end;
        background-color: #d9fdd3;
        color: #111b21;
        border-top-right-radius: 2px;
      `}

  p {
    margin: 0;
    font-weight: 400;
    strong, b {
      font-weight: 600;
    }
  }

  .time {
    display: block;
    text-align: right;
    font-size: 9.5px;
    color: #64748b;
    margin-top: 4px;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;

    span {
      width: 6px;
      height: 6px;
      background-color: #64748b;
      border-radius: 50%;
      display: inline-block;
      animation: ${typingAnimation} 1.4s infinite ease-in-out;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
`;

export const AgendaStatusCard = styled.div<{ $status: "pending" | "confirmed" }>`
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid ${({ $status }) => ($status === "pending" ? "#fed7aa" : "#bbf7d0")};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background-color: ${({ $status }) => ($status === "pending" ? "#f97316" : "#22c55e")};
  }

  .header-card {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .time-badge {
      font-size: 12px;
      font-weight: 700;
      color: #1e293b;
    }

    .status-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
      width: fit-content;
      
      &.pending {
        background-color: #ffedd5;
        color: #c2410c;
      }

      &.confirmed {
        background-color: #dcfce7;
        color: #15803d;
      }
    }
  }

  .body-card {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .client-name {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }

    .service {
      font-size: 13px;
      color: #475569;
    }

    .professional {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }
  }
`;
