import AdBuilder from "../AdBuilder/AdBuilder";
import CurrentLocation from "./CurrentLocation";
import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Axios from "axios";
require("dotenv").config();
const { REACT_APP_MAP } = process.env;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    ads: [], //this is for ads Compnenent
    adsAddress: [] //this is for the markers
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  buildaddress = () => {
    this.state.adsAddress.map(business => {
      let string = business.suite
        ? `${business.address} ${business.suite}, ${business.city}, ${
            business.state
          } ${business.zip}`
        : `${business.address} ${business.city}, ${business.state} ${
            business.zip
          }`;
      console.log(string);

      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: string,
          key: REACT_APP_MAP
        }
      })
        .then(response => {
          console.log(response.data.results[0].geometry.location);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  async componentDidMount() {
    let ads = await Axios.get("/api/getAllAds").catch(err => {
      console.log(err);
    });

    let adsAddress = await Axios.get("/api/getAllAdsAddress").catch(err => {
      console.log(err);
    });

    this.setState({ ads: ads.data, adsAddress: adsAddress.data });
    this.buildaddress();
  }

  render() {
    console.log(this.state);
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={"current location"} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_MAP
})(MapContainer);
