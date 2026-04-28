import { useState, useEffect } from "react";
import VolunteerTable from "../../components/ngo/volunteers/VolunteerTable";
import VolunteerProfileModal from "../../components/ngo/volunteers/VolunteerProfileModal";
import { volunteersData } from "../../data/ngo/volunteersData";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [pendingVolunteers, setPendingVolunteers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("approved");

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    // Simulate API delay with mock data
    const timer = setTimeout(() => {
      const data = volunteersData.data || [];
      const approved = data.filter(v => v.status === "Active" || v.status === "In Field") || [];
      const pending = data.filter(v => v.status === "Pending" || v.status === "Not Assigned") || [];

      setVolunteers(approved);
      setPendingVolunteers(pending);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  };

  const handleApproveVolunteer = (volunteerId) => {
    // Mock handler - no API call
    alert("Volunteer approval feature ready for backend integration");
  };

  const handleRemoveVolunteer = (volunteerId) => {
    if (window.confirm("Are you sure you want to remove this volunteer?")) {
      alert("Volunteer removal feature ready for backend integration");
    }
  };

  if (loading) {
    return (
      <div className="volunteer-loading" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
        <p>Loading volunteers...</p>
      </div>
    );
  }

  const filters = [
    { id: 1, label: "All", value: "all" },
    { id: 2, label: "Active", value: "active" },
    { id: 3, label: "Inactive", value: "inactive" },
  ];

  const currentVolunteers = activeTab === "approved" ? volunteers : pendingVolunteers;

  return (
    <div className="volunteers-container">
      <div className="volunteer-tabs">
        <button
          className={`tab ${activeTab === "approved" ? "active" : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          Approved ({volunteers.length})
        </button>
        <button
          className={`tab ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending ({pendingVolunteers.length})
        </button>
      </div>

      <VolunteerTable
        volunteers={currentVolunteers}
        filters={filters}
        onViewProfile={setSelected}
        onApprove={activeTab === "pending" ? handleApproveVolunteer : null}
        onRemove={activeTab === "approved" ? handleRemoveVolunteer : null}
      />
      <VolunteerProfileModal volunteer={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Volunteers;
