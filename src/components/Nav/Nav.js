import React, { Component } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import Login from "../Login/Login";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      className: "check",
      hideLogin: false
    };
  }

  changeLogin = () => {
    this.setState({
      hideLogin: !this.state.hideLogin
    });
  };

  handleClick = () => {
    if (
      this.state.className === "menuDivMobileOff" ||
      this.state.className === "check"
    ) {
      this.setState({
        className: "menuDivMobileOn"
      });
    } else {
      this.setState({
        className: "menuDivMobileOff"
      });
    }
  };

  render() {
    console.log(this.state.className);
    return (
      <nav className={"navbar"}>
        <div>
          <Link to={"/"}>
            <h1 onClick={this.handleClick}>MusingMe</h1>
          </Link>
        </div>
        <div className={"hamburger"} onClick={this.handleClick}>
          <i class="material-icons">menu</i>
        </div>
        <div className={"menuDiv"}>
          <Link to={"/dashboard"}>
            <button>Dashboard</button>
          </Link>
          <button onClick={this.changeLogin}>Login</button>
          <div className={"login"}>
            {this.state.hideLogin === false ? null : <Login />}
          </div>
        </div>

        {/* mobile */}
        <div className={this.state.className}>
          <Link to={"/dashboard"}>
            <button onClick={this.handleClick}>Dashboard</button>
          </Link>
          <button onClick={this.changeLogin}>Login</button>
        </div>
      </nav>
    );
  }
}

export default Nav;
