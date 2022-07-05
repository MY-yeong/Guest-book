const express = require('express');
const app = express();
const fs = require('fs');
const conn = require("./db.js");
app.set('view engine', 'ejs');

app.use('/', require('./main'));


app.listen(3000, function(){
    var dir = './upload';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    console.log('listening on 3012...');
});