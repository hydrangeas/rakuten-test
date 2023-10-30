"use client";

import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Hotel } from "@/types/Hotel";

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 35.182253007459444,
  lng: 136.90534328438358,
};

type Props = {
  hotels: Hotel[];
};

function MyComponent({ hotels }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {hotels.map((hotel: Hotel) => (
          <MarkerF
            key={hotel.hotelNo}
            position={{
              lat: hotel.latitude,
              lng: hotel.longitude,
            }}
          />
        ))}
        {/* <MarkerF position={{ lat: -34.397, lng: 150.644 }} /> */}
        <MarkerF position={{ lat: 94.3619, lng: 45.966777 }} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
