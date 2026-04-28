import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNGO } from '../../context/NGOContext';
import ngoAPI from '../../services/ngoAPI';
import './NGORegistration.css';

const NGORegistration = () => {
  const navigate = useNavigate();
  const { setNGOData, setAuthData, setLoading, setError } = useNGO();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    registrationNumber: '',
    contactEmail: '',
    phoneNumber: '',
    website: '',
    logoUrl: '',
    location: {
      latitude: 0,
      longitude: 0,
      address: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location_')) {
      const locationField = name.split('_')[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'NGO name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = 'Registration number is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
      newErrors.contactEmail = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.location.address.trim()) newErrors.location_address = 'Address is required';

    return newErrors;
  };

  const handleTestMode = (ngoId, adminId) => {
    // Set mock data in localStorage for testing
    localStorage.setItem('ngoId', ngoId);
    localStorage.setItem('adminId', adminId);
    localStorage.setItem('authToken', 'mock-test-token');
    
    // Navigate to dashboard
    navigate('/ngo/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await ngoAPI.createNGO(formData);

      if (response.data.success) {
        const ngoData = response.data.data;

        // Store auth data
        const token = localStorage.getItem('authToken');
        const adminId = localStorage.getItem('userId');

        setAuthData(token, adminId, ngoData.id);
        setNGOData(ngoData);

        // Show success message
        alert('NGO created successfully! Redirecting to dashboard...');

        // Redirect to dashboard
        setTimeout(() => {
          navigate('/ngo/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating NGO:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create NGO. Please try again.';
      setError(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="ngo-registration-container">
      <div className="registration-card">
        <h1>Register Your NGO</h1>
        <p className="subtitle">Let's get your NGO set up and ready to make an impact</p>

        {/* Test Mode Buttons */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#f0f4ff', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
            🧪 <strong>Test Mode:</strong> Click a button to view mock data
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleTestMode('ngo_001', 'admin_001')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Urban Care (3 volunteers)
            </button>
            <button
              type="button"
              onClick={() => handleTestMode('ngo_002', 'admin_002')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Green Earth (2 volunteers)
            </button>
            <button
              type="button"
              onClick={() => handleTestMode('ngo_003', 'admin_003')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Education for All (3 volunteers)
            </button>
          </div>
        </div>

        {errors.submit && <div className="error-alert">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="name">NGO Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your NGO name"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your NGO and its mission"
                rows="4"
                disabled={isSubmitting}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="registrationNumber">Registration Number *</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g., NGO/2024/001"
                  disabled={isSubmitting}
                />
                {errors.registrationNumber && (
                  <span className="error-text">{errors.registrationNumber}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@ngo.com"
                  disabled={isSubmitting}
                />
                {errors.contactEmail && (
                  <span className="error-text">{errors.contactEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  disabled={isSubmitting}
                />
                {errors.phoneNumber && (
                  <span className="error-text">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Location</h3>

            <div className="form-group">
              <label htmlFor="location_address">Address *</label>
              <input
                type="text"
                id="location_address"
                name="location_address"
                value={formData.location.address}
                onChange={handleChange}
                placeholder="Enter your NGO address"
                disabled={isSubmitting}
              />
              {errors.location_address && (
                <span className="error-text">{errors.location_address}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location_latitude">Latitude</label>
                <input
                  type="number"
                  id="location_latitude"
                  name="location_latitude"
                  value={formData.location.latitude}
                  onChange={handleChange}
                  placeholder="0.0000"
                  step="0.0001"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location_longitude">Longitude</label>
                <input
                  type="number"
                  id="location_longitude"
                  name="location_longitude"
                  value={formData.location.longitude}
                  onChange={handleChange}
                  placeholder="0.0000"
                  step="0.0001"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Creating NGO...' : 'Create NGO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NGORegistration;
