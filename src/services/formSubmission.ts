// Serviço para envio de dados do formulário

export interface BarbershopFormData {
  nomeCompleto: string;
  telefone: string;
  tempoAberta: string;
  numeroBarbeiros: string;
  timestamp?: string;
}

// Função para sanitizar dados removendo caracteres especiais
const sanitizeData = (data: BarbershopFormData): BarbershopFormData => {
  const sanitizeString = (str: string): string => {
    if (!str) return str;
    
    // Remove caracteres especiais perigosos, mantendo apenas letras, números, espaços e alguns símbolos básicos
    return str
      .replace(/[<>\"'&]/g, '') // Remove caracteres HTML/JS perigosos
      .replace(/[^\w\sÀ-ÿ\u00f1\u00d1().\-@]/g, '') // Mantém apenas letras, números, espaços, acentos, parênteses, ponto, hífen e @
      .trim(); // Remove espaços extras
  };

  return {
    nomeCompleto: sanitizeString(data.nomeCompleto),
    telefone: sanitizeString(data.telefone),
    tempoAberta: data.tempoAberta, // Este campo vem de select, não precisa sanitizar
    numeroBarbeiros: data.numeroBarbeiros, // Este campo vem de select, não precisa sanitizar
    timestamp: data.timestamp
  };
};

// Opção 1: Google Sheets (Recomendado)
export const sendToGoogleSheets = async (formData: BarbershopFormData): Promise<boolean> => {
  try {
    // URL do Google Apps Script Web App
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzZCVvfSdIzMsq1stPqU6R1Fv1seF-PiF-ea2pAwi2gKup64yhVPQhpwPpi1AYQ5kH5/exec';
    
    // Sanitiza os dados antes de enviar
    const sanitizedData = sanitizeData(formData);
    console.log('Dados sanitizados:', sanitizedData);
    
    const dataToSend = {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      source: 'barbershop_page'
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(dataToSend as any)
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Com no-cors, sempre retorna sucesso
    return true;
  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);
    return false;
  }
};

// Função principal que tenta múltiplas opções
export const submitBarbershopForm = async (formData: BarbershopFormData): Promise<boolean> => {
  try {
    // SOLUÇÃO PRINCIPAL: Envia para Google Sheets
    const googleSheetsSuccess = await sendToGoogleSheets(formData);
    
    // Log para debug
    console.log('Dados enviados para Google Sheets:', formData);
    
    // Retorna sucesso do Google Sheets
    return googleSheetsSuccess;
  } catch (error) {
    console.error('Erro no envio:', error);
    return false;
  }
};
