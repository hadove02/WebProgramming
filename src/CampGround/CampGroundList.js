import axios from "axios";

export default function CampGroundList(campGroundNo) {

    function onClick() {
        console.log("dd");
        axios.post("/campGroundList", campGroundNo).then((res) => {
            console.log(res.body);
        })
    }

    return <div>
        <button onClick={onClick}>campGroundList</button>
    </div>
}