import React from "react";
import { connect } from "react-redux";
import "./NameAd.scss";
import { Link } from "react-router-dom";
export default function NameAd() {
  return (
    <div className="NameAdDiv">
      <h1>Name the Ad</h1>
      <div className="stepNav">
        <p>Step 1 of 3</p>
        <Link to="/create-ad/drinkPicker">
          <i class="fas fa-chevron-right" />
        </Link>
      </div>
      <div className="card">
        <input placeholder="e.g. BOGO Margaritas " />
      </div>
    </div>
  );
}
