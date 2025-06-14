import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Dashboard.css'; // Optional: for specific dashboard styling

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError('');
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Authentication token not found. Please login.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/metrics', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMetrics(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please login again.');
          // Optionally, redirect to login or clear token here
        } else if (err.response && err.response.data && err.response.data.error) {
          setError(`Failed to load metrics: ${err.response.data.error}`);
        } else {
          setError('Failed to load metrics. Please try again later.');
        }
        console.error('Error fetching metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return <div className="form-container"><p>Loading dashboard metrics...</p></div>;
  }

  if (error) {
    // Using message styling from App.css
    return <div className="form-container"><p className="message error">{error}</p></div>;
  }

  if (!metrics) {
    return <div className="form-container"><p>No metrics data available.</p></div>;
  }

  // Helper to display gender metrics
  const renderGenderMetrics = () => {
    if (!metrics.usersByGender || Object.keys(metrics.usersByGender).length === 0) {
      return <p>Gender data: Not available</p>;
    }
    return (
      <ul>
        {Object.entries(metrics.usersByGender).map(([gender, count]) => (
          <li key={gender}>{gender}: {count}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="form-container"> {/* Using existing .form-container for consistent styling */}
      <h2>Dashboard de Métricas</h2>
      <div className="dashboard-content"> {/* Add this wrapper */}
        <div role="group"> {/* Optionally, wrap sections in div role="group" if more structure is needed */}
          <h3>Resumo de Usuários:</h3>
          <p>Total de Usuários Registrados: <strong>{metrics.totalUsers}</strong></p>
          <p>Idade Média dos Usuários: <strong>{metrics.averageAge !== null && metrics.averageAge > 0 ? metrics.averageAge.toFixed(1) : 'N/A'} anos</strong></p>
        </div>
        <div role="group">
          <h4>Distribuição por Gênero:</h4>
          {renderGenderMetrics()}
        </div>
      </div> {/* Close dashboard-content wrapper */}
    </div>
  );
}

export default Dashboard;
