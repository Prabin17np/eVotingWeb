import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { BarChart3, Users } from "lucide-react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <nav className="admin-tabs">
      <div className="container">
        <div className="tabs">
          <button onClick={() => navigate("/admindashboard")}>
            <BarChart3 className="tab-icon" />
            Polls
          </button>
          <button onClick={() => navigate("/adminusertable")}>
            <Users className="tab-icon" />
            Users
          </button>
          <button onClick={() => navigate("/results")}>
            <BarChart3 className="tab-icon" />
            Results
          </button>
        </div>
      </div>
    </nav>
  );
}
