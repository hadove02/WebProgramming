import {useState} from "react";
import axios from "axios";

const [newUser, setNewUser] = useState({
    id: "",
    pw: "",
    userType: null
})

const sign_in = () => {
    axios.post('/sign_in', newUser).then(res => {
            console.log(res.data);
        }
    )
}

export default function Signin() {
    return <div>
        <button onClick={sign_in}>sign_in</button>
        <input type="text" onChange={(e) => {
            setNewUser({...newUser, id: e.target.value})
        }}
        />
        <input type="text" onChange={(e) => {
            setNewUser({...newUser, pw: e.target.value})
        }}/>
        <input type="text" onChange={(e) => {
            setNewUser({...newUser, userType: e.target.value})
        }}/>
    </div>
}