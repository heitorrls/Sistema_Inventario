const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jjjb3509',
    database: 'inventario'
});

connection.connect((err) => {
    if (err) {
        return console.error('Erro ao conectar com o banco de dados:' + err.message);
    }
    console.log('conectado ao banco de dados!!!');
});

module.exports = connection;