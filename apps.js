
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
