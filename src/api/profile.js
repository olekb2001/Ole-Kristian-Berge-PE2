/* 
This file contains api calls related to the logged in user's profile.

Here we fetch all bookings that the user has made.

We include _venue=true so we also get the venue details
(image, name, price etc) together with the booking.
*/

const API_URL = "https://v2.api.noroff.dev/holidaze";

export async function getMyBookings() {
  // get logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("You must be logged in");
  }

  const accessToken = user.accessToken;
  const name = user.name;

  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  const response = await fetch(
    `${API_URL}/profiles/${name}/bookings?_venue=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    },
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to fetch bookings");
  }
  return json.data;
}

// This function updates the avatar of the logged in user.
export async function updateAvatar(avatarUrl) {
  // get logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // block request if no user is logged in
  if (!user) {
    throw new Error("You must be logged in");
  }
  const accessToken = user.accessToken;
  const name = user.name;

  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  const response = await fetch(`${API_URL}/profiles/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      avatar: {
        url: avatarUrl,
      },
    }),
  });
  const json = await response.json();
  // if request fails , show api error msg
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to update avatar");
  }
  return json.data;
}

// This function fetches the full profile of a user right after login.
// It does NOT read from localStorage because the complete user is not stored yet.
// We use the name and accessToken returned from loginTheUser
// to fetch the avatar before saving the final user object.
export async function getProfile(name, accessToken) {
  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  // request the users profile from the api
  const response = await fetch(`${API_URL}/profiles/${name}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });
  const json = await response.json();
  // if request fais, show api error message
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to fetch profile");
  }
  return json.data;
}

export async function getMyVenues() {
  //get logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // block request if no user is logged in
  if (!user) {
    throw new Error("You must be logged in");
  }

  const accessToken = user.accessToken;
  const name = user.name;

  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  // request all venues owned by this user
  const response = await fetch(
    `${API_URL}/profiles/${name}/venues?_bookings=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    },
  );

  const json = await response.json();

  //if request fails, show api error message
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to fetch venues");
  }

  return json.data;
}

export async function createVenue(venueData) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("You must be logged in");
  }
  const accessToken = user.accessToken;

  const API_KEY = "8b715995-ffb8-4b82-9fb9-20a5d580c2d2";

  const response = await fetch(`${API_URL}/venues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venueData),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to create venue");
  }
  return json.data;
}
