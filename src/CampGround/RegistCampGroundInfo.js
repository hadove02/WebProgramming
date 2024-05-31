import axios from "axios";
import {useState} from "react";

export default function RegistCampGround() {


    const [campGroundInfos, setCampGroundInfos] = useState({
        userNo: 1,
        facilitiesInfoNo: 1,
        mannerStartTime: null,
        mannerEndTime: null,
        campGroundImages: JSON.stringify(["1","2"]),
        name: "",
        location: "",
        type: null,
        callNum: "",
        campingInfo: "",
        enterTime: null,
        leaveTime: null
    })

    function registCampGroundInfo(){
        console.log(campGroundInfos);

        axios.post('/campingGroundRegist', campGroundInfos).then(res => {
            console.log(res.data);
        })
    }
    const setCampGroundInfo = (type, value) => {
        setCampGroundInfos({
            ...campGroundInfos, [type]: value
        })
    }

    return <div>
        <label><input type="time" onChange={(e) => setCampGroundInfo("mannerStartTime", e.target.value)
        }/>매너 시작 시간<br/></label>
        <label><input type="time" onChange={(e) => setCampGroundInfo("mannerEndTime", e.target.value)}/>매너 종료
            시간<br/></label>
        <label><input type="image"/>대표 이미지<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfo("name", e.target.value)}/>캠핑장 이름<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfo("location", e.target.value)}/>캠핑장 위치<br/></label>
        <label><input type='text' onChange={(e)=> setCampGroundInfo("type",e.target.value)}/>캠핑장 타입<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfo("callNum", e.target.value)}/>캠핑장 대표번호<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfo("campingInfo", e.target.value)}/>캠핑장
            설명<br/></label>
        <label><input type='time' onChange={(e) => setCampGroundInfo("enterTime", e.target.value)}/>캠핑장 입실
            시간<br/></label>
        <label><input type='time' onChange={(e) => setCampGroundInfo("leaveTime", e.target.value)}/>캠핑장 퇴실
            시간<br/></label>
        <button onClick={registCampGroundInfo}>submit</button>
    </div>
}