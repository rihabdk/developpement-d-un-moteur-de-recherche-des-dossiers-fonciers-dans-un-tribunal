
import "./App.css";
import { DraftControl ,EditControl} from "react-leaflet-draft";
import { MapContainer, TileLayer, Marker, FeatureGroup, GeoJSON } from "react-leaflet";
import { useRef } from "react";
import scavengerHuntGeoJson from './scavenger-hunt.json';
import {geosearch , GeoSearchControlElement,OpenStreetMapProvider} from 'esri-leaflet-geocoder';
import { useEffect } from "react";
import { control } from "leaflet";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"
const position = [36.81897, 10.16579]

function App() {

    return(
        <>
        <MapContainer
            zoom={14}
            center={position}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup >
            
            </FeatureGroup>
            <GeoJSON data={scavengerHuntGeoJson} />
           
        </MapContainer>
      

        
        </>
    )
}
export default App;