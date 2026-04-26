import CommunityReports from "../../components/ngo/communityReports/CommunityReports";
import { communityProblems } from "../../data/ngo/problemsData";

const FieldReports = () => <CommunityReports reports={communityProblems.data} />;

export default FieldReports;
