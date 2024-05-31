import FacilitiesCheckBox from "./FacilitiesCheckBox";

export default function PrintFacilities({facilitiesDetail,setFacilitiesDetail}) {

    const facilities = [
        {type: "facilities", list: ["mart", "toilet"]},
        {type: "play", list: ["playGround", "singingRoom"]},
        {type: "surround", list: ["mountain", "river"]}]

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
    </div>
}