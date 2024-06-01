const mysql = require('mysql2');
const express = require("express");
const app = express();
const cors = require("cors");
const {useState} = require("react");
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

app.post("/facilitiesRegist", async (req, res) => {
    await insertFacilities(req);

    const facilitiesNo = await maxFacilitiesNo();
    const playNo = await maxPlayNo();
    const surroundNo = await maxSurroundNo();

    await insertFacilitiesInfo(facilitiesNo, playNo, surroundNo);
})

async function insertFacilities(req) {
    conn.query('INSERT INTO facilities (mart, toilet) VALUES (?, ?)', [req.body.facilitiesDetail.facilities.mart, req.body.facilitiesDetail.facilities.toilet], (err) => {
        if (err) {
            console.log(err);
        }
    })

    conn.query('INSERT INTO play (playGround,singingRoom) VALUES (?, ?)', [req.body.facilitiesDetail.play.playGround, req.body.facilitiesDetail.play.singingRoom], (err) => {
        if (err) {
            console.log(err);
        }
    })

    conn.query('INSERT INTO surround (mountain, river) VALUES (?, ?)', [req.body.facilitiesDetail.surround.mountain, req.body.facilitiesDetail.surround.river], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

async function maxFacilitiesNo() {
    return new Promise((resolve, reject) => {
        conn.query('SELECT MAX(facilitiesNo) AS facilitiesNo FROM facilities', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(typeof result[0].facilitiesNo);
                resolve(parseInt(result[0].facilitiesNo));
            }
        })
    })
}

async function maxPlayNo() {
    return new Promise((resolve) => {
        conn.query('SELECT MAX(playNo) AS playNo FROM play', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                resolve(parseInt(result[0].playNo));
            }
        })
    })
}

async function maxSurroundNo() {
    return new Promise((resolve) => {
        conn.query('SELECT MAX(surroundNo) AS surroundNo FROM surround', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                resolve(parseInt(result[0].surroundNo));
            }
        })
    })
}

async function insertFacilitiesInfo(facilitiesNo, playNo, surroundNo) {
    conn.query('INSERT INTO facilitiesinfo (facilitiesNo, playNo, surroundNo) values (?,?,?)', [facilitiesNo, playNo, surroundNo], (err, result) => {
        if (err) {
            console.log(err);
        }
    })
}

app.post("/campingGroundRegist", (req, res) => {
    console.log(req.body);
    conn.query(
        `
            INSERT INTO campground (userNo, facilitiesInfoNo, mannerStartTime, mannerEndTime, campGroundImages, name,
                                    location, type, callNum, campingInfo, enterTime, leaveTime)
            SELECT ?,
                   MAX(facilitiesInfoNo),
                   ?,
                   ?,
                   ?,
                   ?,
                   ?,
                   ?,
                   ?,
                   ?,
                   ?,
                   ?
            FROM facilitiesinfo;
        `,
        [
            req.body.userNo, req.body.mannerStartTime, req.body.mannerEndTime, req.body.campGroundImages, req.body.name, req.body.location, req.body.type, req.body.callNum, req.body.campingInfo, req.body.enterTime, req.body.leaveTime
        ], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(true)
            }
        })
})

app.post("/getSiteList", (req, res) => {
    console.log(req.body.userNo);
    //받아올 row 설정
    conn.query("SELECT * FROM campground JOIN campgroundsite ON campground.campgroundNo = campgroundsite.campgroundNo WHERE userNo Like " + req.body.userNo, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result[0])
            res.send(result)
        }
    })
})

app.post("/siteRegist", (req, res) => {
    conn.query("INSERT INTO campgroundsite (siteNo, campGroundNo, campGroundImages, price, peopleNum, siteName) VALUES (?,?,?,?,?,?)",
        [req.body.siteNo, req.body.campGroundNo, req.body.campGroundImages, req.body.price, req.body.peopleNum, req.body.siteName],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(true);
            }
        })
})

app.listen(port, () => {
    console.log("start");
})


module.exports = conn;