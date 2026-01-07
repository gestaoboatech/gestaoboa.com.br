// Configurações para integração com Mercado Pago
// IMPORTANTE: Em um ambiente real, as chaves privadas devem ser mantidas APENAS no lado do servidor
export const MercadoPagoConfig = {
  // Esta chave pública pode ser exposta no frontend (usada para gerar tokens de cartão)
  publicKey: "TEST-c2c9c9e0-e167-485d-b1bc-0a21b1800e3c", // Substitua por sua Public Key real

  // Estas informações são apenas para referência e devem existir apenas no backend em um app real
  accessToken:
    "TEST-3456514185534825-053021-414bd306fc277ea2db2fc74d725918da-2464953588", // NUNCA exponha em código de front-end
};

// URLs para ambiente de produção e teste
export const apiUrls = {
  sandbox: "https://api.mercadopago.com/v1",
  production: "https://api.mercadopago.com/v1",
};

// Tipos de documentos aceitos no Brasil
export const documentTypes = [
  { id: "CPF", name: "CPF" },
  { id: "CNPJ", name: "CNPJ" },
];
