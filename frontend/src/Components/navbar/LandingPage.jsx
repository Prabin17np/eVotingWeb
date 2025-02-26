import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import './LandingPage.css';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Secure Digital Voting Platform</h1>
          <p className="hero-description">
            Experience the future of democracy with our advanced e-voting system.
            Safe, transparent, and accessible to all eligible voters.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="register-btn">
              Register Now
              <ArrowRight className="icon" />
            </Link>
            <Link to="/login" className="learn-btn">Login</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-box">
            <ShieldCheck className="feature-icon" />
            <h3 className="feature-title">Secure Voting</h3>
            <p className="feature-description">
              Advanced encryption and blockchain technology ensure your vote remains secure and tamper-proof.
            </p>
          </div>
          <div className="feature-box">
            <Clock className="feature-icon" />
            <h3 className="feature-title">24/7 Accessibility</h3>
            <p className="feature-description">
              Vote at your convenience with our always-available platform, from anywhere in the world.
            </p>
          </div>
          <div className="feature-box">
            <Users className="feature-icon" />
            <h3 className="feature-title">Easy Registration</h3>
            <p className="feature-description">
              Simple and quick registration process with proper verification to ensure eligible voting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Make Your Voice Heard?</h2>
          <p className="cta-description">
            Join thousands of citizens who have already registered for secure online voting.
            Your participation matters in shaping our future.
          </p>
          <Link to="/signup" className="cta-btn">
            Get Started Now
            <ArrowRight className="icon" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;