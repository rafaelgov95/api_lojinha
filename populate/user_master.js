const mongoose = require('mongoose');
const User = require('../models/User');

const dados = [
    {'nome':'adm','senha':'123456'}    
];

mongoose.connect('mongodb://127.0.0.1:27017/lojinha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conectado ao MongoDB');

  await User.deleteMany({});

  await User.insertMany(dados);
  console.log('Dados inseridos com sucesso');

  mongoose.connection.close();
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
