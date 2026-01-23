const API_URL = "https://v2.api.noroff.dev/holidaze";

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