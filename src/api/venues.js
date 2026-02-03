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
  try {
    const response = await fetch(`${API_URL}/venues`);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("not found the venues", error);
    return [];
  }
}

// im fetching a single venue by the id from the url.
// this is used on the VenueDetails Page.
export async function findVenueId(id) {
  try {
    const response = await fetch(`${API_URL}/venues/${id}?_bookings=true`);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log("not able to find the venue", error);
    return null;
  }
}

/*
This function sends a request to the api to create a new venue.

It receives a fully prepared venueData object from the createvenue page
and sends it to the protected /venues endpoint.

Because this is a protected endpoint, the user must be logged in and
i must include both the accesstoken and the noroff api key in the headers.
*/
export async function createVenue(venueData) {
  // get the logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // block the request if no user is logged in
  if (!user) {
    throw new Error("You must be logged in");
  }
  // extract the access token used to authorize the request
  const accessToken = user.accessToken;

  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  // send POST request to create a new venue
  const response = await fetch(`${API_URL}/venues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    // convert the venueData object into json before sending
    body: JSON.stringify(venueData),
  });
  // convert the response into a JavaScript object
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to create venue");
  }
  // return the created venue data
  return json.data;
}



export async function deleteVenue(){
  const user = JSON.parse(localStorage.getItem("user"));
  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  const response = await fetch(`${API_URL}/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete venue");
  }
}