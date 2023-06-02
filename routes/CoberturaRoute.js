const express = require('express');
const CoberturasController = require('../controllers/CoberturasController');

const router = express.Router();

router
.get('/coberturas', CoberturasController.listarCoberturas)
.get('/coberturas/:id', CoberturasController.listarCoberturaPorId)
.post('coberturas/', CoberturasController.cadastrarCobertura)
.put('coberturas/:id', CoberturasController.atualizarCobertura)
.delete('/coberturas/:id', CoberturasController.deletarCobertura)

module.exports = router;