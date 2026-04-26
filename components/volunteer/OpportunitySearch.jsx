const OpportunitySearch = ({ value, onChange }) => {
  return (
    <label className="opportunity-search" aria-label="Search opportunities">
      <i className="ri-search-line" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search opportunities, NGOs, locations..."
      />
    </label>
  );
};

export default OpportunitySearch;
