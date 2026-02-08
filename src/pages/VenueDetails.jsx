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
import { createBooking } from "../api/bookings";
import { formatDate } from "../utils/formatDate";

export default function VenueDetails() {
  const { id } = useParams();

  //this holds the venue returned from the api
  const [venue, setVenue] = useState(null);

  //stores the dates the user wants to book
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  // for removing venue managers access to book
  const user = JSON.parse(localStorage.getItem("user"));

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

  //remove past bookings from unavailable Dates
  const today = new Date();

  const futureBookings = venue.bookings.filter((booking) => {
    return new Date(booking.dateTo) >= today;
  });

  /* 
    this function checks if the range of dates the user wants to book
    overlaps with any existing bookings for this venue.

    instead of checking a single day, this checks the whole period
    from the selected start date to the selected end date.
  */
  function isTheRangeAlreadyBooked(dateFrom, dateTo) {
    // convert the selected input dates into real Date objects
    const selectedStart = new Date(dateFrom);
    const selectedEnd = new Date(dateTo);

    // Check if any existing bookings overlaps with the selected range
    return futureBookings.some((booking) => {
      //convert the booking's dates into date objects
      const bookedStart = new Date(booking.dateFrom);
      const bookedEnd = new Date(booking.dateTo);

      return selectedStart <= bookedEnd && selectedEnd >= bookedStart;
    });
  }

  async function handleBooking() {
    // Ensures both dates are selected
    if (!dateFrom || !dateTo) {
      setBookingMessage("Please select both dates");
      return;
    }
    if (new Date(dateTo) <= new Date(dateFrom)) {
      setBookingMessage("End date must be after start date");
      return;
    }
    // check for overlap with existing bookings
    if (isTheRangeAlreadyBooked(dateFrom, dateTo)) {
      setBookingMessage("These dates are already booked. Please choose others");
      return;
    }
    try {
      await createBooking(dateFrom, dateTo, venue.id);
      setBookingMessage("Booking successfull");
    } catch (error) {
      setBookingMessage(error.message);
    }
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
          <div className="venue-card-info card-hover">
            <div className="venue-details-image">
              {/* displays image if it exists*/}
              {venue.media?.[0]?.url && (
                <img
                  src={venue.media[0].url}
                  alt={`Image of ${venue.name}`}
                  loading="lazy"
                />
              )}
            </div>

            <p className="description-venue-details"> {venue.description} </p>
            <p className="venue-max-guests">Max {venue.maxGuests} guests</p>

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
          {!user?.venueManager && (
            <div className="booking-calender-card card-hover">
              <p className="booking-price">${venue.price} / night</p>

              {/*
            this visually shows all dates that are already booked for this venue.
            this satisfies the user story "view calendar with available and booked dates"
            without needing to use any external calendar library.
            */}
              <h3 className="unavailable-title">Unavailable Dates</h3>
              <div className="calender-placeholder-css">
                {futureBookings.map((booking) => {
                  // format dates using my helper so they always dd/mm/yyyy
                  const from = formatDate(booking.dateFrom);
                  const to = formatDate(booking.dateTo);

                  return (
                    <p key={booking.id}>
                      Booked: {from} - {to}
                    </p>
                  );
                })}
              </div>

              {/* date inputs where the user selects the booking period */}
              <label>From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  const chosenDate = e.target.value;
                  setDateFrom(chosenDate);
                }}
              />

              <label>To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  const chosenDate = e.target.value;
                  setDateTo(chosenDate);
                }}
              />
              {bookingMessage && <p>{bookingMessage}</p>}

              <button className="booking-button" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
