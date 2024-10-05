import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Hackathons from './Components/Hackthons';
import Jobs from './Components/Jobs';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Events from './Components/Events';
import Navbar from "./Components/Navbar";

import { auth } from './firebase'; // Firebase configuration
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Monitor user authentication state
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user exists
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <Navbar onLogout={handleLogout} />} {/* Navbar visible only after login */}
        <Routes>
          {/* Redirect to hackthons if authenticated */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/hackthons" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/hackthons" /> : <Signup />} />

          {/* Protected routes */}
          {isAuthenticated && (
            <>
              <Route path='/hackthons' element={<Hackathons />} />
              <Route path='/jobs' element={<Jobs />} />
              <Route path='/events' element={<Events />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="*" element={<Navigate to="/hackthons" />} />
            </>
          )}

          {/* Redirect to login if not authenticated */}
          {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
