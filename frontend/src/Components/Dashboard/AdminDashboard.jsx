/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PlusCircle, Search, Trash2, Edit, Eye, LogOut } from "lucide-react"; // Imported LogOut icon
import axios from "axios";
import "./AdminDashboard.css";
import AdminNavbar from "../navbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import RenderUsers from "./RenderUsers";
import RenderResults from "./RenderResults";
import AdminPollTable from "./AdminPollTable";

const StatusButton = ({ id, handleStatusUpdate }) => {
  return (
    <div>
      <button
        className={`poll-status-btn`}
        onClick={() => handleStatusUpdate(id, "active")}
      >
        Active
      </button>
      <button
        className={`poll-status-btn`}
        onClick={() => handleStatusUpdate(id, "draft")}
      >
        Draft
      </button>
    </div>
  );
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [newPoll, setNewPoll] = useState({
    title: "",
    startdate: "",
    enddate: "",
    totalvotes: 0,
    status: "draft",
  });

  const [polls, setPolls] = useState([]);

  const handleCreatePoll = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create a poll.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/poll",
        newPoll,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Poll created successfully:", response.data);
      console.log(newPoll);

      if (response.status === 201) {
        alert("Poll created successfully!");
        setShowNewPollModal(false);
        window.location.reload(); // Reload to update poll list
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll");
    }
  };

  const [activeTab, setActiveTab] = useState("polls");
  const [showNewPollModal, setShowNewPollModal] = useState(false);

  // Sample data - In a real app, this would come from your backend
  const pollColumns = [
    {
      name: "Poll ID",
      selector: (row) => row.pollId, // Changed from row.pollId to row.id
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startdate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.enddate,
      sortable: true,
    },
    {
      name: "Total Votes",
      selector: (row) => row.totalvote,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <StatusButton
    //       id={row.id} // Ensure this is the correct ID
    //       handleStatusUpdate={handleStatusUpdate}
    //     />
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    // },
  ];

  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "active",
    },
  ];

  const handleLogout = async () => {
    try {
      // Remove the token from local storage
      localStorage.removeItem("token");

      // Redirect the user to the login page or homepage after logout
      navigate("/login"); // Replace with your actual login page path
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const renderHeader = () => (
    <header className="admin-header">
      <div className="container">
        <div className="header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="header-actions">
            <button
              onClick={handleLogout}
              className="icon-button logout-button"
            >
              <LogOut className="icon" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const RenderPolls = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Active Polls</h2>
        <button
          onClick={() => setShowNewPollModal(true)}
          className="new-poll-button"
        >
          <PlusCircle className="icon" />
          New Poll
        </button>
      </div>

      <AdminPollTable />
      {/* <div className="search-bar">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search polls..."
            className="search-input"
          />
        </div> */}

      {/* <table className="polls-table">
          <DataTable
            columns={pollColumns}
            data={polls}
            pagination
            highlightOnHover
            noDataComponent="No polls found"
          />
        </table> */}
    </div>
  );

  const renderUsers = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Registered Users</h2>
      </div>

      <div className="table-container">
        <div className="search-bar">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search users..."
            className="search-input"
          />
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-button">
                    <Eye className="icon" />
                  </button>
                  <button className="action-button">
                    <Edit className="icon" />
                  </button>
                  <button className="action-button delete">
                    <Trash2 className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Election Results</h2>
        {/* Removed Filter and Export Results Buttons */}
      </div>

      <div className="result-cards">
        {polls.map((poll) => (
          <div key={poll.id} className="result-card">
            <h3>{poll.title}</h3>
            <div>
              {poll.startDate} - {poll.endDate}
            </div>
            <div>
              <span>Total Votes: {poll.totalVotes}</span>
            </div>
            <button className="view-detailed-results">
              View detailed results →
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to update the poll status.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/poll/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Poll status updated successfully!");
        // Optionally, update the state to reflect the change immediately
        setPolls(
          polls.map((poll) =>
            poll.pollId === id ? { ...poll, status: newStatus } : poll
          )
        );
      }
    } catch (error) {
      console.error("Error updating poll status:", error);
      alert("Failed to update poll status.");
    }
  };

  // useEffect(() => {
  //   const fetchPolls = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/poll");
  //       setPolls(response.data.data); // Set the fetched users
  //       console.log(`Data fetched: ${JSON.stringify(response.data.data)}`);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchPolls();
  // }, []);

  return (
    <div className="admin-dashboard">
      {renderHeader()}
      {/* {renderTabs()} */}
      <AdminNavbar />
      {activeTab === "polls" && (
        // <RenderPolls polls={polls} setPolls={setPolls} />
        // <RenderPolls polls={polls} />
        <RenderPolls />
      )}
      {activeTab === "users" && <RenderUsers />}
      {activeTab === "results" && <RenderResults polls={polls} />}

      {/* New Poll Modal */}
      {showNewPollModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Poll</h2>
            <form className="form" onSubmit={handleCreatePoll}>
              <div className="form-group">
                <label>Poll Title</label>
                <input
                  type="text"
                  placeholder="Enter poll title"
                  value={newPoll.title}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={newPoll.startdate}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, startdate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={newPoll.enddate}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, enddate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newPoll.status}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, status: e.target.value })
                  }
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Create Poll</button>
                <button
                  type="button"
                  onClick={() => setShowNewPollModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
