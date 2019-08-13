import React, { Component } from "react";
import "./UserReg.scss";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducers/authReducer";

import { Redirect } from "react-router-dom";

class UserReg extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  register = e => {
    e.preventDefault();
    console.log("hitting");
    axios
      .post("/auth/register", { ...this.state })
      .then(res => {
        console.log(res.data);
        this.props.updateUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className={"UserReg"}>
        {this.props.session.business_name ? (
          <Redirect to={"/businessDash"} />
        ) : (
          this.props.session.first_name && <Redirect to={"/userDash"} />
        )}
        <form onSubmit={this.register}>
          <h1 className={"pageHeader"}>Registration</h1>
          <h2>Contact Information</h2>
          <label>
            First Name
            <input
              value={this.state.firstName}
              required
              onChange={this.handleChange}
              name="firstName"
            />
          </label>
          <label>
            Last Name
            <input
              value={this.state.lastName}
              required
              onChange={this.handleChange}
              name="lastName"
            />
          </label>
          <label>
            Email
            <input
              value={this.state.email}
              required
              type="email"
              onChange={this.handleChange}
              name="email"
            />
          </label>
          <label>
            Password
            <input
              value={this.state.password}
              required
              type="password"
              onChange={this.handleChange}
              name="password"
            />
          </label>
          <button className="submitButton" type="submit">
            Register
          </button>
        </form>
      </div>
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
  { updateUser }
)(UserReg);
