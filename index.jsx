import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";
import "./App.css";

ReactDOM.render(
  <Map position={[36.81897, 10.16579]} zoom={14} />,
  document.getElementById("root")
);
