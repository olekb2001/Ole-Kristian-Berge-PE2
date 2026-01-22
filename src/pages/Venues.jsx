import VenueCard from "../components/VenueCard";
import "./Venues.css"

export default function Venues() {
  return(
    <div className="venues-page">
      <h1 className="venues-title">Venues</h1>
      <p className="venues-subtitle">Browse all available venues</p>

      <input
        type="text"
        placeholder="Enter Text..."
        className="venue-search"
      />

      <h2 className="all-venues-title">All Venues</h2>

      <div className="venues-grid">
        <VenueCard/>
        <VenueCard/>
        <VenueCard/>
        <VenueCard/>
        <VenueCard/>
        <VenueCard/>
      </div>
    </div>
  )
  
}
