import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.main`
  padding-top: 80px;

  .hero {
    background: linear-gradient(135deg, #03045e 0%, #023e8a 50%, #0077b6 100%);
    color: white;
    text-align: center;
    padding: 120px 20px 80px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    h1 {
      font-size: 42px;
      margin-bottom: 20px;
      font-weight: 700;
      line-height: 1.2;
      position: relative;
      z-index: 1;
    }

    p {
      font-size: 18px;
      opacity: 0.95;
      max-width: 700px;
      margin: 0 auto 32px;
      line-height: 1.6;
      position: relative;
      z-index: 1;
    }
  }

  .benefits-grid {
    padding: 50px 20px;
    background: linear-gradient(135deg, #f8faff 0%, #e8f4fd 100%);

    .benefits-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    h2 {
      font-size: 28px;
      color: #03045e;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .subtitle {
      font-size: 16px;
      color: #666;
      margin-bottom: 40px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .benefits-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }

    .benefit-card {
      background: white;
      padding: 24px 18px;
      border-radius: 16px;
      box-shadow: 0 6px 20px rgba(3, 4, 94, 0.06);
      border: 1px solid rgba(3, 4, 94, 0.05);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #03045e, #023e8a, #0077b6);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 40px rgba(3, 4, 94, 0.12);

        &::before {
          transform: scaleX(1);
        }
      }

      .benefit-icon {
        font-size: 36px;
        margin-bottom: 12px;
      }

      h3 {
        font-size: 18px;
        color: #03045e;
        margin-bottom: 8px;
        font-weight: 600;
      }

      p {
        color: #666;
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
      }
    }
  }

  .features {
    padding: 50px 20px;
    max-width: 1200px;
    margin: 0 auto;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 50px;
      margin-bottom: 100px;
      padding: 32px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%);
      border: 1px solid rgba(3, 4, 94, 0.08);
      box-shadow: 0 4px 20px rgba(3, 4, 94, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      scroll-margin-top: 120px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(3, 4, 94, 0.03), transparent);
        transition: left 0.5s ease;
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(3, 4, 94, 0.12);
        border-color: rgba(3, 4, 94, 0.15);

        &::before {
          left: 100%;
        }
      }

      &.reverse {
        flex-direction: row-reverse;
      }

      &.highlighted {
        background: linear-gradient(
          135deg,
          rgba(3, 4, 94, 0.08) 0%,
          rgba(2, 62, 138, 0.08) 100%
        );
        border: 2px solid rgba(3, 4, 94, 0.25);
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 24px 48px rgba(3, 4, 94, 0.18);
      }

      img {
        width: 280px;
        height: auto;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
        transition: all 0.4s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      &:hover img {
        transform: scale(1.03) rotate(0.5deg);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
      }

      .video-container {
        width: 280px;
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          background: linear-gradient(45deg, #03045e, #023e8a, #0077b6, #00b4d8);
          border-radius: 20px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover::before {
          opacity: 0.3;
        }
        
        video {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
          transition: transform 0.4s ease;
        }

        &:hover video {
          transform: scale(1.03);
        }
      }

      .feature-content {
        flex: 1;

        h2 {
          color: #03045e;
          font-size: 32px;
          margin-bottom: 16px;
          font-weight: 600;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, #03045e, #023e8a);
            border-radius: 2px;
          }
        }

        p {
          font-size: 18px;
          margin-bottom: 20px;
          color: #444;
          line-height: 1.6;
          font-weight: 500;
        }

        ul {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 16px;

          li {
            padding: 12px 16px;
            padding-left: 50px;
            position: relative;
            color: #555;
            font-size: 16px;
            background: rgba(3, 4, 94, 0.02);
            border-radius: 10px;
            border-left: 3px solid #03045e;
            transition: all 0.3s ease;
            line-height: 1.5;

            &:hover {
              background: rgba(3, 4, 94, 0.05);
              transform: translateX(6px);
            }

            &:before {
              content: "✓";
              position: absolute;
              left: 16px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 18px;
              color: #22c55e;
            }
          }
        }

        .feature-highlight {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          border: 1px solid rgba(3, 4, 94, 0.1);
          border-left: 5px solid #03045e;
          padding: 20px 24px;
          margin-top: 24px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 0%, rgba(3, 4, 94, 0.02) 50%, transparent 100%);
            pointer-events: none;
          }

          p {
            margin: 0;
            font-size: 16px;
            color: #333;
            font-weight: 600;
          }
        }
      }
    }
  }

  .cta {
    background: linear-gradient(135deg, #f8faff 0%, #e8f4fd 100%);
    text-align: center;
    padding: 100px 20px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 70%, rgba(3, 4, 94, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    h2 {
      color: #03045e;
      font-size: 32px;
      margin-bottom: 20px;
      font-weight: 700;
      position: relative;
      z-index: 1;
    }

    p {
      font-size: 18px;
      color: #666;
      margin-bottom: 40px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
      position: relative;
      z-index: 1;
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;

      a {
        padding: 16px 32px;
        border-radius: 12px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 16px;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        &:hover::before {
          left: 100%;
        }

        &.primary-button {
          background: linear-gradient(135deg, #03045e 0%, #023e8a 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(3, 4, 94, 0.25);

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 32px rgba(3, 4, 94, 0.35);
          }
        }

        &.secondary-button {
          border: 2px solid #03045e;
          color: #03045e;
          background: white;
          box-shadow: 0 4px 16px rgba(3, 4, 94, 0.1);

          &:hover {
            background: #03045e;
            color: white;
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(3, 4, 94, 0.25);
          }
        }
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .faq {
    padding: 5rem 2rem;

    .faq-container {
      max-width: 800px;
      margin: 0 auto;

      .faq-item {
        margin-bottom: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;

        summary {
          padding: 1.2rem;
          position: relative;
          cursor: pointer;
          font-weight: 600;
          list-style: none;

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
        }
      }
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 70px 20px 50px;

      h1 {
        font-size: 32px;
      }

      p {
        font-size: 16px;
      }
    }

    .benefits-grid {
      padding: 40px 20px;

      h2 {
        font-size: 24px;
      }

      .benefits-list {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .benefit-card {
        padding: 20px 16px;
      }
    }

    .features {
      padding: 40px 20px;

      .feature-item {
        flex-direction: column;
        gap: 28px;
        margin-bottom: 60px;
        padding: 24px 20px;
        scroll-margin-top: 100px;

        &.reverse {
          flex-direction: column;
        }

        &.highlighted {
          transform: translateY(-6px) scale(1.01);
          padding: 32px 24px;
        }

        img {
          width: 85%;
          max-width: 250px;
        }

        .video-container {
          width: 85%;
          max-width: 250px;
        }

        .feature-content {
          text-align: center;

          h2 {
            font-size: 24px;

            &::after {
              left: 50%;
              transform: translateX(-50%);
            }
          }

          p {
            font-size: 16px;
          }

          ul {
            text-align: left;
            max-width: 100%;

            li {
              font-size: 14px;
              padding: 10px 14px;
              padding-left: 44px;

              &:before {
                left: 14px;
                font-size: 16px;
              }
            }
          }

          .feature-highlight {
            text-align: left;
            padding: 16px 20px;

            p {
              font-size: 14px;
            }
          }
        }
      }
    }

    .cta {
      padding: 50px 20px;

      h2 {
        font-size: 24px;
      }

      .buttons {
        flex-direction: column;

        a {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
`;
