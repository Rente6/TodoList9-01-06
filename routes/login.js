module.exports = (app)=>{
    //abrir o arquivo login.js
    app.get('/login',(req,res)=>{
        res.render('login.ejs')
    })
    //validar o usu e a senha
    app.post('/login', async(req,res)=>{
        //recuperar as infos digi o form
        var dados = req.body
        //conectar com o banco de dds
        var database = require('../config/database')()
        //selecionar a model usu
        var usuarios = require('../models/usuarios')
        //verificar se email ta cadstrado
        var verificar = await usuarios.findOne(
            {email:dados.email})
            if(!verificar){
                return res.send("Email não Cadastrado!")
            }
            var cript = require('bcryptjs')

            var comparar = await cript.compare(dados.senha,verificar.senha)
            if(!comparar){
                return res.send("Senha Inválida!")
            }
            res.render('atividades.ejs',{nome:verificar.nome, id:verificar._id})
    })
    
}