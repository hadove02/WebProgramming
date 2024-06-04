import axios from "axios";

export default function MySiteList(userNo){
    function onClick(){
        axios.post("/mySiteList",userNo).then((res)=>{
            console.log(res.data);
        })
    }

    return <div>
        <button onClick={onClick}>MySiteList test</button>
    </div>
}