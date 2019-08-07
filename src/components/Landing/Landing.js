import React, {Component} from 'react';
import './Landing.scss';
import {Link} from 'react-router-dom';

class Landing extends Component{
  constructor(){
    super();
    this.state = {
      drinks: [], 
    }
  }


  

  render(){
    return(
      <section className={'landingPageDiv'}>
        <div className={'businessDiv'}>
        <Link to='/BusinessReg'style={{ textDecoration: 'none' }}>
        <i class="fas fa-store"></i>  
          <h1>Start Advertising</h1>
          </Link>
        </div>
      

        <div className={'publicDiv'}>
        <Link>
        <i class="fas fa-cocktail"></i>
          <h1>Find a Drink</h1>
        </Link> 
        </div>
      </section>
    )
  }

}

export default Landing; 