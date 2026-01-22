export async function getVenues() {
    try{
        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error("not found the venues", error);
        return[];
    }
}



export async function findVenueId(id) {
    try{
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        const data = await response.json();
        return data;
    }

    catch(error) {
        console.log("not able to find the venue", error);
        return null;
    }
}