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
    async function fixSubmit(event){
        event.preventDefault();

        try{
            await registerTheUser(name, email, password, venueManager);
            setMessage("User registered successfully. You can now log in.")
        }
        catch(error){
            setMessage("Something went wrong. Please try again");
        }
    }
    return(
        <div className="register-page">
            <h1 className="register-title">Register</h1>
            <p className="register-subtitle">Create an account to book venues or manage your own</p>

            <div className="register-card">
                <form onSubmit={fixSubmit} className="register-form">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                





                </form>



            </div>




        </div>
    )
    
}