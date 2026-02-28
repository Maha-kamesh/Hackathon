import React from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./PAGES/Hero";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import UploadResume from "./PAGES/UploadResume";
import AnalysisPage from "./PAGES/AnalysisPage";
import JobsPage from "./PAGES/JobsPage";

import MainLayout from "./MainLayout";

const App = () => {
  return (
    <Routes>

      {/* ✅ Pages WITHOUT Navbar */}
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ Pages WITH Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<UploadResume />} />
         <Route path="/analyse" element={<AnalysisPage/>} />
         <Route path="/jobs" element={<JobsPage/>} />

      </Route>

    </Routes>
  );
};

export default App;