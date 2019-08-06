import React from 'react';
import './App.scss';
import Nav from './components/Nav/Nav'
import routes from './routes/routes';
import {HashRouter} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
    <div className='App'>
    <Nav />
    {routes}
    </div>
    </HashRouter>
  );
}
export default App;