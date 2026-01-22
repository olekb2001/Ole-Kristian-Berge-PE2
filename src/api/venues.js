export async function getVenues() {
    try{
        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        const data = await response.json;
        return data;
    }
    catch(error){
        console.error("not found the venues", error);
        return [];
    }
}