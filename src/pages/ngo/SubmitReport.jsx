import ReportsPanel from "../../components/ngo/dashboard/ReportsPanel";
import { ngoReportHistory } from "../../data/ngo/reportsData";

const SubmitReport = () => <ReportsPanel history={ngoReportHistory.data} />;

export default SubmitReport;
