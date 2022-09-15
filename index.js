const path = require('path');
const express = require('express');

const paymentRoutes = require('./routes/index');
const stsRoutes = require('./routes/sts');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/card', (req, res) => res.sendFile(path.join(__dirname, 'public/card.html')));
app.get('/result', (req, res) => res.sendFile(path.join(__dirname, 'public/result.html')));
app.get('/shopper', (req, res) => res.sendFile(path.join(__dirname, 'public/shopper.html')))

app.use('/api', paymentRoutes);
app.use('/api2', stsRoutes);

app.listen(3000, () => {
    console.log("server is running");
})