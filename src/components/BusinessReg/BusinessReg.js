import React , {Component} from 'react';


class BusinessReg extends Component{
  constructor(){
    super();
    this.state={

    };
  }
  render(){
    return (
      <div className={'BusinessReg'}>
        <form>
          <label>
            Business Name
            <input></input>
          </label>
          <label>
            Contact Name 
            <input></input>
          </label>
         
          <label>
            Address 
            <input></input>
          </label>
          <label>
            Phone 
            <input></input>
          </label>
          <label>
            Email 
            <input></input>
          </label>
          <label>
            Password 
            <input></input>
          </label>
          <label>
            Confirm Password 
            <input></input>
          </label>
        </form>
      </div>
    )
  }
}

export default BusinessReg;