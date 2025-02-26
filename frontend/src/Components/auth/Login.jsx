import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { UserCircle, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function handleEmailChange(event) {
    setEmail(() => event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(() => event.target.value);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          isAdmin,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data && response.data.data.access_token) {
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("role", response.data.data.role);

        // Check role and navigate accordingly
        if (isAdmin && response.data.data.role !== "admin") {
          setErrorMessage("Invalid credentials for admin login.");
          return;
        }

        if (!isAdmin && response.data.data.role === "admin") {
          setErrorMessage("Please log in as an admin.");
          return;
        }

        navigate(isAdmin ? "/admindashboard" : "/userdashboard");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to login");
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isAdmin ? "Admin Login" : "User Login"}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
