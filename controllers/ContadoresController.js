const contadores = require('../models/Contador.js');

class ContadoresController {
    static listarContadores = async (req, res) =>{
        try {
            const contador = await contadores.find()
            res.status(200).json(contador);

        } catch (error) {
            res.status(400).json({msg:'Lista não encontrada!'})
        }
    };

    static listaContadoresPorId = async (req, res) =>{
        try {
            const contador = await contadores.findById(id);
            res.status(200).send(contador);

        } catch (error) {
            res.status(400).json({msg:'Id não encontrado!'})
        }
    };

    static cadastrarContador = async (req, res) =>{
        try {
            let contador = new contadores(req.body);
            const cadastrarContador = await contador.save();
            res.status(201).send(cadastrarContador.toJSON);

        } catch (error) {
            res.status(500).json({msg:'Falha ao cadastrar!'})
        }
    };

    static atualizarContador = async (req, res) =>{
        try {
            const id = req.params.id;
            await contadores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({msg: 'Contador atualizado com sucesso!'})

        } catch (error) {
            res.status(500).json({msg:'Falha ao atualizar!'})
        }
    };

    static deletarContador = async (req, res) =>{
        try {
            const id = req.params.id;
            await contadores.findByIdAndDelete(id);
            res.status(200).send({msg:'Contador deletado com sucesso!'})

        } catch (error) {
            res.status(500).json({msg:'Falha ao deletar!'})
        }
    };
}


module.exports = ContadoresController;