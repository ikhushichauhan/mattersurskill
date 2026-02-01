import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    workType: '',
  });
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all elements with scroll-reveal classes
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, [jobs]);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.city) params.append('city', filters.city);
      if (filters.workType) params.append('workType', filters.workType);
      params.append('status', 'open');

      const { data } = await axios.get(`/api/jobs?${params.toString()}`);
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
      <h1 className="scroll-reveal" style={{ color: 'white', marginTop: '2rem', marginBottom: '2rem', fontSize: '3rem', fontWeight: '800', textAlign: 'center', background: 'linear-gradient(90deg, #ffffff 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #ffffff 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Available Jobs</h1>

      <div className="card scroll-reveal" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
        <h3 style={{ color: '#FFD700', marginBottom: '1.5rem' }}>Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>Category</label>
            <select
              name="category"
              className="form-select"
              value={filters.category}
              onChange={handleFilterChange}
              style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 215, 0, 0.3)', color: 'white', padding: '0.75rem', borderRadius: '8px' }}
            >
              <option value="" style={{ background: '#1a1a1a' }}>All Categories</option>
              <option value="home-based" style={{ background: '#1a1a1a' }}>Home Based</option>
              <option value="part-time" style={{ background: '#1a1a1a' }}>Part Time</option>
              <option value="freelancing" style={{ background: '#1a1a1a' }}>Freelancing</option>
              <option value="local-services" style={{ background: '#1a1a1a' }}>Local Services</option>
              <option value="cooking" style={{ background: '#1a1a1a' }}>Cooking</option>
              <option value="plumbing" style={{ background: '#1a1a1a' }}>Plumbing</option>
              <option value="electrical" style={{ background: '#1a1a1a' }}>Electrical</option>
              <option value="delivery" style={{ background: '#1a1a1a' }}>Delivery</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>City</label>
            <select
              name="city"
              className="form-select"
              value={filters.city}
              onChange={handleFilterChange}
              style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 215, 0, 0.3)', color: 'white', padding: '0.75rem', borderRadius: '8px' }}
            >
              <option value="" style={{ background: '#1a1a1a' }}>All Cities</option>
              <option value="Delhi" style={{ background: '#1a1a1a' }}>Delhi</option>
              <option value="Mumbai" style={{ background: '#1a1a1a' }}>Mumbai</option>
              <option value="Bangalore" style={{ background: '#1a1a1a' }}>Bangalore</option>
              <option value="Hyderabad" style={{ background: '#1a1a1a' }}>Hyderabad</option>
              <option value="Chennai" style={{ background: '#1a1a1a' }}>Chennai</option>
              <option value="Kolkata" style={{ background: '#1a1a1a' }}>Kolkata</option>
              <option value="Pune" style={{ background: '#1a1a1a' }}>Pune</option>
              <option value="Ahmedabad" style={{ background: '#1a1a1a' }}>Ahmedabad</option>
              <option value="Jaipur" style={{ background: '#1a1a1a' }}>Jaipur</option>
              <option value="Gurugram" style={{ background: '#1a1a1a' }}>Gurugram</option>
              <option value="Noida" style={{ background: '#1a1a1a' }}>Noida</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>Work Type</label>
            <select
              name="workType"
              className="form-select"
              value={filters.workType}
              onChange={handleFilterChange}
              style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 215, 0, 0.3)', color: 'white', padding: '0.75rem', borderRadius: '8px' }}
            >
              <option value="" style={{ background: '#1a1a1a' }}>All Types</option>
              <option value="remote" style={{ background: '#1a1a1a' }}>Remote</option>
              <option value="on-site" style={{ background: '#1a1a1a' }}>On-site</option>
              <option value="hybrid" style={{ background: '#1a1a1a' }}>Hybrid</option>
              <option value="full-time" style={{ background: '#1a1a1a' }}>Full Time</option>
              <option value="part-time" style={{ background: '#1a1a1a' }}>Part Time</option>
              <option value="contract" style={{ background: '#1a1a1a' }}>Contract</option>
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
          {jobs.map((job, index) => (
            <Link to={`/jobs/${job._id}`} key={job._id} style={{ textDecoration: 'none' }}>
              <div className="job-card scroll-reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
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
