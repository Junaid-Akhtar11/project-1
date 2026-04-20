import { useState, useEffect } from 'react';
import DonorList from './components/DonorList';
import Filter from './components/Filter';
import './App.css';

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function App() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        // Mapping API data to donor format with mocked blood types
        const formattedDonors = data.map(user => ({
          id: user.id,
          name: user.name,
          city: user.address.city,
          bloodGroup: BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)],
          isAvailable: Math.random() > 0.3,
          requestSent: false
        }));
        setDonors(formattedDonors);
        setLoading(false);
      });
  }, []);

  const handleRequest = (id) => {
    setDonors(prev => prev.map(d => d.id === id ? { ...d, requestSent: true } : d));
  };

  const filteredDonors = selectedGroup 
    ? donors.filter(d => d.bloodGroup === selectedGroup) 
    : donors;

  const availableCount = filteredDonors.filter(d => d.isAvailable).length;

  if (loading) return <div className="loader">Loading Donors...</div>;

  return (
    <div className="container">
      <h1>🩸 Community Blood Donor Finder</h1>
      
      <div className="stats">
        <p>Total Available Donors: <strong>{availableCount}</strong></p>
      </div>

      <Filter 
        groups={BLOOD_GROUPS} 
        selected={selectedGroup} 
        onSelect={setSelectedGroup} 
      />

      {filteredDonors.length > 0 ? (
        <DonorList donors={filteredDonors} onRequest={handleRequest} />
      ) : (
        <p className="error">No donors found for this blood group.</p>
      )}
    </div>
  );
}

export default App;