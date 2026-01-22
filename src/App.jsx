import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import MyVenues from "./pages/MyVenues";
import Profile from "./pages/Profile";
import VenueDetails from "./pages/VenueDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/my-venues" element={<MyVenues />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
