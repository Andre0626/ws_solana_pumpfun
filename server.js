// server.js
const WebSocket = require('ws');
const express = require('express');

const app = express();
const port = 3000;
const ws = new WebSocket('wss://pumpportal.fun/api/data');

const tokensToWatch = [];

ws.on('open', function open() {
    // Subscribing to token creation events
    const payloadNewTokens = {
        method: "subscribeNewToken",
    }
    ws.send(JSON.stringify(payloadNewTokens));

    // Subscribing to trades made by accounts
    // payload = {
    //     method: "subscribeAccountTrade",
    //     keys: ["AArPXm8JatJiuyEffuC1un2Sc835SULa4uQqDcaGpAjV"] // array of accounts to watch
    // }
    // ws.send(JSON.stringify(payload));



    // Subscribing to trades on tokens
    // const payloadTradeToken = {
    //     method: "subscribeTokenTrade",
    //     keys: ['43cWbojkBv1PfE7oHzrvQGNRh5z1AHkxGh9WtBhuEZds'] // array of token CAs to watch
    // }
    // ws.send(JSON.stringify(payloadTradeToken));
});

ws.on('message', function message(data) {
    const payload = JSON.parse(data);
   
    if (payload.marketCapSol < 35){
        console.log(payload);
        //tokensToWatch.push(payload.mint);
        console.log(`https://photon-sol.tinyastro.io/en/lp/${payload.mint}?handle=475121e34ecac6acea2bc`)
    }
});

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// {
//     signature: '2C87UoRip2NfLVn1EqxEamH2h3rdiKByXZKXxK3e4CPr4ohrGmjLAMHZreCyjvimjhxcHpg7nZBvdzZzYiLwtD71',
//     mint: '3Lngq6T2rGJ9Fjydw8LREoeiovQ89TGr74QQ4joUpump',
//     traderPublicKey: 'J9DSkkth8imCwpTtMTdTxp9zBVn98eBKtg5jrmF62mjt',
//     txType: 'create',
//     initialBuy: 56131159.969673,
//     bondingCurveKey: '7dTHRF2HWzSK6LJdoL7Usp88gspTYDcSnswwxmWiZPWt',
//     vTokensInBondingCurve: 1016868840.030327,
//     vSolInBondingCurve: 31.65599999999997,
//     marketCapSol: 31.130858527492954
// }
