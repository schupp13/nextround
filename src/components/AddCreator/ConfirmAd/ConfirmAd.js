import React from "react";
import { connect } from "react-redux";
import "./ConfirmAd.scss";
import { Link, Redirect } from "react-router-dom";
import DisplayAd from "../../DisplayAd/DisplayAd";
import { clearAdReducer } from "../../../redux/reducers/adReducer";
import Axios from "axios";

function ConfirmAd(props) {
  // let drinkPrint = props.ad.drinks.map(drink => {
  //   console.log(props);
  //   return (
  //     <div className={"drink"}>
  //       <h3>{`$${drink.drinkPrice}- ${drink.drinkName} @ ${
  //         props.session.business_name
  //       }`}</h3>
  //       <img alt={"drink.name"}src={drink.image} />
  //       <p>{drink.ingredients}</p>
  //     </div>
  //   );
  // });

  const submitAd = a => {
    let { id } = props.session;
    let { ad_name, drinks } = props.ad;
    console.log("hit");
    Axios.post("/api/ads", { id, ad_name, drinks })
      .then(res => {
        console.log(res);
        props.clearAdReducer();
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(props);
  return (
    <div className="ConfirmAdDiv">
      {props.session.business_name === "" && <Redirect to="/userDash" />}
      {props.session.first_name === "" && <Redirect to="/" />}
      {props.ad.drinks.length === 0 && <Redirect to="/businessDash" />}
      <h1>ConfirmAd</h1>
      <div className="stepNav">
        <Link to="/create-ad/drinkPicker">
          <i class="fas fa-chevron-left" />
        </Link>
        <p>Step 3 of 3</p>
      </div>
      <div className="cardAd">
        <DisplayAd
          adName={props.ad.ad_name}
          drinks={props.ad.drinks}
          businessId={props.session.id}
        />
      </div>
      <div className="actionButtons">
        <button onClick={props.clearAdReducer}>Cancel Ad</button>
        <button onClick={submitAd}>Submit Ad</button>
      </div>
    </div>
  );
}
const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer,
    ad: reduxState.adReducer
  };
};

export default connect(
  mapStateToProps,
  { clearAdReducer }
)(ConfirmAd);
