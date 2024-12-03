import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MapPage from "./MapPage"; // The existing map functionality
import WelcomePage from "./WelcomePage"; // The new welcome page

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
