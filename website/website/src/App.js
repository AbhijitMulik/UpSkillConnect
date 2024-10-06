// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Hackathons from './Components/Hackthons';
import Jobs from './Components/Jobs';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Events from './Components/Events';
import Courses from './Components/Courses'; // Import Courses component
import Navbar from "./Components/Navbar";
import UserForm from './Components/UserForm'; 
import { auth, db } from './firebase'; // Firebase configuration
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore for user data check
import Workshop from "./Components/Workshop";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [userNeedsToCompleteForm, setUserNeedsToCompleteForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && !userDoc.data().formComplete) {
          setUserNeedsToCompleteForm(true);
        } else {
          setUserNeedsToCompleteForm(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <div>
        {isAuthenticated && !userNeedsToCompleteForm && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to={userNeedsToCompleteForm ? '/userform' : '/hackthons'} /> : <Login />} 
          />
          <Route path="/signup" element={<Signup />} />
          
          {isAuthenticated && userNeedsToCompleteForm && (
            <Route path="/userform" element={<UserForm onComplete={() => setUserNeedsToCompleteForm(false)} />} />
          )}

          {isAuthenticated && !userNeedsToCompleteForm && (
            <>
              <Route path='/hackthons' element={<Hackathons />} />
              <Route path='/jobs' element={<Jobs />} />
              <Route path='/events' element={<Events />} />
              <Route path='/courses' element={<Courses />} /> {/* Courses Route */}
              <Route path='/profile' element={<Profile />} />
              <Route path='/workshop' element={<Workshop />} />
              <Route path="*" element={<Navigate to="/hackthons" />} />
            </>
          )}

          {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
