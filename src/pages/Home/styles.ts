import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  .seo-navigation {
    display: none;
    visibility: hidden;
    position: absolute;
    left: -9999px;
  }
`;

const levitate = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 180, 216, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(0, 180, 216, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 180, 216, 0);
  }
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 180, 216, 0.06);
  border: 1px solid rgba(0, 180, 216, 0.25);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #0077b6;
  width: fit-content;
  margin-bottom: -10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${pulseGlow} 3s infinite;

  &:hover {
    background: rgba(0, 180, 216, 0.1);
    border-color: rgba(0, 180, 216, 0.4);
    transform: translateY(-1px);
  }

  span.emoji {
    font-size: 16px;
  }

  span.highlight {
    background: linear-gradient(90deg, #03045e, #0077b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  @media (max-width: 960px) {
    align-self: center;
    margin-bottom: 0px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 4px 12px;
  }
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  grid-column: span 12;
  padding: 140px 40px 60px;
  min-height: auto;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);

  /* Soft modern radial glows for background depth */
  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, rgba(0, 180, 216, 0) 70%);
    top: -200px;
    right: -100px;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(3, 4, 94, 0.05) 0%, rgba(3, 4, 94, 0) 70%);
    bottom: -200px;
    left: -100px;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 1;
    pointer-events: none;
  }

  .content, .dual-showcase-container {
    position: relative;
    z-index: 2;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 900px;
  }

  .content .badge-link {
    text-decoration: none;
    width: fit-content;
  }

  .content .title {
    font-weight: 800;
    font-size: 56px;
    text-align: center;
    max-width: 850px;
    line-height: 1.12;
    color: #0f172a;
    letter-spacing: -1.5px;

    span.highlight-text {
      background: linear-gradient(90deg, #0077b6 0%, #00b4d8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content .subtitle {
    font-weight: 400;
    font-size: 1.2rem;
    color: #475569;
    text-align: center;
    max-width: 650px;
    line-height: 1.6;
  }

  .content .subtitle span {
    font-weight: 700;
    color: #0077b6;
  }

  .content .buttons {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .content .buttons .button {
    width: auto;
    min-width: 240px;
  }

  .dual-showcase-container {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 1060px;
    margin-top: 50px;
    align-items: flex-end;
    justify-content: center;
    padding-right: 40px;

    .showcase-glow-flare {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 95%;
      height: 85%;
      background: radial-gradient(ellipse at center, rgba(0, 180, 216, 0.22) 0%, rgba(3, 4, 94, 0.06) 55%, transparent 80%);
      filter: blur(65px);
      pointer-events: none;
      z-index: 1;
    }

    /* Computador / Web Browser Mockup */
    .desktop-web-mockup {
      position: relative;
      z-index: 2;
      width: 86%;
      max-width: 900px;
      background: #0f172a;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow:
        0 30px 80px -15px rgba(3, 4, 94, 0.28),
        0 0 0 1px rgba(255, 255, 255, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
      overflow: hidden;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        transform: translateY(-4px);
        box-shadow:
          0 40px 100px -20px rgba(0, 180, 216, 0.35),
          0 0 0 1px rgba(255, 255, 255, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }

      .desktop-window-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #1e293b;
        padding: 12px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .window-dots {
          display: flex;
          align-items: center;
          gap: 8px;

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;

            &.red { background: #ef4444; }
            &.yellow { background: #f59e0b; }
            &.green { background: #10b981; }
          }
        }

        .window-address-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(15, 23, 42, 0.6);
          color: #94a3b8;
          padding: 6px 20px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;

          .lock-icon {
            font-size: 0.75rem;
          }
        }

        .window-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 4px 12px;
          border-radius: 50px;
        }
      }

      .desktop-screen {
        width: 100%;
        background: #ffffff;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
          max-height: 520px;
          object-fit: cover;
          display: block;
        }
      }
    }

    /* Celular / Mobile Smartphone Mockup Sobreposto */
    .mobile-app-mockup {
      position: absolute;
      right: 0;
      bottom: -20px;
      z-index: 10;
      width: 240px;
      background: #090d16;
      border-radius: 36px;
      padding: 12px 8px 12px;
      box-shadow:
        0 30px 70px -10px rgba(0, 0, 0, 0.65),
        0 10px 25px -5px rgba(3, 4, 94, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
      border: 2.5px solid rgba(255, 255, 255, 0.18);
      animation: ${levitate} 6s ease-in-out infinite;

      .phone-top-speaker {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 7px;
        height: 5px;

        .speaker-bar {
          width: 34px;
          height: 3px;
          border-radius: 3px;
          background: #232d3d;
        }

        .camera-lens {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #151d28;
          border: 1px solid #283447;
        }
      }

      .phone-screen {
        width: 100%;
        background: #03045E;
        border-radius: 26px;
        overflow: hidden;
        line-height: 0;

        img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: 26px;
        }
      }
    }
  }

  @media (max-width: 1300px) {
    padding: 130px 40px 50px;

    .content .title {
      font-size: 46px;
      max-width: 700px;
    }

    .dual-showcase-container {
      max-width: 940px;

      .mobile-app-mockup {
        width: 210px;
        right: 0;
        bottom: -15px;
      }
    }
  }

  @media (max-width: 960px) {
    padding: 120px 24px 40px;

    .content .title {
      font-size: 36px;
      max-width: 100%;
    }

    .content .subtitle {
      font-size: 1.05rem;
    }

    .dual-showcase-container {
      padding-right: 0;
      flex-direction: column;
      align-items: center;

      .desktop-web-mockup {
        width: 100%;
        max-width: 650px;
      }

      .mobile-app-mockup {
        position: relative;
        right: auto;
        bottom: auto;
        margin-top: -35px;
        width: 220px;
      }
    }
  }

  @media (max-width: 800px) {
    padding: 105px 20px 30px;

    .content .title {
      font-size: 32px;
    }

    .content .subtitle {
      font-size: 1rem;
    }

    .content .buttons .button {
      width: 180px;
    }

    .dual-showcase-container {
      margin-top: 30px;

      .desktop-web-mockup .desktop-window-header {
        padding: 8px 12px;

        .window-badge {
          display: none;
        }
      }
    }
  }

  @media (max-width: 600px) {
    padding: 95px 16px 30px;

    .content {
      gap: 18px;
      width: 100%;
    }

    .content .title {
      font-size: 26px;
      letter-spacing: -0.5px;
    }

    .content .subtitle {
      font-size: 0.95rem;
    }

    .content .buttons {
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .content .buttons .button {
      width: 100%;
      min-width: unset;
    }

    .dual-showcase-container {
      margin-top: 20px;

      .desktop-web-mockup {
        border-radius: 12px;

        .desktop-window-header .window-address-bar {
          font-size: 0.72rem;
          padding: 4px 10px;
        }
      }

      .mobile-app-mockup {
        margin-top: -25px;
        width: 195px;
        border-radius: 30px;
        padding: 10px 7px 10px;

        .phone-screen {
          border-radius: 22px;

          img {
            border-radius: 22px;
          }
        }
      }
    }
  }
`;

