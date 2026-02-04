import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import VenueCard from "../components/VenueCard";
import "./Home.css"

export default function Home() {
  const [venues, setVenues] = useState([]);

  //fetch venues when the page loads
  useEffect(() => {
    async function loadVenues() {
      const data = await getVenues();
      setVenues(data.slice(0, 3)); // here i only show the first 3
    }
    loadVenues();
  }, []);

  return (
    <div className="home-page">
      {/*  top sect */}
      <div className="home-hero">
        <h1 className="venues-title">Find Your Perfect Holiday Stay</h1>
        <p className="venues-subtitle">
          Browse unique venues and book your next getaway
        </p>
      </div>

      {/* popular venues*/}
      <h2 className="all-venues-title popular-title">Popular venues</h2>

      <div className="venues-grid">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
