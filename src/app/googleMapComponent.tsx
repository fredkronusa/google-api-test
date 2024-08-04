"use client";
import React, { FC } from "react";
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { LatLongProps } from "./page";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface GoogleMapRouteComponentProps {
  origin: LatLongProps;
  destination: LatLongProps;
}

const GoogleMapRouteComponent: FC<GoogleMapRouteComponentProps> = ({ origin, destination }) => {
  const [directions, setDirections] = React.useState(null);
  const [travelTime, setTravelTime] = React.useState(null);

  const directionsCallback = (response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
      } else {
        console.error("Directions request failed due to " + response.status);
      }
    }
  };

  return (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={10}>
        <Marker position={origin} />
        <Marker position={destination} />
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={directionsCallback}
        />
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
      {travelTime && <p>Estimated travel time: {travelTime}</p>}
    </>
  );
};

export default GoogleMapRouteComponent;
