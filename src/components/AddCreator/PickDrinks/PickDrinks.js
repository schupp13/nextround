import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getDrinks,
  getMix,
  updateDrinks
} from "../../../redux/reducers/drinkReducer";
import "./PickDrinks.scss";
import { Link } from "react-router-dom";
import Gif from "../../vid/loading.gif";

class PickDrinks extends Component {
  constructor() {
    super();
    this.state = {
      topics: ["Beer", "Bourbon", "Gin", "Rum", "Tequila", "Vodka", "Whisky"],
      bottles: "",
      hideForm: false
    };
  }

  //keep here
  buildBottles = () => {
    let bottles = this.state.topics.map(res => {
      return (
        <div className={"bottles"}>
          {" "}
          <h3>{res}</h3>{" "}
          <img
            onClick={this.handleClick}
            src={`https://www.thecocktaildb.com/images/ingredients/${res}.png`}
            name={res}
          />
        </div>
      );
    });

    this.setState({
      bottles: bottles
    });
  };

  componentDidMount() {
    this.props.getMix();
    this.buildBottles();
  }

  handleClick = e => {
    let alcohol = e.target.name;
    this.props.getDrinks(alcohol);
  };

  handleChange = e => {
    let filterList = this.props.drinks.filter(res => {
      return res.strDrink.toLowerCase().search(e.target.value) !== -1;
    });
    this.props.updateDrinks(filterList);
  };

  render() {
    console.log(this.props);
    let { drinks, filterDrinks, loading } = this.props;

    const filteredDrinks = filterDrinks.map(res => {
      return (
        <Link to={`/drink/${res.idDrink}`} style={{ textDecoration: "none" }}>
          <div>
            <div className="drink">
              <div>
                <p>{res.idDrink}</p>
                <h2>{res.strDrink}</h2>
              </div>
              <img src={res.strDrinkThumb} />
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className={"PickDrinksPage"}>
        {}
        <h1 className={"pageHeader"}>Drink Picker</h1>
        <div className="stepNav">
          <Link to="/create-ad/name">
            <i class="fas fa-chevron-left" />
          </Link>
          <p>Step 2 of 3</p>
          <Link to="/create-ad/confirm">
            <i class="fas fa-chevron-right" />
          </Link>
        </div>
        <div className={"filterDiv"}>
          <i class="fas fa-random bottles" onClick={this.props.getMix} />
          {this.state.bottles}
        </div>
        <input placeholder="search" onChange={this.handleChange} />
        {this.props.loading ? (
          <img src={Gif} />
        ) : (
          <div className="drinkContainer">{filteredDrinks}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer,
    drinks: reduxState.drinkReducer.drinks,
    filterDrinks: reduxState.drinkReducer.filterDrinks,
    loading: reduxState.drinkReducer.loading
  };
};

export default connect(
  mapStateToProps,
  { getDrinks, getMix, updateDrinks }
)(PickDrinks);
