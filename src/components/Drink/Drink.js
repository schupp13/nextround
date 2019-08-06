import React, {Component} from 'react';
import axios from 'axios';
import { thisExpression } from '@babel/types';

class Drink extends Component{
  constructor(){
    super();
    this.state={
      drinkName :'',
      image: '',
      ingredients: [],
      measurements: [],
      instructions: ''
    }
  }

   componentDidMount(){
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.id}`).then( res =>{
      console.log(res.data.drinks[0])
      for(let props in res.data.drinks[0]){
        if(props === 'strDrink'){
          this.setState({
            drinkName: res.data.drinks[0][props],
          })
        }else if(props === 'strDrinkThumb'){
          this.setState({
            image: res.data.drinks[0][props],
          })
          
        }
        else if(props === 'strInstructions'){
          this.setState({
            instructions: res.data.drinks[0][props],
          })
          
        }else if ((props.includes('Ingredient')) && res.data.drinks[0][props] !== ""  && res.data.drinks[0][props] !== " " && res.data.drinks[0][props] !== null){
          this.setState({
            ingredients: [...this.state.ingredients, res.data.drinks[0][props]]
          })
        }else if ((props.includes('Measure')) && res.data.drinks[0][props] !== ""  && res.data.drinks[0][props] !== " " && res.data.drinks[0][props] !== null){
          this.setState({
            measurements: [...this.state.measurements, res.data.drinks[0][props]]
          })
        }
      }
    })
  }

  render(){
    console.log(this.state.measurements)
    let ingredients = this.state.ingredients.map((res, index) =>{
      return <li>{this.state.measurements[index]}-{res}<i class="fas fa-window-close"></i></li>
    })
    return(
    <div>
      <h1>{this.state.drinkName}</h1>
      <img src={this.state.image} />
      <p>{this.state.instructions}</p>
      <ul>
        {ingredients}
      </ul>
    </div>
    )
  }

}

export default Drink;
