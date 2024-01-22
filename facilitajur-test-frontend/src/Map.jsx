import React, { useRef } from "react";
import GoogleMapReact from "google-map-react";
import { G_MAPS_API_KEY } from "./consts";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({ onMarkerChange }) {
  const refMarker = useRef(null);
  const refMap = useRef(null);

  const defaultProps = {
    center: {
      lat: -27.085813901962272,
      lng: -52.61109889034641,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: G_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps: googleMaps }) => {
          console.log({ map, googleMaps });
          refMap.current = map;
          refMarker.current = new googleMaps.Marker({
            position: defaultProps.center,
            map,
            draggable: true,
          });

          refMarker.current.addListener("dragend", (ev) => {
            onMarkerChange(ev.latLng.lat(), ev.latLng.lng());
          });
        }}
        onClick={(ev) => {
          refMarker.current.setPosition({
            lat: ev.lat,
            lng: ev.lng,
          });
          onMarkerChange(ev.lat, ev.lng);
        }}
      >
        {/* <AnyReactComponent lat={-27} lng={-52} text="My Marker" /> */}
      </GoogleMapReact>
    </div>
  );
}
