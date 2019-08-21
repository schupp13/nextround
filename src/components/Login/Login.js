import React, { Component } from "react";
import "./Login.scss";

import Video from "../vid/video.mp4";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/authReducer";
import { Redirect, Link } from "react-router-dom";
import Gif from "../../components/vid/loading.gif";
import UserReg from "../UserReg/UserReg";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  login = async e => {
    e.preventDefault();
    let { email, password } = this.state;
    await this.props.login(email, password); // this returns a promise so I have to make it wait
  };
  render() {
    console.log(this.props);
    return (
      <div className={"loginDiv"}>
        {this.props.session.business_name ? (
          <Redirect to="/businessDash" />
        ) : this.props.session.first_name ? (
          <Redirect to="/userDash" />
        ) : null}

        <video id="background-video" loop autoPlay>
          <source src={Video} type="video/mp4" />
        </video>
        <div class="overlay">
          <form onSubmit={this.login}>
            <h1>Login</h1>
            <label>
              Email:
              <input
                type="email"
                onChange={this.handleChange}
                name="email"
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                onChange={this.handleChange}
                name="password"
                required
              />
            </label>
            <button>Sign In</button>
            {this.props.session.pending && (
              <img src={Gif} className={"loadingImage"} />
            )}
            {this.props.session.error && <p>{this.props.session.error}</p>}
            <div className={"registerButton"}>
              <Link to="/businessReg">
                <button>Start Advertising</button>
              </Link>
              <Link to="/userReg">
                <button>Sign Up</button>
              </Link>

              <div className={this.state.classname == "signUp"} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return { session: reduxState.authReducer };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
