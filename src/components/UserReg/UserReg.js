import React, { Component } from "react";
import "./UserReg.scss";
import axios from "axios";

class BusinessReg extends Component {
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
    axios
      .post("/auth/register", { ...this.state })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
        <form onClick={this.register}>
          <h1 className={"pageHeader"}>Registration</h1>
          <h2>Contact Information</h2>
          <label>
            First Name
            <input required onChange={this.handleChange} name="firstName" />
          </label>
          <label>
            Last Name
            <input required onChange={this.handleChange} name="lastName" />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              onChange={this.handleChange}
              name="email"
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              onChange={this.handleChange}
              name="password"
            />
          </label>
          <buttom type="submit" className="submitButton">
            Submit
          </buttom>
        </form>
      </div>
    );
  }
}

export default BusinessReg;
