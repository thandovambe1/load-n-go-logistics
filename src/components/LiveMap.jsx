import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import polyline from "polyline";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -33.918861,
  lng: 18.423300,
};

const LiveMap = ({ driverLocation, destination }) => {
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (driverLocation && destination) {
      fetchRoute(driverLocation, destination);
    }
  }, [driverLocation, destination]);

  const fetchRoute = async (origin, dest) => {
    const originStr = `${origin.lat},${origin.lng}`;
    const destStr = `${dest.lat},${dest.lng}`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const points = polyline.decode(data.routes[0].overview_polyline.points);
      const routePath = points.map(([lat, lng]) => ({ lat, lng }));
      setPath(routePath);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={driverLocation || defaultCenter}
        zoom={14}
      >
        {driverLocation && <Marker position={driverLocation} label="Driver" />}
        {destination && <Marker position={destination} label="Drop-off" />}
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{ strokeColor: "#FF0000", strokeWeight: 4 }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveMap;
