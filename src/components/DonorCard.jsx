const DonorCard = ({ donor, onRequest }) => {
  return (
    <div className={`card ${!donor.isAvailable ? 'unavailable' : ''}`}>
      <h3>{donor.name}</h3>
      <div className="badge">{donor.bloodGroup}</div>
      <p>📍 {donor.city}</p>
      <p>Status: {donor.isAvailable ? "✅ Available" : "❌ Busy"}</p>
      
      <button 
        disabled={!donor.isAvailable || donor.requestSent}
        onClick={() => onRequest(donor.id)}
      >
        {donor.requestSent ? "Request Sent ✅" : "Request Help"}
      </button>
    </div>
  );
};

export default DonorCard;