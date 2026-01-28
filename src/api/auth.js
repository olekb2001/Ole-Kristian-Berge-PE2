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






/*
function for logging in existing user

this sends a post request to the login endpoint with the email and password.

if details are correct then the api returns user data including access token. 
this token is important because it proves the user 
is authenticated and will be used later when making protected requests.
*/
export async function loginTheUser(email, password){
    const response = await fetch(`${API_AUTH}/login?_holidaze=true`, {
        method: "POST",

        // tells the api that we are sending json data
        headers: { "Content-Type": "application/json" },

         // convert the email and password into json before sending
        body: JSON.stringify({
            email,
            password
        })
    });

    //convert the api response from json into a javascript object
    const json = await response.json();

    /*
    fetch does not automatically throw an error if login fails,
    so we must manually check if the response is ok.
    if not, we throw the error from the api so it can be shown on the page.
    */
    if(!response.ok){
        throw new Error(json.errors?.[0]?.message || "Login Failed")
    }
    return json.data;
}

