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
    "img": "https://lojaobabox.vtexassets.com/arquivos/ids/155798/image-015765f41c9a42bdb0e2b63ce882bd91.jpg"
  },
  {
    "nome": "Notebook ABC",
    "descricao": "Notebook potente com processador de última geração e tela de alta definição.",
    "valor": "2500.00",
    "categoria": "Eletrônicos",
    "img": "https://abcsmart.com.br/wp-content/uploads/2021/04/conserto-notebook-positivo-santo-andre.jpg"
  },
  {
    "nome": "Fone de Ouvido",
    "descricao": "Fone de ouvido com cancelamento de ruído e som de alta qualidade.",
    "valor": "300.00",
    "categoria": "Eletrônicos",
    "img": "https://brmotorolanew.vteximg.com.br/arquivos/moto-xt-220.png"
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
