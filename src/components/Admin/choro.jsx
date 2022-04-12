import { useEffect } from "react";
import L from "leaflet";
//import { useLeafletMap } from "use-leaflet"
import { useMap } from "react-leaflet";

import "leaflet-choropleth";


function Choro (props) {
  const { map } = useMap();

  useEffect(() => {
  //  if (Object.keys(props.geoJSON).length > 0) {
      L.choropleth(props.geoJSON, {
        valueProperty: "DIFF", // which property in the features to use
        scale: ["white", "red"], // chroma.js scale - include as many as you like
        steps: 5, // number of breaks or steps in range
        mode: "q", // q for quantile, e for equidistant, k for k-means
        //style,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "Total " + feature.properties.DIFF + "<br>" //+
            // feature.properties.incidents.toLocaleString() +
            // " incidents"
          );
        }
      }).addto(map);
   // }
  }, [props.geoJSON]);

  return null;
}

export default Choro;
