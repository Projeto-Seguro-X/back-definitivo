const mongoose =  require('mongoose');

const coberturaSchema = new mongoose.Schema({
    nome: {type:String},
    descricao: {type:String},
})

const coberturas = mongoose.model('cobertura', coberturaSchema)


module.exports = coberturas;