const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produto');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

SECRET_KEY = 'senha_salt'

app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }))

mongoose.connect('mongodb://127.0.0.1:27017/lojinha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({
    message: "Bem-vindo à API Lojinha",
    routes: [
      {
        login: '/login', data: { nome: 'string', senha: 'string' }, return: 'token jwt'
      },
      {
        register: '/register', data: { nome: 'string', senha: 'string' }, return: 'void'
      },
      {
        produto: '/produto', subroutes: [
        {
          get: 'void'
        }, {
          post: { body: { nome: 'string', descricao: 'string', categoria: 'string', valor: 'float', img: 'string' } }
        },
        {
          put: { param: 'id', body: { nome: 'string', descricao: 'string', categoria: 'string', valor: 'float', img: 'string' } }
        },
        {
          delete: { param: 'id' }
        }
        ]
      }
    ]
  })

})

app.post('/register', async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const existingUser = await User.findOne({ nome });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ nome, senha });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  try {

    const user = await User.findOne({ nome });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id, nome: user.nome }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor: ' + err });
  }
});


app.use('/produto', produtoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
