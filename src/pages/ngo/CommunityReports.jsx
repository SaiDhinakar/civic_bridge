import { useMemo, useState } from "react";
import CommunityReportsHeader from "../../components/ngo/communityReports/CommunityReportsHeader";
import CommunityReportsFilters from "../../components/ngo/communityReports/CommunityReportsFilters";
import CommunityReportCard from "../../components/ngo/communityReports/CommunityReportCard";
import CommunityReportDetailsModal from "../../components/ngo/communityReports/CommunityReportDetailsModal";
import { communityReportsData, communityReportFilters } from "../../data/ngo/communityReportsData";
import EmptyState from "../../components/common/EmptyState";

const CommunityReports = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [urgency, setUrgency] = useState("All");
  const [location, setLocation] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredReports = useMemo(() => {
    return communityReportsData.data.filter((report) => {
      const q = query.toLowerCase();
      const matchesQuery =
        report.title.toLowerCase().includes(q) ||
        report.location.toLowerCase().includes(q) ||
        report.description.toLowerCase().includes(q);
      const matchesCategory = category === "All" || report.category === category;
      const matchesUrgency = urgency === "All" || report.priority === urgency || report.status === urgency;
      const matchesLocation = location === "All" || report.location === location;
      return matchesQuery && matchesCategory && matchesUrgency && matchesLocation;
    });
  }, [query, category, urgency, location]);

  return (
    <section className="ngo-community-page">
      <CommunityReportsHeader />
      <CommunityReportsFilters
        query={query}
        category={category}
        urgency={urgency}
        location={location}
        categories={communityReportFilters.categories}
        urgencies={communityReportFilters.urgencies}
        locations={communityReportFilters.locations}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onUrgencyChange={setUrgency}
        onLocationChange={setLocation}
      />

      {filteredReports.length ? (
        <section className="ngo-community-grid">
          {filteredReports.map((report) => (
            <CommunityReportCard key={report.id} report={report} onViewDetails={setSelected} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No community reports found"
          message="Try changing your search and filters to find relevant issues."
        />
      )}

      <CommunityReportDetailsModal report={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default CommunityReports;
