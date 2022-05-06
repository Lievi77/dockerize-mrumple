import React from "react";
import "./App.css";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
