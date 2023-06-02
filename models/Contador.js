const mongoose =  require('mongoose');

const contadorSchema = new mongoose.Schema({
    n_cotacao: {type:Number},
})

const contadores = mongoose.model('contador', contadorSchema)


module.exports = contadores;