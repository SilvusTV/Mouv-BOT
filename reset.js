//Constantes
const sqlite3 = require('sqlite3')
const dbname = './main.db'

//ouverture de la DB
let db = new sqlite3.Database(dbname, err => {

    if (err)
        throw err
    
    console.log ('DB started on ' + dbname)
    
    db.run(`DELETE FROM messagePower`)
    db.run(`UPDATE sqlite_sequence SET seq = ${'0'} WHERE name = 'messagePower'`)
})