import axios from "axios";

export default function ReservationSite(reservationSite){
    function onClick(){
        axios.post("/reservationSite",reservationSite).then((res)=>{

        })
    }

    return<div>
        <button onClick={onClick}>reservationSite test</button>
    </div>
}