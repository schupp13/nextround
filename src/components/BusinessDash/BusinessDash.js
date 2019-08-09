import React, { Component } from "react";
import "./BusinessDash.scss";
import { Link } from "react-router-dom";

class BusinessDash extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log("hello");
    return (
      <div className="BusinessDashPage">
        <h1 className="pageHeader">Business Dash</h1>
        <div className="businessProfile">
          <h2>Business Profile</h2>
          <h3>Business Name</h3>
          <p>Contact Name</p>
          <p>Addresse</p>
          <button>Edit Profile</button>
        </div>
        <div className="adHeader">
          <Link to="/create-ad/name">
            <i className="far fa-plus-square" />
          </Link>
          <h2>Your Ads</h2>
        </div>
        <div className="adContainer" />
      </div>
    );
  }
}
export default BusinessDash;
