/**
 * Google Apps Script - Leads Barbearia Gestão Boa
 * Email: silvioquintana10@gmail.com
 * URL: https://script.google.com/macros/s/AKfycbxwpCbk5UQfe1udU8v54HESGZrPc8oPiVVwUaDWbkm7kRa7G5F1JXVWYpR7Aq28ek5G/exec
 */

function doPost(e) {
  try {
    console.log('📥 Dados recebidos:', e.postData.contents);
    
    // Parse dos dados
    const data = JSON.parse(e.postData.contents);
    
    // Criar ou abrir planilha
    const planilha = criarOuAbrirPlanilha();
    const sheet = planilha.getActiveSheet();
    
    // Mapear dados legíveis
    const tempoMap = {
      'menos-6-meses': 'Menos de 6 meses',
      '6-meses-1-ano': 'De 6 meses a 1 ano',
      '1-2-anos': 'De 1 a 2 anos',
      '2-5-anos': 'De 2 a 5 anos',
      'mais-5-anos': 'Mais de 5 anos'
    };
    
    const barbeirosMap = {
      'apenas-eu': 'Apenas eu (proprietário)',
      '2-barbeiros': '2 barbeiros',
      '3-barbeiros': '3 barbeiros',
      '4-5-barbeiros': '4 a 5 barbeiros',
      'mais-5-barbeiros': 'Mais de 5 barbeiros'
    };
    
    // Preparar linha de dados
    const novaLinha = [
      new Date(),
      data.nomeCompleto || 'N/A',
      data.telefone || 'N/A',
      tempoMap[data.tempoAberta] || data.tempoAberta || 'N/A',
      barbeirosMap[data.numeroBarbeiros] || data.numeroBarbeiros || 'N/A',
      'Página Barbearia'
    ];
    
    // Adicionar à planilha
    sheet.appendRow(novaLinha);
    
    // Enviar email
    enviarEmail(data, tempoMap, barbeirosMap);
    
    console.log('✅ Lead salvo com sucesso!');
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Lead salvo!'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Erro:', error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function criarOuAbrirPlanilha() {
  const nomeArquivo = 'Leads Barbearia - Gestão Boa';
  
  // Tentar encontrar planilha existente
  const arquivos = DriveApp.getFilesByName(nomeArquivo);
  
  if (arquivos.hasNext()) {
    const arquivo = arquivos.next();
    console.log('📊 Planilha encontrada:', arquivo.getUrl());
    return SpreadsheetApp.openById(arquivo.getId());
  }
  
  // Criar nova planilha
  console.log('🆕 Criando nova planilha...');
  const novaPlanilha = SpreadsheetApp.create(nomeArquivo);
  const sheet = novaPlanilha.getActiveSheet();
  
  // Cabeçalhos
  const cabecalhos = ['Data/Hora', 'Nome', 'Telefone', 'Tempo Funcionando', 'Barbeiros', 'Origem'];
  sheet.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
  
  // Formatação
  sheet.getRange(1, 1, 1, cabecalhos.length)
    .setBackground('#4285f4')
    .setFontColor('white')
    .setFontWeight('bold');
  
  sheet.autoResizeColumns(1, cabecalhos.length);
  
  console.log('✅ Planilha criada:', novaPlanilha.getUrl());
  return novaPlanilha;
}

function enviarEmail(data, tempoMap, barbeirosMap) {
  try {
    const destinatario = 'silvioquintana10@gmail.com';
    const assunto = '🎯 NOVO LEAD - Barbearia Gestão Boa';
    
    const corpo = `
� NOVO LEAD CAPTURADO!

👤 Nome: ${data.nomeCompleto}
📱 Telefone: ${data.telefone}
⏰ Tempo Funcionando: ${tempoMap[data.tempoAberta] || data.tempoAberta}
✂️ Barbeiros: ${barbeirosMap[data.numeroBarbeiros] || data.numeroBarbeiros}
📅 Data: ${new Date().toLocaleString('pt-BR')}
🌐 Origem: gestaoboa.com.br/barbershop

🔥 AÇÃO IMEDIATA:
• Entre em contato via WhatsApp: ${data.telefone}
• Ofereça demonstração personalizada
• Destaque benefícios específicos

💡 DICA DE ABORDAGEM:
${data.numeroBarbeiros === 'apenas-eu' ? 
  '→ Foque em organização pessoal e crescimento' :
  '→ Destaque gestão de equipe e comissões'
}

Ver todos os leads: https://docs.google.com/spreadsheets
    `;
    
    GmailApp.sendEmail(destinatario, assunto, corpo);
    console.log('📧 Email enviado para:', destinatario);
    
  } catch (error) {
    console.error('❌ Erro no email:', error);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('✅ Webhook funcionando! Sistema pronto para receber leads.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Função de teste
function testarSistema() {
  console.log('🧪 Iniciando teste do sistema...');
  
  const dadosTeste = {
    nomeCompleto: 'João Silva (TESTE)',
    telefone: '(11) 99999-9999',
    tempoAberta: '2-5-anos',
    numeroBarbeiros: '3-barbeiros'
  };
  
  // Simular o evento que vem do webhook
  const mockEvent = {
    postData: {
      contents: JSON.stringify(dadosTeste)
    }
  };
  
  try {
    console.log('📤 Testando com dados:', dadosTeste);
    
    const resultado = doPost(mockEvent);
    console.log('📋 Resultado do teste:', resultado.getContent());
    
    console.log('✅ Teste concluído! Verifique:');
    console.log('📧 Email: silvioquintana10@gmail.com');
    console.log('📊 Planilha no Google Drive');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.toString());
  }
}

// Função de teste simples - teste apenas a criação da planilha
function testarPlanilha() {
  console.log('🧪 Testando criação de planilha...');
  
  try {
    const planilha = criarOuAbrirPlanilha();
    console.log('✅ Planilha OK:', planilha.getUrl());
    return true;
  } catch (error) {
    console.error('❌ Erro na planilha:', error.toString());
    return false;
  }
}

// Função de teste simples - teste apenas o email
function testarEmail() {
  console.log('🧪 Testando envio de email...');
  
  const dadosTeste = {
    nomeCompleto: 'João Silva (TESTE EMAIL)',
    telefone: '(11) 99999-9999',
    tempoAberta: '2-5-anos',
    numeroBarbeiros: '3-barbeiros'
  };
  
  const tempoMap = {
    'menos-6-meses': 'Menos de 6 meses',
    '6-meses-1-ano': 'De 6 meses a 1 ano',
    '1-2-anos': 'De 1 a 2 anos',
    '2-5-anos': 'De 2 a 5 anos',
    'mais-5-anos': 'Mais de 5 anos'
  };
  
  const barbeirosMap = {
    'apenas-eu': 'Apenas eu (proprietário)',
    '2-barbeiros': '2 barbeiros',
    '3-barbeiros': '3 barbeiros',
    '4-5-barbeiros': '4 a 5 barbeiros',
    'mais-5-barbeiros': 'Mais de 5 barbeiros'
  };
  
  try {
    enviarEmail(dadosTeste, tempoMap, barbeirosMap);
    console.log('✅ Email enviado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro no email:', error.toString());
    return false;
  }
}
