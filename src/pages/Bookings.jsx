import { useEffect, useState } from "react";
import { getMyBookings } from "../api/profile";
import "./Bookings.css";
import { Link } from "react-router-dom";

export default function Bookings() {
  //holds all bookings fetched from the API
  const [bookings, setBookings] = useState([]);
  // holds any error message if the request fails
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch bookings when the page loads
    async function loadTheBookings() {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadTheBookings();
  }, []);

  // show error if something went wrong
  if (error) {
    return <p>{error}</p>;
  }

  // if user has no upcoming bookings
  if (
    bookings.filter((booking) => new Date(booking.dateTo) > new Date())
      .length === 0
  ) {
    return <p>No upcoming bookings</p>;
  }
  return (
    <div className="bookings-page">
      <h1 className="bookings-title">My Bookings</h1>
      <p className="bookings-subtitle">Here are your upcoming stays</p>
      {/*
      i only display bookings where the end date is in the future.
      this matches the user story "view upcoming bookings"
      */}
      {bookings
        .filter((booking) => new Date(booking.dateTo) > new Date())
        .map((booking) => {
          // format the dates into something readable
          const from = new Date(booking.dateFrom).toLocaleDateString();
          const to = new Date(booking.dateTo).toLocaleDateString();

          return (
            <Link
              to={`/venues/${booking.venue?.id}`}
              key={booking.id}
              className="booking-card-link"
            >
              <div className="booking-card card-hover">
                {/*left img*/}
                <div className="booking-image">
                  {booking.venue?.media?.[0]?.url && (
                    <img
                      src={booking.venue.media[0].url}
                      alt={`Image of ${booking.venue.name}`}
                    />
                  )}
                </div>
                {/*middle - info*/}
                <div className="booking-info">
                  <h2>{booking.venue?.name}</h2>
                  <p>
                    {booking.venue?.location?.city},{" "}
                    {booking.venue?.location?.country}
                  </p>
                  <p>
                    {from} - {to}
                  </p>
                </div>
                {/* price + status*/}
                <div className="booking-meta">
                  <p className="bookings-price">
                    ${booking.venue?.price} / night
                  </p>
                  <p className="booking-status">Upcoming</p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
