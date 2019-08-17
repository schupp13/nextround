import React, { Component } from "react";
import axios from "axios";
import "../Img/Img.scss";
export default class Img extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      Loading: true
    };
  }

  getPhotos = () => {
    axios
      .get(
        "https://api.unsplash.com/search/photos?page=1&query=cocktail&count=1&client_id=9a322b0c93676fc87137311f31f651e05178c585d60a3580502192f82b0e4d0d"
      )
      .then(res => {
        this.setState({ photos: res.data.results, Loading: false });
      });
  };

  componentDidMount() {
    this.getPhotos();
  }
  render() {
    let { photos } = this.state;
    let allPhotos = photos.map(photo => {
      return <img src={photo.urls.small} />;
    });

    console.log(photos);

    return <div className="photoDiv">{allPhotos}</div>;
  }
}
