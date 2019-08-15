// THIS COMPONENT NEEDS <DisplayAd adName={props.ad.ad_name} drinks={props.ad.drinks}businessId={props.session.id}/>
// I want to be able to

import React, { Component } from "react";
import "./DisplayAd.scss";
import axios from "axios";
import { connect } from "react-redux";
import { removeDrink } from "../../redux/reducers/adReducer";

class DisplayAd extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      business_name: "",
      address: "",
      city: "",
      state: "",
      suite: "",
      zip: "",
      phone: "",
      first_name: "",
      last_name: "",
      description: "",
      drinksToggle: "toggleOff",
      busToggle: "busToggleOff"
    };
  }

  componentDidMount() {
    axios.get("/api/company").then(response => {
      console.log();
      this.setState({
        id: response.data[0].id,
        business_name: response.data[0].business_name,
        address: response.data[0].address,
        city: response.data[0].city,
        state: response.data[0].state,
        suite: response.data[0].suite,
        zip: response.data[0].zip,
        phone: response.data[0].phone,
        first_name: response.data[0].first_name,
        last_name: response.data[0].last_name,
        description: response.data[0].description
      });
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
      id,
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
    } = this.state;
    console.log(this.props);
    let drinksDisplay = this.props.drinks.map((drink, index) => {
      return (
        <div className={"drink"}>
          <img src={drink.image} />
          <div>
            <h3>
              ${drink.drinkPrice} - {drink.drinkName}
            </h3>
            <p>{drink.ingredients}</p>
          </div>
          {this.props.session.id === id && (
            <button
              onClick={() => {
                this.props.removeDrink(index);
              }}
            >
              <i class="fas fa-window-close" />
            </button>
          )}
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
          <div className={`${this.state.busToggle} busDiv2`}>
            <h1>{business_name}</h1>
            <div className={"busaddressDiv"}>
              <p>
                {address}, {suite && suite}
              </p>
              <p>
                {city}, {state} {zip}
              </p>
              <h5>Contact</h5>
              <p>{phone}</p>
              <p>
                Manager: {first_name} {last_name}
              </p>
            </div>
            <div className={"busDescriptionDiv"}>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer,
    ad: reduxState.adReducer
  };
};

export default connect(
  mapStateToProps,
  { removeDrink }
)(DisplayAd);
