import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { UserCircle, Lock, Mail, ArrowRight } from "lucide-react";
import axios from "axios";
import "./Auth.css";

const Signup = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted:", { ...formData, isAdmin });

    // Set the role based on the isAdmin state
    const role = isAdmin ? "admin" : "user";
    console.log(role);

    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role, // Send the correct role
      });

      console.log("User registered successfully", response);

      // After successful signup, navigate to the appropriate dashboard
      if (isAdmin) {
        navigate("/admindashboard"); // Navigate to AdminDashboard if the user is an admin
      } else {
        navigate("/userdashboard"); // Navigate to UserDashboard if it's a normal user
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          {isAdmin ? "Admin Registration" : "User Registration"}
        </h2>

        <div className="toggle-container">
          <button
            className={`toggle-btn ${!isAdmin ? "active" : ""}`}
            onClick={() => setIsAdmin(false)}
          >
            User
          </button>
          <button
            className={`toggle-btn ${isAdmin ? "active" : ""}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <UserCircle className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isAdmin ? "Register as Admin" : "Register as User"}
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
