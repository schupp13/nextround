import React, { Component } from "react";
import "./BusinessDash.scss";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class BusinessDash extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let {
      business_name,
      address,
      suite,
      first_name,
      last_name,
      description,
      phone
    } = this.props.session;
    return (
      <div className="BusinessDashPage">
        {business_name === "" && <Redirect to="/userDash" />}
        {first_name === "" && <Redirect to="/" />}
        <h1 className="pageHeader">Business Dash</h1>
        <div className="businessProfile">
          <h2>{business_name}</h2>
          <p>{address}</p>
          <p>{phone}</p>
          <p>Suite:{suite}</p>
          <h5>Manager</h5>
          <p>{first_name}</p>
          <p>{last_name}</p>
          <p>{description}</p>

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

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};
export default connect(mapStateToProps)(BusinessDash);
