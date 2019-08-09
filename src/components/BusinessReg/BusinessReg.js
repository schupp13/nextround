import React, { Component } from "react";
import "./BusinessReg.scss";
import Axios from "axios";

class BusinessReg extends Component {
  constructor() {
    super();
    this.state = {
      businessName: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      description: "",
      address: "",
      suite: "",
      city: "",
      state: "",
      zip: ""
    };
  }

  register = e => {
    e.preventDefault();
    Axios.post("/auth/register", { ...this.state })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    console.log(this.state);
    return (
      <div className={"BusinessReg"}>
        <form onSubmit={this.register}>
          <h1 className={"pageHeader"}>Business Registration</h1>
          <h2>Contact Information</h2>
          <label>
            Business Name
            <input onChange={this.handleChange} name="businessName" required />
          </label>
          <label>
            Manager First Name
            <input onChange={this.handleChange} name="firstName" required />
          </label>
          <label>
            Manager Last Name
            <input onChange={this.handleChange} name="lastName" required />
          </label>
          <label>
            Phone
            <input onChange={this.handleChange} name="phone" required />
          </label>
          <label>
            Email
            <input
              type="email"
              onChange={this.handleChange}
              name="email"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              onChange={this.handleChange}
              name="password"
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              onChange={this.handleChange}
              name="confirmPassword"
              required
            />
          </label>
          <label>
            Tell us about the environment
            <textarea
              onChange={this.handleChange}
              name="description"
              required
            />
          </label>
          <h2>Address</h2>
          <label>
            Address Line 1
            <input onChange={this.handleChange} name="address" required />
          </label>
          <label>
            Suite#
            <input
              required
              onChange={this.handleChange}
              name="suite"
              required
            />
          </label>
          <label>
            City
            <input required onChange={this.handleChange} name="city" required />
          </label>
          <label>
            State
            <input
              required
              onChange={this.handleChange}
              name="state"
              required
            />
          </label>
          <label>
            Zip
            <input required onChange={this.handleChange} name="zip" required />
          </label>
          <button className="submitButton" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default BusinessReg;
