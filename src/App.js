import './App.css';
import {useState} from "react";
import axios from "axios";
import RegistFacilities from "./CampGround/RegistFacilities";
import RegistCampGround from "./CampGround/RegistCampGroundInfo";
import SiteList from "./CampGroundSite/SiteList";
import RegistSite from "./CampGroundSite/RegistSite";
import ReservationList from "./CampGroundSite/ReservationList";

function App() {

    const [data, setData] = useState([{
        userNo: 0,
        id: "",
        pw: "",
        userType: null
    }]);

    const [timeTest, setTimeTest] = useState();

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
            leaveTime: null
            */
            userNo: 2,
            facilitiesInfoNo: 1,
            mannerStartTime: new Date('2020-05-01 22:00:00').toISOString().slice(0, 19).replace('T', ' '),
            mannerEndTime: new Date('2020-05-01 09:00:00').toISOString().slice(0, 19).replace('T', ' '),
            campGroundImages: '["a","b","c"]',
            name: "Happy",
            location: "house",
            type: "CAMPING",
            callNum: "123",
            campingInfo: "Happy House",
            enterTime: new Date('0001-01-01 22:00:00').toISOString().slice(0, 19).replace('T', ' '),
            leaveTime: new Date('0001-01-01 22:00:00').toISOString().slice(0, 19).replace('T', ' ')
        }
    )

    const [facilities, setFacilities] = useState({
            play: 0,
            surround: 0,
            facilities: 0
        }
    )

    const [facilitiesDetail, setFacilitiesDetail] = useState({
        facilities: {
            facilitiesNo: 0,
            mart:
                false,
            toilet:
                false
        },
        play: {
            playNo: 0,
            playGround:
                false,
            singingRoom:
                false
        },
        surround: {
            surroundNo: 0,
            mountain:
                false,
            river:
                false
        }
    })

    const playRegist = () => {
        axios.post('/facilitiesInfo/play').then(res => {
            setFacilities({...facilities, play: res.data.playNo});
        })
    }

    const surroundRegist = () => {
        axios.post('/facilitiesInfo/surround').then(res => {
            setFacilities({...facilities, surround: res.data.surroundNo});
        })
    }

    const facilitiesRegist = () => {
        axios.post('/facilitiesInfo/facilities').then(res => {
            setFacilities({...facilities, facilities: res.data.facilitiesNo});
        })
    }

    const dd = () => {
        axios.post('/facilitiesInfo/facilities', facilitiesDetail.facilities).then(res => {
            console.log("facilitiesNo" + res.data.facilitiesNo)
            setFacilitiesDetail({
                ...facilitiesDetail,
                facilities: {...facilitiesDetail.facilities, facilitiesNo: res.data.facilitiesNo}
            })
            console.log(facilitiesDetail.facilities)
        })

        axios.post('/facilitiesInfo/play', facilitiesDetail.play).then(res => {
            console.log("playNo" + res.data.playNo)
            setFacilitiesDetail({
                ...facilitiesDetail,
                play: {...facilitiesDetail.play, playNo: res.data.playNo}
            })
        })

        axios.post('/facilitiesInfo/surround', facilitiesDetail.surround).then(res => {
            const surroundNo = res.data.surroundNo;

            console.log("surroundNo" + surroundNo)
            setFacilitiesDetail({
                ...facilitiesDetail,
                surround: {...facilitiesDetail.surround, surroundNo: surroundNo}
            })
        })
    }

    const facilitiesInfoRegist = () => {
        console.log("dd");
        console.log(facilitiesDetail);


    }

    function campingGroundRegist(object) {
        axios.post('/campingGroundRegist', object).then(res => {
            console.log(res.data);
        })
    }

    return <div>
        <RegistCampGround></RegistCampGround>
        <RegistFacilities></RegistFacilities>
        <SiteList campInfo={{campGroundNo: 8, userNo: 1}}></SiteList>
        <RegistSite></RegistSite>
        <ReservationList userNo={1}></ReservationList>

    </div>
}

export default App;
