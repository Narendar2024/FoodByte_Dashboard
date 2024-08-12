import React from 'react';
import "./App.css";
import LandingPage from './vendorDashboard/pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import NotFound from './vendorDashboard/components/NotFound';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;