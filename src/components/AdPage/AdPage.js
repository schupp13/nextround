import React, { Component } from "react";
import Axios from "axios";
import Unsplash from "react-unsplash-wrapper";
import AdBuilder from "../AdBuilder/AdBuilder";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AdPage.scss";

class AdPage extends Component {
  constructor() {
    super();
    this.state = {
      ad: []
    };
  }

  componentDidMount() {
    Axios.get(`/api/ad/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ ad: response.data });
        console.log(response);
      })
      .catch(err => console.log(err));
  }
  render() {
    let { business_name, first_name } = this.props.session;
    let { ad } = this.state;
    let { id } = this.props.match.params;
    console.log(this.props.match.params);
    let cards = ad.map(card => {
      console.log(card);
      return (
        <AdBuilder
          id={id}
          business_id={card.business_id}
          business_title={card.business_name}
          ad_title={card.ad_title}
          ad={card.id}
        />
      );
    });
    return (
      <div className={"AdPageContainer"}>
        {business_name === "" && <Redirect to="/userDash" />}
        {first_name === "" && <Redirect to="/" />}

        <div className={"backgroundImage"}>
          <Unsplash width="1500" height="1000" keywords="cocktails, bar" />
        </div>
        <div className={"adDivContainer"}>
          <div className="adDiv">{cards}</div>
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
export default connect(mapStateToProps)(AdPage);
