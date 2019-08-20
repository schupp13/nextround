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

  d;

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
    this.handleClick();
  };

  render() {
    console.log(this.props);
    return (
      <nav className={"navbar"}>
        <div className={"header"}>
          <Link to={"/"}>
            <h1>NextRound</h1>
          </Link>
        </div>
        {this.props.session.first_name && (
          <div className={"hamburger"} onClick={this.handleClick}>
            <i class="material-icons">menu</i>
          </div>
        )}

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
              <button>Dashboard</button>
            </Link>
          )}

          {/* this will display the anyone that is logged in  */}
          {this.props.session.first_name && (
            <button onClick={this.logout}>Logout</button>
          )}
        </div>

        <div className={this.state.className}>
          {this.props.session.first_name && !this.props.session.business_name && (
            <Link to={"/userDash"}>
              <button onClick={this.handleClick}>Map</button>
            </Link>
          )}
          {this.props.session.first_name && (
            <button onClick={this.logout}>Logout</button>
          )}
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
