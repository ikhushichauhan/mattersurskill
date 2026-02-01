import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          MattersUrSkill
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/workers">Workers</Link></li>
          <li><Link to="/team">About Us</Link></li>
          {user && <li><Link to="/dashboard">Dashboard</Link></li>}
          {user && user.userType === 'provider' && (
            <li><Link to="/post-job">Post Job</Link></li>
          )}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <Link to={`/profile/${user._id}`} className="btn btn-secondary">
                Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
