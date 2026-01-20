import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Venues from "./pages/Venues";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
