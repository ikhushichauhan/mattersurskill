import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}`);
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    setMessage('');

    try {
      await axios.post(`/api/jobs/${id}/apply`, { coverLetter });
      setMessage('Application submitted successfully!');
      fetchJob();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (!job) {
    return <div className="empty-state"><h3>Job not found</h3></div>;
  }

  const hasApplied = user && job.applicants.some(app => app.worker._id === user._id);

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">{job.title}</h1>
          <span className={`status-badge status-${job.status}`}>{job.status}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <strong>Category:</strong>
            <p>{job.category}</p>
          </div>
          <div>
            <strong>Location:</strong>
            <p>📍 {job.location.city}, {job.location.state}</p>
          </div>
          <div>
            <strong>Work Type:</strong>
            <p>{job.workType}</p>
          </div>
          <div>
            <strong>Duration:</strong>
            <p>{job.duration}</p>
          </div>
          <div>
            <strong>Payment:</strong>
            <p className="job-payment">₹{job.payment.amount} / {job.payment.type}</p>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Description</h3>
          <p style={{ marginTop: '0.5rem' }}>{job.description}</p>
        </div>

        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Skills Required</h3>
            <div className="skills-list">
              {job.skillsRequired.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Posted By</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <div className="profile-avatar" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
              {job.provider.name.charAt(0)}
            </div>
            <div>
              <p><strong>{job.provider.name}</strong></p>
              <p style={{ color: '#666' }}>{job.provider.email}</p>
              <p className="profile-rating">⭐ {job.provider.rating.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        {user && user.userType === 'worker' && job.status === 'open' && !hasApplied && (
          <div>
            <h3>Apply for this Job</h3>
            <div className="form-group">
              <label className="form-label">Cover Letter</label>
              <textarea
                className="form-textarea"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Explain why you're a good fit for this job..."
              />
            </div>
            <button 
              onClick={handleApply} 
              className="btn btn-primary"
              disabled={applying}
            >
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        )}

        {hasApplied && (
          <div className="alert alert-info">
            You have already applied for this job
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
