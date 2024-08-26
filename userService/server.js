const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const config = require('config');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow headers
}));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

// Connect to MongoDB
mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
