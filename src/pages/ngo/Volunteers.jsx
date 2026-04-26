import { useState } from "react";
import VolunteerTable from "../../components/ngo/volunteers/VolunteerTable";
import VolunteerProfileModal from "../../components/ngo/volunteers/VolunteerProfileModal";
import { volunteersData, volunteerFilters } from "../../data/ngo/volunteersData";

const Volunteers = () => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <VolunteerTable volunteers={volunteersData.data} filters={volunteerFilters} onViewProfile={setSelected} />
      <VolunteerProfileModal volunteer={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Volunteers;