export const Awards = styled.div`
  display: flex;
  grid-column: span 12;
  justify-content: space-around;
  width: "100%";
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #03045e;

  .item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    color: #fff;
    padding: 0 20px;
    justify-content: center;
  }

  .award-pair {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 0 15px;
  }

  .item .number {
    font-weight: bold;
    font-size: 48px;
  }

  .item .text {
    font-size: 18px;
    max-width: 313px;
    line-height: 1.4;
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    .item {
      flex-direction: column;
      text-align: center;
    }

    .award-pair {
      flex-direction: column;
      margin-bottom: 20px;
    }

    .item .number {
      font-size: 36px;
    }

    .item .text {
      font-size: 16px;
      max-width: 100%;
      padding: 0 10px;
    }
  }

  @media (max-width: 600px) {
    .item .number {
      font-size: 28px;
    }

    .item .text {
      font-size: 16px;
    }
  }
`;

export const Solutions = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 12;
  position: relative;

  .solutionBanner {
    width: 100%;
    display: flex;
    height: 500px;
    background-image: url(/entrepreneur.png);
    background-position: center;
    background-size: cover;
    position: relative;
    justify-content: center;
    align-items: end;
  }

  .solutionBanner .vignette {
    display: flex;
    width: 100%;
    position: absolute;
    height: 500px;
    background: linear-gradient(rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.8));
  }

  .solutionBanner .title {
    font-size: 72px;
    font-weight: bold;
    margin-bottom: 100px;
    color: #fff;
    z-index: 100;
  }

  /* Seção de Métricas - Números que falam por si */
  .metrics-section {
    background: linear-gradient(135deg, #03045e 0%, #0077b6 100%);
    padding: 4rem 2rem;
    text-align: center;

    .metrics-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.75rem;
    }

    .metrics-subtitle {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 3rem;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .metric-card {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 2rem 1.5rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-4px);
      }

      .metric-icon {
        width: 56px;
        height: 56px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.25rem;

        svg {
          stroke: #00b4d8;
        }
      }

      .metric-value {
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 0.5rem;
      }

      .metric-label {
        font-size: 1.1rem;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 0.25rem;
      }

      .metric-description {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }

    @media (max-width: 1024px) {
      padding: 3rem 1.5rem;

      .metrics-title {
        font-size: 2rem;
      }

      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
      }

      .metric-card {
        padding: 1.5rem 1rem;

        .metric-value {
          font-size: 2rem;
        }
      }
    }

    @media (max-width: 600px) {
      padding: 2.5rem 1rem;

      .metrics-title {
        font-size: 1.75rem;
      }

      .metrics-subtitle {
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .metric-card {
        padding: 1.25rem 0.75rem;

        .metric-icon {
          width: 44px;
          height: 44px;
          margin-bottom: 1rem;

          svg {
            width: 22px;
            height: 22px;
          }
        }

        .metric-value {
          font-size: 1.75rem;
        }

        .metric-label {
          font-size: 0.95rem;
        }

        .metric-description {
          font-size: 0.8rem;
        }
      }
    }
  }

  .benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 3rem 4rem;
    max-width: 1400px;
    margin: 0 auto;

    .benefit {
      background: #ffffff;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: left;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid #f0f0f0;

      &:hover {
        box-shadow: 0 8px 24px rgba(3, 4, 94, 0.1);
        border-color: #e0e0e0;
      }

      .benefit-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f8fc;
        border-radius: 12px;

        svg {
          width: 24px;
          height: 24px;
        }
      }

      .info {
        .title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .subtitle {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
      }

      .benefit-button {
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        color: #0077b6;
        font-size: 0.9rem;
        font-weight: 500;
        
        &:hover {
          color: #03045e;
        }
      }
    }

    @media (max-width: 1024px) {
      padding: 2rem;
      gap: 1.25rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1.5rem;

      .benefit {
        padding: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      padding: 1rem;
    }
  }

  .benefits-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    
    .benefits-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 800;
      color: #03045e;
      margin-bottom: 4rem;
    }

    .benefits {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;

      .benefit {
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        border-radius: 20px;
        padding: 2rem 1.75rem;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 10px 30px -10px rgba(3, 4, 94, 0.04);
        border: 1px solid rgba(226, 232, 240, 0.8);

        &:hover {
          background: #ffffff;
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -15px rgba(3, 4, 94, 0.1);
          border-color: rgba(0, 119, 182, 0.25);
        }

        .benefit-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 119, 182, 0.06);
          border: 1px solid rgba(0, 119, 182, 0.15);
          border-radius: 14px;
          transition: all 0.3s ease;

          svg {
            width: 24px;
            height: 24px;
            stroke: #0077b6;
            transition: transform 0.3s ease;
          }
        }

        &:hover .benefit-icon {
          background: #0077b6;
          border-color: #0077b6;

          svg {
            stroke: #ffffff;
            transform: scale(1.1);
          }
        }

        .benefit-content {
          flex: 1;
          text-align: left;

          .benefit-title {
            font-size: 1.15rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #1e293b;
          }

          .benefit-description {
            font-size: 0.95rem;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 0.75rem;
          }

          .benefit-link {
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            color: #0077b6;
            font-size: 0.9rem;
            font-weight: 700;
            transition: color 0.2s;
            
            &:hover {
              color: #03045e;
            }
          }
        }
      }
    }

    @media (max-width: 1200px) {
      padding: 4rem 1.5rem;
      
      .benefits-title {
        font-size: 2.2rem;
        margin-bottom: 3rem;
      }
      
      .benefits {
        gap: 1.5rem;
      }
    }

    @media (max-width: 960px) {
      .benefits {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
      }
    }

    @media (max-width: 768px) {
      padding: 3rem 1rem;
      
      .benefits-title {
        font-size: 1.85rem;
        margin-bottom: 2rem;
      }
      
      .benefits {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .benefit {
          padding: 1.5rem 1.25rem;
        }
      }
    }

    @media (max-width: 600px) {
      .benefits {
        grid-template-columns: 1fr;
      }
    }
  }

  .try-free-button-container {
    display: flex;
    justify-content: center;
    margin: 3rem 0;

    .try-free-button {
      text-decoration: none;
      max-width: 300px;
      width: 100%;
    }
  }

  .tutorial {
    display: grid;
    padding: 200px;
    padding-top: 30px;
    padding-bottom: 30px;
    align-items: center;
    justify-content: center;
    width: calc(100% - 400px);
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 50px;
  }

  .tutorial .callout {
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
  }

  .tutorial .callout .title {
    font-size: 48px;
  }

  .tutorial .callout .description {
    font-size: 24px;
  }

  .tutorial .callout span {
    font-weight: bold;
  }

  .tutorial .callout .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 44px;
  }

  .tutorial .callout .buttons .top {
    display: flex;
    gap: 72px;
    align-items: center;
  }

  .tutorial .callout .buttons a {
    width: 276px;
    height: 50px;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: bold;
    gap: 10px;
  }

  .tutorial .callout .buttons img.ios-icon {
    margin-top: -6px;
  }

  a.unfocused {
    border: 1px solid #03045e;
    color: #03045e;
  }

  a.focused {
    background-color: #03045e;
    color: #fff;
  }

  .player {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 1780px) {
    .solutionBanner .title {
      font-size: 64px;
      width: calc(100% - 200px);
    }

    .benefits {
      align-items: center;
      width: calc(100% - 200px);
    }

    .tutorial {
      padding: 100px;
      padding-top: 30px;
      padding-bottom: 30px;
      width: calc(100% - 200px);
      grid-template-columns: 2fr 2fr;
    }

    .tutorial .callout .buttons {
      gap: 30px;
    }

    .tutorial .callout .buttons .top {
      gap: 30px;
    }
  }

  @media (max-width: 1280px) {
    .benefits {
      grid-template-columns: 1fr 1fr;
    }

    .tutorial {
      display: flex;
      flex-direction: column;
      gap: 70px;
    }
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 800px) {
    .benefits {
      align-items: center;
      width: calc(100%);
      padding: 0px;
      padding-top: 50px;
      padding-bottom: 50px;
      grid-column-gap: 50px;
    }

    .benefits .benefit img {
      width: 250px;
      height: 250px;
    }

    .benefits .benefit .title {
      width: 250px;
    }

    .benefits .benefit .subtitle {
      width: 250px;
    }
  }

  @media (max-width: 800px) {
    .tutorial .callout .buttons .top {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .solutionBanner .title {
      font-size: 48px;
      justify-content: center;
      text-align: center;
    }

    .tutorial .callout .buttons .or {
      display: none;
    }
  }

  @media (max-width: 600px) {
    gap: 60px;

    .solutionBanner {
      height: 350px;
      background-image: url(/unsplash_-sRVfY0f2d8.png);
    }

    .solutionBanner .vignette {
      height: 350px;
      background: linear-gradient(rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.8));
      background-position: left;
    }

    .solutionBanner .title {
      font-size: 32px;
      margin-bottom: 60px;
      justify-content: center;
      text-align: center;
    }

    .benefits {
      padding: 10px;
      display: flex;
      width: calc(100% - 20px);
      flex-direction: column;
      padding-top: 30px;
      gap: 50px;
    }

    .benefits .benefit {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: center;
      height: fit-content;
    }

    .benefits .benefit img {
      width: 250px;
      height: 250px;
    }

    .benefits .benefit .title {
      width: calc(100% - 20px);
      font-size: 26px;
    }

    .benefits .benefit .subtitle {
      width: calc(100% - 20px);
      font-weight: normal;
      font-size: 16px;
    }

    .tutorial {
      display: flex;
      flex-direction: column;
      padding: 10px;
      width: calc(100% - 20px);
      margin-bottom: 50px;
    }

    .tutorial .callout {
      width: calc(100% - 20px);
      margin-bottom: 50px;
    }

    .tutorial .callout .title {
      font-size: 32px;
    }

    .tutorial .callout .description {
      font-size: 20px;
    }

    .tutorial .callout .buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
    }
  }
