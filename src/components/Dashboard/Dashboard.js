import React , {Component} from 'react';
import axios from 'axios';
import './Dashboard.scss';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
  constructor(){
    super()
    this.state={
      topics: ['Beer', 'Bourbon', 'Gin', 'Rum', 'Tequila', 'vodka','whisky'], 
      drinks: [],
      filterDrinks: [],
      bottles: '',
      hideForm: false
    }
  }

   getDrinks =() =>{
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink').then( res =>{
      console.log(res.data.drinks)
      this.setState({drinks: res.data.drinks, filterDrinks: res.data.drinks})
    });
  }

  buildBottles = ()=>{
   let bottles =  this.state.topics.map( res =>{
     return <div className={'bottles'}> <h3>{res}</h3> <img  onClick={this.handleClick} src={`https://www.thecocktaildb.com/images/ingredients/${res}.png`} name={res} /></div>
    })
    this.setState({
      bottles: bottles
    })
  }

  componentDidMount(){
    this.getDrinks();
    this.buildBottles();
  }

  handleClick=(e)=>{
    let cool = e.target.name;
    console.log(cool)
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cool}`).then( res =>{
      console.log(res.data.drinks)
      this.setState({drinks: res.data.drinks, filterDrinks: res.data.drinks})
    });
    }

   

    handleChange=(e)=>{
      let filterList = this.state.drinks.filter( res =>{
        console.log(e.target.value)
          return res.strDrink.toLowerCase().search(e.target.value) !== -1     
      })
      console.log(filterList)
      this.setState({
        filterDrinks: filterList
      })
  
    }

    customForm =(id)=>{
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then(res =>{
        console.log(res.data.drinks)
        this.setState({
          hideForm: !this.state.hideForm
        })
        console.log(this.state.hideForm)
      })
    }

  render(){
    const filteredDrinks = this.state.filterDrinks.map(res =>{
     return ( <Link to={`/drink/${res.idDrink}`} style={{ textDecoration: 'none'}}>
      <div>
        <div className='drink'>
        <div>
          <p>{res.idDrink}</p>
          <h2>{res.strDrink}</h2>
        </div>
          <img src={res.strDrinkThumb}/> 
        </div>
       
        </div>
        </Link>)
    })
   
    return (
      <div className={'DashboardPage'}>
        <h1 className={'pageHeader'}>Dashboard</h1>  
        <div className={'filterDiv'}>
        <i class="fas fa-random" onClick={this.getDrinks}></i>
        {this.state.bottles}  
        </div>
        <input placeholder='search' onChange={this.handleChange}/>
        <div className='drinkContainer'>
          {filteredDrinks}   
        </div>
      </div>
    )
  }
}

export default Dashboard;