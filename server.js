const express = require('express'); 
const path = require('path');    
const mysqlConnection = require('./db');

const rotas = require('./routes'); 

const app = express(); 
const port = 3000;     

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname)));   
app.use('/', rotas);

app.listen(port, () => { 
  console.log(` Sistema de Inventário rodando em http://localhost:${port}`); 
});

