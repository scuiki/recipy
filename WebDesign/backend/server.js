const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/api');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const db = new sqlite3.Database('./database/database.db');

// Middleware para fazer parsing do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/src', express.static(path.join(__dirname, '../src')));
app.use('/styles', express.static(path.join(__dirname, '../src/styles')));
app.use('/images', express.static(path.join(__dirname, '../src/images')));
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(err.status).end();
        }
    });
});

// Rotas da API
app.use('/api', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
