// Profile.js
import React, { useState } from 'react';

const Profile = () => {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [careerGoals, setCareerGoals] = useState('');

  const handleSaveProfile = () => {
    // Save the data to the database for ML processing later
    // Use Firebase or any backend service
  };

  return (
    <div>
      <h2>Profile</h2>
      <form>
        <label>Interests:</label>
        <input 
          type="text" 
          value={interests} 
          onChange={(e) => setInterests(e.target.value)} 
        />
        <label>Skills:</label>
        <input 
          type="text" 
          value={skills} 
          onChange={(e) => setSkills(e.target.value)} 
        />
        <label>Career Goals:</label>
        <input 
          type="text" 
          value={careerGoals} 
          onChange={(e) => setCareerGoals(e.target.value)} 
        />
        <button type="button" onClick={handleSaveProfile}>Save</button>
      </form>
    </div>
  );
};

export default Profile;
