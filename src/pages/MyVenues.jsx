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
        <h1 className="my-venues-title">My Venues</h1>
        <p className="my-venues-subtitle">
          Manage your venues and view bookings
        </p>
      </div>
      {/* create nww venue button*/}
      <div className="my-venues-actions">
        <Link to={"/create-venue"} className="create-venue-button">
          Create New Venue
        </Link>
      </div>
    </div>
  );
}
