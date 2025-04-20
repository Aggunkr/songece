// app.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const path     = require('path');

// API route dosyaları
const authRoutes    = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes    = require('./routes/userRoutes');
const cartRoutes    = require('./routes/cartRoutes');
const orderRoutes   = require('./routes/orderRoutes');
const adminRoutes   = require('./routes/adminRoutes');

const app = express();

// 1) Middleware’ler
app.use(cors());
app.use(express.json());

// 2) public klasöründeki tüm .html/.css/.js dosyalarını sun
app.use(express.static(path.join(__dirname, 'public')));

// 3) MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Bağlantısı Başarılı'))
.catch(err => console.error('❌ MongoDB Bağlantı Hatası:', err));

// 4) API uçlarınızı tanımlayın
app.use('/api/auth',    authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/cart',    cartRoutes);
app.use('/api/orders',  orderRoutes);
app.use('/api/admin',   adminRoutes);

// 5) Kök dizine gelenleri index.html’e yönlendir (SPA veya statik kök)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 6) API dışındaki diğer bilinmeyen rotalar da index.html’e dönsün
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ msg: 'API endpoint bulunamadı' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 7) Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
