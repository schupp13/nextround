import React from "react";
import { connect } from "react-redux";
import "./NameAd.scss";
import { Link, Redirect } from "react-router-dom";
import { updateAdName } from "../../../redux/reducers/adReducer";

function NameAd(props) {
  return (
    <div className="NameAdDiv">
      {console.log(props)}
      {props.session.business_name === "" && <Redirect to="/userDash" />}
      {props.session.first_name === "" && <Redirect to="/" />}
      <h1>Name the Ad</h1>
      <h2>{props.ad_name}</h2>
      <div className="stepNav">
        <p>Step 1 of 3</p>
        <Link to="/create-ad/drinkPicker">
          {props.ad_name != "" && <i class="fas fa-chevron-right" />}
        </Link>
      </div>
      <div className="card">
        <input
          value={props.ad_name}
          onChange={e => props.updateAdName(e.target.value)}
          placeholder="e.g. BOGO Margaritas "
        />
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer,
    ad_name: reduxState.adReducer.ad_name
  };
};

export default connect(
  mapStateToProps,
  { updateAdName }
)(NameAd);
