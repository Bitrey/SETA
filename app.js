const express = require("express");
const app = express();
const fs = require("fs");
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');
const tabletojson = require('tabletojson').Tabletojson;
const fermateJSON = require("./fermate.json");
require('dotenv').config()

const SETAURL = "https://www.setaweb.it/mo/quantomanca";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getData = (res, nomeFermata, codiceFermata) => {
    const params = new URLSearchParams();
    params.append('risultato', 'palina');
    params.append('nome_fermata', (nomeFermata ? nomeFermata : 'San Cesario'));
    params.append('qm_palina', (codiceFermata ? codiceFermata : 'MO2076'));

    fetch(SETAURL, {
            method: 'post',
            body:    params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then(res => res.text())
        .then(body  => {
            // fs.writeFile('data.html', body, function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            // });
            const $ = cheerio.load(body);
            const converted = tabletojson.convert($(".qm_table_risultati").parent().html());
            // fs.writeFile('table.json', JSON.stringify(converted[0]), function (err) {
            //     if (err) throw err;
            //     console.log('Table saved!');
            // });
            res.json(converted[0]);
        });
}

app.get("/", function(req, res){
    if(req.query && req.query.fermata && fermateJSON[req.query.fermata]){
        const fermataQuery = req.query.fermata;
        getData(res, fermateJSON[fermataQuery], fermataQuery);
    } else {
        getData(res, false, false);
    };
});

// app.post("/salvafermate", function(req, res){
//     fs.writeFile('fermate.json', req.body.fermate, function (err) {
//         if (err) throw err;
//         res.json(converted);
//         console.log('Fermate salvate!');
//     });
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server partito!");
});