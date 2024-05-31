import axios from "axios";

export default function SiteList({campInfo}){
    function getSiteList(){
        console.log(campInfo)
        axios.post("/getSiteList",campInfo).then((res) => {
            //res.data 가공
            console.log(res.data);
        })
    }
    return<div>
        <button onClick={getSiteList}>Get Site List</button>
    </div>
}