`;

export const Team = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 12;
  padding: 80px 60px;
  background: linear-gradient(135deg, #03045e 0%, #023e8a 100%);
  color: #fff;
  gap: 40px;
  position: relative;

  .title {
    text-align: center;
    font-weight: 800;
    font-size: 64px;
    background: linear-gradient(90deg, #fff 0%, #caf0f8 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }

  .subtitle {
    text-align: center;
    font-size: 24px;
    color: #90e0ef;
    max-width: 800px;
    margin: 0 auto;
  }

  .scroll-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .items {
    display: flex;
    overflow-x: hidden;
    gap: 40px;
    padding: 20px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
  }

  .member {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 20px 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    min-width: calc((100% - 80px) / 3);
    flex: 0 0 auto;

    &:hover {
      transform: translateY(-10px);
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

      &::before {
        transform: translateX(100%);
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: transform 0.5s;
    }

    img {
      width: 160px;
      height: 160px;
      border-radius: 20px;
      object-fit: cover;
      margin-bottom: 15px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;

      &:hover {
        border-color: #90e0ef;
        transform: scale(1.05);
      }
    }

    .name {
      font-size: 22px;
      font-weight: bold;
      margin: 8px 0;
      color: #fff;
    }

    .subtitle {
      font-size: 22px;
      color: #90e0ef;
      text-align: center;
      font-style: bold;
    }

    .role-description {
      font-size: 14px;
      color: #caf0f8;
      text-align: center;
      margin-top: 10px;
      line-height: 1.3;
      opacity: 0.9;
    }
  }

  .scroll-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
    }

    &.left {
      left: 5px;
    }

    &.right {
      right: 5px;
    }

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
      font-size: 18px;
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.35);
      top: calc(50% - 30px);

      &.left {
        left: 2px;
      }

      &.right {
        right: 2px;
      }

      &:active {
        background: rgba(255, 255, 255, 0.35);
        transform: translateY(-50%) scale(0.95);
      }
    }

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
      font-size: 16px;
    }
  }

  @media (max-width: 1024px) {
    padding: 60px 40px;

    .title {
      font-size: 48px;
    }

    .subtitle {
      font-size: 20px;
    }

    .member {
      min-width: calc(50% - 20px); /* 2 items per view on smaller screens */
    }

    .member img {
      width: 140px;
      height: 140px;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 10px;
    gap: 25px;

    .title {
      font-size: 32px;
      margin-bottom: 15px;
    }

    .subtitle {
      font-size: 16px;
      padding: 0 15px;
    }

    .items {
      padding: 10px;
      gap: 15px;
      overflow-x: auto; // Change to auto for better mobile scrolling
    }

    .member {
      min-width: calc(100% - 30px);
      padding: 15px;
      margin: 0 15px;

      img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }

      .name {
        font-size: 18px;
        margin: 5px 0;
      }

      .subtitle {
        font-size: 14px;
        padding: 0;
      }

      .role-description {
        font-size: 12px;
        margin-top: 8px;
        padding: 0 10px;
      }

      &:hover {
        transform: translateY(-5px); // Reduce hover effect on mobile
      }
    }

    // Add visual cue for scrolling
    &::after {
      content: "";
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.8;
      }
      100% {
        opacity: 0.2;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 30px 5px;

    .member {
      margin: 0 10px;

      img {
        width: 80px;
        height: 80px;
      }

      .name {
        font-size: 16px;
      }

      .subtitle {
        font-size: 12px;
      }

      .role-description {
        font-size: 11px;
        line-height: 1.2;
      }
    }
  }
`;

