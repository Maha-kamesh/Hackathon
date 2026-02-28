import React, { useState } from "react";
import "./css/upload.css";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Optional: restrict to pdf only
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF resume only.");
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (loading) return; // prevent double click

    if (!file || !jobRole) {
      alert("Please upload resume and select job role.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobRole", jobRole);

    try {
      // Add timeout protection (20 seconds)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const response = await fetch("http://127.0.0.1:8000/analyse", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Server error");
      }

      const data = await response.json();

      // Basic safety check
      if (!data || !data.userSkills) {
        throw new Error("Invalid response from backend");
      }

      // Navigate smoothly
      navigate("/analyse", { state: data });

    } catch (error) {
      if (error.name === "AbortError") {
        alert("Analysis timed out. Please try again.");
      } else {
        console.error("Error analyzing resume:", error);
        alert("Analysis failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">

        <h1 className="upload-title">Upload Your Resume</h1>

        <p className="upload-subtitle">
          Get AI-powered career insights instantly.
        </p>

        {/* Job Role Selector */}
        <select
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="job-select"
        >
          <option value="">Select Job Role</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Data Scientist">Data Scientist</option>
        </select>

        <div className="upload-box">

          {!file && (
            <>
              <input
                type="file"
                id="fileUpload"
                hidden
                onChange={handleUpload}
              />
              <label htmlFor="fileUpload" className="upload-btn">
                Upload Resume (PDF)
              </label>
            </>
          )}

          {file && (
            <>
              <p className="file-name">✅ {file.name}</p>

              <button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Analyzing Resume..." : "Analyze Resume"}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}