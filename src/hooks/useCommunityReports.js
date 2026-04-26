import { useEffect, useState } from 'react';

export default function useCommunityReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('communityReports');
    if (saved) {
      setReports(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('communityReports', JSON.stringify(reports));
  }, [reports]);

  const submitReport = (data) => {
    const report = {
      id: Date.now(),
      ...data,
      date: new Date().toLocaleDateString(),
      status: 'Submitted'
    };

    setReports((prev) => [report, ...prev.slice(0, 9)]);
  };

  return { reports, submitReport };
}