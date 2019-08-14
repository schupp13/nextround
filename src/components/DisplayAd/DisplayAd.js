// THIS COMPONENT NEEDS <DisplayAd adName={props.ad.ad_name} drinks={props.ad.drinks}businessId={props.session.id}/>
// I want to be able to

import React, { Component } from "react";
import "./DisplayAd.scss";
import axios from "axios";

export default class DisplayAd extends Component {
  constructor() {
    super();
    this.state = {
      business: [],
      drinksToggle: "toggleOff",
      busToggle: "bustoggleOff"
    };
  }

  componentDidMount() {
    axios.get("/api/company").then(response => {
      console.log();
      this.setState({ business: response.data[0] });
    });
  }

  drinksToggle = e => {
    console.log(e.target.name);
    this.state.drinksToggle === "toggleOff"
      ? this.setState({
          drinksToggle: "toggleOn"
        })
      : this.setState({
          drinksToggle: "toggleOff"
        });
  };
  busToggle = e => {
    this.state.busToggle === "busToggleOff"
      ? this.setState({
          busToggle: "busToggleOn"
        })
      : this.setState({
          busToggle: "busToggleOff"
        });
  };

  render() {
    let {
      business_name,
      address,
      city,
      state,
      suite,
      zip,
      phone,
      first_name,
      last_name,
      description
    } = this.state.business;

    let drinksDisplay = this.props.drinks.map(drink => {
      return (
        <div className={"drink"}>
          <img src={drink.image} />
          <div>
            <h3>
              ${drink.drinkPrice} - {drink.drinkName}
            </h3>
            <p>{drink.ingredients}</p>
          </div>
        </div>
      );
    });
    return (
      <div className={"DisplayAd"}>
        <h1>
          {this.props.adName} @ {business_name}
        </h1>
        <div className={"drinksDiv"}>
          <button onClick={this.drinksToggle}>
            <i class="fas fa-cocktail" />
          </button>

          <div className={this.state.drinksToggle}>
            <div>{drinksDisplay}</div>
          </div>
        </div>
        <div className={"busDiv"}>
          <button onClick={this.busToggle}>
            <i class="fas fa-store" />
          </button>
          <div className={this.state.busToggle}>
            <h1>{business_name}</h1>
            <p>
              {address}, {suite && suite}
            </p>
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <div className={"busDescription"}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
