const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database/database.db');
const saltRounds = 10;

// Rota para obter receitas (opcional, caso você queira listar as receitas)
router.get('/recipes', (req, res) => {
    db.all('SELECT * FROM recipes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ recipes: rows });
    });
});

// Rota para submeter uma nova receita
router.post('/recipes', (req, res) => {
    const { title, ingredients, instructions, recipe_type } = req.body;
    const stmt = db.prepare('INSERT INTO recipes (title, ingredients, instructions, recipe_type) VALUES (?, ?, ?, ?)');
    stmt.run([title, ingredients, instructions, recipe_type], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Recipe submitted successfully', recipeId: this.lastID });
    });
    stmt.finalize();
});

// Rota para cadastrar um novo usuário
router.post('/signup', (req, res) => {
    const { username, email, password, experience } = req.body;

    if (!username || !email || !password || !experience) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password before storing it
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const stmt = db.prepare('INSERT INTO users (username, email, password, experience) VALUES (?, ?, ?, ?)');
        stmt.run([username, email, hash, experience], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
        stmt.finalize();
    });
});

module.exports = router;
