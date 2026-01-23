// first find the venue id from the url of the page
// then i need to create a state where i can store the venue 
// when page loads , then i get spesific venue by that id
// then i want to save the result in state
// if the venue has not leaded, i want to show a loading message on screen
// when loading is finished then i want to display the name and desc of the venue
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findVenueId } from "../api/venues";
import "./VenueDetails.css";

export default function VenueDetails() {
    const {id } = useParams();
    const [venue, setVenue] = useState(null)
    useEffect(() =>{
        async function loadTheVenue() {
            const dataRecieved = await findVenueId(id);
            setVenue(dataRecieved);
        }
        loadTheVenue();
    },[id]
    );

    if (!venue){
        return <p>Loading Venue...</p>
    }

  return ( 
    <div className="venue-details-page">
        <div className="top-of-page">
            <h1 className="venue-details-header">{venue.name}</h1>
            <p className="venue-details-loc">{venue.location?.city}, {venue.location?.country}</p>
        </div>
        <div className="layout-venue-details">
            {/*left side of page*/}
            <div className="left-venue-details">
                <div className="venue-details-image">
                    {venue.media?.[0]?.url && (<img src = {venue.media[0].url} alt={venue.name}/>)}
                </div>
                
                <p className="description-venue-details"> {venue.description} </p>
            </div>
            {/*right side og page*/}
            <div className="right-venue-details">
                <div className="booking-calender-card">
                    <p className="booking-price">${venue.price} / night</p>

                    {/*placheolder for the calender*/}
                    <div className="calender-placeholder-css"></div>

                    <button className="booking-button">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
