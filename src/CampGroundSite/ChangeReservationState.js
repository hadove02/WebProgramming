import axios from "axios";

export default function ChangeReservationState({reservationNo}) {
    function changeState(reservationNo) {
        axios.post("/changeReservationState", {reservationNo})

    }

    return <div>
        <button onClick={() => changeState(reservationNo)}>changeState</button>
    </div>
}