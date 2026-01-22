import "./VenueCard.css";

export default function VenueCard(){
    return(
        <div className="venue-card-container">
            <div className="venue-image"></div>
            <div className="venue-info">
                <h3 className="venue-title">Venue Name</h3>
                <p className="venue-location">City, Country</p>
                <p className="venue-price">$120 / night</p>
                <button className="venue-button">Book Now</button>
            </div>
        </div>
    )
}