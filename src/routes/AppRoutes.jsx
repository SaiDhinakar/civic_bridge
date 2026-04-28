import { Navigate, Route, Routes } from "react-router-dom";
import VolunteerLayout from "../layouts/VolunteerLayout";
import NGOLayout from "../layouts/NGOLayout";

import VolunteerDashboard from "../data/pages/volunteer/Dashboard";
import VolunteerOpportunities from "../data/pages/volunteer/Opportunities";
import VolunteerSubmitReport from "../data/pages/volunteer/SubmitReport";
import VolunteerMyTasks from "../data/pages/volunteer/MyTasks";
import VolunteerApprovals from "../data/pages/volunteer/Approvals";
import VolunteerProfile from "../data/pages/volunteer/MyProfile";

import NGODashboard from "../pages/ngo/Dashboard";
import NGOVolunteers from "../pages/ngo/Volunteers";
import NGOTaskBoard from "../pages/ngo/TaskBoard";
import NGOProblem from "../pages/ngo/PostProblem";
import NGOSubmitReport from "../pages/ngo/SubmitReport";
import NGOAnalytics from "../pages/ngo/Analytics";
import AIInsights from "../pages/ngo/AIInsights";
import NGOCommunityReports from "../pages/ngo/CommunityReports";
import NGOSettings from "../pages/ngo/Settings";
import NGORegistration from "../components/ngo/NGORegistration";

// COMMUNITY PAGE IMPORT
import CommunityPage from "../components/Community/CommunityPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthContainer from "../components/Auth/AuthContainer";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthContainer />} />
    <Route path="/sign-out" element={<Navigate to="/" replace />} />
    <Route path="/ngo/register" element={<NGORegistration />} />

    <Route element={<ProtectedRoute />}>
      {/* COMMUNITY PAGE ROUTE */}
      <Route path="/community" element={<CommunityPage />} />

      {/* VOLUNTEER ROUTES */}
      <Route path="/volunteer" element={<VolunteerLayout />}>
        <Route index element={<VolunteerDashboard />} />
        <Route path="dashboard" element={<VolunteerDashboard />} />
        <Route path="opportunities" element={<VolunteerOpportunities />} />
        <Route path="report" element={<VolunteerSubmitReport />} />
        <Route path="my-tasks" element={<VolunteerMyTasks />} />
        <Route path="approvals" element={<VolunteerApprovals />} />
        <Route path="profile" element={<VolunteerProfile />} />
      </Route>

      {/* NGO ROUTES */}
      <Route path="/ngo" element={<NGOLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<NGODashboard />} />
        <Route path="volunteers" element={<NGOVolunteers />} />
        <Route path="task-board" element={<NGOTaskBoard />} />
        <Route path="post-problem" element={<NGOProblem />} />
        <Route path="submit-report" element={<NGOSubmitReport />} />
        <Route path="community-reports" element={<NGOCommunityReports />} />
        <Route path="analytics" element={<NGOAnalytics />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="settings" element={<NGOSettings />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;