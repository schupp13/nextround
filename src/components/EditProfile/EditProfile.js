import React, { Component } from "react";
import { connect } from "react-redux";
import "./EditProfile.scss";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { updateUser } from "../../redux/reducers/authReducer";

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      businessName: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      description: "",
      address: "",
      suite: "",
      city: "",
      state: "",
      zip: "",
      toogle: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    let {
      id,
      business_name,
      address,
      suite,
      first_name,
      last_name,
      description,
      phone,
      city,
      state,
      zip,
      email
    } = this.props.session;

    this.setState({
      id: id,
      businessName: business_name,
      firstName: first_name,
      lastName: last_name,
      phone: phone,
      email: email,
      description: description,
      address: address,
      suite: suite,
      city: city,
      state: state,
      zip: zip
    });
  }

  editForm = e => {
    e.preventDefault();

    Axios.put("/auth/editProfile", this.state)
      .then(res => {
        this.props.updateUser(res.data);
        this.setState({ toggle: !this.state.toggle });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let { business_name, first_name } = this.props.session;

    return (
      <div className="editForm">
        {this.state.toggle && <Redirect to={"businessDash"} />}
        {business_name === "" && <Redirect to="/userDash" />}
        {first_name === "" && <Redirect to="/" />}
        <form onSubmit={this.editForm} method="put">
          <h1 className={"pageHeader"}>Edit Profile</h1>
          <h2>Contact Information</h2>
          <label>
            Business Name
            <input
              value={this.state.businessName}
              onChange={this.handleChange}
              name="businessName"
            />
          </label>
          <label>
            Manager First Name
            <input
              value={this.state.firstName}
              onChange={this.handleChange}
              name="firstName"
            />
          </label>
          <label>
            Manager Last Name
            <input
              value={this.state.lastName}
              onChange={this.handleChange}
              name="lastName"
            />
          </label>
          <label>
            Phone
            <input
              value={this.state.phone}
              onChange={this.handleChange}
              name="phone"
            />
          </label>
          <label>
            Email
            <input
              value={this.state.email}
              type="email"
              onChange={this.handleChange}
              name="email"
            />
          </label>

          <label>
            Tell us about the environment
            <textarea
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
            />
          </label>
          <h2>Address</h2>
          <label>
            Address Line 1
            <input
              value={this.state.address}
              onChange={this.handleChange}
              name="address"
            />
          </label>
          <label>
            Suite#
            <input
              value={this.state.suite}
              onChange={this.handleChange}
              name="suite"
            />
          </label>
          <label>
            City
            <input
              value={this.state.city}
              onChange={this.handleChange}
              name="city"
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
              onChange={this.handleChange}
              name="zip"
            />
          </label>
          <button className="submitButton" type="submit">
            Update
          </button>
          <button
            className={"submitButton"}
            onClick={() => {
              this.setState({ toogle: true });
            }}
          >
            Cancel
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
)(EditProfile);
