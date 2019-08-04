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


  componentDidMount(){
  
  }

  render(){
    return(
      <section className={'landingPageDiv'}>
      
        <div className={'businessDiv'}>
        <Link to='/BusinessReg'>
        <i class="material-icons">business</i>
          <h1>Start Advertising</h1>
          </Link>
        </div>
      

        <div className={'publicDiv'}>
        <i class="material-icons">local_drink</i>
          <h1>Find a Hapy Hour Near You</h1>
          
        </div>
      </section>
    )
  }

}

export default Landing; 