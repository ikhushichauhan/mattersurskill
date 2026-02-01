import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    availability: '',
  });

  useEffect(() => {
    fetchWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchWorkers = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.city) params.append('city', filters.city);
      if (filters.availability) params.append('availability', filters.availability);

      const { data } = await api.get(`/api/users/workers/search?${params.toString()}`);
      setWorkers(data.workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div className="loading">Loading workers...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>Find Skilled Workers</h1>

      <div className="card">
        <h3>Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="home-based">Home Based</option>
              <option value="part-time">Part Time</option>
              <option value="freelancing">Freelancing</option>
              <option value="local-services">Local Services</option>
              <option value="cooking">Cooking</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-input"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Availability</label>
            <select
              name="availability"
              className="form-select"
              value={filters.availability}
              onChange={handleFilterChange}
            >
              <option value="">All Availability</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="flexible">Flexible</option>
              <option value="weekends-only">Weekends Only</option>
            </select>
          </div>
        </div>
      </div>

      {workers.length === 0 ? (
        <div className="empty-state">
          <h3>No workers found</h3>
          <p>Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid">
          {workers.map(worker => (
            <Link to={`/profile/${worker._id}`} key={worker._id} style={{ textDecoration: 'none' }}>
              <div className="job-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="profile-avatar" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.25rem' }}>{worker.name}</h3>
                    <p className="profile-rating">⭐ {worker.rating.toFixed(1)} ({worker.reviewCount} reviews)</p>
                  </div>
                </div>

                {worker.location && (
                  <p className="job-location">📍 {worker.location.city}</p>
                )}

                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong>Availability:</strong> {worker.availability}
                </p>

                {worker.skills && worker.skills.length > 0 && (
                  <div className="skills-list">
                    {worker.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {worker.skills.length > 3 && (
                      <span className="skill-tag">+{worker.skills.length - 3} more</span>
                    )}
                  </div>
                )}

                <p style={{ marginTop: '0.5rem', color: '#27ae60', fontWeight: 'bold' }}>
                  {worker.completedJobs} jobs completed
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workers;
