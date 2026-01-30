import { useEffect, useState } from "react";
import { getMyBookings } from "../api/profile";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
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
  if (error) {
    return <p>{error}</p>;
  }
  if (bookings.length === 0) {
    return <p>No bookings yet</p>;
  }
  return (
    <div>
      <h1>My Bookings</h1>
      <p>Here are your upcoming stays</p>
      {bookings.map((booking) => {
        const from = new Date(booking.dateFrom).toLocaleDateString();
        const to = new Date(booking.dateTo).toLocaleDateString();

        return (
          <div key={booking.id} className="booking-card">
            {/*left img*/}
            <div className="booking-image">
              {booking.venue?.media?.[0]?.url && (
                <img
                  src={booking.venue.media[0].url}
                  alt={booking.venue.name}
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
              <p className="booking-price">${booking.venue?.price} / night</p>
              <p className="booking-status">Upcoming</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
