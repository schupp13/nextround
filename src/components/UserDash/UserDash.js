import React from "react";
import Map from "../Map/Map";
import "./UserDash.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Unsplash from "react-unsplash-wrapper";

function UserDash(props) {
  return (
    <div className={"container"}>
      <div className={"backgroundImage"}>
        <Unsplash
          width="1500"
          height="1000"
          keywords="cocktails, bar, social"
        />
      </div>
      <div className="UserDashPage">
        {!props.session.first_name && <Redirect to={"/"} />}

        <h1>
          {" "}
          Cheers {props.session.first_name}, please drink responsibly and have
          fun!
        </h1>
        <div className="userProfile" />
        <div className="likes" />
        <div className={"mapdiv"}>
          <Map />
        </div>
        <div />
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};

export default connect(mapStateToProps)(UserDash);
