import { FunctionComponent, useEffect, useState } from "react";
import { PhoneContainer, PhoneHeader, ChatArea, MessageBubble, AgendaStatusCard } from "./styles";

interface Message {
  id: number;
  sender: "system" | "user";
  text: string;
  time: string;
  delay: number;
}

const FLOW_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "system",
    text: "Olá, Guilherme! ⚡️ Seu horário de Barbearia com o Carlos está agendado para amanhã às 14:00. Confirma sua presença? \n\nDigite *1* para Confirmar ou *2* para Desmarcar.",
    time: "10:00",
    delay: 1500,
  },
  {
    id: 2,
    sender: "user",
    text: "1",
    time: "10:02",
    delay: 2000,
  },
  {
    id: 3,
    sender: "system",
    text: "Perfeito, Guilherme! Sua presença foi confirmada com sucesso na nossa agenda. Até amanhã! 🤝",
    time: "10:02",
    delay: 1500,
  },
];

export const WhatsAppSimulator: FunctionComponent = () => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agendaStatus, setAgendaStatus] = useState<"pending" | "confirmed">("pending");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const runFlow = async () => {
      if (currentStep < FLOW_MESSAGES.length) {
        const nextMsg = FLOW_MESSAGES[currentStep];
        
        // Ativar animação de digitando antes de mostrar a mensagem
        setIsTyping(true);
        
        timer = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, nextMsg]);
          setCurrentStep((prev) => prev + 1);
          
          if (nextMsg.id === 2) {
            setAgendaStatus("confirmed");
          }
        }, nextMsg.delay);
      } else {
        // Reiniciar fluxo depois de 5 segundos
        timer = setTimeout(() => {
          setVisibleMessages([]);
          setCurrentStep(0);
          setAgendaStatus("pending");
        }, 5000);
      }
    };

    runFlow();

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", alignItems: "center", width: "100%" }}>
      {/* Lado Esquerdo: Simulador do WhatsApp */}
      <PhoneContainer>
        <PhoneHeader>
          <div className="status-bar">
            <span>9:41</span>
            <div className="icons">📶 🛜 🔋</div>
          </div>
          <div className="user-info">
            <div className="back-arrow">‹</div>
            <div className="avatar">GB</div>
            <div className="details">
              <span className="name">Gestão Boa Lembretes</span>
              <span className="status">Online</span>
            </div>
          </div>
        </PhoneHeader>
        
        <ChatArea>
          <div className="date-badge">Hoje</div>
          
          {visibleMessages.map((msg) => (
            <MessageBubble key={msg.id} $sender={msg.sender}>
              <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </MessageBubble>
          ))}
          
          {isTyping && (
            <MessageBubble $sender={FLOW_MESSAGES[currentStep]?.sender || "system"}>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </MessageBubble>
          )}
        </ChatArea>
        <div className="chat-footer">
          <div className="input-placeholder">Mensagem</div>
          <div className="mic-icon">🎤</div>
        </div>
      </PhoneContainer>

      {/* Lado Direito: Tela de Agenda do Profissional */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
        <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#03045e" }}>
          Sua Agenda Gestão Boa
        </h4>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
          O status do agendamento atualiza instantaneamente quando o cliente responde no WhatsApp.
        </p>
        
        <AgendaStatusCard $status={agendaStatus}>
          <div className="header-card">
            <span className="time-badge">14:00 - 14:30</span>
            <span className={`status-pill ${agendaStatus}`}>
              {agendaStatus === "pending" ? "🕒 Aguardando Confirmação" : "✅ Confirmado pelo WhatsApp"}
            </span>
          </div>
          <div className="body-card">
            <span className="client-name">Guilherme Souza</span>
            <span className="service">Corte de Cabelo + Barba</span>
            <span className="professional">Profissional: Carlos Silva</span>
          </div>
        </AgendaStatusCard>
      </div>
    </div>
  );
};
