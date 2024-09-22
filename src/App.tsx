import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from './common/layout/AppLayout';
import Dashboard from './platform-features/dashboard/views/Dashboard';
import ProjectDashboard from './platform-features/project-dashboard/views/ProjectDashboard';
import Documents from './platform-features/documents/views/Documents';
import RFIs from './platform-features/request-for-information/views/RFIs';
import Submittals from './platform-features/submittals/views/Submittals';
import Transmittals from './platform-features/transmittals/views/Transmittals';
import PunchList from './platform-features/punch-list/views/PunchList';
import Meetings from './platform-features/meetings/views/Meetings';
import Schedule from './platform-features/scheduling/views/Schedule';
import DailyLogs from './platform-features/daily-logs/views/DailyLogs';
import Drawings from './platform-features/drawings/views/Drawings';
import CloseOut from './platform-features/close-out/views/CloseOut';
import Procurement from './platform-features/procurement/views/Procurement';
import Directory from './platform-features/project-directory/views/ProjectDirectory';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/project/:id" element={<ProjectDashboard/>}/>
            <Route path="/documents/project/:id" element={<Documents/>}/>
            <Route path="/rfis/project/:id" element={<RFIs/>}/>
            <Route path="/submittals/project/:id" element={<Submittals/>}/>
            <Route path="/transmittals/project/:id" element={<Transmittals/>}/>
            <Route path="/punch-list/project/:id" element={<PunchList/>}/>
            <Route path="/meetings/project/:id" element={<Meetings/>}/>
            <Route path="/schedule/project/:id" element={<Schedule/>}/>
            <Route path="/daily-logs/project/:id" element={<DailyLogs/>}/>
            {/* <Route path="/new-daily-log" component={<NewDailyLogForm/>} /> */}
            <Route path="/drawings/project/:id" element={<Drawings/>}/>
            <Route path="/close-out/project/:id" element={<CloseOut/>}/>
            <Route path="/procurement/project/:id" element={<Procurement/>}/>
            <Route path="/directory/project/:id" element={<Directory/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
