import React, { useEffect, useRef } from 'react';

const Team = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: 'Khushi Chauhan',
      role: 'Hosting and Deploy Manager',
      email: '2401201167@krmu.edu.in',
      image: '/team/khushi.png'
    },
    {
      id: 2,
      name: 'Shweta Jha',
      role: 'Backend Developer',
      email: '2401201127@krmu.edu.in',
      image: '/team/shweta.png'
    },
    {
      id: 3,
      name: 'Kartik Malhotra',
      role: 'Frontend Developer',
      email: '2401201160@krmu.edu.in',
      image: '/team/kartik.png'
    },
    {
      id: 4,
      name: 'Akanksha Kumari',
      role: 'Database Manager',
      email: '2401201162@krmu.edu.in',
      image: '/team/akanksha.png'
    },
    {
      id: 5,
      name: 'Vikram Das',
      role: 'UI/UX Designer',
      email: '2401201217@krmu.edu.in',
      image: '/team/vikram.png'
    }
  ];

  return (
    <div className="team-page">
      <div className="team-hero">
        <h1 className="animate-text">{animateText('Know About Us')}</h1>
        <h2 className="team-hero-subtitle scroll-reveal" style={{ 
          fontSize: '3rem', 
          fontWeight: '900', 
          marginBottom: '3rem', 
          marginTop: '2rem',
          background: 'linear-gradient(90deg, #ffffff 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #ffffff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite'
        }}>Team Behind The Website</h2>
        <p className="scroll-reveal">The talented individuals behind MattersUrSkill</p>
      </div>

      <div className="container">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={member.id} className={`team-member-card scroll-reveal`} style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className="team-member-image-wrapper">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-member-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="team-member-placeholder">${member.name.charAt(0)}</div>`;
                  }}
                />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <div className="team-member-role">{member.role}</div>
                <a href={`mailto:${member.email}`} className="team-member-email">
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="tech-stack-section">
        <div className="container">
          <h2 className="tech-stack-title scroll-reveal">Tech Stack Used In This Website</h2>
          <p className="tech-stack-subtitle scroll-reveal">Built with modern, powerful technologies</p>
          
          <div className="floating-tech-container scroll-reveal">
            {/* React - Cyan/Blue */}
            <div className="tech-float-item" style={{ 
              '--x': '10%', '--y': '15%', '--duration': '20s', '--delay': '0s',
              '--border-color': 'rgba(97, 218, 251, 0.4)',
              '--hover-bg': 'rgba(97, 218, 251, 0.15)',
              '--hover-border': 'rgba(97, 218, 251, 0.9)',
              '--hover-shadow': 'rgba(97, 218, 251, 0.6)',
              '--icon-shadow': 'rgba(97, 218, 251, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="tech-logo" />
              <span>React</span>
            </div>

            {/* Node.js - Green */}
            <div className="tech-float-item" style={{ 
              '--x': '80%', '--y': '10%', '--duration': '25s', '--delay': '2s',
              '--border-color': 'rgba(104, 160, 99, 0.4)',
              '--hover-bg': 'rgba(104, 160, 99, 0.15)',
              '--hover-border': 'rgba(104, 160, 99, 0.9)',
              '--hover-shadow': 'rgba(104, 160, 99, 0.6)',
              '--icon-shadow': 'rgba(104, 160, 99, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="tech-logo" />
              <span>Node.js</span>
            </div>

            {/* Express - White/Gray */}
            <div className="tech-float-item" style={{ 
              '--x': '25%', '--y': '45%', '--duration': '22s', '--delay': '4s',
              '--border-color': 'rgba(255, 255, 255, 0.4)',
              '--hover-bg': 'rgba(255, 255, 255, 0.15)',
              '--hover-border': 'rgba(255, 255, 255, 0.9)',
              '--hover-shadow': 'rgba(255, 255, 255, 0.6)',
              '--icon-shadow': 'rgba(255, 255, 255, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="tech-logo" style={{ filter: 'invert(1)' }} />
              <span>Express</span>
            </div>

            {/* MongoDB - Green */}
            <div className="tech-float-item" style={{ 
              '--x': '75%', '--y': '50%', '--duration': '28s', '--delay': '1s',
              '--border-color': 'rgba(76, 175, 80, 0.4)',
              '--hover-bg': 'rgba(76, 175, 80, 0.15)',
              '--hover-border': 'rgba(76, 175, 80, 0.9)',
              '--hover-shadow': 'rgba(76, 175, 80, 0.6)',
              '--icon-shadow': 'rgba(76, 175, 80, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="tech-logo" />
              <span>MongoDB</span>
            </div>

            {/* JWT - Purple/Magenta */}
            <div className="tech-float-item" style={{ 
              '--x': '50%', '--y': '20%', '--duration': '24s', '--delay': '3s',
              '--border-color': 'rgba(211, 84, 186, 0.4)',
              '--hover-bg': 'rgba(211, 84, 186, 0.15)',
              '--hover-border': 'rgba(211, 84, 186, 0.9)',
              '--hover-shadow': 'rgba(211, 84, 186, 0.6)',
              '--icon-shadow': 'rgba(211, 84, 186, 0.5)'
            }}>
              <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" alt="JWT" className="tech-logo" />
              <span>JWT</span>
            </div>

            {/* CSS3 - Blue */}
            <div className="tech-float-item" style={{ 
              '--x': '15%', '--y': '75%', '--duration': '26s', '--delay': '5s',
              '--border-color': 'rgba(33, 150, 243, 0.4)',
              '--hover-bg': 'rgba(33, 150, 243, 0.15)',
              '--hover-border': 'rgba(33, 150, 243, 0.9)',
              '--hover-shadow': 'rgba(33, 150, 243, 0.6)',
              '--icon-shadow': 'rgba(33, 150, 243, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="tech-logo" />
              <span>CSS3</span>
            </div>

            {/* Axios - Purple */}
            <div className="tech-float-item" style={{ 
              '--x': '85%', '--y': '70%', '--duration': '23s', '--delay': '1.5s',
              '--border-color': 'rgba(94, 53, 177, 0.4)',
              '--hover-bg': 'rgba(94, 53, 177, 0.15)',
              '--hover-border': 'rgba(94, 53, 177, 0.9)',
              '--hover-shadow': 'rgba(94, 53, 177, 0.6)',
              '--icon-shadow': 'rgba(94, 53, 177, 0.5)'
            }}>
              <img src="https://axios-http.com/assets/logo.svg" alt="Axios" className="tech-logo" />
              <span>Axios</span>
            </div>

            {/* JavaScript - Yellow */}
            <div className="tech-float-item" style={{ 
              '--x': '40%', '--y': '65%', '--duration': '27s', '--delay': '2.5s',
              '--border-color': 'rgba(247, 223, 30, 0.4)',
              '--hover-bg': 'rgba(247, 223, 30, 0.15)',
              '--hover-border': 'rgba(247, 223, 30, 0.9)',
              '--hover-shadow': 'rgba(247, 223, 30, 0.6)',
              '--icon-shadow': 'rgba(247, 223, 30, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="tech-logo" />
              <span>JavaScript</span>
            </div>

            {/* HTML5 - Orange */}
            <div className="tech-float-item" style={{ 
              '--x': '65%', '--y': '30%', '--duration': '21s', '--delay': '4.5s',
              '--border-color': 'rgba(227, 79, 38, 0.4)',
              '--hover-bg': 'rgba(227, 79, 38, 0.15)',
              '--hover-border': 'rgba(227, 79, 38, 0.9)',
              '--hover-shadow': 'rgba(227, 79, 38, 0.6)',
              '--icon-shadow': 'rgba(227, 79, 38, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="tech-logo" />
              <span>HTML5</span>
            </div>

            {/* Git - Orange/Red */}
            <div className="tech-float-item" style={{ 
              '--x': '30%', '--y': '85%', '--duration': '29s', '--delay': '0.5s',
              '--border-color': 'rgba(240, 80, 51, 0.4)',
              '--hover-bg': 'rgba(240, 80, 51, 0.15)',
              '--hover-border': 'rgba(240, 80, 51, 0.9)',
              '--hover-shadow': 'rgba(240, 80, 51, 0.6)',
              '--icon-shadow': 'rgba(240, 80, 51, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="tech-logo" />
              <span>Git</span>
            </div>

            {/* Postman - Orange */}
            <div className="tech-float-item" style={{ 
              '--x': '90%', '--y': '40%', '--duration': '25s', '--delay': '3.5s',
              '--border-color': 'rgba(255, 109, 56, 0.4)',
              '--hover-bg': 'rgba(255, 109, 56, 0.15)',
              '--hover-border': 'rgba(255, 109, 56, 0.9)',
              '--hover-shadow': 'rgba(255, 109, 56, 0.6)',
              '--icon-shadow': 'rgba(255, 109, 56, 0.5)'
            }}>
              <img src="https://www.svgrepo.com/show/354202/postman-icon.svg" alt="Postman" className="tech-logo" />
              <span>Postman</span>
            </div>

            {/* VS Code - Blue */}
            <div className="tech-float-item" style={{ 
              '--x': '55%', '--y': '80%', '--duration': '22s', '--delay': '1.8s',
              '--border-color': 'rgba(0, 122, 204, 0.4)',
              '--hover-bg': 'rgba(0, 122, 204, 0.15)',
              '--hover-border': 'rgba(0, 122, 204, 0.9)',
              '--hover-shadow': 'rgba(0, 122, 204, 0.6)',
              '--icon-shadow': 'rgba(0, 122, 204, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="tech-logo" />
              <span>VS Code</span>
            </div>

            {/* npm - Red */}
            <div className="tech-float-item" style={{ 
              '--x': '5%', '--y': '50%', '--duration': '24s', '--delay': '3.2s',
              '--border-color': 'rgba(203, 56, 55, 0.4)',
              '--hover-bg': 'rgba(203, 56, 55, 0.15)',
              '--hover-border': 'rgba(203, 56, 55, 0.9)',
              '--hover-shadow': 'rgba(203, 56, 55, 0.6)',
              '--icon-shadow': 'rgba(203, 56, 55, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" className="tech-logo" />
              <span>npm</span>
            </div>

            {/* GitHub - White/Black */}
            <div className="tech-float-item" style={{ 
              '--x': '95%', '--y': '20%', '--duration': '26s', '--delay': '2.8s',
              '--border-color': 'rgba(255, 255, 255, 0.4)',
              '--hover-bg': 'rgba(255, 255, 255, 0.15)',
              '--hover-border': 'rgba(255, 255, 255, 0.9)',
              '--hover-shadow': 'rgba(255, 255, 255, 0.6)',
              '--icon-shadow': 'rgba(255, 255, 255, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="tech-logo" style={{ filter: 'invert(1)' }} />
              <span>GitHub</span>
            </div>

            {/* Redux - Purple */}
            <div className="tech-float-item" style={{ 
              '--x': '20%', '--y': '30%', '--duration': '23s', '--delay': '4.2s',
              '--border-color': 'rgba(118, 74, 188, 0.4)',
              '--hover-bg': 'rgba(118, 74, 188, 0.15)',
              '--hover-border': 'rgba(118, 74, 188, 0.9)',
              '--hover-shadow': 'rgba(118, 74, 188, 0.6)',
              '--icon-shadow': 'rgba(118, 74, 188, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="Redux" className="tech-logo" />
              <span>Redux</span>
            </div>

            {/* Bootstrap - Purple */}
            <div className="tech-float-item" style={{ 
              '--x': '45%', '--y': '10%', '--duration': '28s', '--delay': '1.5s',
              '--border-color': 'rgba(86, 61, 124, 0.4)',
              '--hover-bg': 'rgba(86, 61, 124, 0.15)',
              '--hover-border': 'rgba(86, 61, 124, 0.9)',
              '--hover-shadow': 'rgba(86, 61, 124, 0.6)',
              '--icon-shadow': 'rgba(86, 61, 124, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" className="tech-logo" />
              <span>Bootstrap</span>
            </div>

            {/* Docker - Blue */}
            <div className="tech-float-item" style={{ 
              '--x': '70%', '--y': '85%', '--duration': '25s', '--delay': '3.8s',
              '--border-color': 'rgba(0, 184, 240, 0.4)',
              '--hover-bg': 'rgba(0, 184, 240, 0.15)',
              '--hover-border': 'rgba(0, 184, 240, 0.9)',
              '--hover-shadow': 'rgba(0, 184, 240, 0.6)',
              '--icon-shadow': 'rgba(0, 184, 240, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="tech-logo" />
              <span>Docker</span>
            </div>

            {/* TypeScript - Blue */}
            <div className="tech-float-item" style={{ 
              '--x': '12%', '--y': '60%', '--duration': '27s', '--delay': '2.2s',
              '--border-color': 'rgba(49, 120, 198, 0.4)',
              '--hover-bg': 'rgba(49, 120, 198, 0.15)',
              '--hover-border': 'rgba(49, 120, 198, 0.9)',
              '--hover-shadow': 'rgba(49, 120, 198, 0.6)',
              '--icon-shadow': 'rgba(49, 120, 198, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="tech-logo" />
              <span>TypeScript</span>
            </div>

            {/* Figma - Multi-color */}
            <div className="tech-float-item" style={{ 
              '--x': '88%', '--y': '55%', '--duration': '24s', '--delay': '4.8s',
              '--border-color': 'rgba(242, 78, 30, 0.4)',
              '--hover-bg': 'rgba(242, 78, 30, 0.15)',
              '--hover-border': 'rgba(242, 78, 30, 0.9)',
              '--hover-shadow': 'rgba(242, 78, 30, 0.6)',
              '--icon-shadow': 'rgba(242, 78, 30, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="tech-logo" />
              <span>Figma</span>
            </div>

            {/* Webpack - Blue */}
            <div className="tech-float-item" style={{ 
              '--x': '35%', '--y': '92%', '--duration': '26s', '--delay': '1.2s',
              '--border-color': 'rgba(142, 214, 251, 0.4)',
              '--hover-bg': 'rgba(142, 214, 251, 0.15)',
              '--hover-border': 'rgba(142, 214, 251, 0.9)',
              '--hover-shadow': 'rgba(142, 214, 251, 0.6)',
              '--icon-shadow': 'rgba(142, 214, 251, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" alt="Webpack" className="tech-logo" />
              <span>Webpack</span>
            </div>

            {/* Sass - Pink */}
            <div className="tech-float-item" style={{ 
              '--x': '92%', '--y': '8%', '--duration': '23s', '--delay': '3.5s',
              '--border-color': 'rgba(205, 103, 153, 0.4)',
              '--hover-bg': 'rgba(205, 103, 153, 0.15)',
              '--hover-border': 'rgba(205, 103, 153, 0.9)',
              '--hover-shadow': 'rgba(205, 103, 153, 0.6)',
              '--icon-shadow': 'rgba(205, 103, 153, 0.5)'
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" alt="Sass" className="tech-logo" />
              <span>Sass</span>
            </div>

            {/* Central MERN Logo */}
            <div className="central-mern-logo">
              <div className="mern-logo-center">
                <div className="mern-text">MERN</div>
                <div className="mern-subtitle">Stack</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