// Contact Section Redesign
export const ContactContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 5%;
  max-width: 1400px;
  grid-column: span 12;
  margin: 0 auto;
  gap: 80px;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 80px 40px;
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
    gap: 40px;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }
`;

export const ContactTitle = styled.h2`
  font-weight: 800;
  font-size: 56px;
  line-height: 1.1;
  color: #03045e;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const ContactSocial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  a {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #0077b6;
    width: fit-content;
    font-weight: 600;
    font-size: 24px;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #03045e;
      transform: translateX(5px);
    }
  }

  @media (max-width: 768px) {
    a {
      font-size: 20px;
    }
  }
`;

export const ContactFormColumn = styled.div`
  flex: 1;
  max-width: 600px;
  width: 100%;
`;

export const ContactFormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #03045e;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(3, 4, 94, 0.15);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const FormLabel = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  margin-left: 4px;
`;

export const FormButtonWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end; /* Align button to the right for a cleaner look, or center if preferred. Going with full width typically or end. */
`;

const faqFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FAQ = styled.section`
  padding: 6rem 2rem;
  grid-column: span 12;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 3.5rem;
    color: #03045e;
  }

  .faq-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .faq-item {
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      background-color: #ffffff;
      box-shadow: 0 4px 20px -5px rgba(3, 4, 94, 0.02);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        border-color: rgba(0, 119, 182, 0.25);
        box-shadow: 0 10px 25px -10px rgba(3, 4, 94, 0.06);
      }

      &[open] {
        border-color: rgba(0, 119, 182, 0.3);
        box-shadow: 0 12px 30px -10px rgba(3, 4, 94, 0.08);
      }

      summary {
        padding: 1.4rem 1.5rem;
        position: relative;
        cursor: pointer;
        font-weight: 700;
        font-size: 1.1rem;
        color: #1e293b;
        list-style: none;
        background-color: #ffffff;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          color: #0077b6;
        }

        &::-webkit-details-marker {
          display: none;
        }

        &::after {
          content: '';
          width: 8px;
          height: 8px;
          border-right: 2px solid #0077b6;
          border-bottom: 2px solid #0077b6;
          transform: rotate(45deg);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
          margin-right: 4px;
        }
      }

      &[open] summary {
        color: #03045e;
        border-bottom: 1px solid #f1f5f9;
        
        &::after {
          transform: rotate(-135deg);
          border-color: #03045e;
        }
      }

      p {
        padding: 1.25rem 1.5rem;
        margin: 0;
        color: #475569;
        font-size: 1rem;
        line-height: 1.6;
        background-color: #ffffff;
        animation: ${faqFadeIn} 0.35s ease-out;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;

    .section-title {
      font-size: 2rem;
      margin-bottom: 2.5rem;
    }

    .faq-container {
      gap: 1rem;

      .faq-item {
        border-radius: 12px;

        summary {
          padding: 1.1rem 1.2rem;
          font-size: 0.95rem;
        }

        p {
          padding: 1rem 1.2rem;
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export const Segments = styled.section`
  padding: 3rem 2rem;
  grid-column: span 12;
  background: linear-gradient(135deg, #03045e 0%, #0077b6 100%);
  color: white;

  .section-title {
    text-align: center;
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    color: white;
    background: linear-gradient(90deg, #fff 0%, #90e0ef 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-subtitle {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 2.5rem;
    color: #90e0ef;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
  }

  .carousel-btn {
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.28);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 2;
    flex-shrink: 0;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(255, 255, 255, 0.28);
      border-color: rgba(255, 255, 255, 0.45);
      transform: scale(1.08);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }

    &:active {
      transform: scale(0.95);
    }

    &:focus-visible {
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }
  }

  .carousel-track {
    display: flex;
    gap: 1.5rem;
    flex: 1;
    overflow: hidden;
    justify-content: center;
  }

  .carousel-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
    flex: 1;
    max-width: 400px;
    min-height: 500px;

    &:hover {
      transform: translateY(-8px);
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.05),
        transparent
      );
      transition: transform 0.6s;
    }

    &:hover::before {
      transform: translateX(200%);
    }
  }

  .segment-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .segment-title {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    color: white;
  }

  .segment-description {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    color: #e0e7ff;
  }

  .segment-features {
    list-style: none;
    padding: 0;
    margin: 1rem 0;

    li {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem 0.8rem;
      margin: 0.3rem 0;
      border-radius: 8px;
      font-size: 0.85rem;
      position: relative;

      &:before {
        content: "✓";
        color: #90e0ef;
        font-weight: bold;
        margin-right: 0.5rem;
      }
    }
  }

  .segment-link {
    display: inline-block;
    background: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
    color: white;
    text-decoration: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-top: auto;

    &:hover {
      background: linear-gradient(135deg, #005577 0%, #0096c7 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 150, 199, 0.3);
    }
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 2rem;
  }

  .carousel-indicator {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0;

    &.active {
      background: white;
      width: 28px;
      border-radius: 6px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.7);
    }
  }

  @media (max-width: 1200px) {
    .carousel-track {
      gap: 1rem;
    }

    .carousel-card {
      max-width: 350px;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;

    .section-title {
      font-size: 1.8rem;
    }

    .carousel-container {
      gap: 0.8rem;
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .carousel-track {
      gap: 0;
    }

    .carousel-card {
      min-height: 450px;
      max-width: none;
      padding: 1.2rem;
    }

    .segment-title {
      font-size: 1.1rem;
    }

    .segment-description {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.8rem;

    .carousel-container {
      gap: 0.5rem;
    }

    .carousel-btn {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }

    .carousel-card {
      min-height: 400px;
      padding: 1rem;
    }

    .segment-title {
      font-size: 1rem;
    }

    .segment-description {
      font-size: 0.8rem;
    }

    .segment-features li {
      font-size: 0.75rem;
    }
  }
`;

export const InstagramSection = styled.section`
  grid-column: span 12;
  padding: 80px 40px;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;
    max-width: 600px;

    h2 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #03045e;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.15rem;
      color: #64748b;
      line-height: 1.6;
    }
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 3rem;
    background: #ffffff;
    padding: 12px 24px;
    border-radius: 50px;
    box-shadow: 0 10px 30px -10px rgba(3, 4, 94, 0.05);
    border: 1px solid #e2e8f0;
    position: relative;
    z-index: 2;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #0077b6;
    }

    .info {
      display: flex;
      flex-direction: column;
      text-align: left;
      
      .username {
        font-weight: 800;
        color: #1e293b;
        font-size: 1.05rem;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .followers {
        font-size: 0.85rem;
        color: #64748b;
      }
    }

    .follow-btn {
      text-decoration: none;
      background: #0077b6;
      color: white;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 8px 16px;
      border-radius: 20px;
      transition: background 0.2s;

      &:hover {
        background: #03045e;
      }
    }
  }

  .carousel-container {
    width: 100%;
    max-width: 1200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .carousel-track {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;

    @media (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      max-width: 360px;
    }
  }

  .post-card {
    text-decoration: none;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px -10px rgba(3, 4, 94, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px -15px rgba(3, 4, 94, 0.12);
      border-color: rgba(0, 119, 182, 0.25);
    }

    .image-wrapper {
      width: 100%;
      aspect-ratio: 1;
      position: relative;
      overflow: hidden;
      background: #f1f5f9;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(3, 4, 94, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: white;
        font-weight: 700;
        font-size: 1.1rem;

        span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      }
    }

    &:hover .image-wrapper {
      img {
        transform: scale(1.05);
      }
      
      .overlay {
        opacity: 1;
      }
    }

    .card-footer {
      padding: 1.25rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .caption {
        font-size: 0.9rem;
        color: #475569;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .action-text {
        font-size: 0.85rem;
        color: #0077b6;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin: 0;

    .section-header {
      h2 {
        font-size: 1.85rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
`;

export const PlansCTA = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #03045e 0%, #0077b6 100%);
  color: #ffffff;
  text-align: center;
  grid-column: span 12;
  position: relative;
  overflow: hidden;

  /* Decorative glowing circles */
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, rgba(0, 180, 216, 0) 70%);
    top: -50px;
    left: -50px;
    border-radius: 50%;
    filter: blur(40px);
    pointer-events: none;
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    max-width: 800px;
    line-height: 1.2;
    color: #ffffff;
  }

  .cta-text {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2.5rem;
    max-width: 600px;
    line-height: 1.5;
  }

  .cta-button {
    text-decoration: none;
    background: #00b4d8;
    color: #03045e;
    font-size: 1.2rem;
    font-weight: 800;
    padding: 18px 40px;
    border-radius: 50px;
    box-shadow: 0 10px 25px rgba(0, 180, 216, 0.4);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:hover {
      background: #ffffff;
      color: #03045e;
      transform: translateY(-3px);
      box-shadow: 0 15px 30px rgba(255, 255, 255, 0.25);
    }
  }

  .plans-info {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 1rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;

    .cta-title {
      font-size: 1.85rem;
    }

    .cta-text {
      font-size: 1.05rem;
      margin-bottom: 2rem;
    }

    .cta-button {
      font-size: 1.05rem;
      padding: 14px 28px;
    }
  }
`;

// =============================================
// WHATSAPP HERO SECTION
// =============================================

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const countPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const WhatsAppSection = styled.section`
  grid-column: span 12;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 50%, #ffffff 100%);
  padding: 80px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%);
    top: -150px;
    right: -100px;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(37, 211, 102, 0.06) 0%, transparent 70%);
    bottom: -100px;
    left: -100px;
    border-radius: 50%;
    filter: blur(50px);
    pointer-events: none;
  }

  .whatsapp-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 960px) {
    padding: 60px 20px;
    .whatsapp-inner {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
`;

export const WhatsAppContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 960px) {
    text-align: center;
    align-items: center;
  }
`;

export const WhatsAppBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 119, 182, 0.08);
  border: 1px solid rgba(0, 119, 182, 0.2);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  color: #0077b6;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const WhatsAppHeading = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  color: #03045e;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.5px;

  span {
    background: linear-gradient(90deg, #0077b6 0%, #00b4d8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

export const WhatsAppDescription = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.65;
  margin: 0;
  max-width: 540px;

  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

export const WhatsAppCounter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  padding: 14px 22px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(3, 4, 94, 0.06);
  width: fit-content;
  animation: ${countPulse} 4s ease-in-out infinite;

  .counter-number {
    font-size: 2.2rem;
    font-weight: 900;
    color: #0077b6;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }

  .counter-label {
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.35;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .counter-number {
      font-size: 1.8rem;
    }
    .counter-label {
      font-size: 0.82rem;
    }
  }
`;

export const WhatsAppFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 4px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const WhatsAppFeatureCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 16px rgba(3, 4, 94, 0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  text-align: left;

  &:hover {
    background: #ffffff;
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -8px rgba(3, 4, 94, 0.1);
    border-color: rgba(0, 119, 182, 0.3);
  }

  .feature-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(0, 119, 182, 0.06);
    border: 1px solid rgba(0, 119, 182, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }

  &:hover .feature-icon {
    background: #0077b6;
    border-color: #0077b6;
    transform: scale(1.06);
  }

  .feature-title {
    font-size: 0.98rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
  }

  .feature-desc {
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

export const WhatsAppCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(90deg, #0077b6 0%, #00b4d8 100%);
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 16px 34px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0, 119, 182, 0.28);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  width: fit-content;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 119, 182, 0.38);
    filter: brightness(1.06);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    font-size: 0.95rem;
    padding: 14px 24px;
  }
`;

export const WhatsAppMockupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${floatAnimation} 6s ease-in-out infinite;

  @media (max-width: 960px) {
    order: -1;
  }
`;

export const WAChatMockup = styled.div`
  width: 100%;
  max-width: 380px;
  background: #0f172a;
  border-radius: 38px;
  padding: 16px 8px 12px;
  box-shadow: 0 25px 60px -15px rgba(3, 4, 94, 0.18),
    0 0 0 1px rgba(15, 23, 42, 0.08);
  border: 3px solid #1e293b;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  text-align: left;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 35px 80px -15px rgba(3, 4, 94, 0.25);
  }

  .phone-notch {
    width: 75px;
    height: 12px;
    background: #000000;
    border-radius: 10px;
    margin: 0 auto 12px;
  }

  .phone-screen {
    border-radius: 26px;
    overflow: hidden;
    background: #efeae2;
  }
`;

export const WAChatHeader = styled.div`
  background: #008069;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #008069;
    font-weight: 800;
    font-size: 1.05rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .info {
    flex: 1;

    strong {
      display: block;
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 600;
    }

    span {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.75rem;
      color: #d1fae5;
    }
  }

  .bot-tag {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
`;

export const WAChatBody = styled.div`
  background: #efeae2;
  background-image: radial-gradient(#d1d7db 1.5px, transparent 1.5px);
  background-size: 16px 16px;
  padding: 1.15rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const WABubble = styled.div<{ $outgoing?: boolean }>`
  max-width: 90%;
  align-self: ${(props) => (props.$outgoing ? "flex-end" : "flex-start")};
  background: ${(props) => (props.$outgoing ? "#d9fdd3" : "#ffffff")};
  color: #111b21;
  padding: 0.75rem 0.95rem 0.55rem;
  border-radius: ${(props) =>
    props.$outgoing ? "14px 14px 2px 14px" : "14px 14px 14px 2px"};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 0.86rem;
  line-height: 1.45;
  position: relative;

  .bubble-badge {
    display: inline-block;
    background: ${(props) =>
      props.$outgoing ? "rgba(0, 119, 182, 0.1)" : "rgba(0, 119, 182, 0.1)"};
    color: #0077b6;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    margin-bottom: 6px;
    text-transform: uppercase;
  }

  .time {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
    font-size: 0.68rem;
    color: #667781;
    margin-top: 5px;

    svg {
      width: 14px;
      height: 14px;
      color: #53bdeb;
    }
  }
`;

// Video / App Demo Phone Mockup Container (semelhante a salao-estetica)
export const VideoContainer = styled.div`
  max-width: 280px;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  padding: 10px 8px 12px;
  border-radius: 36px;
  border: 1px solid rgba(0, 119, 182, 0.35);
  box-shadow: 
    0 25px 50px -12px rgba(3, 4, 94, 0.18),
    0 0 0 4px #f8fafc,
    0 0 0 6px rgba(0, 119, 182, 0.2);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 35px 65px -15px rgba(3, 4, 94, 0.25),
      0 0 0 4px #f8fafc,
      0 0 0 6px rgba(0, 119, 182, 0.28);
  }

  .phone-notch {
    width: 65px;
    height: 10px;
    background: #0f172a;
    border-radius: 10px;
    margin: 0 auto 10px;
    flex-shrink: 0;
  }

  video {
    width: 100%;
    max-height: 520px;
    height: auto;
    display: block;
    border-radius: 24px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 240px;
    padding: 8px 6px 10px;
    border-radius: 30px;

    .phone-notch {
      width: 50px;
      height: 8px;
      margin-bottom: 8px;
    }

    video {
      max-height: 440px;
      border-radius: 20px;
    }
  }
`;