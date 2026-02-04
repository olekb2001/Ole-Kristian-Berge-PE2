/*               
This file contains all api calls related to venues.

instead of having to call fetch inside the components, i have stored the api logic 
in its seperate file. this makes it so components is cleaner and 
makes it easier to maintain and and reuse on different pages.
*/

// this is the url for holidaze api v2
const API_URL = "https://v2.api.noroff.dev/holidaze";

// Fetch all venues from the api and sort them by rating
export async function getVenues() {
  try {
    //get all venues
    const response = await fetch(`${API_URL}/venues`);
    const json = await response.json();
    const venues = json.data;

    //sort so highest rated venues come first
    venues.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return venues;
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

/*
This function deletes a venue created by the logged in venue manager.

Because deleting a venue is a protected action, the user must be logged in
and we must send both the access token and the Noroff api key in the headers.

It receives the id of the venue we want to delete from the MyVenues page.
*/

export async function deleteVenue(id) {
  // here i get the logged in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("You must be logged in");
  }
  const accessToken = user.accessToken;

  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  const response = await fetch(`${API_URL}/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete venue");
  }
}

// Update an existing venue using its id
// This is used on the EditVenue page when a venue manager saves changes
export async function updateVenue(id, venueData) {
   // get the logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

   // block the request if no user is logged in
  if (!user) {
    throw new Error("You must be logged in");
  }
   // send PUT request to update the venue
  const response = await fetch(`${API_URL}/venues/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
     // send the updated venue data to the api..
    body: JSON.stringify(venueData),
  });

  // convert the response into js object
  const json = await response.json();

   // if something went wrong, show api error message
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to update venue");
  }
  // return the updated venue
  return json.data;
}
