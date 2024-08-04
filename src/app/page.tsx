"use client";

import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import GoogleMapRouteComponent from "./googleMapComponent";
import { useLoadScript } from "@react-google-maps/api";

export interface LatLongProps {
  lat: number;
  lng: number;
}

export interface DestinationProps {
  address: string;
  latLong: LatLongProps;
}

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: ["places"],
  });

  const [jorneyStartInfo, setJorneyStartInfo] = useState<DestinationProps>();
  const [jorneyEndInfo, setJorneyEndInfo] = useState<DestinationProps>();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Limpo Drivers</h1>

      <SearchInput setDestination={setJorneyStartInfo} label="Set pick up point" />
      <SearchInput setDestination={setJorneyEndInfo} label="Set drop up point" />

      {jorneyStartInfo && jorneyEndInfo && isLoaded && (
        <GoogleMapRouteComponent
          origin={jorneyStartInfo?.latLong}
          destination={jorneyEndInfo?.latLong}
        />
      )}
    </>
  );
}
