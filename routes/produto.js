const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const auth = require('../middleware/auth');

const getProduto = async (req, res, next) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrada' });
    }
    res.produto = produto;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.get('/', async (req, res) => {
  try {
    const produto = await Produto.find();
    res.json(produto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/', auth, async (req, res) => {
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    valor: req.body.valor,
    categoria: req.body.categoria
  });

  try {
    const newproduto = await produto.save();
    res.status(201).json(newproduto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', auth, async (req, res) => {
  const updates = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    valor: req.body.valor,
    categoria: req.body.categoria
  };

  try {
    const produto = await produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrada' });
    }

    produto.nome = updates.nome;
    produto.descricao = updates.descricao;
    produto.valor = updates.valor;
    produto.categoria = updates.categoria;


    const updatedProduto = await produto.save();
    res.json(updatedProduto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, getProduto, async (req, res) => {
  try {
    await res.produto.deleteOne();
    res.json({ message: 'Produto deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
