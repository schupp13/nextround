import React , {Component} from 'react';
import './UserReg.scss'


class BusinessReg extends Component{
  constructor(){
    super();
    this.state={
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',    
    };
  }


  handleChange=(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    })
    
  }
  render(){
    console.log(this.state);
    return (
      <div className={'UserReg'}>
        <form>
        <h1 className={'pageHeader'}>Registration</h1>
        <h2>Contact Information</h2>
          <label>
           First Name 
            <input required onChange={this.handleChange} name='firstName'></input>
          </label>
          <label>
            Last Name 
            <input required onChange={this.handleChange} name='lastName'></input>
          </label>
          <label>
            Email 
            <input required onChange={this.handleChange} name='email'></input>
          </label>
          <label>
            Password 
            <input required onChange={this.handleChange} name='password'></input>
          </label>
          <label>
            Confirm Password 
            <input required onChange={this.handleChange} name='confirmPassword'></input>
          </label>
          <buttom type='submit' className='submitButton'>Submit</buttom>
        </form>
      </div>
    )
  }
}

export default BusinessReg;