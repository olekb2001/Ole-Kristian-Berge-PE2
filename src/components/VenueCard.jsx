/*    
this is the reasuable component that displays the venue card

it shows image, name, location, price , and link to the venue detail page
*/
import "./VenueCard.css";
import { Link } from "react-router-dom";

export default function VenueCard({ venue }) {
  return (
    <Link to={`/venues/${venue.id}`} className="venue-card-link">
      <div className="venue-card-container card-hover">
        <div className="venue-image">
          {/* The noroff api uses media objects so we are acessing it through media[0].url.
                    optional chaining (?.) is used because not all
                    venues have images. This prevents the app from crashing.        
                    
                    found out its not nessesary with this api but its still good practise
                    */}
          {venue.media?.[0]?.url && (
            <img src={venue.media[0].url} alt={venue.name} />
          )}
        </div>
        <div className="venue-info">
          <h3 className="venue-title">{venue.name}</h3>
          {/* location might not exist so its better to be on the safe side and add optional chaining so it does not crash */}
          <p className="venue-location">
            {venue.location?.city}, {venue.location?.country}
          </p>
          <p className="venue-price">${venue.price} / night</p>
          <p className="venue-guests">Max {venue.maxGuests} guests</p>
          {/* this navigates to the details page by using the venues id*/}
          <span className="venue-button">Book Now</span>
        </div>
      </div>
    </Link>
  );
}
