import apiClient from './apiClient';

/**
 * Field Reports API Service
 */

export const fieldReportAPI = {
  // Submit field report with attachments (base64 encoded)
  submitFieldReport: (reportData) => {
    return apiClient.post('/issues/submit-report', reportData);
  },

  // Get all reports for a task
  getTaskReports: (taskId) => {
    return apiClient.get(`/issues/task/${taskId}/reports`);
  },

  // Get all reports for volunteer
  getVolunteerReports: (volunteerId) => {
    return apiClient.get(`/issues/volunteer/${volunteerId}/reports`);
  },

  // Update report
  updateReport: (reportId, updates) => {
    return apiClient.put(`/issues/reports/${reportId}`, updates);
  },

  // Export reports as CSV or JSON
  exportReports: (ngoId, format = 'json') => {
    return apiClient.get(`/issues/export`, { params: { ngoId, format } });
  },
};

/**
 * Volunteer Matching API Service
 */

export const volunteerMatchingAPI = {
  // Get AI-matched volunteers for an issue
  getMatchedVolunteers: (issueId) => {
    return apiClient.get(`/matches/issue/${issueId}`);
  },

  // Trigger AI matching for an issue
  triggerAIMatching: (issueId) => {
    return apiClient.post(`/matches/issue/${issueId}/match`, {});
  },

  // Assign task to volunteer
  assignTaskToVolunteer: (taskId, volunteerId) => {
    return apiClient.post('/tasks/assign', { taskId, volunteerId });
  },

  // Get volunteer availability
  getVolunteerAvailability: (volunteerId) => {
    return apiClient.get(`/volunteers/${volunteerId}/availability`);
  },

  // Get volunteer last location
  getVolunteerLocation: (volunteerId) => {
    return apiClient.get(`/volunteers/${volunteerId}/location`);
  },
};

export default {
  fieldReportAPI,
  volunteerMatchingAPI,
};
