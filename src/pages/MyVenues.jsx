import { useEffect, useState } from "react";
import { getMyVenues } from "../api/profile";
import { Link } from "react-router-dom";
import "./MyVenues.css";
/*
this page is the dashboard for venue managers.

here i fetch all venues owned by the logged in user
and display them as cards with buttons and actions.
*/
export default function MyVenues() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMyVenues() {
      try {
        const data = await getMyVenues();
        setVenues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadMyVenues();
  }, []);

  // while venues are loading from the api
  if (loading) return <p>Loading your venues...</p>;
  // show error if something went wrong
  if (error) return <p>{error}</p>;

  return (
    <div className="my-venues-page">
      <div className="my-venues-top">
        <div>
          <h1 className="my-venues-title">My Venues</h1>
          <p className="my-venues-subtitle">
            Manage your venues and view bookings
          </p>
        </div>
        <Link to="/create-venue" className="create-venue-button-1">
          Create New Venue
        </Link>
      </div>

      <div className="my-venues-list">
        {venues.length === 0 && <p>You have not created any venues yet</p>}
        {venues.map((venue) => (
          <div key={venue.id} className="my-venue-card">
            <div className="my-venue-image">
              {venue.media?.[0]?.url && (
                <img src={venue.media[0].url} alt={venue.name} />
              )}
            </div>

            <div className="my-venue-info">
              <h2>{venue.name}</h2>
              <p>
                {venue.location?.city}, {venue.location?.country}
              </p>
              <p className="my-venue-price">${venue.price} / night</p>
            </div>

            <div className="my-venue-actions">
              <Link to={`/venues/${venue.id}`} className="view-bookings-btn">
                View Bookings
              </Link>
              <Link to={`/edit-venue/${venue.id}`} className="edit-venue-btn">
                Edit Venue
              </Link>
              <button className="delete-venue-btn">Delete Venue</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
