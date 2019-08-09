import React from "react";
import { connect } from "react-redux";
import "./ConfirmAd.scss";
import { Link } from "react-router-dom";

export default function ConfirmAdd() {
  return (
    <div className="ConfirmAdDiv">
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
