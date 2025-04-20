const express = require('express');
const router = express.Router();

// Her sayfayı ilgili HTML dosyasına yönlendiriyoruz
router.get('/', (req, res) => {
   res.sendFile('index.html', { root: './public' });
});

router.get('/login', (req, res) => {
   res.sendFile('login.html', { root: './public' });
});

router.get('/register', (req, res) => {
   res.sendFile('register.html', { root: './public' });
});

router.get('/products', (req, res) => {
   res.sendFile('products.html', { root: './public' });
});

router.get('/cart', (req, res) => {
   res.sendFile('cart.html', { root: './public' });
});

router.get('/contact', (req, res) => {
   res.sendFile('contact.html', { root: './public' });
});

router.get('/about', (req, res) => {
   res.sendFile('about.html', { root: './public' });
});

module.exports = router;
