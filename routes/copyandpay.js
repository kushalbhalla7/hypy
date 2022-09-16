const https = require('https');
const querystring = require('query-string');
const fs = require('fs');
const pathModule = require('path');
const router = require('express').Router();

router.post(
    '/checkout',
    async (req, res) => {
        const amount = req.body.amount;
        const path = '/v1/checkouts';
        const data = querystring.stringify({
            'entityId':'8a8294174b7ecb28014b9699220015ca',
		    'amount':amount,
		    'currency':'EUR',
		    'paymentType':'DB'
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

        // writing payment data into checkout json file
        const file = pathModule.resolve(__dirname, `../public/data/checkout.json`);
        fs.writeFile(file, JSON.stringify(sendData), (error) => {
            console.log(error);
        });

        res.status(200).json(sendData);
    }
);

router.get(
    '/confirm',
    async (req, res) => {
        let path=req.query.resourcePath;
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

        // writing payment's status response in response json file
        const file = pathModule.resolve(__dirname, `../public/data/response.json`);
        fs.writeFile(file, JSON.stringify(sendData), (error) => {
            console.log(error);
        });

        res.status(200).json(sendData);
    }
)

module.exports = router;

