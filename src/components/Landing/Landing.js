import React, { Component } from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className={"landingPageDiv"}>
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

export default Landing;
