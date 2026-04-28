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
          placeholder="Search reports, locations..."
          aria-label="Search reports"
        />
        {query && (
          <button
            type="button"
            className="filter-search-clear"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
          >
            <i className="ri-close-line" />
          </button>
        )}
      </label>

      <div className="filter-controls">
        <div className="filter-chip" role="group" aria-label="Category filter">
          <i className="ri-stack-line" />
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Category">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <i className="ri-arrow-down-s-line filter-chip-arrow" />
        </div>

        <div className="filter-chip" role="group" aria-label="Priority filter">
          <i className="ri-alert-line" />
          <select value={urgency} onChange={(e) => onUrgencyChange(e.target.value)} aria-label="Priority">
            {urgencies.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <i className="ri-arrow-down-s-line filter-chip-arrow" />
        </div>

        <div className="filter-chip" role="group" aria-label="Location filter">
          <i className="ri-map-pin-line" />
          <select value={location} onChange={(e) => onLocationChange(e.target.value)} aria-label="Location">
            {locations.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <i className="ri-arrow-down-s-line filter-chip-arrow" />
        </div>
      </div>
    </div>
  </section>
);

export default CommunityReportsFilters;
