const mysql = require('mysql2');
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

//CORS 오류 해결
app.use(cors());

//데이터를 json 형태로 파싱
app.use(express.json());


const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'asdf15963',
    database: 'webproject'
})

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('Connect');
})

app.get("/test", (req, res) => {
    conn.query("SELECT * FROM login", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
app.post("/campingGroundRegist", (req, res) => {
    console.log(req.body);
    conn.query(
        `
            INSERT INTO campground (userNo, facilitiesInfoNo, mannerStartTime, mannerEndTime, campGroundImages, name,
                                    location, type, callNum, campingInfo, enterTime, leaveTime)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            req.body.userNo, req.body.facilitiesInfoNo, req.body.mannerStartTime, req.body.mannerEndTime, req.body.campGroundImages, req.body.name, req.body.location, req.body.type, req.body.callNum, req.body.campingInfo, req.body.enterTime, req.body.leaveTime
        ], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(true)
            }
        })
})
app.post("/sign_in", (req, res) => {
    conn.query(`INSERT INTO login (id, pw, userType)
                VALUES (?, ?, ?)`, [req.body.id, req.body.pw, req.body.userType], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(true);
        }

    })
})
app.post("/login", (req, res) => {
    conn.query("SELECT * FROM login", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            {
                console.log(req.body);

                req.body.id === result[0].id
                    ? res.send({
                        isLogin: true,
                        userNo: result[0].userNo
                    })
                    : res.send({
                        isLogin: false,
                        userId: null
                    })
            }

        }
    })
})

app.post("/facilitiesInfo", (req, res) => {
    conn.query('INSERT INTO facilitiesinfo (facilitiesNo, playNo, surroundNo) VALUES (?,?,?)', [req.body.facilitiesNo, req.body.playNo, req.body.surroundNo], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.post("/facilitiesInfo/facilities", (req, res) => {
    conn.query('INSERT INTO facilities (mart, toilet) VALUES (?, ?)', [req.body.mart, req.body.toilet], (err, result) => {
        if (err) {
            console.log(err);
        }
    })

    conn.query('SELECT MAX(facilitiesNo) AS facilitiesNo FROM facilities', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({facilitiesNo: result[0].facilitiesNo});
        }
    })
})

app.post("/facilitiesInfo/play", (req, res) => {
    conn.query('INSERT INTO play (playGround, singingRoom) VALUES (?,?)', [req.body.playGround, req.body.singingRoom], (err, result) => {
        if (err) {
            console.log(err);
        }
    })

    conn.query('SELECT MAX(playNo) AS playNo FROM play', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({playNo: result[0].playNo});
        }
    })
})

app.post("/facilitiesInfo/surround", (req, res) => {
    conn.query('INSERT INTO surround (mountain, river) VALUES (?,?)', [req.body.mountain, req.body.river], (err, result) => {
        if (err) {
            console.log(err);
        }
    })

    conn.query('SELECT MAX(surroundNo) AS surroundNo FROM surround', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({surroundNo: result[0].surroundNo});
        }
    })
})


app.listen(port, () => {
    console.log("start");
})


module.exports = conn;