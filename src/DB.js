const mysql = require('mysql2');
const express = require("express");
const app = express();
const cors = require("cors");
const port= 5000;


const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'asdf159633',
    database: 'webproject'
})

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('Connect');
})

app.use(cors());

app.get("/test", (req, res) => {
    conn.query("SELECT * FROM login", (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.listen(port, () => {
    console.log("start");
})


module.exports = conn;