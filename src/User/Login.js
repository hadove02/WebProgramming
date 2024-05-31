import axios from "axios";
import {useState} from "react";

const [userNo, setUserNo] = useState("");


const login = () => {
    console.log("dd");
    axios.post('/login', {id: "asdf", pw: "pwd"}).then(res => {
        {
            console.log(res.data);
            res.data.isLogin ? setUserNo(res.data.userNo) : setUserNo(null)
        }
    })
}