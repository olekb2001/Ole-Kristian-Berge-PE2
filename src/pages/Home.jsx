import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import VenueCard from "../components/VenueCard";

export default function Home(){
  const [venues, setVenues] = useState([]);

  //fetch venues when the page loads 
  useEffect(() => {
    async function loadVenues(){
      const data = await getVenues();
      setVenues(data.slice(0, 3)); // here i only show the first 3 
    }
    loadVenues();
  }, []);

  return(
    <div className="venues-page">
      {/*  top sect */}
      <h1 className="venues-title">Find Your Perfect Holiday Stay</h1>
      <p className="venues-subtitle">Browse unique venues and book your next getaway</p>




    </div>




  )
}