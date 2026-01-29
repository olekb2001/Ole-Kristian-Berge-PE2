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
      {bookings.map((booking) => {
        const from = new Date(booking.dateFrom).toLocaleDateString();
        const to = new Date(booking.dateTo).toLocaleDateString();

        return (
          <div key={booking.id}>
            <h2>{booking.venue?.name}</h2>
            <p>
              {booking.venue?.location?.city},{" "}
              {booking.venue?.location?.country}
            </p>
            <p>
              {from} - {to}
            </p>
            <p>${booking.venue?.price} / night</p>
          </div>
        );
      })}
    </div>
  );
}
