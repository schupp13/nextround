import React, { Component } from "react";
import "./BusinessDash.scss";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import AdBuilder from "../AdBuilder/AdBuilder";
import BusineesDiv from "../AdBuilder/BusinessDiv/BusinessDiv";
import Img from "../Img/Img";

class BusinessDash extends Component {
  constructor() {
    super();
    this.state = {
      ads: []
    };
  }

  deleteAd = id => {
    console.log(id);
    Axios.delete(`/api/ads/${id}`).then(res => {
      this.setState({ ads: res.data });
    });
  };

  componentDidMount() {
    //This component gets the ads
    Axios.get(`/api/company/ads/${this.props.session.id}`).then(response => {
      console.log(response.data);
      this.setState({ ads: response.data });
    });
  }
  render() {
    console.log(this.state.ads);
    let {
      id,
      business_name,
      address,
      suite,
      first_name,
      last_name,
      description,
      phone,
      city,
      state,
      zip
    } = this.props.session;

    let listOfAds = this.state.ads.map(ad => {
      return (
        <div className="adContainer">
          <i
            className="fas fa-trash-alt trash"
            onClick={() => this.deleteAd(ad.id)}
          />
          <AdBuilder ad={ad} />
        </div>
      );
    });
    return (
      <div className="BusinessDashPage">
        {business_name === "" && <Redirect to="/userDash" />}
        {first_name === "" && <Redirect to="/" />}
        <h1 className="pageHeader">Dashboard</h1>

        <div className="businessProfile">
          <div className="cardheader">
            <h2>{business_name}</h2>

            <i class="fas fa-user-edit" />
          </div>

          <div className="cardbody">
            <div className="addressDiv">
              <h3>Address:</h3>
              <p>{address}</p>
              <p>Suite:{suite}</p>
              <p>
                {city}, {state} {zip}
              </p>
            </div>

            <div className="managerDiv">
              <h3>Manager</h3>
              <p>
                {first_name} {last_name}
                <p>{phone}</p>
              </p>
            </div>
            <div className="descriptionDiv">
              <div className="descriptionDiv">
                <h3>Company Description</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="editProfile" />
        </div>

        <div className="adHeader">
          <div className="plusAndHeader">
            <Link to="/create-ad/name">
              <i className="far fa-plus-square" />
            </Link>

            <h2 className={"AdsHeader"}>Your Ads</h2>
          </div>
          {listOfAds}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    session: reduxState.authReducer
  };
};
export default connect(mapStateToProps)(BusinessDash);
