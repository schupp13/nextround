import React from 'react';
import './App.scss';
import Nav from './components/Nav/Nav'
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import {HashRouter} from 'react-router-dom';
import routes from './routes/routes'

function App() {
  return (
    <HashRouter>
    <Nav />
    {routes}
    </HashRouter>
  );
}

export default App;
