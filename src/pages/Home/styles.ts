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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  grid-column: span 12;
  padding-top: 150px;
  padding-bottom: 60px;
  padding-left: 100px;
  padding-right: 100px;
  min-height: auto;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);

  /* Soft modern radial glows for background depth */
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.12) 0%, rgba(0, 180, 216, 0) 70%);
    top: -100px;
    right: -100px;
    border-radius: 50%;
    filter: blur(50px);
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(3, 4, 94, 0.06) 0%, rgba(3, 4, 94, 0) 70%);
    bottom: -150px;
    left: -100px;
    border-radius: 50%;
    filter: blur(60px);
    z-index: 1;
    pointer-events: none;
  }

  .content, .images {
    position: relative;
    z-index: 2;
  }

  .content {
    display: flex;
    flex-direction: column;
    grid-column: span 7;
    gap: 30px;
    justify-self: flex-start;
  }

  .content .badge-link {
    text-decoration: none;
    width: fit-content;
  }

  .content .title {
    font-weight: bold;
    font-size: 72px;
    text-align: start;
    max-width: 700px;
    line-height: 1.1;
  }

  .content .subtitle {
    font-weight: lighter;
    font-size: 24px;
    text-align: start;
    max-width: 600px;
    line-height: 1.4;
  }

  .content .subtitle span {
    font-weight: bold;
    color: #03045e;
  }

  .content .buttons {
    display: flex;
    max-width: 600px;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }

  .content .buttons .button {
    width: 250px;
  }

  .content .buttons .button-link {
    text-decoration: none;
    display: inline-block;
  }

  .images {
    display: flex;
    grid-column: span 5;
    position: relative;
    width: fit-content;
    height: 600px;
    align-items: center;
    justify-self: center;
  }

  .images .cellphone {
    position: absolute;
    z-index: 100;
    height: 600px;
    width: auto;
    right: 0px;
    left: 0px;
    top: 0px;
    bottom: 0px;
    margin: 0 auto;
    animation: ${levitate} 6s ease-in-out infinite;
    filter: drop-shadow(0 25px 30px rgba(3, 4, 94, 0.15));
  }

  .images .elipse {
    height: 100%;
  }

  @media (max-width: 1780px) {
    .content .title {
      font-size: 56px;
      max-width: 550px;
    }

    .content .subtitle {
      max-width: 500px;
      font-size: 20px;
    }

    .content .buttons {
      max-width: 500px;
    }

    .images {
      height: 500px;
    }

    .images .cellphone {
      height: 500px;
    }
  }

  @media (max-width: 1300px) {
    padding-left: 60px;
    padding-right: 60px;

    .content .title {
      font-size: 44px;
      max-width: 420px;
    }

    .content .subtitle {
      max-width: 400px;
      font-size: 18px;
    }

    .content .buttons {
      max-width: 400px;
    }

    .images {
      height: 420px;
    }

    .images .cellphone {
      height: 420px;
    }
  }

  @media (max-width: 1080px) {
    padding-left: 40px;
    padding-right: 40px;

    .content {
      grid-column: span 6;
    }

    .images {
      grid-column: span 6;
      justify-self: center;
      height: 400px;
    }

    .images .elipse {
      display: none;
    }

    .images .cellphone {
      position: unset;
      height: 400px;
    }
  }

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    padding: 120px 40px 60px 40px;
    height: auto;

    .content {
      width: 100%;
      gap: 25px;
    }

    .content .badge-link {
      align-self: center;
    }

    .content .title {
      font-size: 42px;
      text-align: center;
      max-width: 100%;
    }

    .content .subtitle {
      font-size: 18px;
      text-align: center;
      max-width: 100%;
    }

    .content .buttons {
      flex-direction: row;
      justify-content: center;
      gap: 15px;
      max-width: 100%;
    }

    .content .buttons .button {
      width: 200px;
    }

    /* Esconde a imagem do celular */
    .images {
      display: none;
    }

    .images .cellphone {
      display: none;
    }

    .images .elipse {
      display: none;
    }
  }

  @media (max-width: 800px) {
    padding: 100px 20px 40px 20px;

    .content .title {
      font-size: 36px;
    }

    .content .subtitle {
      font-size: 17px;
    }

    .content .buttons .button {
      width: 180px;
    }
  }

  @media (max-width: 600px) {
    padding: 100px 15px 40px 15px;

    .content {
      width: 100%;
      gap: 20px;
    }

    .content .title {
      font-size: 28px;
    }

    .content .subtitle {
      font-size: 16px;
    }

    .content .buttons {
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .content .buttons .button {
      width: 100%;
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
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
    z-index: 2;
    flex-shrink: 0;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
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
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .carousel-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: white;
      transform: scale(1.2);
    }

    &:hover {
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