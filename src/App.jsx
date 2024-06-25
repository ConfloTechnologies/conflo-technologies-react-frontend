import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from './App/layout/AppLayout';
import Dashboard from './App/pages/Dashboard';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
