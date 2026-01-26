//this is the base url for all of authentication requests
const API_AUTH = "https://v2.api.noroff.dev/auth";

/*
this function is responsible for regestering a new user in the noroffs api system.

It sends the required user information: name, email, password and whether the user
wants to be a venue manager, to the /register endpoint so the user can be created
before they are able to log in.

*/

export async function registerTheUser(name, email, password, venueManager){

    //this sends a post request to the /register endpoing with user details
    const response = await fetch(`${API_AUTH}/register`,{
        method: "POST",

        //this tells the api that we are sending json data
        headers: {"Content-Type": "application/json"},

        //convert the javascript object into a json string
        body: JSON.stringify({
            name, 
            email,
            password,
            venueManager
        })
    });
    //convert the resposne from json into javascript object 
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message || "Registration failed");
    }

    //returning the data inside the "data" property
    return json.data;
}

export async function loginTheUser(){
    
}

