import React , {Component} from 'react';
import './BusinessReg.scss';


class BusinessReg extends Component{
  constructor(){
    super();
    this.state={
      businessName: '',
      contactName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
      address: '', 
      suite:'',
      city: '', 
      state: '',
      zip: '' 
    };
  }
  render(){
    return (
      <div className={'BusinessReg'}>
        <form>
        <h1 className={'pageHeader'}>Business Registration</h1>
        <h2>Contact Information</h2>
          <label>
            Business Name
            <input required></input>
          </label>
          <label>
            Contact Name 
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
          <label>
            Tell us about the environment 
            <textarea></textarea>
          </label>
          <h2>Address</h2>
          <label>
            Address Line 1
            <input></input>
          </label>
          <label>
            Suite#
            <input></input>
          </label>
          <label>
            City
            <input></input>
          </label>
          <label>
            State
            <input></input>
          </label>
          <label>
            Zip
            <input></input>
          </label>       
          <buttom type='submit' className='submitButton'>Submit</buttom>
        </form>
      </div>
    )
  }
}

export default BusinessReg;