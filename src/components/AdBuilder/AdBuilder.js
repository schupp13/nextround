// READ ME: THE POINT OF AD BUILDER IS TO GENERATE ALL ADS GIVEN ONE PIECE OF DATA- THE USER ID FROM THERE I WILL MAKE A COMPONENT;
//THIS COMPONENT WILL TAKE CARE OF THE BUSINESS SLIDE ALSO -
import React, { Component } from "react";
import Axios from "axios";
import "./AdBuilder.scss";

export default class AdBuilder extends Component {
  constructor() {
    super();
    this.state = {
      business: []
    };
  }

  componentDidMount() {
    Axios.get(`/api/company/${this.props.business_id}`).then(response => {
      this.setState({ business: response.data });
    });
  }
  render() {
    let ad = this.state.business.map(business => {
      let {
        business_name,
        city,
        address,
        state,
        zip,
        suite,
        first_name,
        last_name,
        description,
        phone
      } = business;
      return (
        <div className={"AdBuilderDiv"}>
          //below needs to toggle
          <button>
            <i class="fas fa-store" />
          </button>
          <div>
            <h1>{business_name}</h1>
            <div className={"busaddressDiv"}>
              <p>
                {address}, {suite && suite}
              </p>
              <p>
                {city}, {state} {zip}
              </p>
              <h5>Contact</h5>
              <p>{phone}</p>
              <p>
                Manager: {first_name} {last_name}
              </p>
            </div>
            <div className={"busDescriptionDiv"}>
              <p>{description}</p>
            </div>
          </div>
        </div>
      );
    });
    return <div className={"busDiv"}>{ad}</div>;
  }
}
