import React, { Component } from "react";
import Axios from "axios";
import Unsplash from "react-unsplash-wrapper";
import AdBuilder from "../AdBuilder/AdBuilder";

export default class AdPage extends Component {
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
    let { ad } = this.state;
    console.log(this.props.match.params.id);
    // let cards = ad.map(card => {
    //   console.log(card);
    //   return (
    //     <AdBuilder
    //       id={card.this.props.match.params.id}
    //       business_id={card.business_id}
    //       business_title={card.business_name}
    //       ad_title={card.ad_title}
    //       ad={card.id}
    //     />
    //   );
    // });
    return (
      <div className={"AdPageContainer"}>
        <div className={"backgroundImage"}>
          <Unsplash width="1500" height="1000" keywords="cocktails, bar" />
        </div>
        <div className="adDiv" />
      </div>
    );
  }
}
