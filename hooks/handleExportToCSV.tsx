import { useCallback } from 'react';

const useCSVExport = () => {
  const handleExportToCSV = (data, filename) => {
    if (!data.length) return;

    // Get all keys from the JSON data
    const keys = Object.keys(data[0]);

    // Create the CSV content
    const csvContent = [
      keys.join(","), // Header row
      ...data.map(row => 
        keys.map(key => {
          const value = row[key];
          if (Array.isArray(value)) {
            // Handle array values (e.g., images)
            return value.map(item => JSON.stringify(item)).join("; ");
          }
          if (value !== null && typeof value === 'object') {
            // Handle nested objects
            return JSON.stringify(value);
          }
          return `"${value}"`; // Handle regular values
        }).join(",")
      )
    ].join("\n");

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return useCallback(handleExportToCSV, []);
};

export default useCSVExport;
