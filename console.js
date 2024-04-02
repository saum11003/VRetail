const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 4000;


// MySQL Database Connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Ecommerce',
    // port: 3306
});

conn.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); 
    }
    console.log('Connected to the MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define valid user credentials
const validUser = {
    username: 'Saumya',
    email: 'saumya@gmail.com',
    password: 'Saumya09'
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/api/get-cart-items', (req, res) => {
    const sql = 'SELECT * FROM cart';

    conn.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to retrieve cart items' });
        } else {
            res.json(results);
        }
    });
});

app.post('/login', (req, res) => {
    const { username, email, password } = req.body;

    if (username === validUser.username && email === validUser.email && password === validUser.password) {
        res.redirect('/store');
    } else {
        res.redirect('/');
    }
});

app.post('/api/add-to-cart', (req, res) => {
    const { productId, productName, productPrice } = req.body;
    updateOrCreateProduct(productId, productName, productPrice, (error) => {
        if (error) {
            res.status(500).json({ error: 'Failed to add to cart' });
        } else {
            res.json({ success: 'Item added to cart' });
        }
    });
});

app.get('/store', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});

function updateOrCreateProduct(productId, productName, productPrice, callback) {
    conn.query('SELECT * FROM cart WHERE product_id = ?', [productId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            callback(error);
            return;
        }

        if (results.length === 0) {
            conn.query('INSERT INTO cart (product_id, product_name, product_price, qty) VALUES (?, ?, ?, 1)', [productId, productName, productPrice], (insertError) => {
                if (insertError) {
                    console.error('Insert error:', insertError);
                    callback(insertError);
                } else {
                    callback(null);
                }
            });
        } else {
            const newQuantity = results[0].qty + 1;
            conn.query('UPDATE cart SET qty = ? WHERE product_id = ?', [newQuantity, productId], (updateError) => {
                if (updateError) {
                    console.error('Update error:', updateError);
                    callback(updateError);
                } else {
                    callback(null);
                }
            });
        }
    });
}
