const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  nome: String,
  descricao: String,
  valor: String,
  categoria: String
});



module.exports = mongoose.model('Produto', ProdutoSchema);
