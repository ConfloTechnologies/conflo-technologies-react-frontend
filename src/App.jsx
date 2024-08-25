import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from './App/layout/AppLayout';
import GlobalDashboard from './App/pages/GlobalDashboard';
import LocalDashboard from './App/pages/LocalDashboard';
import Documents from './App/pages/Documents';
import RFIs from './App/pages/RFIs';
import Submittals from './App/pages/Submittals';
import Transmittals from './App/pages/Transmittals';
import PunchList from './App/pages/PunchList';
import Meetings from './App/pages/Meetings';
import Schedule from './App/pages/Schedule';
import DailyLogs from './App/pages/DailyLogs';
import Drawings from './App/pages/Drawings';
import CloseOut from './App/pages/CloseOut';
import Procurement from './App/pages/Procurement';
import Directory from './App/pages/ProjectDirectory';
// import NewDailyLogForm from './App/components/NewDailyLogForm.component';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<GlobalDashboard/>}/>
            <Route path="/dashboard/project/:id" element={<LocalDashboard/>}/>
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
