// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetail from "./components/RecipeDetail";
import Contribute from "./components/Contribute";
import Favorites from "./components/Favorites";
import AboutUs from "./components/AboutUs";
import "./index.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
