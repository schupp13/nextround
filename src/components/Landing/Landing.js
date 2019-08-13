import React, { Component } from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Landing(props) {
  return (
    <section className={"landingPageDiv"}>
      {props.session.business_name ? (
        <Redirect to={"/businessDash"} />
      ) : props.session.first_name ? (
        <Redirect to={"/userDash"} />
      ) : null}
      <div className={"businessDiv"}>
        <Link to="/BusinessReg" style={{ textDecoration: "none" }}>
          <i class="fas fa-store" />
          <h1>Start Advertising</h1>
        </Link>
      </div>

      <div className={"publicDiv"}>
        <Link to="/userReg">
          <i class="fas fa-cocktail" />
          <h1>Find a Drink</h1>
        </Link>
      </div>
    </section>
  );
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};

export default connect(mapStateToProps)(Landing);
