const express = require('express');
const router = express.Router();
const path = require('path');
const mysqlConnection = require('./db');

router.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.post('/cadastrar', (req, res) => {
  const { nome, quantidade, preco_unitario } = req.body;

  if (!nome || !quantidade || !preco_unitario) {
    return res.status(400).json({ error: 'Todos os campos sao obrigatorios' });
  }

  const query = 'INSERT INTO produtos (nome, quantidade, preco_unitario) VALUES (?, ?, ?)';
  mysqlConnection.query(query, [nome, quantidade, preco_unitario], (err) => {
    if (err) {
      console.error('Erro ao cadastrar o produto:' + err.message);
      return res.status(500).json({ error: 'Erro ao tentar cadastrar o produto' });
    }
    res.redirect('/');
  });
});

router.get('/produtos', (req, res) => {
  const query = 'SELECT id, nome, quantidade, preco_unitario FROM produtos';

  mysqlConnection.query(query, (err, resultados) => {
    if (err) {
      console.error('erro ao buscar os produtos:' + err.message);
      return res.status(500).json({ error: 'Erro ao tentar buscar os produtos: ' + err.message });
    }
    res.json(resultados);
  });
});

module.exports = router;