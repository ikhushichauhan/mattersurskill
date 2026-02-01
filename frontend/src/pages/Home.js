import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elements.forEach((el) => observerRef.current.observe(el));

    // Cleanup
    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.unobserve(el));
      }
    };
  }, []);

  // Character animation for title
  const animateText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div>
      <section className="hero">
        <h1>MattersUrSkill</h1>
        <p className="scroll-reveal">Connect with skilled workers and find genuine work opportunities</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }} className="scroll-reveal">
          <Link to="/jobs" className="btn btn-primary">
            Find Work
          </Link>
          <Link to="/workers" className="btn btn-secondary">
            Find Workers
          </Link>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="section">
        <h2 className="scroll-reveal">The Challenge We're Solving</h2>
        <p className="scroll-reveal-left">
          In today's rapidly evolving job market, millions of skilled workers struggle to find legitimate work opportunities, 
          while employers face difficulties in connecting with reliable, verified professionals. Traditional hiring platforms 
          often overlook the vast talent pool of workers in trades, services, and specialized skills who don't fit into 
          conventional employment categories.
        </p>
        <div className="section-highlight scroll-reveal-right">
          <p style={{ marginBottom: 0 }}>
            <strong>The disconnect is real:</strong> Skilled artisans, tradespeople, home-based workers, and service providers 
            lack a dedicated platform that understands their unique needs and showcases their true capabilities. Meanwhile, 
            work providers waste time and resources on unreliable hiring processes, often settling for unverified candidates.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section">
        <h2 className="scroll-reveal">Our Solution: Bridging Skills with Opportunities</h2>
        <p className="scroll-reveal">
          MattersUrSkill is more than just a job board—it's a comprehensive ecosystem designed to empower workers and 
          connect them with genuine opportunities. We've built a platform that prioritizes verification, skill showcasing, 
          and meaningful connections between workers and employers.
        </p>
        <p className="scroll-reveal">
          Through our innovative verification system, transparent review mechanism, and category-specific job matching, 
          we ensure that both workers and employers can build trust from the very first interaction. Our platform celebrates 
          the diversity of skills, from traditional crafts to modern services, giving every talent the recognition it deserves.
        </p>
      </section>

      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }} className="scroll-reveal">
          How It Works
        </h2>
        
        <div className="grid">
          <div className="card scroll-reveal">
            <h3>For Workers</h3>
            <p>Create your profile, showcase your skills, and apply for jobs that match your expertise and availability.</p>
            <ul style={{ marginTop: '1.5rem' }}>
              <li>Register as a worker</li>
              <li>List your skills and experience</li>
              <li>Browse and apply for jobs</li>
              <li>Get verified and build your reputation</li>
            </ul>
          </div>

          <div className="card scroll-reveal">
            <h3>For Work Providers</h3>
            <p>Post your job requirements and connect with verified, skilled workers in your area.</p>
            <ul style={{ marginTop: '1.5rem' }}>
              <li>Register as a work provider</li>
              <li>Post job opportunities</li>
              <li>Review worker applications</li>
              <li>Hire trusted professionals</li>
            </ul>
          </div>

          <div className="card scroll-reveal">
            <h3>Categories We Support</h3>
            <p>Wide range of work categories to match diverse skills and needs.</p>
            <ul style={{ marginTop: '1.5rem' }}>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MattersUrSkill</h3>
            <p>
              Empowering workers and connecting genuine opportunities. 
              Your skills matter, and we're here to prove it.
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📧 khushichauhan@gmail.com</p>
            <p>📱 +91 8860013597</p>
            <p>📍 Gurugram, Haryana 122001</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/workers">Find Workers</Link>
            <Link to="/team">About Us</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <Link to="#">Help Center</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">FAQs</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 MattersUrSkill. All rights reserved. Made with passion for skilled workers everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
