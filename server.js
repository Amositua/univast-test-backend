const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vr_planets';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const planetRoutes = require('./routes/planets');
const locationRoutes = require('./routes/locations');

app.use('/api/planets', planetRoutes);
app.use('/api/locations', locationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'VR Planets API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
