const express = require('express');
const ApolicesController = require('../controllers/ApolicesController.js');

const router = express.Router();

router
.get('/apolices', ApolicesController.listarApolices)
.get('/apolices/busca', ApolicesController.listarApolicePorNum)
.get('/apolices/cpf', ApolicesController.listarApolicePorCPF)
.get('/apolices/:id', ApolicesController.listarApolicesPorId)
.post('apolices/', ApolicesController.cadastrarApolice)
.put('apolices/:id', ApolicesController.atualizarApolice)
.delete('apolices/:id', ApolicesController.deletarApolice)

module.exports = router;