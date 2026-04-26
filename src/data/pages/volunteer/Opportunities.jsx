import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import EmptyState from "../../../components/common/EmptyState";
import OpportunityCard from "../../../components/volunteer/opportunities/OpportunityCard";
import OpportunitySearch from "../../../components/volunteer/opportunities/OpportunitySearch";
import { opportunitiesData, opportunityFilters } from "../../volunteer/opportunitiesData";

const Opportunities = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return opportunitiesData.data.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.ngo.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase());

      const matchesFilter = filter === "All" || item.category === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <>
      <PageHeader title="Find Opportunities" subtitle="Apply to meaningful civic initiatives near you." />

      <section className="toolbar card">
        <OpportunitySearch
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter opportunities">
          {opportunityFilters.data.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <EmptyState
          title="No opportunities found"
          message="Try adjusting search or filter criteria."
          ctaLabel="Clear filters"
          onCta={() => {
            setQuery("");
            setFilter("All");
          }}
        />
      ) : (
        <section className="cards-grid">
          {filtered.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </>
  );
};

export default Opportunities;