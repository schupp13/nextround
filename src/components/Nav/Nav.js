import React from 'react';
import './Nav.scss';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav className={"navbar"}>
    <div>
    <Link to={'/'}><h1>Musing-Me</h1></Link>
    </div>
    <div>
     <button>Home</button>

     <Link to={'/dashboard'}><button>Dashboard</button></Link>
     <button>Login</button>
     </div>
    </nav>
  );
}

export default Nav;