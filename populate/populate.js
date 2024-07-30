// scripts/populate_db.js
const mongoose = require('mongoose');
const Produto = require('../models/Produto');

// Dados iniciais
const dados = [

      
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
