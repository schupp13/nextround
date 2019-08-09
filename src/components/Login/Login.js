import React, { Component } from "react";
import "./Login.scss";
import Video from "../vid/video.mp4";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/authReducer";
import { Redirect } from "react-router-dom";

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
  login = e => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
  };
  render() {
    return (
      <div className={"loginDiv"}>
        {this.props.business_name && <Redirect to="/businessDash" />}
        <video id="background-video" loop autoPlay>
          <source src={Video} type="video/mp4" />
        </video>
        <div class="overlay">
          <form onSubmit={this.login}>
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
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return { first_name: reduxState.authReducer.first_name };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
