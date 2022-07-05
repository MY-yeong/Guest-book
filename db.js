const mysql = require("mysql");

const connection = mysql.createConnection( {
    host: 'localhost',
    user: 'minyeong3',
    password: '2022Wnsldj!',
    port: 3306,
    database: 'minyeong3'
});
connection.connect(function(err){
    if (err) console.log(err);
    else console.log('Connected!');
});
module.exports = connection;
