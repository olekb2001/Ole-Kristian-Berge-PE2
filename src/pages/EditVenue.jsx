import { useParams } from "react-router-dom"


export default function EditVenue() {
    const {id} = useParams();
    return(
        <h2>hello wold editing venue with id {id}</h2>
    )
}