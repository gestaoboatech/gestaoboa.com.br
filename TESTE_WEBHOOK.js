// 🧪 TESTE DO WEBHOOK - Para usar no console do navegador

// Cole este código no console do navegador para testar se o webhook está funcionando:

const testarWebhook = async () => {
  const dadosTeste = {
    nomeCompleto: "João Silva (TESTE)",
    telefone: "(11) 99999-9999",
    tempoAberta: "2-5-anos", 
    numeroBarbeiros: "3-barbeiros",
    timestamp: new Date().toISOString(),
    source: "teste_manual"
  };

  try {
    console.log("🚀 Enviando dados de teste...");
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbxwpCbk5UQfe1udU8v54HESGZrPc8oPiVVwUaDWbkm7kRa7G5F1JXVWYpR7Aq28ek5G/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosTeste)
    });

    console.log("✅ Dados enviados! Verifique:");
    console.log("📧 Email: silvioquintana10@gmail.com");
    console.log("📊 Planilha Google Sheets");
    console.log("📋 Dados enviados:", dadosTeste);
    
  } catch (error) {
    console.error("❌ Erro no teste:", error);
  }
};

// Execute no console:
// testarWebhook();
