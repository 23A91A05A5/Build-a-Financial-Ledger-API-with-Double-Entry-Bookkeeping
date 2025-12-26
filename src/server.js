require('dotenv').config();
const express = require('express');

const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

/** VERY IMPORTANT **/
app.use(express.json()); // <-- THIS FIXES req.body undefined

app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
