const https = require('https');
const querystring = require('query-string');
const fs = require('fs');
const pathModule = require('path');
const router = require('express').Router();

// syncronous workflow checkout for server to server
router.post(
    '/checkout',
    async (req, res) => {
        const amount = req.body.amount;

        const path = '/v1/payments';
        const data = querystring.stringify({
            'entityId':'8a8294174b7ecb28014b9699220015ca',
		    'amount':amount,
		    'currency':'EUR',
            'paymentBrand':'VISA',
            'paymentType':'DB',
            'card.number':'4200000000000000',
            'card.holder':'Jane Jones',
            'card.expiryMonth':'05',
            'card.expiryYear':'2034',
            'card.cvv':'123'
        });
        const options = {
            port: 443,
            host: 'eu-test.oppwa.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length,
                'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
            }    
        };


        const sendData = await new Promise((resolve, reject) => {
            const postRequest = https.request(options, function(res) {
                const buf = [];
                res.on('data', chunk => {
                    buf.push(Buffer.from(chunk));
                });
                res.on('end', () => {
                    const jsonString = Buffer.concat(buf).toString('utf8');
                    try {
                        resolve(JSON.parse(jsonString));
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            postRequest.on('error', reject);
            postRequest.write(data);
            postRequest.end();
        });

        const file = pathModule.resolve(__dirname, `../public/text/checkout.json`);


        fs.writeFile(file, JSON.stringify(sendData), (error) => {
            console.log(error);
        });

        res.status(200).json(sendData);
    }
);


// asyncronous workflow checkout for server to server
router.post(
    '/checkout2',
    async (req, res) => {
        console.log("Async is called");
        const amount = req.body.amount;

        const path = '/v1/payments';
        const data = querystring.stringify({
            'entityId':'8a8294174b7ecb28014b9699220015ca',
		    'amount':amount,
		    'currency':'EUR',
            'paymentBrand':'GIROPAY',
		    'paymentType':'DB',
		    'bankAccount.bic':'TESTDETT421',
		    'bankAccount.iban':'DE14940593100000012346',
		    'bankAccount.country':'DE',
		    'shopperResultUrl':'http://localhost:3000/shopper'
        });
        const options = {
            port: 443,
            host: 'eu-test.oppwa.com',
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length,
                'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
            }    
        };


        const sendData = await new Promise((resolve, reject) => {
            const postRequest = https.request(options, function(res) {
                const buf = [];
                res.on('data', chunk => {
                    buf.push(Buffer.from(chunk));
                });
                res.on('end', () => {
                    const jsonString = Buffer.concat(buf).toString('utf8');
                    try {
                        resolve(JSON.parse(jsonString));
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            postRequest.on('error', reject);
            postRequest.write(data);
            postRequest.end();
        });

        const file = pathModule.resolve(__dirname, `../public/text/checkout.json`);


        fs.writeFile(file, JSON.stringify(sendData), (error) => {
            console.log(error);
        });

        res.status(200).json(sendData);
    }
);


router.post(
    '/confirm',
    async (req, res) => {
        let path=req.body.resourcePath;
        path += '?entityId=8a8294174b7ecb28014b9699220015ca';
        const options = {
            port: 443,
            host: 'eu-test.oppwa.com',
            path: path,
            method: 'GET',
            headers: {
                'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
            }
        };
        console.log(path);
        const sendData = await new Promise((resolve, reject) => {
            const postRequest = https.request(options, function(res) {
                const buf = [];
                res.on('data', chunk => {
                    buf.push(Buffer.from(chunk));
                });
                res.on('end', () => {
                    const jsonString = Buffer.concat(buf).toString('utf8');
                    try {
                        resolve(JSON.parse(jsonString));
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            postRequest.on('error', reject);
            postRequest.end();
        });


        const file = pathModule.resolve(__dirname, `../public/text/response.json`);
        fs.writeFile(file, JSON.stringify(sendData), (error) => {
            console.log(error);
        });

        res.status(200).json(sendData);
    }
)

module.exports = router;

