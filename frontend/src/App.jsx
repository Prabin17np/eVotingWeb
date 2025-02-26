import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/navbar/LandingPage";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import UserDashboard from "./Components/Dashboard/UserDashboard"; // Import the UserDashboard component
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import AdminUserTable from "./Components/navbar/AdminUserTable";
import RenderResults from "./Components/Dashboard/RenderResults";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdashboard" element={<UserDashboard />} />{" "}
        {/* Define the route for UserDashboard */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminusertable" element={<AdminUserTable />} />
        <Route path="/results" element={<RenderResults />} />
      </Routes>
    </Router>
  );
};

export default App;
