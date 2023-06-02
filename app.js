require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
conectarBanco = require('./config/dbConexao')
const cors = require('cors')

const app = express()

//habilita todos os sites para fazerem requisiões nesta API
app.use(cors())

app.use(express.json())

const User = require ('./models/User')

// app.get('/',(req, res) => {
//     res.status(200).json({msg:'Bem vindo ao Projeto Seguro X!'})
// })

app.get('/user/:id', checkToken, async (req, res) =>{
    
    const id = req.params.id

    const user = await User.findById(id, '-senha')

    if(!user){
        return res.status(404).json({msg:'Usuario não encontrado!'})
    }

    res.status(200).json({user})
})

function checkToken(req, res, next) {
    const authHeader = req.headers ['authorization']
    const token = authHeader && authHeader.split('')[1]

    if(!token){
        return res.status(401).json({msg:'Acesso negado'})
    }

    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error){
        res.status(400).json({msg:'Token inválido!'})
    }
}

app.post('/auth/register', async(req, res) => {
    const {nome, email, senha, confirmarsenha} = req.body

    if(!nome){
        return res.status(422).json({msg:'O nome é obrigatório'})
    }


    if(!email){
        return res.status(422).json({msg:'O email é obrigatório'})
    }


    if(!senha){
        return res.status(422).json({msg:'A senha é obrigatória'})
    }

    if(senha !== confirmarsenha){
        return res.status (422).json({msg: 'As senhas não coferem!'})
    }

    const userExistente = await User.findOne({email: email})

    if(userExistente){
        return res.status (422).json({msg: 'Por favor, utilize outro email!'})
    }

    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)

    const user = new User ({
        nome,
        email,
        senha: senhaHash,
    })

    try {

        await user.save()

        res.status(201).json({msg:'Usuario criado com sucesso!'})

    } catch(error){

        console.log(error)

        res.status(500).json({msg:'Aconteceu um erro no servidor, tente novamente mais tarde!',})
    }
    })

    app.post ('/auth/login', async (req, res) => {

        const {email, senha} = req.body

        if(!email){
            return res.status(422).json({msg:'O email é obrigatório'})
        }
    
    
        if(!senha){
            return res.status(422).json({msg:'A senha é obrigatória'})
        }

        const user = await User.findOne({email: email})

         if(!user){
            return res.status (404).json({msg: 'Usuário não encontrado!'})
    }

    const checkSenha = await bcrypt.compare(senha, user.senha)

    if(!checkSenha){
        return res.status (422).json({msg: 'Senha inválida!'})
    }

    try {

        const secret = process.env.SECRET
        
        const token = jwt.sign({
            id: user._id
        }, secret
        )

        res.status(200).json ({msg: 'Autenticação enviada com sucesso!', token})

    } catch (err) {
        console.log (error)

        res.status(500).json({
            msg:'Aconteceu algum erro no servidor, tente novamente mais tarde!'
        })
    }
    })

   


//colocar as rotas para funcionar direitinho
    const routesApolices = require('./routes/ApolicesRoute')
    app.use('/', routesApolices)


     const routesCoberturas = require ('./routes/CoberturaRoute')
     app.use('/', routesCoberturas)

     const routesContadores = require('./routes/ContadoresRoute')
     app.use('/', routesContadores)

   const routesCotacoes = require ('./routes/CotacaoesRoute')
   app.use  ('/', routesCotacoes)

  const routesPropostas = require ('./routes/PropostasRoute')
   app.use('/', routesPropostas)


async function inicioServer(){
    await conectarBanco();
    app.listen(4000)
    console.log('Conectou o banco!')
}
inicioServer()


