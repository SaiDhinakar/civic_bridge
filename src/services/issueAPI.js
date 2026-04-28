import apiClient from './apiClient';

/**
 * Issue API Service
 */

export const issueAPI = {
  // Post a new issue
  createIssue: (issueData) => {
    return apiClient.post('/issues', issueData);
  },

  // Get all issues for NGO
  getNGOIssues: (ngoId) => {
    return apiClient.get('/issues', { params: { ngoId } });
  },

  // Get specific issue details
  getIssueDetails: (issueId) => {
    return apiClient.get(`/issues/${issueId}`);
  },

  // Verify issue (by volunteer)
  verifyIssue: (issueId, verificationNotes) => {
    return apiClient.put(`/issues/${issueId}/verify`, { verificationNotes });
  },

  // Approve issue (by NGO admin)
  approveIssue: (issueId) => {
    return apiClient.put(`/issues/${issueId}/approve`, {});
  },

  // Get issues pending verification
  getPendingVerificationIssues: (ngoId) => {
    return apiClient.get('/issues/pending-verification', { params: { ngoId } });
  },

  // Get issues pending approval
  getPendingApprovalIssues: (ngoId) => {
    return apiClient.get('/issues/pending-approval', { params: { ngoId } });
  },

  // Update issue status
  updateIssueStatus: (issueId, status) => {
    return apiClient.put(`/issues/${issueId}`, { status });
  },
};

export default issueAPI;
