/* this file includes api calls related to creating bookings

instead of calling fetch inside components i store the booking logic here to keep components cleaner
and make the code easier to reuse and maintain
*/

// base url
const API_URL = "https://v2.api.noroff.dev/holidaze";

/*
This function creates a new booking for a venue.

It sends:
the start date (dateFrom),the end date (dateTo),number of guests,
the id of the venue the user wants to book

This is a protected endpoint, so i must send:
the user's accessToken , the api key in the headers
*/
export async function createBooking(dateFrom, dateTo, venueId) {
  // get the logged in user froma localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    throw new Error("You must be logged in in to make a bookings");
  }

  // get access token from the user
  const accessToken = user.accessToken;

  //api key
  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      dateFrom,
      dateTo,
      guests: 1,
      venueId,
    }),
  });
  const json = await response.json();
  if(!response.ok){
    throw new Error(json.errors?.[0]?.message || "Booking failed")
  }
  return json.data;
}
