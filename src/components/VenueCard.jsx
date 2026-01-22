import "./VenueCard.css";
import { Link } from "react-router-dom";

export default function VenueCard({venue}){
    return(
        <div className="venue-card-container">
            <div className="venue-image">
                {venue.media?.[0] && (<img src = {venue.media[0]} alt = {venue.name}/>)}
            </div>
            <div className="venue-info">
                <h3 className="venue-title">{venue.name}</h3>
                <p className="venue-location">{venue.location?.city}, {venue.location?.country}</p>
                <p className="venue-price">{venue.price} / night</p>
                <Link to={`/venues/${venue.id}`} className="venue-button">Book Now</Link>
            </div>
        </div>
    )
}