import PageHeader from "../../../components/common/PageHeader";
import ReportForm from "../../../components/volunteer/reports/ReportForm";

const SubmitReport = () => {
  return (
    <>
      <PageHeader title="Submit Report" subtitle="Share impact details for assigned tasks." />
      <ReportForm />
    </>
  );
};

export default SubmitReport;