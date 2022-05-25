import React, { useEffect, useRef, useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import shp from "shpjs";
function Leaflet(props) {
  const mapRef = useRef();
   
  useEffect(() => {
    var features = [] ;
    const map = mapRef.current.leafletElement;
    props.mapRef(map);
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map)
    map.setView([33.8869, 9.5375], 5.5);
    props.urls.forEach(url => {
      const geo = L.geoJson(
        { features: [] },
        {
          onEachFeature: function popUp(f, l) {
            var out = [];
            if (f.properties) {
              for (var key in f.properties) {
                out.push(key + ": " + f.properties[key]);
              }
              l.bindPopup(out.join("<br />"));
            }
          },
          style : function(feature) {
            var today = new Date(); 
            if(dateDiff(today , feature.properties.Date) > -3000){
              if(dateDiff(today , feature.properties.Date) <0 )return {color: "#000000"}
              if(dateDiff(today , feature.properties.Date) <8 && dateDiff(today , feature.properties.Date)>0 )return {color: "#ff0000"}
              if( dateDiff(today , feature.properties.Date)>8 )return {color: "#ffa500"}
            }
            
            
            
          }  
        },
        
      ).addTo(map);
      shp(require('./shapefiles/'+url)).then(function (data) {
         
        if(data.length>0){
          data.forEach(element => {
            features = [...features , element.features] ;
          });
        }else{
          features = [...features , data.features] ;
        }
        props.features(features);
        geo.addData(data);
    });
    });
    
  },[props.urls]);
   const dateDiff = (date1, date2)=>{
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff.day;
}
  const position = [51.505, -0.09];
  const reView = (x,y,zoom) =>{
    mapRef.current.Leaflet.setView([x ,y], zoom);
  }
  return (
    <div>
      <Map center={position} zoom={8} style={{ height: "90vh" }} ref={mapRef}>
    </Map>
      
    </div>
    
  );
}

export default Leaflet;
