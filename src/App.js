import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState([{
        userNo:1,
        id: "",
        pw: "",
        userType: null
    }]);

    const test = () => {
        axios.get('/test').then(res => {
            setData(res.data);
        })
    }

    return (
        <div>
            <button onClick={test}>getId</button>
            <br/>
            userNo : {data[0].userNo}, id : {data[0].id}, pw : {data[0].pw}, userType: {data[0].userType}
        </div>
    );
}

export default App;
