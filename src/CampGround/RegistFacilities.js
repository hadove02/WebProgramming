import {useState} from "react";
import FacilitiesCheckBox from "./FacilitiesCheckBox";
import axios from "axios";

export default function RegistFacilities() {
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

    const facilities = [
        {type: "facilities", list: ["mart", "toilet"]},
        {type: "play", list: ["playGround", "singingRoom"]},
        {type: "surround", list: ["mountain", "river"]}]

    const registFacilities = () => {
        console.log(facilitiesDetail)
        axios.post("/facilitiesRegist", {facilitiesDetail}).then((res) => {
            console.log(res.data);
        })
    }
    return <div>
        {
            facilities.map((facility) => {
                return (
                    <>
                        <div>{facility.type}</div>
                        {facility.list.map((list) => {
                            return <FacilitiesCheckBox key={list} info={{name: list, type: facility.type}}
                                                       facilitiesDetail={facilitiesDetail}
                                                       setFacilitiesDetail={setFacilitiesDetail}></FacilitiesCheckBox>
                        })}
                    </>
                );
            })
        }
        <button onClick={() => {
            registFacilities()
        }}>submit
        </button>
    </div>
}