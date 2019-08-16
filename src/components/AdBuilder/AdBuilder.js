// READ ME: THIS COMPONENT SHOULD RECEIVE ONE AD
//THIS COMPONENT WILL TAKE CARE OF THE BUSINESS SLIDE ALSO -
import React, { Component } from "react";
import Axios from "axios";
import "./AdBuilder.scss";
import Drinks from "./Drinks/Drinks";
import BusinessDiv from "./BusinessDiv/BusinessDiv";

export default class AdBuilder extends Component {
  constructor() {
    super();
    this.state = {
      toggleBiz: false,
      toggleDrink: false,
      business: {},
      drinks: []
    };
  }

  componentDidMount() {
    Axios.get(`/api/company/${this.props.ad.business_id}`).then(
      businessResponse => {
        Axios.get(`/api/ad/drinks/${this.props.ad.id}`).then(drinksResponse => {
          this.setState({
            business: businessResponse.data[0],
            drinks: drinksResponse.data
          });
        });
      }
    );
  }

  toggleDrink = () => {
    this.setState({
      toggleDrink: !this.state.toggleDrink
    });
  };

  toggleBiz = () => {
    this.setState({
      toggleBiz: !this.state.toggleBiz
    });
  };

  render() {
    console.log(this.state);
    let drinksList = this.state.drinks.map(drink => {
      return <Drinks drink={drink} />;
    });

    return (
      <article className={"AdBuilderArticle"}>
        <h1 className={"adTitle"}>
          {this.props.ad.ad_title} @{this.state.business.business_name}
        </h1>
        <button name={"drinkToggle"} onClick={this.toggleDrink}>
          <i class="fas fa-cocktail" />
        </button>
        {this.state.toggleDrink && (
          <div className={"AdBuilderDrinkDiv"}>{drinksList}</div>
        )}

        <button
          name={"bizToggle"}
          className={"bizToggle"}
          onClick={this.toggleBiz}
        >
          <i class="fas fa-store" />
        </button>
        {this.state.toggleBiz && <BusinessDiv business={this.state.business} />}
      </article>
    );
  }
}
