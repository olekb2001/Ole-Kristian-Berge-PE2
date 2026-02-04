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

  // stores what the user types in the search bar
  const [search, setSearch] = useState("");

  useEffect(() => {
    // runs once when the page loads
    // fetches all venues and saves them into state
    async function loadTheVenues() {
      const data = await getVenues();
      setVenues(data);
    }
    loadTheVenues();
  }, []);

  // filter venues based on search text fecs name, city, country
  const allMyFilteredVenues = venues.filter((venue) =>
    `${venue.name} ${venue.location?.city} ${venue.location?.country}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // calculate which venues belong to the current page
  const start = (page - 1) * limitPage;
  const end = start + limitPage;

  const currentVenues = allMyFilteredVenues.slice(start, end);

  // calculate how many pagination buttons we need
  const totalPages = Math.ceil(allMyFilteredVenues.length / limitPage);

  //reusable pagination block
  function Pagination({ totalPages, page, setPage }) {
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setPage(index + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={page === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="venues-page">
      <h1 className="venues-title">Venues</h1>
      <p className="venues-subtitle">Browse all available venues</p>

      <input
        type="text"
        placeholder="Enter Text..."
        className="venue-search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          // go back to page 1 when searching
          setPage(1);
        }}
      />

      <h2 className="all-venues-title">All Venues</h2>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />

      <div className="venues-grid">
        {/* loops through the venues and shows just one card per venue*/}
        {currentVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      {/* pagination buttons so the user can move between pages */}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
}
