"use client";

import React, { FC, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { DestinationProps } from "./page";

const placesLibrary = ["places"];

export interface SearchInputProps {
  label: string;
  setDestination: (destination: DestinationProps) => void;
}

const SearchInput: FC<SearchInputProps> = ({ label, setDestination }) => {
  const [results, setResults] = useState<google.maps.places.Autocomplete>();

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setResults(autocomplete);
  };

  const onPlaceChanged = () => {
    if (results != null) {
      const place = results.getPlace();
      const address = place?.formatted_address || "";
      const lat = place?.geometry?.location?.lat() || 0;
      const lng = place?.geometry?.location?.lng() || 0;

      setDestination({
        address,
        latLong: {
          lat,
          lng,
        },
      });
    } else {
      alert("Please enter text");
    }
  };

  return (
    <div id="searchColumn">
      <h2>{label}</h2>
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        fields={["formatted_address", "geometry", "name"]}
        restrictions={{ country: "au" }}
      >
        <input
          type="text"
          placeholder="Enter pick Address"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `340px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </Autocomplete>
    </div>
  );
};

export default SearchInput;
