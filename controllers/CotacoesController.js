const cotacoes = require('../models/Cotacao.js');
const propostas = require('../models/Proposta.js');

class CotacoesController {
    static listarCotacoes = async (req, res) =>{
        try {
            const cotacao = await cotacoes.find().populate({path: 'cobertura', model:'cobertura'}).exec()
            res.status(200).json(cotacao);

        } catch (error) {
            res.status(400).json({msg:'Lista não encontrada!'})
        }
    };

    static listarCotacoesId = async (req, res) =>{
        try {
            
        } catch (error) {
            const id = req.params.id;
            const cotacao = await cotacoes.findById(id)
            res.status(200).send(cotacao)
        }
    };

    static cadastrarCotacao = async (req, res) =>{
        try{
          let cotacao = new cotacoes(req.body);
          const cotac = await cotacao.save({ timestamps: { createdAt: true, updatedAt: false }})
          let valorPago = (cotacao.valorRisco * 0.05).toFixed(2)
          let dadosNovaProposta = cotac.toJSON();
          dadosNovaProposta.valorPago = valorPago;
          dadosNovaProposta.n_proposta = dadosNovaProposta.n_cotacao
          delete dadosNovaProposta.n_cotacao
          let proposta = new propostas(dadosNovaProposta);
          const novaProposta = await proposta.save()
          res.status(201).send(novaProposta)
    
        }catch(error){
          res.status(500).json({msg:'Falha ao cadastrar'})
        }
      };

      static atualizarCotacao = async (req,res) => {
        try {
          const id = req.params.id;
          await cotacoes.findByIdAndUpdate(id,{$set: req.body })
          res.status(200).send({message: 'Cotação atualizada!'})

        } catch (error) {
          res.status(500).send({message: err.message})  
        }
      };

      static deletarCotacao = async (req,res) =>{
        try {
            const id = req.params.id;
            await cotacoes.findAndDelete(id)
            res.status(200).send({msg:'Cotação deletada!'})

        } catch (error) {
            res.status(500).send({msg: err.message})
        }
      };

      static listarCotacoesPorNum = (req, res) =>{
        const numeroCotacao = req.query.numeroCotacao
        cotacao.find({'n_cotacao': numeroCotacao}, {}, (err, cotacoes) =>{
            res.status(200).send(cotacoes)
        })
      };
}


module.exports = CotacoesController;