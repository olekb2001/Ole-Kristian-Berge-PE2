import { useState } from "react"
import { registerTheUser } from "../api/auth"
/*
this page allowes new users to create an account.

the form on this page collects the users 
-name
-email
-password 
-and whether you are a venue manager or not

when the form is submitted, the data is sent to the Noroff api 
using the registerTheUser function from api/auth.
*/

export default function Register(){
    // here i store form inputs in state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [venueManager, setVenueManager] = useState(false);

    //message shows after submitting the form
    const [message, setMessage] = useState("");

    /*
    this function runs when the form is submitted.
    it prevents the page from reloading and sends data to the api, 
    and shows a sucsess message or error message if something goes wrong.
    */
    async function handleSubmit(event){
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
                <form onSubmit={handleSubmit} className="register-form">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="name@stud.noroff.no"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small>Must be a stud.noroff.no email address</small>

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <small>Minimum 8 characters</small>

                    <label>Account Type</label>
                    <div className="account-type">
                        <label>
                            <input
                                type="radio"
                                name="accountType"
                                checked={!venueManager}
                                onChange={() => setVenueManager(false)}
                            
                            />
                            Customer
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="accountType"
                                checked={venueManager}
                                onChange={() => setVenueManager(true)}
    
                            />
                            Venue Manager
                        </label>
                    </div>
                    <button type="submit" className="register-button">Register</button>
                    <p className="login-link">Have an account? <a href = "/login">Login</a></p>

                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    )
    
}