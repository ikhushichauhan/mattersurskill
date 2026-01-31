import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

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
      <h1 style={{ color: 'white', marginBottom: '1rem' }}>
        {user.userType === 'provider' ? 'My Posted Jobs' : 'My Applications'}
      </h1>

      {user.userType === 'provider' && (
        <Link to="/post-job" className="btn btn-primary" style={{ marginBottom: '1.5rem' }}>
          Post New Job
        </Link>
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
          {jobs.map(job => (
            <div key={job._id} className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h2>{job.title}</h2>
                  <p style={{ color: '#666' }}>{job.description.substring(0, 150)}...</p>
                  <div style={{ marginTop: '0.5rem' }}>
                    <span className="job-category">{job.category}</span>
                    <span style={{ marginLeft: '1rem' }}>📍 {job.location.city}</span>
                    <span style={{ marginLeft: '1rem' }} className="job-payment">
                      ₹{job.payment.amount} / {job.payment.type}
                    </span>
                  </div>
                </div>
                <span className={`status-badge status-${job.status}`}>{job.status}</span>
              </div>

              {user.userType === 'provider' && job.applicants && job.applicants.length > 0 && (
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
                  <h3>Applicants ({job.applicants.length})</h3>
                  {job.applicants.map(applicant => (
                    <div 
                      key={applicant._id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '1rem',
                        background: '#f9f9f9',
                        borderRadius: '8px',
                        marginTop: '0.5rem'
                      }}
                    >
                      <div>
                        <p><strong>{applicant.worker?.name}</strong></p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{applicant.worker?.email}</p>
                        {applicant.coverLetter && (
                          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            <em>"{applicant.coverLetter}"</em>
                          </p>
                        )}
                        <span className={`status-badge status-${applicant.status === 'pending' ? 'open' : applicant.status === 'accepted' ? 'completed' : 'cancelled'}`}>
                          {applicant.status}
                        </span>
                      </div>
                      {applicant.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleAcceptApplicant(job._id, applicant._id)}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleRejectApplicant(job._id, applicant._id)}
                            className="btn btn-danger"
                          >
                            Reject
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
                  style={{ marginTop: '1rem' }}
                >
                  Mark as Completed
                </button>
              )}

              {user.userType === 'worker' && (
                <div style={{ marginTop: '1rem' }}>
                  <p><strong>Provider:</strong> {job.provider?.name}</p>
                  <p style={{ color: '#666' }}>{job.provider?.email}</p>
                </div>
              )}

              <Link to={`/jobs/${job._id}`} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
