import React from 'react';
import { LeafletMouseEvent } from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet';

interface MapItems {
  setPosition: Function;
  initialPosition: [number, number];
  position: [number, number];
}

const MapComponent = (props: MapItems) => {
  const handleMapClick = (e: LeafletMouseEvent) => {
    props.setPosition([e.latlng.lat, e.latlng.lng]);
  };
  return (
    <Map center={props.initialPosition} zoom={15} onClick={handleMapClick}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.position} />
    </Map>
  );
};

export default MapComponent;
