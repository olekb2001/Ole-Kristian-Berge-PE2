import { useState } from "react"
import { registerTheUser } from "../api/auth"

export default function Register(){
    // here i store form inputs in state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassord] = useState("");
    const [venueManager, setVenueManager] = useState(false);

    //message shows after submit
    const [message, setMessage] = useState("");

    // this runs when the form is submitted
    
}