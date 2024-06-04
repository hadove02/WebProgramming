import axios from "axios";

export default function PostReview(postReview) {
    function onClick() {
        axios.post("/postReview", postReview).then((res) => {
        })
    }

    return <div>
        <button onClick={onClick}>postReview</button>
    </div>
}