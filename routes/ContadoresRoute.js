const express = require('express');
const ContadoresController = require('../controllers/ContadoresController');

const router = express.Router();

router
.get('/contadores', ContadoresController.listarContadores)
.get('/contadores/:id', ContadoresController.listaContadoresPorId)
.post('/contadores', ContadoresController.cadastrarContador)
.put('/contadores/:id', ContadoresController.atualizarContador)
.delete('/contadores/:id', ContadoresController.deletarContador)

module.exports = router;
