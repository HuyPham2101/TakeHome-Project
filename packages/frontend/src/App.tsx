import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';

function App() {
  return (
    <Layout>
      <DashboardPage/>
    </Layout>
  );
}

export default App;
