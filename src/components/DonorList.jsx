import DonorCard from './DonorCard';

const DonorList = ({ donors, onRequest }) => (
  <div className="donor-grid">
    {donors.map(donor => (
      <DonorCard key={donor.id} donor={donor} onRequest={onRequest} />
    ))}
  </div>
);

export default DonorList;