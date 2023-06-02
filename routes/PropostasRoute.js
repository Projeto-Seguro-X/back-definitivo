const express = require ('express');
const PropostasController = require('../controllers/PropostasController');

const router = express.Router();

router
.get('/propostas', PropostasController.listarPropostas)
.get('/propostas/busca', PropostasController.listarPropostasPorNum)
.get('/proposta/:id', PropostasController.listarPropostasPorId)
.post('/propostas', PropostasController.cadastrarProposta)
.put('/proposta/:id', PropostasController.atualizarProposta)
.delete('/proposta/:id', PropostasController.deletarProposta)


module.exports = router;