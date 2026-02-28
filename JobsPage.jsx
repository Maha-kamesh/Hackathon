import React, { useEffect, useState } from "react";
import "./css/JobsPage.css";
import { useLocation } from "react-router-dom";

export default function JobsPage() {
  const location = useLocation();
  const role = location.state?.role || "Developer";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/jobs?role=${role}`)
      .then(res => res.json())
      .then(data => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [role]);

  return (
    <div className="jobs-container">
      <h1>Available {role} Jobs</h1>

      {loading && <p>Loading jobs...</p>}

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="job-card"
            onClick={() => window.open(job.redirect_url, "_blank")}
          >
            <h3>{job.title}</h3>
            <p><strong>{job.company}</strong></p>
            <p>{job.location}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}