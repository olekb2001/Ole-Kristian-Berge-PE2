/*   
this page shows a single venues details

the id is taken from the url using "useParams()"
when the page loads, that spesific venue is fetched from the api and stored in state.

while the page loads a message is displayed.
*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findVenueId } from "../api/venues";
import "./VenueDetails.css";

export default function VenueDetails() {
  const { id } = useParams();

  //this holds the venue returned from the api
  const [venue, setVenue] = useState(null);

  //stores the dates the user wants to book
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    //this fetches the venue that matches the id
    async function loadTheVenue() {
      const dataRecieved = await findVenueId(id);
      setVenue(dataRecieved);
    }
    loadTheVenue();
  }, [id]);

  //while the data is loading this shows
  if (!venue) {
    return <p>Loading Venue...</p>;
  }

  /* 
    this function checks if a spesific date is already booked for this venue.

    it loops through 



  */
  function isTheDateAlreadyBooked(date){
    return venue.bookings.some((booking) => {
      const bookedFrom = new Date(booking.dateFrom);
      const bookedTo = new date(booking.dateTo);
      const dateSelected = new date(date);

      return selected >= bookedFrom && selected <= bookedTo;
    })
  }

  return (
    <div className="venue-details-page">
      <div className="top-of-page">
        <h1 className="venue-details-header">{venue.name}</h1>
        <p className="venue-details-loc">
          {venue.location?.city}, {venue.location?.country}
        </p>
      </div>
      <div className="layout-venue-details">
        {/*left side of page*/}
        <div className="left-venue-details">
          <div className="venue-card-info">
            <div className="venue-details-image">
              {/* displays image if it exists*/}
              {venue.media?.[0]?.url && (
                <img src={venue.media[0].url} alt={venue.name} />
              )}
            </div>

            <p className="description-venue-details"> {venue.description} </p>

            {/* amneties*/}
            <h2 className="amenities-title">Amenities</h2>

            <div className="amenities-cont">
              {/* items within the div */}
              {venue.meta?.wifi && <span className="amenity">✓ WiFi</span>}
              {venue.meta?.parking && (
                <span className="amenity">✓ Parking</span>
              )}
              {venue.meta?.pets && (
                <span className="amenity">✓ Pets allowed</span>
              )}
              {venue.meta?.breakfast && (
                <span className="amenity">✓ Breakfast included</span>
              )}
            </div>
          </div>
        </div>
        {/*right side og page*/}
        <div className="right-venue-details">
          <div className="booking-calender-card">
            <p className="booking-price">${venue.price} / night</p>

            {/*placheolder for the calender*/}
            <label>From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />

            <label>To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />

            <button className="booking-button">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
