const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database/database.db');
const saltRounds = 10;

router.get('/recipes', (req, res) => {
    db.all('SELECT * FROM recipes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ recipes: rows });
    });
});

router.get('/recipes/type/:type', (req, res) => {
    const recipeType = req.params.type;
    db.all('SELECT * FROM recipes WHERE recipe_type = ?', [recipeType], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ recipes: rows });
    });
});

router.post('/recipes', (req, res) => {
    const { title, ingredients, instructions, recipe_type } = req.body;
    if (!title || !ingredients || !instructions || !recipe_type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

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

router.post('/signup', (req, res) => {
    const { username, email, password, experience } = req.body;
    if (!username || !email || !password || !experience) {
        return res.status(400).json({ error: 'All fields are required' });
    }

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

// Rota de Sign In
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Salvando o usuário na sessão
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                experience: user.experience
            };

            res.json({ message: 'Sign in successful', user: req.session.user, 
                user: {
                id: user.id,
                username: user.username,
                email: user.email,
                experience: user.experience
            }});
        });
    });
});

module.exports = router;
