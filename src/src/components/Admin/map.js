import React from "react";
import { Map, TileLayer, LayersControl, GeoJSON} from "react-leaflet";
import "./map.css"
import { ShapeFile } from 'react-leaflet-shapefile-v2'
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FieldContainer,FormError, FieldError , FormSuccess} from "./commun";
//import scavengerHuntGeoJson from './uploads/scavenger-hunt.json';
const { BaseLayer, Overlay } = LayersControl;
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.popupContent) {
   layer.bindPopup(feature.properties.popupContent);}
}
const images = importAll(require.context('C:/Users/dkrih/Desktop/map fetch/backuser/uploads', false, /\.(json|jpe?g|png)$/));
class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { avatar: '' };
  }
  state = {
    geodata: null,
    increment: 0
  }
  onFileChange(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.readAsArrayBuffer(file);
    this.setState({ avatar: e.target.files[0] })
    reader.onload = function(buffer) {
      this.setState({ geodata: buffer.target.result });
    }.bind(this)
  }
 onEachFeature(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(Object.keys(feature.properties).map(function(k) {
        return k + ": " + feature.properties[k];
      }).join("<br />"), {
        maxHeight: 200
      });
    }
  }
  style() {
    return ({
      weight: 2,
      opacity: 1,
      color: "green",
      dashArray: "3",
      fillOpacity: 0.7
    });
  }
  onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('avatar', this.state.avatar)
    axios.post("http://localhost:4000/maps/store", formData, {
    }).then(res => {
        console.log(res)
    })
}
render() {
    let ShapeLayers = null;
    if (this.state.geodata !== null) {
      ShapeLayers = (
      <Overlay checked name='Feature group'>
          <ShapeFile data={this.state.geodata} style={this.style} onEachFeature={this.onEachFeature}
         isArrayBufer={true} />
      </Overlay>); }
return (
      <div>
     <Map id="mapId" center={[36.81897, 10.16579]} zoom={14} zoomControl={true}>
      <LayersControl position='topright'>
            <BaseLayer checked name='OpenStreetMap.Mapnik'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         </BaseLayer>
            {ShapeLayers}
          </LayersControl>
<div>
          <GeoJSON data={images['point.json']} onEachFeature={onEachFeature} />
        <GeoJSON data={images['polygone.json']} onEachFeature={onEachFeature}/>
</div>
</Map>
<div className="auth-wrapper">
   <div className="auth-inner">
<Form onSubmit={this.onSubmit}>
       <FieldContainer>
       <div className="form-group">
           <input name="avatar" type="file" className="form-control" 
            onChange={this.onFileChange} />
       </div>
       </FieldContainer>
       <button type="submit"  className="btn btn-primary btn-block">upload</button>
     </Form>
   </div>
   </div>
   </div>
);
  }
}

export default MapComponent ;