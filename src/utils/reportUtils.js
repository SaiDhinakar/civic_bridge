export const generateReportId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

export const formatReportDate = () => {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};