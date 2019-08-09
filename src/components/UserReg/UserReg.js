import React, { Component } from "react";
import "./UserReg.scss";

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className={"UserReg"}>
        <form>
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
            <input required onChange={this.handleChange} name="email" />
          </label>
          <label>
            Password
            <input required onChange={this.handleChange} name="password" />
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
