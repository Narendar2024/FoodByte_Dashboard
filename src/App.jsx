import React from 'react';
import "./App.css";
import LandingPage from './vendorDashboard/pages/LandingPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;