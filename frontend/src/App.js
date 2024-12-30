import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Welcome from "./pages/Welcome";
import Landing from "./pages/Landing";
import GiveKudos from "./pages/GiveKudos";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/give-kudos" element={<GiveKudos />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
