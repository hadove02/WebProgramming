import axios from "axios";
import {useState} from "react";

export default function RegistSite() {
    const [siteInfos, setSiteInfos] = useState({
        siteNo: 0,
        campGroundNo: 13,
        campGroundImages: JSON.stringify(),
        price: 0,
        peopleNum: 0,
        siteName: ""
    })

    function registSite() {
        axios.post("/siteRegist", siteInfos).then((res) => {
            console.log(res.data);
        })
    }

    function setSiteInfo(type, value){
        setSiteInfos({...siteInfos,[type]:value})
    }

    return <div>
        <label><input type="text" onChange={(e) => {
            setSiteInfo("siteNo",parseInt(e.target.value))
        }}/>사이트 번호 <br/> </label>
        <label><input type="type" onChange={(e) => {
            setSiteInfo("price", parseInt(e.target.value))
        }}/>가격 <br/> </label>
        <label><input type="text" onChange={(e) => {
            setSiteInfo("peopleNum", parseInt(e.target.value))
        }}/> 최대 인원수 <br/> </label>
        <label><input type="text" onChange={(e) => {
            setSiteInfo("siteName", e.target.value)
        }}/>사이트 이름 <br/> </label>
        <button onClick={registSite}>regist</button>
    </div>
}