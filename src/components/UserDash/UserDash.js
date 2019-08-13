import React from "react";
import Map from "../Map/Map";
import "./UserDash.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function UserDash(props) {
  return (
    <div className="UserDashPage">
      {!props.session.first_name && <Redirect to={"/"} />}
      <div className="userProfile">
        <h1>
          {props.session.first_name + " " + props.session.last_name}'s Dashboard
        </h1>
        <h3>Name</h3>
        <p>{props.session.email}</p>
        <p>Change Password</p>
      </div>
      <div className="likes" />

      <Map />
    </div>
  );
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};

export default connect(mapStateToProps)(UserDash);
