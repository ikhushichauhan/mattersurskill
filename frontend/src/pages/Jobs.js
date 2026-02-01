import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    workType: '',
  });

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.city) params.append('city', filters.city);
      if (filters.workType) params.append('workType', filters.workType);
      params.append('status', 'open');

      const { data } = await api.get(`/api/jobs?${params.toString()}`);
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>Available Jobs</h1>

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
            <label className="form-label">Work Type</label>
            <select
              name="workType"
              className="form-select"
              value={filters.workType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs found</h3>
          <p>Try adjusting your filters or check back later</p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map(job => (
            <Link to={`/jobs/${job._id}`} key={job._id} style={{ textDecoration: 'none' }}>
              <div className="job-card">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-category">{job.category}</span>
                <p className="job-location">📍 {job.location.city}</p>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  {job.description.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span className="job-payment">
                    ₹{job.payment.amount} / {job.payment.type}
                  </span>
                  <span className="status-badge status-open">{job.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
