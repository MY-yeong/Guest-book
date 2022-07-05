var express = require('express');
var router = express.Router();
const path = require('path');

var appRoot = process.env.PWD;
var uploadPath = path.join(appRoot, "upload");

router.get('/', function(req, res){
    res.render("index");
});

router.get('/download', function(req,res){
    const file = './upload';
    console.log(file);
    res.download(file);
});

module.exports = router;

