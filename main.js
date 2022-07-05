var express = require('express');
var router = express.Router();
var multer = require('multer');
const conn = require("./db.js");


var storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'upload/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}__${file.originalname}`);
    },
});


var upload = multer({ dest: 'upload/'});

var uploadWithOriginalFilename = multer({ storage: storage});

router.get("/", function (req, res) {
    var sql = "SELECT * FROM memo order by seq desc";
    conn.query(sql, function(err, rows) {
        if (err) console.log("query is not excuted. select fail!\n" + err);
        else res.render(__dirname +"/views/memo.ejs", {list: rows });
    });
});



router.post('/uploadFileWithOriginalFileName', uploadWithOriginalFilename.single('attachment'), function(req,res){
    console.log( req.body );
  
    var ti = req.body.title;
    var con = req.body.content;
    var na = req.body.name;
   // var fil=req.file.filename;
    var sql = "INSERT INTO memo(title, content, name) VALUES (?,?,?)";
    var params =[ti, con, na];
    
    conn.query(sql, params, function(err, rows){
        if (err) console.log("query is not excuted. modify fail!\n" + err);
        else res.render(__dirname + "/views/upload.ejs", {file:req.file, files:null});
    })



});

router.get("/write",  function(req, res){
    res.render(__dirname +"/views/upload.ejs");
});

router.post( "/write", function ( req, res ) {
    console.log( req.body );
  
    var ti = req.body.title;
    var con = req.body.content;
    var na = req.body.name;
    //var fil=req.body.attachment;
    //console.log(req.file);
    var sql = "INSERT INTO memo(title, content, name) VALUES (?,?,?)";
    var params =[ti, con, na, fil];
    
    conn.query(sql, params, function(err, rows){
        if (err) console.log("query is not excuted. modify fail!\n" + err);
        else res.redirect("/");
    })

});


router.get("/modify/:seq", function(req, res){
    var num = req.params.seq;
    console.log(num);
    res.render(__dirname +"/views/upload.ejs");
});

router.post( "/modify/:seq", function ( req, res ) {
    console.log( req.body );
    
    var num = req.params.seq;
    console.log(num);
    const ti = req.body.title;
    console.log(ti);
    const con = req.body.content;
    console.log(con);
    const na = req.body.name;
    console.log(na);
    
    var sql= "update memo set title=?, content=?, name=? where seq=?";
    var params =[ti, con, na, num];
    
    conn.query(sql, params, function(err, rows){
        if (err) console.log("query is not excuted. modify fail!\n" + err);
        else res.redirect("/");
    })

});

router.get("/delete/:seq", function(req, res){
    var num = req.params.seq;
    console.log(num);
    var sql = "delete from memo where seq=?";
    var params=[num];

    conn.query(sql, params, function(err, rows){
        if (err) console.log("query is not excuted. modify fail!\n" + err);
        else res.redirect("/");
    })

});


router.get("/download/:file", function(req,res){
  
    var noo = req.params.file;
    var file = './upload/'+noo;

    console.log(file);
    res.download(file);

});

module.exports = router;
