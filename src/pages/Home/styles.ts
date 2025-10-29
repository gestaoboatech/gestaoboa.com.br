import styled from "styled-components";

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

export const Banner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  grid-column: span 12;
  padding-top: 150px;
  padding-bottom: 100px;
  padding-left: 100px;
  padding-right: 100px;
  height: 77vh;

  .content {
    display: flex;
    flex-direction: column;
    grid-column: span 7;
    gap: 40px;
    justify-self: flex-start;
  }

  .content .title {
    font-weight: bold;
    font-size: 92px;
    text-align: start;
    width: 850px;
  }

  .content .subtitle {
    font-weight: lighter;
    font-size: 32px;
    text-align: start;
    width: 850px;
  }

  .content .subtitle span {
    font-weight: bold;
    color: #03045e;
  }

  .content .buttons {
    display: flex;
    width: 850px;
    gap: 25px;
    align-items: flex-start;
  }

  .content .buttons .button {
    width: 300px;
  }

  .content .buttons .button-link {
    text-decoration: none;
  }

  .images {
    display: flex;
    grid-column: span 5;
    position: relative;
    width: fit-content;
    height: 700px;
    align-items: center;
    justify-self: center;
  }

  .images .cellphone {
    position: absolute;
    z-index: 100;
    height: 700px;
  }

  .images .elipse {
    height: 100%;
  }

  .images .cellphone {
    right: 0px;
    left: 0px;
    top: 0px;
    bottom: 0px;
    margin: 0 auto;
  }

  @media (max-width: 1780px) {
    .content .title {
      font-size: 64px;
      width: 600px;
    }

    .content .subtitle {
      width: 600px;
      font-size: 28px;
    }

    .content .buttons {
      width: 600px;
    }

    .images {
      height: 550px;
    }

    .images .cellphone {
      height: 550px;
    }
  }

  @media (max-width: 1300px) {
    .content .title {
      font-size: 54px;
      width: 450px;
    }

    .content .subtitle {
      width: 450px;
      font-size: 24px;
    }

    .content .buttons {
      width: 450px;
    }

    .images {
      height: 450px;
    }

    .images .cellphone {
      height: 450px;
    }
  }

  @media (max-width: 1080px) {
    .images {
      justify-self: center;
      height: 500px;
    }

    .images .elipse {
      display: none;
    }

    .images .cellphone {
      position: unset;
      height: 500px;
    }
  }

  @media (max-width: 960px) {
    .images {
      height: 450px;
      justify-self: flex-end;
    }

    .images .cellphone {
      height: 400px;
    }
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    padding: 15px 15px;

    .content .title {
      font-size: 32px;
      text-align: center;
      width: 100%;
    }

    .content .subtitle {
      font-size: 20px;
      font-weight: normal;
      text-align: center;
      width: 100%;
    }
    .content .title {
      font-size: 32px;
      text-align: center;
    }
    .content .buttons {
      flex-direction: column;
      gap: 15px;
      width: 100%;
    }

    .images {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .images {
    }

    .images .cellphone {
      display: none;
    }

    .images .elipse {
      display: none;
    }

    .content {
      width: calc(100% - 20px);
    }

    .content .title {
      font-size: 32px;
    }

    .content .subtitle {
      font-size: 20px;
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

  .benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem;

    .benefit {
      background: #ffffff;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.2s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-5px);
      }

      img {
        width: 96px;
        height: 96px;
        margin-bottom: 1rem;
      }

      .title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
      }

      .subtitle {
        font-size: 0.9rem;
        color: #666;
        line-height: 1.4;
      }

      .benefit-button {
        text-decoration: none;
        margin-top: 15px;
        display: inline-block;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
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

export const Contact = styled.div`
  display: grid;
  padding: 100px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 100px;
  grid-column: span 12;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  position: relative;

  .info,
  .form {
    display: flex;
    flex-direction: column;
    grid-column: span 5;
  }

  .space {
    grid-column: span 2;
  }

  .info {
    display: flex;
    gap: 81px;
    flex-direction: column;
  }

  .info .title {
    font-weight: bold;
    font-size: 72px;
  }

  .info .links {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 26px;
    gap: 26px;
  }

  .info .links a {
    display: flex;
    align-items: center;
    gap: 18px;
    color: #000;
    width: fit-content;
  }

  .profits {
    position: absolute;
    left: 100px;
    bottom: -5px;
  }

  .profits img {
    width: 500px;
  }

  .form,
  .form form .input,
  .form form .textarea {
    display: flex;
    flex-direction: column;
  }

  .form {
    grid-column: span 5;
    align-items: end;
    gap: 30px;
  }

  .form form {
    display: grid;
    width: 703px;
    grid-template-columns: 1fr 1fr;
    gap: 26px;
    background-color: #03045e;
    border-radius: 10px;
    padding: 40px;
  }

  .input-wrapper,
  .textarea {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .label {
    color: #fff;
    font-weight: bold;
  }

  .double,
  .textarea {
    grid-column: span 2;
  }

  textarea {
    font-family: "Mulish";
  }

  .form .button {
    width: 169px;
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 1370px) {
    .info {
      grid-column: span 7;
    }

    .form form {
      display: flex;
      flex-direction: column;
      width: 80%;
      padding: 30px;
    }

    .space {
      display: none;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    display: flex;
    padding: 41px;
    gap: 30px;

    .space,
    .profits {
      display: none;
    }

    .info {
      gap: 30px;
    }

    .info .title {
      font-size: 36px;
    }

    .info .links {
      font-size: 18px;
    }

    .info .links img {
      width: 27px;
    }

    .form {
      justify-content: center;
      align-items: center;
    }

    .form form {
      display: flex;
      flex-direction: column;
      width: 80%;
      padding: 10%;
    }

    .form .button {
      width: 100%;
    }
  }
`;

export const FAQ = styled.section`
  padding: 5rem 2rem;
  grid-column: span 12;
  background-color: #f8f9fa;

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 3rem;
    color: #333;
  }

  .faq-container {
    max-width: 800px;
    margin: 0 auto;

    .faq-item {
      margin-bottom: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      background-color: #ffffff;

      summary {
        padding: 1.2rem;
        position: relative;
        cursor: pointer;
        font-weight: 600;
        list-style: none;
        background-color: #ffffff;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #f0f0f0;
        }

        &::-webkit-details-marker {
          display: none;
        }

        &::after {
          content: "+";
          position: absolute;
          right: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.5rem;
          color: #4285f4;
          transition: transform 0.3s ease;
        }
      }

      &[open] summary::after {
        transform: translateY(-50%) rotate(45deg);
      }

      p {
        padding: 0 1.2rem 1.2rem;
        margin: 0;
        color: #666;
        background-color: #ffffff;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .faq-container .faq-item summary {
      padding: 1rem;
      font-size: 0.9rem;

      &::after {
        right: 1rem;
      }
    }

    .faq-container .faq-item p {
      padding: 0 1rem 1rem;
      font-size: 0.9rem;
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
