import React, { Component } from "react";
import axios from "axios";
import "./Drink.scss";
import Ingredients from "../Ingredients/Ingredients";

class Drink extends Component {
  constructor() {
    super();
    this.state = {
      drinkName: "",
      image: "",
      ingredients: [],
      measurements: [],
      instructions: "",
      addIngrediant: "",
      customName: "",
      drinkPrice: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
          this.props.match.params.id
        }`
      )
      .then(res => {
        console.log(res.data.drinks[0]);
        for (let props in res.data.drinks[0]) {
          if (props === "strDrink") {
            this.setState({
              drinkName: res.data.drinks[0][props]
            });
          } else if (props === "strDrinkThumb") {
            this.setState({
              image: res.data.drinks[0][props]
            });
          } else if (props === "strInstructions") {
            this.setState({
              instructions: res.data.drinks[0][props]
            });
          } else if (
            props.includes("Ingredient") &&
            res.data.drinks[0][props] !== "" &&
            res.data.drinks[0][props] !== " " &&
            res.data.drinks[0][props] !== null
          ) {
            this.setState({
              ingredients: [
                ...this.state.ingredients,
                res.data.drinks[0][props]
              ]
            });
          } else if (
            props.includes("Measure") &&
            res.data.drinks[0][props] !== "" &&
            res.data.drinks[0][props] !== " " &&
            res.data.drinks[0][props] !== null
          ) {
            this.setState({
              measurements: [
                ...this.state.measurements,
                res.data.drinks[0][props]
              ]
            });
          }
        }
      });
  }

  handleIngredientChange = e => {
    console.log(e.target.value);

    this.setState({
      addIngrediant: e.target.value
    });
  };
  handleNameChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleIngredientClick = e => {
    this.setState({
      ingredients: [...this.state.ingredients, this.state.addIngrediant],
      addIngrediant: ""
    });
  };

  handleClick = index => {
    console.log(index);
    console.log("hello");
    let array = [...this.state.ingredients];
    array.splice(index, 1);
    let array2 = [...this.state.measurements];
    array2.splice(index, 1);
    this.setState({
      ingredients: array,
      measurements: array2
    });
  };

  render() {
    let ingredientsList = this.state.ingredients.map((ingredient, index) => {
      return (
        <Ingredients
          name={"ingredients"}
          ingredient={ingredient}
          measurement={this.state.measurements[index]}
          handleClick={() => this.handleClick(index)}
        />
      );
    });
    return (
      <div className="drinkPageDiv">
        <h1 className="drinkName">
          {this.state.drinkName}-{"$" + this.state.drinkPrice}
        </h1>
        <div className="drinkDiv">
          <div className="displayDiv">
            <img src={this.state.image} className="drinkImage" />
            <p className="drinkInstructions">{this.state.instructions}</p>
          </div>
          <div className="ingredientsDiv">
            <ul className="drinkIngredients">{ingredientsList}</ul>
          </div>
          <div className="updateDiv">
            <div className="changeName">
              <label> Change Name</label>
              <input
                name="drinkName"
                onChange={this.handleNameChange}
                name="drinkName"
                placeholder={this.state.drinkName}
              />
              <label> Price</label>
              <input
                name="drinkPrice"
                onChange={this.handleNameChange}
                name="drinkPrice"
                placeholder={"$5.00"}
              />
            </div>
            <div className="addIngredient">
              <label> Add Ingredient </label>
              <input
                onChange={this.handleIngredientChange}
                name="customName"
                placeholder="add an ingredient"
                value={this.state.addIngrediant}
              />
              <button onClick={this.handleIngredientClick} name="customName">
                Add Ingredient
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Drink;
