import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { FB_PIXEL } from '../../utils/pixel';
import '../Barbershop/form.css';
import {
  PageContainer,
  ContentWrapper,
  LeftSection,
  RightSection,
  MainTitle,
  Subtitle,
  BenefitsSection,
  BenefitCard,
  BenefitIcon,
  BenefitTitle,
  BenefitDescription,
  FormSection,
  FormTitle,
  FormSubtitle,
  PurchaseButtonContainer,
  PurchaseButton,
  SecurePaymentText,
  PriceSection,
  PriceSectionTitle,
  PriceItem,
  PriceItemLabel,
  PriceItemValue,
  TotalSection,
  TotalRow,
  TotalLabel,
  TotalValue,
  BlackFridayPrice,
  BlackFridayPriceLabel,
  BlackFridayPriceValue,
  SaveBadge,
  SaveBadgeContainer
} from './styles';

const BlackFriday: React.FC = () => {
  const navigate = useNavigate();
  
  // Rastreamento do carregamento da página
  useEffect(() => {
    FB_PIXEL.pageView();
    
    FB_PIXEL.trackCustomEvent("ViewBlackFridayPage", {
      page: "black_friday",
      timestamp: new Date().toISOString(),
    });
  }, []);

  const handlePurchaseClick = () => {
    FB_PIXEL.trackCustomEvent("BlackFridayPurchaseClick", {
      page: "black_friday",
      timestamp: new Date().toISOString(),
    });
    navigate('/criar-conta?plano=black-friday');
  };

  return (
    <>
      <Helmet>
        <title>BLACK FRIDAY 2025 - Gestão Boa | Oferta Exclusiva Disponível!</title>
        <meta name="description" content="BLACK FRIDAY COMEÇOU! Sistema completo de gestão empresarial com oferta EXCLUSIVA disponível agora. Aproveite enquanto durar!" />
        <meta name="keywords" content="black friday, gestao empresarial, sistema de gestão, desconto black friday, promoção" />
        
        {/* Open Graph */}
        <meta property="og:title" content="BLACK FRIDAY 2025 - Gestão Boa" />
        <meta property="og:description" content="BLACK FRIDAY COMEÇOU! Oferta EXCLUSIVA disponível agora!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gestaoboa.com.br/black-friday" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BLACK FRIDAY 2025 - Gestão Boa" />
        <meta name="twitter:description" content="BLACK FRIDAY COMEÇOU! Oferta EXCLUSIVA disponível agora!" />
      </Helmet>
      
      <PageContainer>
        <ContentWrapper>
          {/* Seção Esquerda - Informações da Black Friday */}
          <LeftSection>            
            <MainTitle>
              <span>BLACK FRIDAY COMEÇOU!</span> 🔥 Oferta EXCLUSIVA Disponível! 🎉
            </MainTitle>
            
            <Subtitle>
              A oferta especial está disponível AGORA! Aproveite nosso sistema completo de gestão empresarial com desconto EXCLUSIVO. Corre que é por tempo limitado!
            </Subtitle>

            <BenefitsSection>
              <BenefitCard>
                <BenefitIcon>📅</BenefitIcon>
                <BenefitTitle>Agendamento Online</BenefitTitle>
                <BenefitDescription>
                  Sistema completo de agendamento para seus clientes marcarem horários 24/7
                </BenefitDescription>
              </BenefitCard>

              <BenefitCard>
                <BenefitIcon>💰</BenefitIcon>
                <BenefitTitle>Controle Financeiro</BenefitTitle>
                <BenefitDescription>
                  Gerencie suas finanças, recebimentos, despesas e tenha controle total do caixa
                </BenefitDescription>
              </BenefitCard>

              <BenefitCard>
                <BenefitIcon>👥</BenefitIcon>
                <BenefitTitle>Gestão de Clientes</BenefitTitle>
                <BenefitDescription>
                  Cadastro completo de clientes, histórico de atendimentos e relacionamento
                </BenefitDescription>
              </BenefitCard>

              <BenefitCard>
                <BenefitIcon>📊</BenefitIcon>
                <BenefitTitle>Relatórios e Metas</BenefitTitle>
                <BenefitDescription>
                  Acompanhe o desempenho do seu negócio com relatórios detalhados e dashboards
                </BenefitDescription>
              </BenefitCard>

              <BenefitCard>
                <BenefitIcon>💬</BenefitIcon>
                <BenefitTitle>Integração WhatsApp</BenefitTitle>
                <BenefitDescription>
                  Envie lembretes automáticos e se comunique diretamente com seus clientes
                </BenefitDescription>
              </BenefitCard>
            </BenefitsSection>
          </LeftSection>

          {/* Seção Direita - Compra */}
          <RightSection>
            <FormSection>
              <FormTitle>🔥 BLACK FRIDAY COMEÇOU! 🔥</FormTitle>
              <FormSubtitle>
                <strong>98% DE DESCONTO!</strong> De R$ 535,00 por apenas R$ 9,90! 
                Esta é a maior oferta do ano e é por tempo LIMITADO!
              </FormSubtitle>
              
              {/* Seção de Preços */}
              <PriceSection>
                <PriceSectionTitle>📦 Pacote Completo</PriceSectionTitle>
                
                <PriceItem>
                  <PriceItemLabel>3 meses de acesso ao sistema</PriceItemLabel>
                  <PriceItemValue>R$ 387,00</PriceItemValue>
                </PriceItem>
                
                <PriceItem>
                  <PriceItemLabel>+70 modelos de design de canvas</PriceItemLabel>
                  <PriceItemValue>R$ 49,00</PriceItemValue>
                </PriceItem>
                
                <PriceItem>
                  <PriceItemLabel>Consultoria online sobre metas 2026</PriceItemLabel>
                  <PriceItemValue>R$ 99,00</PriceItemValue>
                </PriceItem>
                
                <TotalSection>
                  <TotalRow>
                    <TotalLabel>Valor Total:</TotalLabel>
                    <TotalValue>R$ 535,00</TotalValue>
                  </TotalRow>
                  
                  <BlackFridayPrice>
                    <BlackFridayPriceLabel>🎁 BLACK FRIDAY APENAS:</BlackFridayPriceLabel>
                    <BlackFridayPriceValue>R$ 9,90</BlackFridayPriceValue>
                  </BlackFridayPrice>
                  
                  <SaveBadgeContainer>
                    <SaveBadge>💰 ECONOMIZE R$ 525,10 (98% OFF)</SaveBadge>
                  </SaveBadgeContainer>
                </TotalSection>
              </PriceSection>
              
              <div className="barbershop-form-container">
                <PurchaseButtonContainer>
                  <PurchaseButton 
                    type="button"
                    onClick={handlePurchaseClick}
                  >
                    🎁 GARANTIR OFERTA BLACK FRIDAY AGORA
                  </PurchaseButton>
                </PurchaseButtonContainer>
                
                <SecurePaymentText>
                  🔒 Pagamento 100% seguro via Asaas
                </SecurePaymentText>
              </div>
            </FormSection>
          </RightSection>
        </ContentWrapper>
      </PageContainer>
      
      <Footer />
    </>
  );
};

export default BlackFriday;
