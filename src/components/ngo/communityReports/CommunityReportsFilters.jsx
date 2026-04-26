const CommunityReportsFilters = ({
  query,
  category,
  urgency,
  location,
  categories,
  urgencies,
  locations,
  onQueryChange,
  onCategoryChange,
  onUrgencyChange,
  onLocationChange
}) => (
  <section className="ngo-community-filters" aria-label="reports filters">
    <div className="filters-row">
      <label className="filter-search">
        <i className="ri-search-line" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search reports"
          aria-label="Search reports"
        />
      </label>

      <div className="filter-controls">
        <div className="filter-chip" role="group" aria-label="Category filter">
          <i className="ri-stack-line" />
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Category">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="filter-chip" role="group" aria-label="Priority filter">
          <i className="ri-alert-line" />
          <select value={urgency} onChange={(e) => onUrgencyChange(e.target.value)} aria-label="Priority">
            {urgencies.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="filter-chip" role="group" aria-label="Location filter">
          <i className="ri-map-pin-line" />
          <select value={location} onChange={(e) => onLocationChange(e.target.value)} aria-label="Location">
            {locations.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>
    </div>
  </section>
);

export default CommunityReportsFilters;
