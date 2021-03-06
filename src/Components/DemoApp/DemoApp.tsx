import React from 'react';
import './DemoApp.css';
import SearchPage from '../SearchPage/SearchPage';

const DemoApp:React.FC = ():JSX.Element => (
  <div className="demo-app">
    <SearchPage />
  </div>
);

export default DemoApp;
