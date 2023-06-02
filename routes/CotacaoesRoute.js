const express = require('express');
const CotacoesController = require('../controllers/CotacoesController');

const router = express.Router();

router
.get('/cotacoes', CotacoesController.listarCotacoes)
.get('/cotacoes/busca', CotacoesController.listarCotacoesPorNum)
.get('/cotacoes/:id', CotacoesController.listarCotacoesId)
.post('/cotacoes/', CotacoesController.cadastrarCotacao)
.put('/cotacoes/:id', CotacoesController.atualizarCotacao)
.delete('/cotacoes/:id', CotacoesController.deletarCotacao)

module.exports = router;

