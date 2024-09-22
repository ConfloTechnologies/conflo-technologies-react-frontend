import React from 'react';
import AppNavigation from './AppNavigation';
import { Outlet } from 'react-router-dom';


const AppLayout: React.FC = () => {

  return (
    <AppNavigation inner_content={
      <main>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
    }/>
  );
};

export default AppLayout;