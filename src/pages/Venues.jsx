/*     
This page shows all venues from the API.

When the component loads, we fetch all venues once and store them in state.
after that, we manually split the venues into pages (20 per page).
Each venue is displayed using the VenueCard component.
 */
import VenueCard from "../components/VenueCard";
import "./Venues.css";
import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";

export default function Venues() {
  // stores all venues fetched from the API
  const [venues, setVenues] = useState([]);

  // keeps track of which page the user is currently viewing
  const [page, setPage] = useState(1);

  // how many venues we want to show on each page
  const limitPage = 20;

  useEffect(() => {
     // runs once when the page loads
    // fetches all venues and saves them into state
    async function loadTheVenues() {
      const data = await getVenues();
      setVenues(data);
    }
    loadTheVenues();
  }, []);

  // calculate which venues belong to the current page
  const start = (page - 1) * limitPage;
  const end = start + limitPage;

  const currentVenues = venues.slice(start, end);

  // calculate how many pagination buttons we need
  const totalPages = Math.ceil(venues.length / limitPage);

  return (
    <div className="venues-page">
      <h1 className="venues-title">Venues</h1>
      <p className="venues-subtitle">Browse all available venues</p>

      <input type="text" placeholder="Enter Text..." className="venue-search" />

      <h2 className="all-venues-title">All Venues</h2>

      <div className="venues-grid">
        {/* loops through the venues and shows just one card per venue*/}
        {currentVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      {/* pagination buttons so the user can move between pages */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
