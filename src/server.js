const express = require("express") //atribuindo o rxpress a uma variavel 
const server = express() //executando o express na variavel ''server

// pegar o banco de dado
const db = require("./database/db")

// configurar pasta publica
server.use(express.static("puplic"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true  // nao deixar usar cache antigo para nao dar bug "não usa cache"
})

//configurar caminho da aplicação 
// req: Requisição
//  res: Resposta
server.get("/", (req, res) => {
   return res.render("index.html")  // referencia o index.html para ser renderizado
})

server.get("/create-point", (req, res) => {

      console.log(req.query)

   return res.render("create-point.html")     // referencia o vreate-point.html para ser renderizado
})

server.post("/savepoint",(req,res) => {

   // inserir dados no banco de dados
   const query = `
   INSERT INTO lugares (
       image,
       nome,
       address,
       address2,
       state,
       city,
       items
   ) vALUES (?,?,?,?,?,?,?);
`
   const values = [
      req.body.image,
      req.body.nome,
      req.body.address,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.items


   ]

   function afterInsertData(err) {
       if (err) {    //se houver erro então 
           return console.log(err) // retorna mensagem de erro 
       }

       console.log("Cadastrado com sucesso") //se nao houver erro, retorna a mesagem apresentada aqui
       console.log(this)

       return res.render("create-point.html", {saved: true})
   }

   db.run(query, values, afterInsertData)

     
})


server.get("/search", (req, res) => {

   const search = req.query.search

   if(search == "") {
      // pesquisa vazia
      return res.render("search-results.html", {total: 0 })
   }

   db.all(`SELECT * FROM lugares WHERE city LIKE '%${search}%'`, function(err, rows) {  // realiza a consulta referente a query, e retorna a linhas= rows 
      if (err) {                          //se houver erro então 
          return console.log(err)        // retorna mensagem de erro
      }
      const total = rows.length
     
      // mostrar a pagina html com os dados do banco de dados
      return res.render("search-results.html", {lugares: rows, total: total}) // renderiza search-results.html  ja com resultado da consulta
    })                                                                             // com os dados da consulta ja salvo na variavel, como linhas
   
})   


server.listen(3000) //executando o servidor na porta 3000
