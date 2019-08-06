import React, {Component} from 'react';
import './Nav.scss';
import {Link} from 'react-router-dom';

class Nav extends Component {
  constructor(){
    super();
    this.state = {
      className : 'check',
    }
  }

handleClick = ()=>{
  console.log('chelckkddslfnl;asdk')
  if(this.state.className === 'menuDivMobileOff' || this.state.className === 'check'){
    this.setState({
      className:'menuDivMobileOn'
    })
  } else{
    this.setState({
      className: 'menuDivMobileOff'
    })
  }
}

  render(){
    console.log(this.state.className)
  return (
    <nav className={"navbar"}>
    <div>
    <Link to={'/'}><h1>MusingMe</h1></Link>
    </div>
    <div className={'hamburger'} onClick={this.handleClick}>
    <i class="material-icons">
menu
</i>
    </div>
    <div className={'menuDiv'}>
     <button>Home</button>
     <Link to={'/dashboard'}><button>Dashboard</button></Link>
     <button>Login</button>
     </div>

     <div className={this.state.className}>
     <button>Home</button>
     
     <Link to={'/dashboard'}><button>Dashboard</button></Link>
     <button>Login</button>
     </div> 
    </nav>
  );
  }
}

export default Nav;