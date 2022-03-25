import React ,{useState}from "react";
import { MapContainer, TileLayer, FeatureGroup,GeoJSON , Marker,Popup} from "react-leaflet";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import SearchControl from "./searchControl";
import { DraftControl } from "react-leaflet-draft";
import scavengerHuntGeoJson from './scavenger-hunt.json';
import { marker } from "leaflet";



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
          polyline: {
              shapeOptions: { color: "red" },
              allowIntersection: false,
              showLength: true,

              metric: false,
              feet: false
          },
          polygon: {
              allowIntersection: false,
              shapeOptions: { color: "red" },
              edit: false,
              showLength: true,
              metric: false,
              feet: false,
              showArea: true
          },
          rectangle: {
              shapeOptions: { color: "red" },
              showLength: true,
              metric: false,
              feet: false,
              showArea: true
          },
        
          circle: {
              shapeOptions: { color: "red" },
              showLength: true,
              metric: false,
              feet: false,
              showArea: true
          },
         
          marker: { zIndexOffset: "999" }
      }}
  edit={{
      edit: true
  }}
  limitLayers={2}
/>
<DraftControl 
         draw={{
          polyline: {
              shapeOptions: { color: "bleu" },
              allowIntersection: false,
              showLength: true,

              metric: false,
              feet: false
          },
          polygon: {
              allowIntersection: false,
              shapeOptions: { color: "blue" },
              edit: false,
              showLength: true,
              metric: false,
              feet: false,
              showArea: true
          },
          rectangle: {
              shapeOptions: { color: "blue" },
              showLength: true,
              metric: false,
              feet: false,
              showArea: true
          },
        
          circle: {
              shapeOptions: { color: "blue" },
              showLength: true,
              metric: false,
              feet: false,
              showArea: true
          },
         
          marker: { zIndexOffset: "999" }
      }}
  edit={{
      edit: true
  }}
  limitLayers={2}
/>

            </FeatureGroup>
            <GeoJSON data={scavengerHuntGeoJson} />
            <Marker position={position}>
        <Popup >
          A pretty CSS3 popup. <br /> 
          <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"></input>
        </Popup>
      </Marker>
      </MapContainer>
    );
  }
}

export default MapComponent;
