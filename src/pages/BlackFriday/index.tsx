import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FB_PIXEL } from '../../utils/pixel';
import { submitSalaoForm, SalaoFormData } from '../../services/formSubmission';
import '../Barbershop/form.css';
import {
  PageContainer,
  ContentWrapper,
  LeftSection,
  RightSection,
  BlackFridayBadge,
  MainTitle,
  Subtitle,
  BenefitsSection,
  BenefitCard,
  BenefitIcon,
  BenefitTitle,
  BenefitDescription,
  FormSection,
  FormTitle,
  FormSubtitle
} from './styles';

const BlackFriday: React.FC = () => {
  // Estados para o formulário
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    tempoAberta: '',
    numeroProfissionais: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Rastreamento do carregamento da página
  useEffect(() => {
    FB_PIXEL.pageView();
    
    FB_PIXEL.trackCustomEvent("ViewBlackFridayPage", {
      page: "black_friday",
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Função para lidar com mudanças no formulário
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Função para submissão do formulário
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nomeCompleto || !formData.telefone || !formData.tempoAberta || !formData.numeroProfissionais) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepara os dados para envio
      const dataToSubmit: SalaoFormData = {
        nomeCompleto: formData.nomeCompleto,
        telefone: formData.telefone,
        tempoAberta: formData.tempoAberta,
        numeroProfissionais: formData.numeroProfissionais,
        timestamp: new Date().toISOString()
      };

      // Envia os dados
      const success = await submitSalaoForm(dataToSubmit);

      if (success) {
        // Rastreamento do pixel
        FB_PIXEL.trackCustomEvent("BlackFridayFormSubmit", {
          page: "black_friday",
          nome_completo: formData.nomeCompleto,
          telefone: formData.telefone,
          tempo_aberta: formData.tempoAberta,
          numero_profissionais: formData.numeroProfissionais,
          timestamp: new Date().toISOString(),
        });

        console.log("Formulário da Black Friday enviado com sucesso:", dataToSubmit);
        
        setSubmitSuccess(true);
        
        // Limpa o formulário
        setFormData({
          nomeCompleto: '',
          telefone: '',
          tempoAberta: '',
          numeroProfissionais: ''
        });

        // Mostra modal de sucesso e convite para WhatsApp
        setTimeout(() => {
          setShowWhatsAppModal(true);
        }, 1000);

      } else {
        throw new Error('Falha ao enviar formulário');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário da Black Friday:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para entrar no WhatsApp
  const handleJoinWhatsApp = () => {
    FB_PIXEL.trackCustomEvent("WhatsAppGroupJoin", {
      page: "black_friday",
      source: "form_modal",
    });
    
    // Link do grupo do WhatsApp
    window.open("https://chat.whatsapp.com/JWC0pUmu04l3ZkXZUErEUN", "_blank");
    setShowWhatsAppModal(false);
  };

  // Função para pular o WhatsApp
  const handleSkipWhatsApp = () => {
    setShowWhatsAppModal(false);
  };

  return (
    <>
      <Helmet>
        <title>BLACK FRIDAY 2025 - Gestão Boa | Maior Promoção do Ano</title>
        <meta name="description" content="Está chegando a maior Black Friday de todos os tempos! Sistema completo de gestão empresarial com oferta EXCLUSIVA. Entre no grupo VIP e garanta seu desconto especial!" />
        <meta name="keywords" content="black friday, gestao empresarial, sistema de gestão, desconto black friday, promoção" />
        
        {/* Open Graph */}
        <meta property="og:title" content="BLACK FRIDAY 2025 - Gestão Boa" />
        <meta property="og:description" content="A maior Black Friday de todos os tempos! Oferta EXCLUSIVA será revelada dia 14/11." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gestaoboa.com.br/black-friday" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BLACK FRIDAY 2025 - Gestão Boa" />
        <meta name="twitter:description" content="A maior Black Friday de todos os tempos!" />
      </Helmet>
      
      <PageContainer>
        <ContentWrapper>
          {/* Seção Esquerda - Informações da Black Friday */}
          <LeftSection>            
            <MainTitle>
              Está chegando a <span>MAIOR BLACK FRIDAY</span> de todos os tempos! 🎉
            </MainTitle>
            
            <Subtitle>
              Nossa oferta EXCLUSIVA será revelada no dia <strong>14/11</strong> apenas para quem estiver no nosso grupo VIP do WhatsApp. Não perca!
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

          {/* Seção Direita - Formulário */}
          <RightSection>
            <FormSection>
              <FormTitle>🎁 Garanta sua oferta EXCLUSIVA de Black Friday</FormTitle>
              <FormSubtitle>
                Preencha seus dados abaixo e seja o primeiro a saber sobre nossa promoção especial! 
                A oferta será revelada no dia <strong>14/11</strong> apenas para quem estiver no nosso grupo VIP.
              </FormSubtitle>
              
              <div className="barbershop-form-container">
                <form onSubmit={handleFormSubmit} className="barbershop-form">
                  <div className="form-field">
                    <label className="form-label">Nome completo *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Digite seu nome completo"
                      value={formData.nomeCompleto}
                      onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Telefone/WhatsApp *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      maxLength={15}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Há quanto tempo sua empresa está aberta? *</label>
                    <select
                      className="form-select"
                      value={formData.tempoAberta}
                      onChange={(e) => handleInputChange('tempoAberta', e.target.value)}
                      required
                      title="Selecione há quanto tempo sua empresa está aberta"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="menos-6-meses">Menos de 6 meses</option>
                      <option value="6-meses-1-ano">De 6 meses a 1 ano</option>
                      <option value="1-2-anos">De 1 a 2 anos</option>
                      <option value="2-5-anos">De 2 a 5 anos</option>
                      <option value="mais-5-anos">Mais de 5 anos</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Quantas pessoas trabalham na sua empresa? *</label>
                    <select
                      className="form-select"
                      value={formData.numeroProfissionais}
                      onChange={(e) => handleInputChange('numeroProfissionais', e.target.value)}
                      required
                      title="Selecione quantas pessoas trabalham na sua empresa"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="apenas-eu">Apenas eu (proprietário/a)</option>
                      <option value="2-pessoas">2 pessoas</option>
                      <option value="3-pessoas">3 pessoas</option>
                      <option value="4-5-pessoas">4 a 5 pessoas</option>
                      <option value="mais-5-pessoas">Mais de 5 pessoas</option>
                    </select>
                  </div>

                  <div className="form-button-container">
                    <button 
                      type="submit"
                      className="form-submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? 'ENVIANDO...' 
                        : submitSuccess 
                          ? '✅ FORMULÁRIO ENVIADO - AGUARDE O GRUPO VIP!' 
                          : '🎁 QUERO A OFERTA EXCLUSIVA'
                      }
                    </button>
                  </div>
                </form>
              </div>
            </FormSection>
          </RightSection>
        </ContentWrapper>
      </PageContainer>
      
      {/* Modal do WhatsApp */}
      {showWhatsAppModal && (
        <div className="whatsapp-modal-overlay">
          <div className="whatsapp-modal">
            <div className="whatsapp-modal-header">
              <h3>🔥 BLACK FRIDAY - Formulário enviado com sucesso!</h3>
            </div>
            
            <div className="whatsapp-modal-content">
              <div className="whatsapp-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#25D366"/>
                  <path d="M45.5 14.4C42.9 11.8 39.7 10.1 36.2 9.4C32.7 8.7 29.1 9 25.8 10.2C22.5 11.4 19.6 13.5 17.4 16.2C15.2 18.9 13.8 22.1 13.4 25.5C13 28.9 13.5 32.3 15 35.4L13 47L24.9 45.1C27.8 46.4 30.9 47.1 34.1 47C37.3 46.9 40.4 46.1 43.2 44.6C46 43.1 48.4 40.9 50.2 38.2C52 35.5 53.1 32.4 53.4 29.2C53.7 26 53.2 22.8 51.9 19.9C50.6 17 48.6 14.5 46.1 12.6L45.5 14.4ZM30 43.3C27.3 43.3 24.7 42.6 22.4 41.3L21.8 41L16.7 42.3L18 37.3L17.6 36.7C16.2 34.3 15.4 31.6 15.4 28.8C15.4 21.8 21.1 16.1 28.1 16.1C31.4 16.1 34.5 17.4 36.8 19.7C39.1 22 40.4 25.1 40.4 28.4C40.4 35.4 34.7 41.1 27.7 41.1L30 43.3Z" fill="white"/>
                </svg>
              </div>
              
              <h4>🎁 Entre no grupo VIP para a oferta BLACK FRIDAY!</h4>
              <p>Sua oferta EXCLUSIVA será revelada dia <strong>14/11</strong>! Entre no grupo VIP e receba:</p>
              
              <ul className="whatsapp-benefits">
                <li>🔥 Oferta EXCLUSIVA de Black Friday (revelada 14/11)</li>
                <li>💰 Preços especiais apenas para o grupo VIP</li>
                <li>⚡ Acesso prioritário às promoções</li>
                <li>✅ Suporte direto e preferencial</li>
                <li>📈 Dicas exclusivas para crescer seu negócio</li>
              </ul>
            </div>
            
            <div className="whatsapp-modal-actions">
              <button 
                className="whatsapp-join-btn"
                onClick={handleJoinWhatsApp}
              >
                🎁 QUERO A OFERTA EXCLUSIVA
              </button>
              
              <button 
                className="whatsapp-skip-btn"
                onClick={handleSkipWhatsApp}
              >
                Pular por agora
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default BlackFriday;
