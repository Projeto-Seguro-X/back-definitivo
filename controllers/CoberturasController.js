const coberturas = require('../models/Cobertura.js');

class CoberturasController {
    static listarCoberturas = async (req,res) =>{
        try {
            const cobertura = await coberturas.find();
            res.status(200).json(cobertura);

        } catch (error) {
            res.status(400).json({msg:'Lista não encontrada!'})
        }
    };

    static listarCoberturaPorId = async (req,res) =>{
        try {
            const id = req.params.id;
            const cobertura = await coberturas.findById(id);
            res.status(200).send(cobertura);

        } catch (error) {
            res.status(400).json({msg:'Id não encontrado!'})
        }
    };

    static cadastrarCobertura = async (req,res) =>{
        try {
            let cobertura = new coberturas (req.body);
            const cadastrarCobertura = await cobertura.save();
            res.status(201).send(cadastrarCobertura.toJSON);

        } catch (error) {
            res.status(500).json({msg:'Falha ao cadastrar!'})
        }
    };

    static atualizarCobertura = async (req, res) =>{
        try {
            const id = req.params.id;
            await coberturas.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).json({mgs:'Cobertura atualizada com sucesso!'})

        } catch (error) {
            res.status(500).json({msg:'Falha ao atualizar!'})
        }
    };

    static deletarCobertura = async (req, res) =>{
        try {
            const id = req.params.id;
            await coberturas.findByIdAndDelete(id);
            res.status(200).send({msg:'Cobertura atualizada com sucesso!'})
        } catch (error) {
            res.status(500).json({msg:'Falha ao deletar!'})
        }
    };

    }

    
    module.exports = CoberturasController;
