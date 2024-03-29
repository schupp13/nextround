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
            <select
              value={this.state.state}
              onChange={this.handleChange}
              name="state"
            >
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="DC">DC</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
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
