/*               
This file contains all api calls related to venues.

instead of having to call fetch inside the components, i have stored the api logic 
in its seperate file. this makes it so components is cleaner and 
makes it easier to maintain and and reuse on different pages.
*/

// this is the url for holidaze api v2
const API_URL = "https://v2.api.noroff.dev/holidaze";

// here i fetch all the venues fromm the api
// the api v2 returns data inside { data: ... } so im accesing it through json.data
export async function getVenues() {
    try{
        const response = await fetch(`${API_URL}/venues`);
        const json = await response.json();
        return json.data;
    }
    catch(error){
        console.error("not found the venues", error);
        return[];
    }
}

// im fetching a single venue by the id from the url.
// this is used on the VenueDetails Page.
export async function findVenueId(id) {
    try{
        const response = await fetch(`${API_URL}/venues/${id}`);
        const json = await response.json();
        return json.data;
    }

    catch(error) {
        console.log("not able to find the venue", error);
        return null;
    }
}