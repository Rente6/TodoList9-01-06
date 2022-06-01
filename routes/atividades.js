
module.exports = (app)=>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
        //return console.log(dados)
        //cnectar com o mongodb
        const database = require("../config/database")()
        //importar model atvi
        const atividades = require("../models/atividades")
        //gravar as info do form no db
        var gravar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            disciplina:dados.disciplina,
            intrucoes:dados.orientacoes,
            usuario:dados.id,
            titulo:dados.titulo 
        }).save()
        //BUSCAR AS ATIVI DO USU
        var buscar = await atividades.find({usuario:dados.id})
        //recarregar a pag da atvis
        res.render('atividades.ejs',{nome:dados.nome,id:dados.id,lista:buscar})
    })
    
}