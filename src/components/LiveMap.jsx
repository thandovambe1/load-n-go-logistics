import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -33.918861, // Cape Town
  lng: 18.423300,
};

const LiveMap = ({ driverLocation }) => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={driverLocation || defaultCenter}
        zoom={14}
      >
        {driverLocation && <Marker position={driverLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveMap;
