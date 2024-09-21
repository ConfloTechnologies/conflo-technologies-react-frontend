import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from './common/layout/AppLayout';
import Dashboard from './platform-features/dashboard/views/Dashboard.jsx';
import ProjectDashboard from './platform-features/project-dashboard/views/ProjectDashboard.jsx';
import Documents from './platform-features/documents/views/Documents.jsx';
import RFIs from './platform-features/request-for-information/views/RFIs.jsx';
import Submittals from './platform-features/submittals/views/Submittals.jsx';
import Transmittals from './platform-features/transmittals/views/Transmittals.jsx';
import PunchList from './platform-features/punch-list/views/PunchList.jsx';
import Meetings from './platform-features/meetings/views/Meetings.jsx';
import Schedule from './platform-features/scheduling/views/Schedule.jsx';
import DailyLogs from './platform-features/daily-logs/views/DailyLogs.jsx';
import Drawings from './platform-features/drawings/views/Drawings.jsx';
import CloseOut from './platform-features/close-out/views/CloseOut.jsx';
import Procurement from './platform-features/procurement/views/Procurement.jsx';
import Directory from './platform-features/project-directory/views/ProjectDirectory.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/ProjectDashboard/project/:id" element={<ProjectDashboard/>}/>
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
