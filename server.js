const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_saude',
  password: '123456',
  port: 5432,
});

const app = express();
const port = 3000;

app.use(cors());

app.get('/hospitais', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT nome, latitude, longitude FROM tbl_hospital');
    const hospitais = result.rows;
    client.release();
    res.json(hospitais);
  } catch (err) {
    console.error('Erro ao buscar informações sobre hospitais', err);
    res.status(500).send('Erro ao buscar informações sobre hospitais');
  }
});

app.get('/exames', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tbl_exames');
    const exames = result.rows;
    client.release();
    res.json(exames);
  } catch (err) {
    console.error('Erro ao buscar informações sobre exames', err);
    res.status(500).send('Erro ao buscar informações sobre exames');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
