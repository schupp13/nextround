import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "./Map.scss";
import { isAbsolute, relative } from "path";

const mapStyles = {
  position: relative,
  top: "100px",
  margin: "auto",
  width: "80%",
  height: "40vh",
  "z-index": "0"
};

export class MapContainer extends Component {
  render() {
    return (
      <>
        <div className="placeholder" />
        <div className="mapDiv">
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: 32.776665,
              lng: -96.796989
            }}
          />
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `AIzaSyBKqql3raC_WahEA2t9AG0v61WQIxg8m_I`
})(MapContainer);
