import React from "react";
import { MapContainer, TileLayer, FeatureGroup,GeoJSON } from "react-leaflet";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./searchControl";
import { DraftControl } from "react-leaflet-draft";
import scavengerHuntGeoJson from './scavenger-hunt.json';



class MapComponent extends React.Component {
  render() {
    const { position, zoom } = this.props;

    const prov = OpenStreetMapProvider();

    return (
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <SearchControl
          provider={prov}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter address, please"}
          keepResult={true}
        />
           <FeatureGroup>
           <DraftControl
    draw={{
      circle: true,
      rectangle: true
  }}
  edit={{
      edit: false
  }}
  limitLayers={2}
/>
            </FeatureGroup>
            <GeoJSON data={scavengerHuntGeoJson} />

      </MapContainer>
    );
  }
}

export default MapComponent;
