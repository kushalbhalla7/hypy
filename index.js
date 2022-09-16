const path = require('path');
const express = require('express');

const capRoutes = require('./routes/copyandpay');
const stsRotues = require('./routes/servertoserver');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// copy and pay views
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/card', (req, res) => res.sendFile(path.join(__dirname, 'public/card.html')));

// server to server views (syncronous)
app.get('/2', (req, res) => res.sendFile(path.join(__dirname, 'public/index2.html')));

// server to server view (asyncronous)
app.get('/3', (req, res) => res.sendFile(path.join(__dirname, 'public/index3.html')));
app.get('/3/verify', (req, res) => res.sendFile(path.join(__dirname, 'public/verify.html')))

// copy and pay routes
app.use('/copy-and-pay', capRoutes);

//server to server routes
app.use('/server-to-server', stsRotues);

app.listen(3000, () => {
    console.log("server is running");
})