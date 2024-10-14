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
import NewMeetingForm from './platform-features/meetings/views/NewMeetingForm';
import AddContactForm from './platform-features/project-directory/views/AddContactForm';
import ViewContactForm from "./platform-features/project-directory/views/ViewEditContactPage";
import ViewEditCompanyPage from "./platform-features/project-directory/views/ViewEditCompanyPage";
import ViewEditContactPage from "./platform-features/project-directory/views/ViewEditContactPage";
import ViewEditMeetingPage from "./platform-features/meetings/views/ViewMeetingPage.jsx";
import NewRequestForInformationPage from "./platform-features/request-for-information/views/NewRequestForInformationPage";
import NewSubmittalForm from "./platform-features/submittals/views/NewSubmittalForm";
import NewTransmittalForm from "./platform-features/transmittals/views/NewTransmittalForm";
import ViewEditRequestForInformationPage
  from "./platform-features/request-for-information/views/ViewEditRequestForInformationPage";
import ViewEditTransmittalPage from "./platform-features/transmittals/views/ViewEditTransmittalPage";
import ViewEditSubmittalPage from "./platform-features/submittals/views/ViewEditSubmittalPage";
import TodoList from "./platform-features/project-to-do-list/views/to-do-list";
import ViewTaskPage from "./platform-features/project-to-do-list/views/ViewTaskPage";
import NewTaskForm from './platform-features/project-to-do-list/views/NewTaskForm';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/project/:id/dashboard" element={<ProjectDashboard/>}/>
            <Route path="/project/:id/documents" element={<Documents/>}/>
            <Route path="/project/:id/punch-list/" element={<PunchList/>}/>

            <Route path="/project/:id/daily-logs/:id" element={<DailyLogs/>}/>
            <Route path="/project/:id/schedule" element={<Schedule/>}/>

            <Route path="/project/:id/request-for-information" element={<RFIs/>}/>
            <Route path="/project/:id/request-for-information/new-request-for-information" element={<NewRequestForInformationPage/>} />
            <Route path="/project/:id/request-for-information/:id" element={<ViewEditRequestForInformationPage/>} />

            <Route path="/project/:id/submittals" element={<Submittals/>}/>
            <Route path="/project/:id/submittals/new-submittal-form" element={<NewSubmittalForm/>}/>
            <Route path="/project/:id/submittals/:id" element={<ViewEditSubmittalPage/>}/>


            <Route path="/project/:id/transmittals" element={<Transmittals/>}/>
            <Route path="/project/:id/transmittals/new-transmittal-form" element={<NewTransmittalForm/>}/>
            <Route path="/project/:id/transmittals/:id" element={<ViewEditTransmittalPage/>}/>

            <Route path="/project/:id/meetings/" element={<Meetings/>}/>
            <Route path="/project/:id/meetings/new-meeting-form" element={<NewMeetingForm/>} />
            <Route path="/project/:id/meetings/:id" element={<ViewEditMeetingPage/>} />


            <Route path="/project/:id//drawings" element={<Drawings/>}/>

            <Route path="/project/:id/close-out" element={<CloseOut/>}/>

            <Route path="/project/:id/procurement" element={<Procurement/>}/>

            <Route path="/project/:id/project-directory" element={<Directory/>}/>
            <Route path="/project/:id/project-directory/new-contact-form" element={<AddContactForm/>}/>
            <Route path="/project/:id/project-directory/contact/:id" element={<ViewEditContactPage/>}/>
            <Route path="/project/:id/project-directory/company/:id" element={<ViewEditCompanyPage/>}/>

            <Route path="/project/:id/project-to-do-list" element={<TodoList/>}/>
            <Route path="/project/:id/project-to-do-list/view-task" element={<ViewTaskPage/>}/>
            <Route path="/project/:id/project-to-do-list/new-task" element={<NewTaskForm/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
