import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    availability: '',
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
  }, [workers]);

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

      const { data } = await axios.get(`/api/users/workers/search?${params.toString()}`);
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
      <h1 className="scroll-reveal" style={{ color: 'white', marginTop: '2rem', marginBottom: '2rem', fontSize: '3rem', fontWeight: '800', textAlign: 'center', background: 'linear-gradient(90deg, #ffffff 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #ffffff 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 3s linear infinite' }}>Find Skilled Workers</h1>

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
            <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>Availability</label>
            <select
              name="availability"
              className="form-select"
              value={filters.availability}
              onChange={handleFilterChange}
              style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 215, 0, 0.3)', color: 'white', padding: '0.75rem', borderRadius: '8px' }}
            >
              <option value="" style={{ background: '#1a1a1a' }}>All Availability</option>
              <option value="full-time" style={{ background: '#1a1a1a' }}>Full Time</option>
              <option value="part-time" style={{ background: '#1a1a1a' }}>Part Time</option>
              <option value="flexible" style={{ background: '#1a1a1a' }}>Flexible</option>
              <option value="weekends-only" style={{ background: '#1a1a1a' }}>Weekends Only</option>
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
          {workers.map((worker, index) => (
            <Link to={`/profile/${worker._id}`} key={worker._id} style={{ textDecoration: 'none' }}>
              <div className="job-card scroll-reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
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
