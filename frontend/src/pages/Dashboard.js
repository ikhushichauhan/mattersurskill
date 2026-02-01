import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
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
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const { data } = await axios.get('/api/jobs/my/jobs');
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptApplicant = async (jobId, applicantId) => {
    try {
      await axios.put(`/api/jobs/${jobId}/applicants/${applicantId}`, {
        status: 'accepted'
      });
      fetchMyJobs();
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  const handleRejectApplicant = async (jobId, applicantId) => {
    try {
      await axios.put(`/api/jobs/${jobId}/applicants/${applicantId}`, {
        status: 'rejected'
      });
      fetchMyJobs();
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  const handleCompleteJob = async (jobId) => {
    try {
      await axios.put(`/api/jobs/${jobId}/complete`);
      fetchMyJobs();
    } catch (error) {
      console.error('Error completing job:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 className="scroll-reveal" style={{ 
        color: 'white', 
        marginBottom: '2rem', 
        fontSize: '3rem', 
        fontWeight: '800', 
        textAlign: 'center',
        background: 'linear-gradient(90deg, #ffffff 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #ffffff 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 3s linear infinite'
      }}>
        {user.userType === 'provider' ? 'My Posted Jobs' : 'My Applications'}
      </h1>

      {user.userType === 'provider' && (
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/post-job" className="btn btn-primary" style={{ 
            padding: '1rem 2rem', 
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
            border: 'none',
            color: '#000',
            fontWeight: '700',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
          }}>
            ✨ Post New Job
          </Link>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs found</h3>
          <p>
            {user.userType === 'provider'
              ? 'Start by posting your first job'
              : 'Browse available jobs and apply'}
          </p>
        </div>
      ) : (
        <div>
          {jobs.map((job, index) => (
            <div key={job._id} className="card scroll-reveal" style={{ 
              marginBottom: '1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              transition: 'all 0.3s ease',
              transitionDelay: `${index * 0.1}s`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h2 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>{job.title}</h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{job.description.substring(0, 150)}...</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span className="job-category" style={{ 
                      background: 'rgba(255, 215, 0, 0.2)', 
                      border: '1px solid rgba(255, 215, 0, 0.5)',
                      color: '#FFD700'
                    }}>{job.category}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>📍 {job.location.city}</span>
                    <span className="job-payment" style={{ 
                      background: 'rgba(76, 175, 80, 0.2)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      color: '#4CAF50',
                      fontWeight: '600'
                    }}>
                      ₹{job.payment.amount} / {job.payment.type}
                    </span>
                  </div>
                </div>
                <span className={`status-badge status-${job.status}`}>{job.status}</span>
              </div>

              {user.userType === 'provider' && job.applicants && job.applicants.length > 0 && (
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255, 215, 0, 0.2)', paddingTop: '1rem' }}>
                  <h3 style={{ color: '#FFD700', marginBottom: '1rem' }}>Applicants ({job.applicants.length})</h3>
                  {job.applicants.map(applicant => (
                    <div 
                      key={applicant._id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 215, 0, 0.15)',
                        borderRadius: '8px',
                        marginTop: '0.5rem'
                      }}
                    >
                      <div>
                        <p style={{ color: 'white', fontWeight: '600' }}>{applicant.worker?.name}</p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>{applicant.worker?.email}</p>
                        {applicant.coverLetter && (
                          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}>
                            "{applicant.coverLetter}"
                          </p>
                        )}
                        <span className={`status-badge status-${applicant.status === 'pending' ? 'open' : applicant.status === 'accepted' ? 'completed' : 'cancelled'}`} style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                          {applicant.status}
                        </span>
                      </div>
                      {applicant.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleAcceptApplicant(job._id, applicant._id)}
                            className="btn btn-success"
                            style={{ background: '#4CAF50', border: 'none', padding: '0.5rem 1rem' }}
                          >
                            ✓ Accept
                          </button>
                          <button 
                            onClick={() => handleRejectApplicant(job._id, applicant._id)}
                            className="btn btn-danger"
                            style={{ background: '#f44336', border: 'none', padding: '0.5rem 1rem' }}
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {user.userType === 'provider' && job.status === 'in-progress' && (
                <button 
                  onClick={() => handleCompleteJob(job._id)}
                  className="btn btn-success"
                  style={{ marginTop: '1rem', background: '#4CAF50', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
                >
                  ✓ Mark as Completed
                </button>
              )}

              {user.userType === 'worker' && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.15)' }}>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}><strong style={{ color: '#FFD700' }}>Provider:</strong> {job.provider?.name}</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{job.provider?.email}</p>
                </div>
              )}

              <Link to={`/jobs/${job._id}`} className="btn btn-secondary" style={{ marginTop: '1rem', background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.5)', color: '#FFD700', fontWeight: '600' }}>
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
