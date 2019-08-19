import AdBuilder from "../AdBuilder/AdBuilder";
import { Link } from "react-router-dom";
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
    adsAddress: [], //this is for the markers
    coordinates: [] // ths is the result of the build address function - gecode long and lat when
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

  customeMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log("hello");
  };

  buildaddress = () => {
    // this function maps though the address from the database and hits gecode endpoint to get back the long and lat
    Promise.all(
      //when using promise all it will not let me store the map results to a variable
      this.state.adsAddress.map(business => {
        let string = business.suite
          ? `${business.address} ${business.suite}, ${business.city}, ${
              business.state
            } ${business.zip}`
          : `${business.address} ${business.city}, ${business.state} ${
              business.zip
            }`;

        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            address: string,
            key: REACT_APP_MAP
          }
        })
          .then(response => {
            response.data.results[0].geometry.location.ad_title =
              business.ad_title;
            response.data.results[0].geometry.location.ad_id = business.id;
            this.setState({
              coordinates: [
                ...this.state.coordinates,
                response.data.results[0].geometry.location
              ]
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
    );
  };

  async componentDidMount() {
    //GETTING all the ads from DB and storing them in state - this will be passed down to AdBuilder
    let ads = await Axios.get("/api/getAllAds").catch(err => {
      console.log(err);
    });

    //Getting all of the addresses for the ads and storing them in state
    let adsAddress = await Axios.get("/api/getAllAdsAddress").catch(err => {
      console.log(err);
    });

    // Setting ads and adaddrezs to state
    this.setState({ ads: ads.data, adsAddress: adsAddress.data });

    /////this
    this.buildaddress();
  }

  hell = () => {
    console.log("hello");
  };

  render() {
    console.log(this.state);
    let coordinates = this.state.coordinates.map(local => {
      return (
        <Marker
          onClick={this.customeMarkerClick}
          name={local.ad_title}
          position={local}
          content={
            <div>
              {" "}
              <AdBuilder
                ad_title={local.ad_title}
                id={local.ad_id}
                busines_id={local.busines_id}
              />
            </div>
          }
        >
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onClose}
            visible={this.state.showingInfoWindow}
          >
            <h2>TESZT</h2>
          </InfoWindow>
        </Marker>
      );
    });

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
            <a>{this.state.selectedPlace.content} </a>
          </div>
        </InfoWindow>
        {coordinates}
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_MAP
})(MapContainer);
