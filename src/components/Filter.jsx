const Filter = ({ groups, selected, onSelect }) => (
  <div className="filter-box">
    <label>Filter by Blood Group: </label>
    <select value={selected} onChange={(e) => onSelect(e.target.value)}>
      <option value="">All Groups</option>
      {groups.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  </div>
);

export default Filter;