require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { appendFile } = require('fs');
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const bookroutes = require('./routes/books');
const reviewroutes = require('./routes/reviews');
const transactionroutes = require('./routes/transactions');

app.use('/api/auth' , authRoutes);
app.use('/api/books' , bookroutes);
app.use('/api/reviews' , reviewroutes);
app.use('/api/transactions' , transactionroutes);

//test

app.get('/' , (req , res) => {
    res.send('library backend is running');
});

//api health 

app.get('/api/health' , (req , res) => {
    res.json({status : 'hell ye' , message : 'its running for now atleast idk how long ngl'});
});

app.use((err , req , res , next) => {
    console.error('global error we cooked fam' , err.stack);
    res.status(500).json({message : 'server is cooked which basically means something went wrong idk what yeah F ;-;'});
});


const PORT = process.env.PORT || 4000;
app.listen(4000);
