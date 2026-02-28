import React, { useState } from 'react';
import './css/Hero.css';
// Added 'X' to the imports below ⬇️
import { Search, Cpu, CheckCircle, ArrowRight, User, Star, Layout, FileText, Send, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login"; 

const LandingPage = () => {
  const [role, setRole] = useState('student');
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // ✅ Function to close the modal when clicking on the dark background
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('login-overlay')) {
      setShowLogin(false);
    }
  };

  return (
    <>
      <div className="landing-page">
        {/* 1. NAVBAR */}
        <nav className="navbar">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', height: '76px' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '1.7rem' }}>
              <Cpu size={34} /> SkillMatch
            </div>

            <div className="nav-search">
              <Search size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input type="text" placeholder="Search jobs, skills, companies..." />
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
             <a 
  href="#" 
  className="nav-link" 
  style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '600' }}
  onClick={(e) => {
    e.preventDefault(); // Stops the page from jumping to the top
    setShowLogin(true);  // Opens the login popup
  }}
>
  Find Jobs
</a>
              
              {/* ✅ This button now triggers the state instead of navigating */}
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: "10px 22px", borderRadius: "50px", cursor: 'pointer' }}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* 2. HERO SECTION */}
        <div className="hero-wrapper">
          <header className="container hero-content">
            <div className="role-toggle">
              <button className={`role-btn ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>Student / Jobseeker</button>
              <button className={`role-btn ${role === 'recruiter' ? 'active' : ''}`} onClick={() => setRole('recruiter')}>Employer / Recruiter</button>
            </div>
            <h1 className="hero-title">{role === 'student' ? 'Smarter Hiring, Seamless Connections' : 'Precision Hiring for Top Talent'}</h1>
            <p className="hero-subtitle">Finding the right fit shouldn't feel like searching for a needle in a haystack. Our AI matching engine connects talent through data-driven precision.</p>
            <div style={{display:'flex', gap:'15px', justifyContent:'center'}}>
              <button className="btn btn-primary"onClick={() => setShowLogin(true)}>Get Started <ArrowRight size={20}/></button>
              <button className="btn btn-secondary " onClick={() => setShowLogin(true)}>Hire Talent</button>
            </div>
          </header>
        </div>

        <section className="trusted-section">
          <p className="trusted-title">Trusted by leading tech companies</p>
          <div className="trusted-logos">
            <span className="logo-pill">Google</span><span className="logo-pill">Meta</span><span className="logo-pill">Amazon</span><span className="logo-pill">Airbnb</span>
          </div>
        </section>

        {/* 4. FEATURES SECTION */}
        <section className="container section-padding" style={{marginTop:'80px'}}>
          <h2 className="section-title">Everything you need to scale</h2>
          <div className="feature-grid">
            <div className="feature-card"><div className="icon-circle"><Cpu /></div><h3>AI Job Matching</h3><p>Automatically match candidates to jobs based on skill analysis.</p></div>
            <div className="feature-card"><div className="icon-circle"><FileText /></div><h3>Resume Intelligence</h3><p>Extract core competencies and rank candidates instantly.</p></div>
            <div className="feature-card"><div className="icon-circle"><Layout /></div><h3>Smart Dashboard</h3><p>Track your application status in one clean interface.</p></div>
          </div>
        </section>

        {/* 5. FINAL CTA */}
        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">Start your smarter hiring journey</h2>
            <p className="cta-subtitle">Join 10,000+ candidates and recruiters already using SkillMatch.</p>
           <div className="cta-buttons">
  <button
    className="cta-primary"
    onClick={() => setShowLogin(true)}
  >
    I want to Find Jobs
  </button>

  <button
    className="cta-secondary"
    onClick={() => setShowLogin(true)}
  >
    I want to Hire
  </button>
</div>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="footer">
          <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'40px'}}>
            <div><div className="logo" style={{color:'white', fontWeight:'bold', fontSize:'1.5rem', marginBottom:'20px'}}><Cpu size={32} /> SkillMatch</div><p>Building the future of talent acquisition with AI.</p></div>
            <div><h4>Product</h4><p>Features</p><p>Pricing</p></div>
            <div><h4>Company</h4><p>About</p><p>Careers</p></div>
            <div>
              <h4>Stay Updated</h4>
              <div style={{display:'flex', marginTop:'15px'}}>
                <input type="text" placeholder="Email" style={{padding:'10px', borderRadius:'5px 0 0 5px', border:'none'}} />
                <button style={{background:'var(--primary-blue)', border:'none', padding:'10px', color:'white', borderRadius:'0 5px 5px 0'}}><Send size={18}/></button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ✅ LOGIN POPUP MODAL */}
      {showLogin && (
  <div className="login-overlay" onClick={() => setShowLogin(false)}>
    {/* stopPropagation prevents clicking inside the card from closing it */}
    <div className="login-modal" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal-btn" onClick={() => setShowLogin(false)}>
        <X size={18} />
      </button>
      <Login />
    </div>
  </div>
)}
    </>
  );
};

export default LandingPage;