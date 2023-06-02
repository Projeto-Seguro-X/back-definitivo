const apolices = require ('../models/Apolice.js');

class ApolicesController{
    static listarApolices = async (req, res) => {
        try {
            const apolice = await apolices.find()
            res.status(200).json(apolice);

        } catch (error) {
            res.status(400).json({msg:'Lista não encontrada!!'})
        }
    };

    static listarApolicesPorId = async (req, res) =>{
        try {
            let id = req.params.id;
            const apolice = await apolices.findById(id);
            res.status(200).send(apolice);

        } catch (error) {
            res.status(400).json({msg:'ID não encontrado!'})
        }
    };

    static cadastrarApolice = async (req, res) =>{
        try {
            let apolice = new apolices(req.body);
            const cadastrarApolice = await apolice.save;
            res.status(201).send(cadastrarApolice.toJSON());

        } catch (error) {
            res.status(500).json({msg:'Falha ao cadastrar!!!'})
        }
    };

    static atualizarApolice = async (req, res) =>{
        try {
            const id = req.params.id;
            await apolices.findByIdAndUpdate(id, {$set:req.body});
            res.status(200).send({msg:'Apolice atualizada com sucesso!!!'})

        } catch (error) {
            res.status(500).json({msg:'Falha ao atualizar!'})
        }
    };

    static deletarApolice = async (req, res) =>{
        try {
            const id = req.params.id;
            await apolices.findByIdAndDelete(id);
            res.status(200).send({msg:'Apolice deletada com sucesso!!'})

        } catch (error) {
            res.status(500).send({msg:'Falha ao deletar a apolice!'})
        }
    };

    static listarApolicePorNum = async (req, res) =>{
        try {
            const numeroApolice = req.query.n_apolice
            const dadoApolice = await apolices.find({'n_apolice': numeroApolice},)
            res.status(200).send(dadoApolice)

        } catch (error) {
            res.status(400).json({msg:'Apolice não encontrada!'})
        }
    };

    static listarApolicePorCPF = async (req, res) =>{
        try {
            const numeroCPF = req.query.cpf
            const dadoCPF = await apolices.find({'cpf': numeroCPF},)
            res.status(200).send(dadoCPF)

        } catch (error) {
            res.status(400).json({msg:'CPF não encontrado!'})
        }
    };
}

module.exports = ApolicesController;
