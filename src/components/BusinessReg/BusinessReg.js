import React, { Component } from "react";
import "./BusinessReg.scss";
import Axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUser } from "../../redux/reducers/authReducer";

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
        console.log(res.data);
        this.props.updateUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state);
    this.setState({
      businessName: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      description: "",
      address: "",
      suite: "",
      city: "",
      state: "",
      zip: ""
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div className={"BusinessReg"}>
        {this.props.session.business_name ? (
          <Redirect to={"/businessDash"} />
        ) : (
          this.props.session.first_name && <Redirect to={"/userDash"} />
        )}
        <form onSubmit={this.register}>
          <h1 className={"pageHeader"}>Business Registration</h1>
          <h2>Contact Information</h2>
          <label>
            Business Name
            <input
              value={this.state.businessName}
              onChange={this.handleChange}
              name="businessName"
              required
            />
          </label>
          <label>
            Manager First Name
            <input
              value={this.state.firstName}
              onChange={this.handleChange}
              name="firstName"
              required
            />
          </label>
          <label>
            Manager Last Name
            <input
              value={this.state.lastName}
              onChange={this.handleChange}
              name="lastName"
              required
            />
          </label>
          <label>
            Phone
            <input
              value={this.state.phone}
              onChange={this.handleChange}
              name="phone"
              required
            />
          </label>
          <label>
            Email
            <input
              value={this.state.email}
              type="email"
              onChange={this.handleChange}
              name="email"
              required
            />
          </label>
          <label>
            Password
            <input
              value={this.state.password}
              type="password"
              onChange={this.handleChange}
              name="password"
              required
            />
          </label>
          <label>
            Tell us about the environment
            <textarea
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              required
            />
          </label>
          <h2>Address</h2>
          <label>
            Address Line 1
            <input
              value={this.state.address}
              onChange={this.handleChange}
              name="address"
              required
            />
          </label>
          <label>
            Suite#
            <input
              value={this.state.suite}
              required
              onChange={this.handleChange}
              name="suite"
              required
            />
          </label>
          <label>
            City
            <input
              value={this.state.city}
              required
              onChange={this.handleChange}
              name="city"
              required
            />
          </label>
          <label>
            State
            <select required onChange={this.handleChange} name="state" required>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
          <label>
            Zip
            <input
              value={this.state.zip}
              required
              onChange={this.handleChange}
              name="zip"
              required
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
)(BusinessReg);
