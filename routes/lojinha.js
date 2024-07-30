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


router.delete('/:id', auth, getProduto, async (req, res) => {
  try {
    await res.produto.deleteOne(); 
    res.json({ message: 'Produto deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
