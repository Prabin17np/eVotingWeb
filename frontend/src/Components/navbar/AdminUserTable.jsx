import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

export default function AdminUserTable() {
  const [users, setUsers] = useState([]); // State to hold user data
  // const [loading, setLoading] = useState(true); // State for loading status

  // Define columns for the DataTable
  const userColumns = [
    {
      name: "User ID",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUsers(response.data.data); // Set the fetched users
        console.log(`Data fetched: ${JSON.stringify(response.data.data)}`);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <AdminNavbar />
      <DataTable
        title="User List"
        columns={userColumns}
        data={users}
        pagination
        highlightOnHover
        // progressPending={loading} // Show loading indicator
      />
    </div>
  );
}
