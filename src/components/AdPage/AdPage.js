import React, { Component } from "react";
import Axios from "axios";

export default class AdPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    Axios.get(`/api/company/ads/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.props.match.params.id);
    return <div />;
  }
}
