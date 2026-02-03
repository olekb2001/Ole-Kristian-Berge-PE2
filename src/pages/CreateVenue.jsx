/*
this page lets venue managers create a new venue.

here the manager fills out a form with venue details
which will later be sent to the api to create the venue.
*/
import "./CreateVenue.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVenue } from "../api/venues";

export default function CreateVenue() {
  //used to redirect the user after successful creation
  const navigate = useNavigate();

  // state for all form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // state for amenities checkboxes
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  // holds any api error message
  const [error, setError] = useState("");
  /*
  This function runs when the form is submitted.

  It builds the correct structure expected by the api:
   meta obj for amenities, location object for city and country
  , media array for images
  */
  async function handleSubmit(e) {
    e.preventDefault();
    const meta = {
      wifi: wifi,
      parking: parking,
      pets: pets,
      breakfast: breakfast,
    };

    const location = {
      city: city,
      country: country,
    };
    try {
      const venueData = {
        name,
        description,
        media: imageUrl ? [{ url: imageUrl }] : [],
        price: Number(price),
        maxGuests: Number(maxGuests),
        meta,
        location,
      };
      // send the data to the api
      await createVenue(venueData);
      // redirect the user back to their venues dashboard
      navigate("/my-venues");
    } catch (error) {
      // display api error to the user
      setError(error.message);
    }
  }

  return (
    <div className="create-venue-page">
      <div className="create-venue-top">
        <h1 className="create-venue-title">Create New Venue</h1>
        <p className="create-venue-subtitle">
          Fill in the details below to publish your venue
        </p>
      </div>

      <div className="create-venue-layout">
        {/* left container*/}
        <form onSubmit={handleSubmit} className="create-venue-left">
          {error && <p>{error}</p>}
          <label>Venue Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="two-inputs">
            <div>
              <label>Pricing Per Night</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Maximum Guests</label>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
          </div>

          <div className="two-inputs">
            <div>
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <h3 className="amenities-title">Amenities</h3>
          <div className="amenities-row">
            <label>
              <input
                type="checkbox"
                checked={wifi}
                onChange={(e) => setWifi(e.target.checked)}
              />{" "}
              Wifi
            </label>
            <label>
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />{" "}
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                checked={pets}
                onChange={(e) => setPets(e.target.checked)}
              />{" "}
              Pets allowed
            </label>
            <label>
              <input
                type="checkbox"
                checked={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
              />{" "}
              Breakfast included
            </label>
          </div>

          <div className="create-venue-buttons">
            <button type="submit" className="create-venue-button">
              Create Venue
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => navigate("/my-venues")}
            >
              Cancel
            </button>
          </div>
        </form>

        {/*right cont*/}
        <div className="create-venue-right">
          <h3 className="images-title">Images</h3>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="button" className="add-image-button">
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
}
