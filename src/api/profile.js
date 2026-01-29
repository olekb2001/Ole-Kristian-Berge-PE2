const API_URL = "https://v2.api.noroff.dev/holidaze";

export async function getMyBookings(){
    // get logged in user from locStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        throw new error("You must be logged in");
    }

    const accessToken = user.accessToken;
    const name = user.name;
}