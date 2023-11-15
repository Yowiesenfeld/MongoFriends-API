

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan'); 
const userRoutes = require('./routes/userRoutes'); 
const thoughtRoutes = require('./routes/thoughtRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes
app.use('/api', routes);
app.use('/users', userRoutes);
app.use('/thoughts', thoughtRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
