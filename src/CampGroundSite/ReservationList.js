import axios from "axios";
import {useState} from "react";

export default function ReservationList(userNo) {
    const [reservationLists, setReservationLists] = useState([]);

    function reservationList(userNo) {
        axios.post("/reservationList", userNo).then((res) => {
            setReservationLists(res.data);
            console.log(res.data);
        })
    }

    return <div>
        <button onClick={() => reservationList(userNo)}>test</button>
        {reservationLists.map((reservation) => (
            console.log(reservationLists),
            <div>{reservation.reservationNo}</div>
        ))}
    </div>

}