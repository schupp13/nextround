import AdBuilder from "../AdBuilder/AdBuilder";
import myMarker from "../vid/myMarker.png";
import { Link, Redirect } from "react-router-dom";
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
        console.log(business);
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
            console.log(response);
            response.data.results[0].geometry.location.ad_title =
              business.ad_title;
            response.data.results[0].geometry.location.ad_id = business.id;

            response.data.results[0].geometry.location.business_name =
              business.business_name;
            response.data.results[0].geometry.location.business_id =
              business.business_id;
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

  render() {
    console.log(this.state);
    let coordinates = this.state.coordinates.map(local => {
      console.log(local);
      return (
        <Marker
          onClick={this.customeMarkerClick}
          name={local.ad_title}
          position={local}
          minWidth="90vw"
          maxHeight="100%"
          icon={myMarker}
          content={
            <a href={`#/adPage/${local.ad_id}`}>
              <AdBuilder
                id={local.ad_id}
                business_id={local.business_id}
                business_title={local.business_name}
                ad_title={local.ad_title}
              />
            </a>
          }
        >
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onClose}
            visible={this.state.showingInfoWindow}
          />
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
            <h1>{this.state.selectedPlace.name}</h1>
            {this.state.selectedPlace.content}
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
