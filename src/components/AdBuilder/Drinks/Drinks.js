import React, { Component } from "react";
import "./Drinks.scss";

export default class Drinks extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
  }
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  render() {
    let {
      id,
      ad_id,
      drink_name,
      drink_price,
      drink_image,
      drink_ingredients
    } = this.props.drink;
    let updateingredients = drink_ingredients.split(",,").map(item => {
      return <li>{item}</li>;
    });

    return (
      <div className={"drink2"}>
        <img src={drink_image} />
        <h3>
          ${drink_price} - {drink_name}
        </h3>
        <i class="fas fa-arrow-alt-circle-down" onClick={this.toggle} />
        {this.state.toggle && (
          <div className={"ingredientsDiv"}>
            <p>{updateingredients}</p>
          </div>
        )}
      </div>
    );
  }
}
