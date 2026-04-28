import React, { useState, useEffect } from 'react';
import useCommunityReports from '../../hooks/useCommunityReports';
import './CommunityPage.css';
import { CATEGORIES } from './types';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('new');
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    photo: null
  });
  const [user, setUser] = useState({
    name: 'Community Member',
    role: 'Community Member',
    organization: 'CivicBridge'
  });

  const { reports, submitReport } = useCommunityReports();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedName || storedRole) {
      setUser(prev => ({
        ...prev,
        name: storedName || prev.name,
        role: storedRole || prev.role
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReport(formData);
    setFormData({ category: '', description: '', location: '', photo: null });
  };

  const formatReportCode = (id) => `CB-${String(id).slice(-6).padStart(6, '0')}`;

  return (
    <div className="community-page">
      <header className="header">
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark" />
            <div>
              <h1>CivicBridge</h1>
              <p>Drive impact with clarity and consistency.</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="bell-button" aria-label="Notifications">
            </button>

            <div className="profile-panel">
              <div className="profile-avatar">{user.name.charAt(0)}</div>
              <div className="profile-text">
                <span>Hello, {user.name}</span>
                <small>{user.role}</small>
              </div>
              <button className="help-button">Need Help</button>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <h2>Hi, {user.name}</h2>
          <p>{user.role}</p>
          <span>Review reports, coordinate actions, and support your community efforts.</span>
        </div>
      </header>

      <main className="container">
        <nav className="tabs">
          <button className={activeTab === 'new' ? 'active' : ''} onClick={() => setActiveTab('new')}>
            New Report
          </button>
          <button className={activeTab === 'track' ? 'active' : ''} onClick={() => setActiveTab('track')}>
            Track Status
          </button>
        </nav>

        {activeTab === 'new' && (
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="category">Category <span className="required">*</span></label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="description">Description <span className="required">*</span></label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the issue"
              />
            </div>

            <div className="field">
              <label htmlFor="location">Location <span className="required">*</span></label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Street address"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="photo">Photo <span className="required">*</span></label>
              <div className="upload-area">
                <input id="photo" type="file" name="photo" accept="image/*" onChange={handleChange} required />
                <div className="upload-ui">
                  <span className="upload-icon">📸</span>
                  <div className="upload-text">
                    <strong>Click to upload</strong>
                    <span>or drag and drop</span>
                  </div>
                </div>
              </div>
              {formData.photo && <div className="file-info">Selected: {formData.photo.name}</div>}
            </div>

            <button type="submit">Submit Report</button>
          </form>
        )}

        {activeTab === 'track' && (
          <div className="track">
            <div className="track-header">
              <h2>Status Timeline</h2>
            </div>

            {reports.length ? (
              reports.map((r) => {
                const timeline = [
                  {
                    title: 'Report Submitted',
                    description: 'Your report was received and verified',
                    date: r.date,
                    time: '2:34 PM',
                    state: 'completed'
                  },
                  {
                    title: 'Reviewed by Platform',
                    description: `AI categorised as: ${r.category} — Moderate severity`,
                    date: r.date,
                    time: '2:36 PM',
                    state: 'completed'
                  },
                  {
                    title: 'Matched to NGO',
                    description: 'GreenRoots Foundation accepted the task',
                    date: r.date,
                    time: '4:12 PM',
                    state: 'completed'
                  },
                  {
                    title: 'Volunteers Deployed',
                    description: 'Team of 4 assigned — field work underway',
                    date: 'Dec 21',
                    time: '8:00 AM',
                    state: 'current'
                  },
                  {
                    title: 'Issue Resolved',
                    description: 'Final report and photo verification',
                    date: '',
                    time: '',
                    state: 'upcoming'
                  }
                ];

                return (
                  <div key={r.id} className="report-timeline">
                    <div className="timeline-title">
                      <span>Status Timeline — Report #{formatReportCode(r.id)}</span>
                    </div>

                    <div className="timeline">
                      {timeline.map((step) => (
                        <div key={step.title} className={`step ${step.state}`}>
                          <div className="step-badge">
                            {step.state === 'completed' ? '✓' : step.state === 'current' ? '⟳' : '○'}
                          </div>
                          <div className="step-content">
                            <div className="step-heading">
                              <strong>{step.title}</strong>
                              <span>{step.description}</span>
                            </div>
                            <div className="step-meta">
                              {step.date && <span>{step.date}</span>}
                              {step.time && <span>{step.time}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty">No reports yet. Submit one.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}