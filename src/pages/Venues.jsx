/*     
this page displayes all of the venues that are from the api.

when the component has mounted, it fetches the venues and store them in "state".
then the venues are displyed using the venuecard component.
 */
import VenueCard from "../components/VenueCard";
import "./Venues.css";
import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";

export default function Venues() {
  //this holds the list of venues tht is fetched from the api
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    //runs once when the page loads
    // fetches venues and saves them into state
    async function loadTheVenues() {
      const data = await getVenues();
      setVenues(data);
    }
    loadTheVenues();
  }, []);

  return (
    <div className="venues-page">
      <h1 className="venues-title">Venues</h1>
      <p className="venues-subtitle">Browse all available venues</p>

      <input type="text" placeholder="Enter Text..." className="venue-search" />

      <h2 className="all-venues-title">All Venues</h2>

      <div className="venues-grid">
        {/* loops through the venues and shows just one card per venue*/}
        {venues?.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
