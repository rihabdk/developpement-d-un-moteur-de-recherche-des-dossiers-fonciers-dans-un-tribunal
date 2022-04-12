import React from "react";
import { Map, TileLayer, LayersControl} from "react-leaflet";
import "./map.css"
import { ShapeFile } from '../../../node_modules/react-leaflet-shapefile-v2/lib/index'
const { BaseLayer, Overlay } = LayersControl;


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

  render() {
    let ShapeLayers = null;
    if (this.state.geodata !== null) {
      ShapeLayers = (
      <Overlay checked name='Feature group'>
          <ShapeFile data={this.state.geodata} style={this.style} onEachFeature={this.onEachFeature}/>
      </Overlay>);
    }


    return (
      <div>

      <div >
          <input type="file" onChange={this.handleFile.bind(this)} className="inputfile"/>
        </div>
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
      </div>

    );
  }
}

export default MapComponent;