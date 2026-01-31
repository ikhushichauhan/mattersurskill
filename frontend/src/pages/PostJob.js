import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skillsRequired: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    workType: 'on-site',
    duration: '',
    paymentAmount: '',
    paymentType: 'fixed',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()).filter(s => s),
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        workType: formData.workType,
        duration: formData.duration,
        payment: {
          amount: parseFloat(formData.paymentAmount),
          type: formData.paymentType,
        },
        deadline: formData.deadline || undefined,
      };

      const { data } = await axios.post('/api/jobs', jobData);
      navigate(`/jobs/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (user?.userType !== 'provider') {
    return (
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="alert alert-error">
          Only work providers can post jobs
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '700px', marginTop: '2rem' }}>
      <div className="card">
        <h2>Post a New Job</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Cook needed for home"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the job requirements in detail..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="home-based">Home Based</option>
              <option value="part-time">Part Time</option>
              <option value="freelancing">Freelancing</option>
              <option value="local-services">Local Services</option>
              <option value="manual-jobs">Manual Jobs</option>
              <option value="cooking">Cooking</option>
              <option value="packing">Packing</option>
              <option value="handicrafts">Handicrafts</option>
              <option value="tailoring">Tailoring</option>
              <option value="baking">Baking</option>
              <option value="artwork">Artwork</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="delivery">Delivery</option>
              <option value="repair">Repair</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Skills Required (comma-separated)</label>
            <input
              type="text"
              name="skillsRequired"
              className="form-input"
              value={formData.skillsRequired}
              onChange={handleChange}
              placeholder="e.g., Cooking, Kitchen Management"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Work Type</label>
            <select
              name="workType"
              className="form-select"
              value={formData.workType}
              onChange={handleChange}
              required
            >
              <option value="on-site">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-input"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-input"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Duration</label>
            <input
              type="text"
              name="duration"
              className="form-input"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="e.g., 2 weeks, 3 months, permanent"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Payment Amount (₹)</label>
              <input
                type="number"
                name="paymentAmount"
                className="form-input"
                value={formData.paymentAmount}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Payment Type</label>
              <select
                name="paymentType"
                className="form-select"
                value={formData.paymentType}
                onChange={handleChange}
                required
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="fixed">Fixed</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Deadline (Optional)</label>
            <input
              type="date"
              name="deadline"
              className="form-input"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
