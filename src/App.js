import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState([{
        userNo: 0,
        id: "",
        pw: "",
        userType: null
    }]);

    const [userNo, setUserNo] = useState("");
    const test = () => {
        axios.get('/test').then(res => {
            setData(res.data);
        })
    }

    const login = () => {
        console.log("dd");
        axios.post('/login', {id: "asdf", pw: "pwd"}).then(res => {
            {
                console.log(res.data);
                res.data.isLogin ? setUserNo(res.data.userNo) : setUserNo(null)
            }
        })
    }
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

    const [newCampingGround, setNewCampingGround] = useState({
        /*
        userNo: 0,
        facilitiesInfoNo: 0,
        mannerStartTime: null,
        mannerEndTime: null,
        campGroundImages: "",
        name: "",
        location: "",
        type: null,
        callNum: "",
        campingInfo: "",
        enterTime: null,
        leaveTime: null*/
        userNo: 2,
        facilitiesInfoNo: 1,
        mannerStartTime: new Date('22:00:00'),
        mannerEndTime: new Date('09:00:00'),
        campGroundImages: "",
        name:"Happy",
        location:"house",
        type: "CAMPING",
        callNum: "123",
        campingInfo: "Happy House",
        enterTime: new Date('12:00:00'),
        leaveTime: new Date('12:00:00')
    })
    const campingGroundRegist = () => {
        axios.post('/campingGroundRegist', newCampingGround).then(res => {
            console.log(res.data);
        })
    }
    return (
        <div>
            <button onClick={test}>getId</button>
            <div>
                userNo : {data[0].userNo}, id : {data[0].id}, pw : {data[0].pw}, userType: {data[0].userType}
            </div>
            <button onClick={login}>login</button>
            <div>
                userNo : {userNo}
            </div>
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
            <button onClick={campingGroundRegist}>test</button>
            <div>
                {newCampingGround.enterTime.toString()}
            </div>
        </div>
    );
}

export default App;
