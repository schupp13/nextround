import React , {Component} from 'react';
import axios from 'axios';
import './Dashboard.scss'

class Dashboard extends Component {
  constructor(){
    super()
    this.state={
      
      drinks: [],
    
      filterDrinks: []
    }
  }

   getDrinks =() =>{
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink').then( res =>{
      console.log(res.data.drinks)
      this.setState({drinks: res.data.drinks})
    });
  }

  componentDidMount(){
    this.getDrinks();
  }

  handleClick=(e)=>{
    let cool = e.target.name;
    console.log(cool)
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cool}`).then( res =>{
      console.log(res.data.drinks)
      this.setState({drinks: res.data.drinks})
    });
    }

    updateFilter =(value)=>{
      this.setState({
        filterDrinks: value
      })
    }

    handleChange=(e)=>{
      this.setState({
        filterDrinks: [...this.state.drinks],
      })
      console.log(this.state.filterDrinks)

      let filterList = this.state.filterDrinks.filter( res =>{
        return  res.strDrink.toLowerCase().search(e.target.value) != -1     
      })
      console.log(filterList);
      this.updateFilter(filterList);
     
    }

  render(){
    const drinks = this.state.drinks.map(one =>{
    return (  
          <div className='drink'>
          <div>
            <p>{one.idDrink}</p>
            <h2>{one.strDrink}</h2>
          </div>
            <img src={one.strDrinkThumb}/>
          </div>
      )
    
    });
   
    console.log(this.state.catagories)
    return (
      <div className={'DashboardPage'}>
      
        <h1 className={'pageHeader'}>Dashboard</h1>
        <input onChange={this.handleChange}/>
        <div className={'filterDiv'}>
          <button onClick={this.handleClick} name={'Vodka'}>Vodka</button>
          <button onClick={this.handleClick} name={'Rum'}>Rum</button>
          <button onClick={this.handleClick} name={'Tequila'}>Tequila</button>
          <button onClick={this.handleClick} name={'Gin'}>Gin</button>
        </div>
        
        <div className='drinkContainer'>
          {drinks}
        </div>
      </div>
    )
  }
}

export default Dashboard;