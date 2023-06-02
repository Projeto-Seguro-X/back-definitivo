const express = require('express');
const cotacoes = require('./ContadoresRoute');
const apolices = require('./ApolicesRoute');
const coberturas = require('./CoberturaRoute');
const contadores = require('./ContadoresRoute');
const propostas = require('./PropostasRoute');

const routes = (app) =>{
    app.route('/').get((req, res)=>{
        res.status(200).send({titulo:'Projeto Seguro X'})
    })

    app.use(express.json(), cotacoes, apolices, coberturas, contadores, propostas)
}

module.exports = routes;