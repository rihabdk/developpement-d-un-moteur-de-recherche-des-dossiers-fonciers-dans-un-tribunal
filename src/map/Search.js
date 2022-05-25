import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { JsonToTable } from "react-json-to-table";
import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "../assets/marker-icon.png"
import {Icon} from 'leaflet'
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Search = (props) => {
  const [form] = Form.useForm();
  const [pays,setPays] = useState("");
  const [go,setGo] = useState("");
  const [region , setRegion] = useState("");
  const [submit, setSubmit]=useState(false) ; 
  let marker = null ;  
  useEffect(()=>{


  })
  const removeEmptyOrNull = (obj) => {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
  };
  const getPays= ()=>{
      let p = [] ; 
      props.features.forEach(element => {
          element.forEach(e => {
              if(p.indexOf(e.properties.NAME_0) == -1 ) p = [...p , e.properties.NAME_0]
          });
            
      });
      return p  ;
  }

  const onPaysChange = (value) => {
    setPays(value)
  };
  const onGoChange = (value) => {
    setGo(value)
  };
  const onRegionChange = (value) => {
    setRegion(value)
  };
  const getGo = (pa) =>{
    let p = [] ; 
    props.features.forEach(element => {
        element.forEach(e => {
            if(e.properties.NAME_0 == pa && p.indexOf(e.properties.NAME_1) == -1 )   p = [...p , e.properties.NAME_1]
        });
          
    });
    return p  ;
  }
  const getRegion = (go) =>{
    let p = [] ; 
    props.features.forEach(element => {
        element.forEach(e => {
            if( e.properties.NAME_0 == pays &&e.properties.NAME_1 == go && p.indexOf(e.properties.NAME_2) == -1 )   p = [...p , e.properties.NAME_2]
        });
          
    });
    return p  ;
  }
  const fsearch =(pa,go,re)=>{
      let c = null ; 
    props.features.forEach(element => {
        element.forEach(e => {            
            if(e.properties.NAME_0 == pa && e.properties.NAME_1 == go && e.properties.NAME_2 == re)  c = e ;  ;   
        });
          
    });
    console.log(c.geometry.bbox)
    let x = (c.geometry.bbox[0] + c.geometry.bbox[2])/2; 
    let y = (c.geometry.bbox[1]+c.geometry.bbox[3])/2 ;
    let zoom = 12 ; 
    const defaultIcon = new L.icon({
        iconUrl: require('../assets/marker-icon.png'),// your path may vary ...
        iconSize: [20,20],
        iconAnchor: [2, 2],
        popupAnchor: [0, -2]
      });
    marker = L.marker([y , x ]).addTo(props.mapRef) ;
    marker.bindPopup(pa+", "+ go + ", " + re).openPopup();
    props.mapRef.setView([y , x ],zoom );
    return c; 
  }

  const onFinish = (values) => {
    setSubmit(true)
  };

  const onReset = () => {
    form.resetFields();
    if(submit ){
        props.mapRef.removeLayer(marker);
        props.mapRef.setView([33.8869, 9.5375], 5.5)
         setSubmit(false) ; 
    
    }
  };

  
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="pays" label="Pays" rules={[{ required: true }]}>
        <Select
          placeholder="Select a pays"
          onChange={onPaysChange}
          allowClear
        >
            {
                getPays().map(e=><Option value={e}>{e}</Option>)
            }
          
        </Select>
        
      </Form.Item>
      <Form.Item name="go" label="Gouvernorat" rules={[{ required: true }]}>
        <Select
          placeholder="Select a Gouvernorat"
          onChange={onGoChange}
          allowClear
        >
          {
                getGo(pays).map(e=><Option value={e}>{e}</Option>)
            }
        </Select>
        
      </Form.Item>
      <Form.Item name="region" label="Région" rules={[{ required: true }]}>
        <Select
          placeholder="Select a Région"
          allowClear
          onChange={onRegionChange}
        >
          {
              getRegion(go).map(e=><Option value={e}>{e}</Option>)
          }
        </Select>
        
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
      {submit && <JsonToTable json={removeEmptyOrNull(fsearch(pays,go,region).properties)} />}
    </Form>
  );
};

export default Search ; 