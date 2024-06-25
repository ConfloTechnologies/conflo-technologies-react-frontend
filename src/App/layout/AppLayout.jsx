import React from 'react';
import AppNavigation from './AppNavigation'; // Ensure the import is correct, based on your file naming
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <AppNavigation inner_content={
      <main>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
    }/>
  );
};

export default AppLayout;