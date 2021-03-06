const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enderecoSchema = new Schema({
  
  _id: Schema.Types.ObjectId,
  logradouro: { type: String, lowercase: true, trim: true, required: true },
  bairro: { type: String, lowercase: true, trim: true, required: true },
  criadoEm: { type: Date, default: Date.now, required: true }

})

const enderecoCollection = mongoose.model("endereco", enderecoSchema)

module.exports = enderecoCollection