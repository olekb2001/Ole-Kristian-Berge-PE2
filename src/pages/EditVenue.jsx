import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { findVenueId, updateVenue } from "../api/venues";
import "./CreateVenue.css"; // im just reusing styling from createpage

export default function EditVenue() {
  // get venue id from url
  const { id } = useParams();
  const navigate = useNavigate();

  //form state same as the createvenue
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // load existing venue data into the form when page opens
  useEffect(() => {
    async function loadVenue() {
      try {
        const venue = await findVenueId(id);

        // pre fill the form with my existing data
        setName(venue.name);
        setDescription(venue.description);
        setPrice(venue.price);
        setMaxGuests(venue.maxGuests);
        setImageUrl(venue.media?.[0]?.url || "");

        setCity(venue.location?.city || "");
        setCountry(venue.location?.country || "");

        setWifi(venue.meta?.wifi || false);
        setParking(venue.meta?.parking || false);
        setPets(venue.meta?.pets || false);
        setBreakfast(venue.meta?.breakfast || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadVenue();
  }, [id]);

  // send updated venue data to the api..
  async function handleSubmit(e) {
    e.preventDefault();

    const venueData = {
      name,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests),
      media: imageUrl ? [{ url: imageUrl }] : [],
      location: {
        city,
        country,
      },
      meta: {
        wifi,
        parking,
        pets,
        breakfast,
      },
    };

    try {
      await updateVenue(id, venueData);
      navigate("/my-venues"); // here i go back after save
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="create-venue-page">
      <div className="create-venue-top">
        <h1 className="create-venue-title">Edit Venue</h1>
        <p className="create-venue-subtitle">
          Fill in the details below to edit your venue
        </p>
      </div>

      <div className="create-venue-layout">
        {/* left side*/}
        <form onSubmit={handleSubmit} className="create-venue-left">
          {error && <p>{error}</p>}

          <label>Venue Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

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
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label>Country</label>
              <input
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
              />
              Wifi
            </label>

            <label>
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
              Parking
            </label>

            <label>
              <input
                type="checkbox"
                checked={pets}
                onChange={(e) => setPets(e.target.checked)}
              />
              Pets allowed
            </label>

            <label>
              <input
                type="checkbox"
                checked={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
              />
              Breakfast included
            </label>
          </div>

          <div className="create-venue-buttons">
            <button type="submit" className="create-venue-button">
              Save Changes
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

        {/* images */}
        <div className="create-venue-right">
          <h3 className="images-title">Images</h3>

          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button type="button" className="add-image-button">
            Update Image
          </button>
        </div>
      </div>
    </div>
  );
}
