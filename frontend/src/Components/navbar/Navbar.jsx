import { Vote } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav"> 
      <div className="container"> 
        <div className="logo"> 
          <Vote className="logo-icon" />
          <h1 className="title">E-Voting</h1> 
        </div>
        <div className="links"> 
          <a href="/" className="link">Home</a>
          <a href="/login" className="link">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
