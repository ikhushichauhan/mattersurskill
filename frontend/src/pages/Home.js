import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to MattersUrSkill</h1>
        <p>Connect with skilled workers and find genuine work opportunities</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/jobs" className="btn btn-primary">
            Find Work
          </Link>
          <Link to="/workers" className="btn btn-secondary">
            Find Workers
          </Link>
        </div>
      </section>

      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
          How It Works
        </h2>
        
        <div className="grid">
          <div className="card">
            <h3>For Workers</h3>
            <p>Create your profile, showcase your skills, and apply for jobs that match your expertise and availability.</p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
              <li>Register as a worker</li>
              <li>List your skills and experience</li>
              <li>Browse and apply for jobs</li>
              <li>Get verified and build your reputation</li>
            </ul>
          </div>

          <div className="card">
            <h3>For Work Providers</h3>
            <p>Post your job requirements and connect with verified, skilled workers in your area.</p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
              <li>Register as a work provider</li>
              <li>Post job opportunities</li>
              <li>Review worker applications</li>
              <li>Hire trusted professionals</li>
            </ul>
          </div>

          <div className="card">
            <h3>Categories We Support</h3>
            <p>Wide range of work categories to match diverse skills and needs.</p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
              <li>Home-based work (Cooking, Tailoring, Handicrafts)</li>
              <li>Local services (Plumbing, Electrical, Repair)</li>
              <li>Part-time & Freelancing</li>
              <li>Manual jobs & Delivery services</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '3rem' }}>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
