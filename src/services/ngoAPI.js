import apiClient from './apiClient';

/**
 * NGO API Service
 */

export const ngoAPI = {
  // Create new NGO
  createNGO: (ngoData) => {
    return apiClient.post('/ngos', ngoData);
  },

  // Get NGO details
  getNGODetails: (ngoId) => {
    return apiClient.get(`/ngos/${ngoId}`);
  },

  // Update NGO profile
  updateNGOProfile: (ngoId, updates) => {
    return apiClient.put(`/ngos/${ngoId}`, updates);
  },

  // Get NGO stats
  getNGOStats: (ngoId) => {
    return apiClient.get(`/ngos/${ngoId}/stats`);
  },

  // Get pending volunteers for NGO
  getPendingVolunteers: (ngoId) => {
    return apiClient.get(`/ngos/${ngoId}/pending-volunteers`);
  },

  // Add volunteer to NGO (approve)
  addVolunteerToNGO: (ngoId, volunteerId) => {
    return apiClient.post('/ngos/add-volunteer', { ngoId, volunteerId });
  },

  // Search community members (for invite)
  searchCommunityMembers: (query) => {
    return apiClient.get('/users/search', { params: { query } });
  },

  // Invite community member to NGO
  inviteCommunityMember: (email, ngoId) => {
    return apiClient.post(`/ngos/${ngoId}/invite`, { email });
  },
};

export default ngoAPI;
