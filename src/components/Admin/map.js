import React from "react";
import { Map, TileLayer, LayersControl} from "react-leaflet";
import "./map.css"
import { ShapeFile } from 'react-leaflet-shapefile-v2'
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FieldContainer,FormError, FieldError , FormSuccess} from "./commun";
const { BaseLayer, Overlay } = LayersControl;
//const validationSchema = yup.object({
 // avator: yup.string(),
//});

class MapComponent extends React.Component {
    state = {
    geodata: null,
    increment: 0
  }

  handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.readAsArrayBuffer(file);
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
      color: "blue",
      dashArray: "3",
      fillOpacity: 0.7
    });
  }
   constructor(props) {
    super(props);
    this.state = { name: '' };
  }
 
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
 
  handleSubmit = (event) => {
    alert('the map was submitted: ');
 
    fetch('http://localhost:4000/maps/store', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
 
    event.preventDefault(); } 
    render() {
    let ShapeLayers = null;
    if (this.state.geodata !== null) {
      ShapeLayers = (
      <Overlay checked name='Feature group'>
          <ShapeFile data={this.state.geodata} style={this.style} onEachFeature={this.onEachFeature}/>
      </Overlay>);




//const [success, setSuccess] = useState(null);
//const [error, setError] = useState(null);

//const onSubmit = async (values) => {
  //  const { data } = values;

    //const response = await axios
      //.post("http://localhost:4000/maps/store", data)
      //.catch((err) => {
        //if (err && err.response)
        // setError(err.response.data.message);
        //setSuccess(null);
      //});

 /*  if (response && response.data) {
     setError(null);
     setSuccess(response.data.message);
      formik.resetForm();
    }
  };
const formik =  useFormik({initialValues:
     { avatar: ""},
validateOnBlur: true,
onSubmit,
validationSchema: validationSchema,
});
console.log("Error: " , error);*/
    } 
return (
      <div>

     
      <Map  id="mapId" center={[36.81897, 10.16579]} zoom={14} zoomControl={true}>
      <LayersControl position='topright'>
            <BaseLayer checked name='OpenStreetMap.Mapnik'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         </BaseLayer>
            {ShapeLayers}
          </LayersControl>
       

      </Map>
      <div >
        <label>
          <input type="file" onChange={this.handleFile.bind(this)}  name="inputfile"/>
          <button onClick={this.handleSubmit}>Upload</button>

          </label>
       
        </div>
      
      </div>



    );
  }
}

export default MapComponent ;