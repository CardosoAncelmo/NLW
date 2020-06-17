const sqlite3 = require("sqlite3").verbose() // importa a dependencia sqlite   e pede pro banco retornar no console msg

//criar o objeto que irá fazer operações no banco de dados 
const db = new sqlite3.Database("./src/database/database.db")

module.exports =db

// ULTILIZAR objeto de banco de dados, para nossas operações 
/*db.serialize(() => {

  /*  db.run(`
    CREATE TABLE IF NOT EXISTS lugares (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        nome TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT ,
        city TEXT,
        items TEXT
      );

 `)

    // inserir dados na tabela
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "260",
        "Santa Catarina",
        "Rio do Sul",
        " Papéis e papelão"

    ]

    function afterInsertData(err) {
        if (err) {    //se houver erro então 
            return console.log(err) // retorna mensagem de erro 
        }

        console.log("Cadastro com sucesso") //se nao houver erro, retorna a mesagem apresentada aqui
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    // Consultar os dados da tabela
    db.all(`SELECT nome FROM lugares`, function (err, rows) {  // realiza a consulta referente a query, e retorna a linhas= rows 
        if (err) {                          //se houver erro então 
            return console.log(err)        // retorna mensagem de erro
        }
        console.log("Aqui estão seu registros:")
        console.log(rows)
    })

    db.run(`DELETE FROM lugares WHERE id = ?`, [2], function (err) {

        if (err) {
            return console.log(err)
        }
        console.log("registro deletado com sucesso!")
    })

})*/
