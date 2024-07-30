// scripts/populate_db.js
const mongoose = require('mongoose');
const Produto = require('../models/Produto');

// Dados iniciais
const dados = [
  {
    "nome": "Smartphone XYZ",
    "descricao": "Um smartphone de última geração com câmera de alta resolução.",
    "valor": "1200.00",
    "categoria": "Eletrônicos",
    "img": "https://exemplo.com/imagens/smartphone_xyz.jpg"
  },
  {
    "nome": "Notebook ABC",
    "descricao": "Notebook potente com processador de última geração e tela de alta definição.",
    "valor": "2500.00",
    "categoria": "Eletrônicos",
    "img": "https://exemplo.com/imagens/notebook_abc.jpg"
  },
  {
    "nome": "Fone de Ouvido",
    "descricao": "Fone de ouvido com cancelamento de ruído e som de alta qualidade.",
    "valor": "300.00",
    "categoria": "Eletrônicos",
    "img": "https://exemplo.com/imagens/fone_ouvido.jpg"
  },
  {
    "nome": "Geladeira Inox",
    "descricao": "Geladeira com grande capacidade e design moderno em inox.",
    "valor": "3500.00",
    "categoria": "Eletrodomésticos",
    "img": "https://exemplo.com/imagens/geladeira_inox.jpg"
  },
  {
    "nome": "Micro-ondas",
    "descricao": "Micro-ondas com múltiplas funções e design compacto.",
    "valor": "600.00",
    "categoria": "Eletrodomésticos",
    "img": "https://exemplo.com/imagens/micro_ondas.jpg"
  },
  {
    "nome": "Máquina de Lavar",
    "descricao": "Máquina de lavar com diversos programas e economia de água.",
    "valor": "2200.00",
    "categoria": "Eletrodomésticos",
    "img": "https://exemplo.com/imagens/maquina_lavar.jpg"
  },
  {
    "nome": "Camiseta Básica",
    "descricao": "Camiseta de algodão básica e confortável, disponível em várias cores.",
    "valor": "50.00",
    "categoria": "Moda",
    "img": "https://exemplo.com/imagens/camiseta_basica.jpg"
  },
  {
    "nome": "Calça Jeans",
    "descricao": "Calça jeans de alta qualidade e ajuste perfeito.",
    "valor": "120.00",
    "categoria": "Moda",
    "img": "https://exemplo.com/imagens/calca_jeans.jpg"
  },
  {
    "nome": "Tênis Esportivo",
    "descricao": "Tênis esportivo confortável e resistente, ideal para corridas.",
    "valor": "300.00",
    "categoria": "Moda",
    "img": "https://exemplo.com/imagens/tenis_esportivo.jpg"
  },
  {
    "nome": "Relógio de Pulso",
    "descricao": "Relógio de pulso elegante e funcional com várias opções de mostrador.",
    "valor": "450.00",
    "categoria": "Moda",
    "img": "https://exemplo.com/imagens/relogio_pulso.jpg"
  }
      
];

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lojinha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conectado ao MongoDB');

  // Limpar a coleção antes de inserir dados
  await Produto.deleteMany({});

  // Inserir os dados
  await Produto.insertMany(dados);
  console.log('Dados inseridos com sucesso');

  // Fechar a conexão
  mongoose.connection.close();
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
