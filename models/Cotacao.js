const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
const db = require ('../config/dbConexao');

const cotacaoSchema = new mongoose.Schema(
    {
        n_cotacao:{type:Number},
        nome:{type:String},
        cpf:{type:String},
        inicioVigencia:{type:Date},
        terminoVigencia:{type:Date},
        valorRisco:{type:Number, min:5000, max:1000000},
        cobertura:{type:mongoose.Schema.Types.ObjectId, ref:'coberturas'}
    },
    {
        timestamps:{
            createAt:'inicioVigencia'
        }
    }
)

cotacaoSchema.pre('save', async function(){
    // let data = this.inicioVigencia()
    // data = data.setDate(data.getDate()+1)
    // let data = this.inicioVigencia
    // data =  new Date()
    // data = data.setDate(data.getDate()+1)
    // this.inicioVigencia = data
})

const cotacoes = mongoose.model('cotacoes', cotacaoSchema)


module.exports = cotacoes;