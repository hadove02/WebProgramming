export default function FacilitiesCheckBox({info, facilitiesDetail, setFacilitiesDetail}) {
    return <div>
        <label><input type="checkbox" onChange={(e) => {
            setFacilitiesDetail({
                ...facilitiesDetail, [info.type] : {...facilitiesDetail[info.type], [info.name]: e.target.checked}
            })
        }}></input>{info.name}</label>
    </div>
}