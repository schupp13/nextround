import React, { Component } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { connect } from "react-redux";
import {
  clearAuthReducer,
  checkForLogin
} from "../../redux/reducers/authReducer";
import { clearAdReducer } from "../../redux/reducers/adReducer";
import Axios from "axios";
import Map from "../Map/Map";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      className: "check",
      hideLogin: false
    };
  }

  changeLogin = () => {
    console.log("change login hitting");
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

  componentDidMount() {
    Axios.get("/auth/getsession").then(res => {
      console.log(res.data.first_name);
      if (res.data.first_name) {
        this.props.checkForLogin(res.data);
      }
    });
  }

  logout = () => {
    Axios.get("/auth/logout")
      .then(res => {
        this.props.clearAuthReducer();
        this.props.clearAdReducer();
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    console.log(this.props);
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
          {/* this will display the business dash if business name exist */}
          {this.props.session.business_name && (
            <Link to={"/businessDash"}>
              <button>Dashboard</button>
            </Link>
          )}
          {/* this will display the map to both the public and the business dash */}

          {this.props.session.first_name && !this.props.session.business_name && (
            <Link to={"/userDash"}>
              <button>User Dash</button>
            </Link>
          )}

          {/* this will display the anyone that is logged in  */}
          {this.props.session.first_name ? (
            <button onClick={this.logout}>Logout</button>
          ) : (
            <button onClick={this.changeLogin}>Login</button>
          )}
          {/* this is a toggle to drop down the login screen*/}
          {this.state.hideLogin === false ? null : (
            <div className={"login"}>
              {" "}
              <Login changeLogin={this.changeLogin} />
            </div>
          )}
        </div>

        {/* mobile */}
        <div className={this.state.className}>
          <Link to={"/businessDash"}>
            <button onClick={this.handleClick}>Dashboard</button>
          </Link>

          <button
            onClick={() => {
              this.changeLogin();
              this.handleClick();
            }}
          >
            Login
          </button>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};

export default connect(
  mapStateToProps,
  { clearAdReducer, clearAuthReducer, checkForLogin }
)(Nav);
