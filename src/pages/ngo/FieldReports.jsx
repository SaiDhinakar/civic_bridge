import { useState, useEffect } from 'react';
import { reportsData } from '../../data/ngo/reportsData';
import './FieldReports.css';

const FieldReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState('json');

  useEffect(() => {
    // Simulate loading with mock data
    const timer = setTimeout(() => {
      setReports(reportsData.data || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    // Mock export - no API call
    const blob = new Blob([JSON.stringify(reports, null, 2)], {
      type: 'application/json',
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `field-reports-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="field-reports-container">
        <div className="loading" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          <p>Loading field reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="field-reports-container">
      <div className="reports-header">
        <h2>Field Reports</h2>
        <div className="export-controls">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="export-format"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
          <button onClick={handleExport} className="btn-export">
            <i className="ri-download-line"></i>
            Export Reports
          </button>
        </div>
      </div>

      <CommunityReports reports={reports} />

      {reports.length === 0 && (
        <div className="no-reports">
          <i className="ri-file-text-line"></i>
          <p>No field reports yet</p>
          <span>Reports submitted by volunteers will appear here</span>
        </div>
      )}
    </div>
  );
};

export default FieldReports;
