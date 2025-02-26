/* eslint-disable react/prop-types */
import { Search, Eye, Edit, Trash2 } from "lucide-react";

const RenderUsers = ({ users }) => {
  return (
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
};

export default RenderUsers;
