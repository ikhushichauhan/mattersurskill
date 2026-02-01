import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const { id } = useParams();
  const { user, updateUser } = useContext(AuthContext);
  const isOwnProfile = user && user._id === id;

  useEffect(() => {
    fetchProfile();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      setProfile(data);
      setEditData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${id}`);
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put('/api/users/profile', editData);
      setProfile(data);
      updateUser(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="empty-state"><h3>Profile not found</h3></div>;
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name.charAt(0)}
          </div>
          <div className="profile-info">
            {isEditing ? (
              <input
                type="text"
                name="name"
                className="form-input"
                value={editData.name}
                onChange={handleEditChange}
              />
            ) : (
              <h2>{profile.name}</h2>
            )}
            <p style={{ color: '#666' }}>{profile.email}</p>
            <p style={{ color: '#666' }}>📞 {profile.phone}</p>
            <p className="profile-rating">
              ⭐ {profile.rating.toFixed(1)} ({profile.reviewCount} reviews)
            </p>
            <span className="job-category">{profile.userType}</span>
          </div>
        </div>

        {isOwnProfile && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">
            Edit Profile
          </button>
        )}

        {isEditing && (
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleSave} className="btn btn-success" style={{ marginRight: '0.5rem' }}>
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        )}

        {profile.location && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Location</h3>
            {isEditing ? (
              <input
                type="text"
                name="location.city"
                className="form-input"
                value={editData.location?.city || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  location: { ...editData.location, city: e.target.value }
                })}
              />
            ) : (
              <p>📍 {profile.location.city}, {profile.location.state}</p>
            )}
          </div>
        )}

        {profile.bio && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                className="form-textarea"
                value={editData.bio || ''}
                onChange={handleEditChange}
              />
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>
        )}

        {profile.userType === 'worker' && (
          <>
            {profile.skills && profile.skills.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3>Skills</h3>
                <div className="skills-list">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {profile.categories && profile.categories.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3>Categories</h3>
                <div className="skills-list">
                  {profile.categories.map((category, index) => (
                    <span key={index} className="job-category" style={{ marginRight: '0.5rem' }}>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '1.5rem' }}>
              <h3>Work Information</h3>
              <p><strong>Availability:</strong> {profile.availability}</p>
              <p><strong>Jobs Completed:</strong> {profile.completedJobs}</p>
              {profile.experience && <p><strong>Experience:</strong> {profile.experience}</p>}
            </div>
          </>
        )}

        {reviews.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Reviews ({reviews.length})</h3>
            {reviews.map(review => (
              <div 
                key={review._id} 
                style={{ 
                  padding: '1rem', 
                  background: '#f9f9f9', 
                  borderRadius: '8px', 
                  marginTop: '1rem' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong>{review.reviewer.name}</strong>
                  <span className="profile-rating">
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p style={{ color: '#666' }}>{review.comment}</p>
                {review.job && (
                  <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
                    Job: {review.job.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
