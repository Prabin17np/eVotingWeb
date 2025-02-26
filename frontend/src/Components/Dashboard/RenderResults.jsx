import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavbar from "../navbar/AdminNavbar";
import "./RenderResult.css";

/* eslint-disable react/prop-types */
const RenderResults = () => {
  const [polls, setPolls] = useState([]);

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
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Election Results</h2>
        <AdminNavbar />
      </div>
      <div className="result-cards">
        {polls.map((poll) => (
          <div key={poll.pollId} className="result-card">
            <h3>{poll.title}</h3>
            <div>
              {poll.startdate
                ? new Date(poll.startdate).toISOString().split("T")[0]
                : ""}{" "}
              -{" "}
              {poll.enddate
                ? new Date(poll.enddate).toISOString().split("T")[0]
                : ""}
            </div>
            <div>
              <span>Total Votes: {poll.totalvote}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderResults;
