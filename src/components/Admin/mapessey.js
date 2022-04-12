import React, { useEffect, useRef } from 'react';
    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import * as EL from "esri-leaflet";
    import axios from 'axios';
    import { GeoJSON } from 'react-leaflet';

    export default function Mapfun() {
      const mapCanvas = useRef(null);
    
      const dataParcel = axios.get('https://gist.githubusercontent.com/UmairMughal901/d43ee77a9be27f2dcd006038fe8f07e7/raw/8650f4f3585ff0c1706da7a434251cfc70f1907b/map.geojson').then(resp => {
    
        console.log(resp.data);
      });
    
    
      useEffect(() => {
        mapCanvas.current = L.map('mapdiv', {
          center: [31, 72],
          zoom: 6,
          layers: [
            L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),
            EL.featureLayer({ url: 'http://localhost:6080/arcgis/rest/services/Pu/PB_/MapServer/11' }),
  //Main Issue here          
L.geoJSON(dataParcel),
    
    
          ]
        })
    
        
      }
        );
    
      //todo 
    
    
      return (
        <div id='mapdiv' style={{ width: '100%' }}>
        </div>
    
      )
    }