import React from "react";
import { connect } from "react-redux";
import "./ConfirmAd.scss";
import { Link, Redirect } from "react-router-dom";

function ConfirmAdd(props) {
  return (
    <div className="ConfirmAdDiv">
      {props.session.business_name === "" && <Redirect to="/userDash" />}
      {props.session.first_name === "" && <Redirect to="/" />}
      <h1>ConfirmAd</h1>
      <div className="stepNav">
        <Link to="/create-ad/drinkPicker">
          <i class="fas fa-chevron-left" />
        </Link>
        <p>Step 3 of 3</p>
      </div>
      <div className="card" />
    </div>
  );
}
const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};

export default connect(mapStateToProps)(ConfirmAdd);
