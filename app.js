const express = require("express");
const app = express();
const fs = require("fs");
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');
const HtmlTableToJson = require('html-table-to-json');

const SETAURL = "https://www.setaweb.it/mo/quantomanca";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getData = (res) => {
    const params = new URLSearchParams();
    params.append('risultato', 'palina');
    params.append('nome_fermata', 'San Cesario');
    params.append('qm_palina', 'MO2076');
 
    fetch(SETAURL, {
            method: 'post',
            body:    params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then(res => res.text())
        .then(body  => {
            fs.writeFile('data.html', body, function (err) {
                if (err) throw err;
                res.send(body);
                console.log('Saved!');
            });
            const $ = cheerio.load(body);
            const data = HtmlTableToJson.parse($(".qm_table_risultati").html());
            console.log(data.results);
        });
}

app.get("/", function(req, res){
    getData(res);
});

app.listen(3000, function(){
    console.log("Server partito!");
})