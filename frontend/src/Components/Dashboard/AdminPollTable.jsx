/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

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

const AdminPollTable = () => {
  const [polls, setPolls] = useState([]);

  const pollColumns = [
    {
      name: "Poll ID",
      selector: (row) => row.pollId,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) =>
        row.startdate
          ? new Date(row.startdate).toISOString().split("T")[0]
          : "",
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) =>
        row.enddate ? new Date(row.enddate).toISOString().split("T")[0] : "",
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
    {
      name: "Action",
      cell: (row) => (
        <StatusButton
          id={row.pollId} // Ensure this is the correct ID
          handleStatusUpdate={handleStatusUpdate}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

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

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/poll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPolls(response.data); // Set the fetched users
        console.log(`Data fetched: ${JSON.stringify(response.data)}`);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPolls();
  }, []);

  return (
    <div className="table-container">
      <DataTable
        columns={pollColumns}
        data={polls}
        pagination
        highlightOnHover
        noDataComponent="No polls found"
      />
    </div>
  );
};

export default AdminPollTable;
