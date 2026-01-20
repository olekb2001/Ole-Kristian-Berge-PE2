import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
