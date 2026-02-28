import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/AnalysisPage.css";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return <div className="analysis-container">No data available</div>;
  }

  const {
    userSkills = [],
    requiredSkills = [],
    matchedSkills = [],
    missingSkills = [],
    improvementAdvice = "",
  } = data;

  const matchScore =
    requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

  return (
    <div className="analysis-container">

      {/* HEADER */}
      <div className="analysis-header">
        <h1>AI Resume Analysis Report</h1>
        <p>Your profile evaluation for the selected role</p>
      </div>

      {/* MATCH SCORE */}
      <div className="score-section">
        <h2>Overall Skill Match</h2>
        <div className="score-circle">
          <span>{matchScore}%</span>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <div className="skills-wrapper">

        <div className="skills-card">
          <h3>Your Technical Skills</h3>
          <div className="skill-list">
            {userSkills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-card">
          <h3>Required Skills For Role</h3>
          <div className="skill-list">
            {requiredSkills.map((skill, index) => (
              <span
                key={index}
                className={
                  matchedSkills.includes(skill)
                    ? "skill-tag matched"
                    : "skill-tag missing"
                }
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* IMPROVEMENT SECTION */}
      <div className="advice-section">
        <h3>AI Career Improvement Advice</h3>
        <p>{improvementAdvice}</p>
      </div>

      {/* ACTION BUTTON */}
      <div className="analysis-action">
        <button
          className="btn-search"
          onClick={() => navigate("/jobs")}
        >
          Explore Matching Jobs
        </button>
      </div>

    </div>
  );
};

export default AnalysisPage;