import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import shp from "shpjs";
import { FilePicker } from 'react-file-picker'
import { DownloadOutlined } from '@ant-design/icons';
import { useLeaflet } from "react-leaflet";
import Checkout from "./Checkout";
import Datta from "./datta";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { Formik } from "formik";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { SelectField } from "material-ui";
import { FieldContainer, FormError, FieldError, FormSuccess } from "../components/Admin/commun";




const validationSchema = yup.object({
  //   id_dossier: yup.string().min(4 , "please enter 3 caracters ").required(),
  //   name: yup.string().min(6 , "please enter 3 caracters ").required(),
  //   email: yup.string().email("please enter a validate email address").required(),
  //  ville: yup.string().min(2, "please insert a strong password").required(),
  //  etat: yup.string(),
  //  cinclt: yup.string().min(8,"entrer numéro du cin de 8 caractères").required(),
  //  date: yup.date().required(),
  //   nameadv: yup.string().min(6 ,"entrer le nom de l'adversaire").required() 





});
const Files = (props) => {
  const [fil, setFile] = useState()
  const { map } = useLeaflet();
  const [urls, setUrls] = useState(props.urls);
  const [info, setInfo] = useState("");

  const deleteUrl = (url) => {
    let copy = urls.slice();
    copy.splice(urls.indexOf(url), 1)
    setUrls(copy)
  }
  const showGeojson = (url) => {
    shp(require('./shapefiles/' + url)).then(function (data) {
      console.log(data)
      setInfo(data.toString())
    })
  };


  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const onSubmit = async (values) => {
    console.log(values)
    const  data= values;
    
    console.log(data)
    const formdata = new FormData()
    for (const key in data) {
      console.log(key)
      console.log(data[key])
      formdata.append(key, data[key])
    }
  
    console.log(formdata.get('id_dossier'))
    formdata.append("avatar", fil)
    const response = await axios
      .post("http://localhost:4000/maps/store", formdata)
      .catch((err) => {
        if (err && err.response)
          setError(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
    }
  };
  const formik = useFormik({
    initialValues:
    {
      id_dossier: "",
      name: "",
      cinclt: "",
      email: "",
      adress: "",
      nameadv: "",
      state: "",
     
      date: "",

    },
    validateOnBlur: true,
    onSubmit,

  });
  console.log("Error: ", error);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
  
    {
      title: 'Status',
      key: 'state',
      dataIndex: 'state',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => { showGeojson(record.name) }}>
            Show Geojson
          </Button>
          <Button type="primary" danger ghost onClick={() => deleteUrl(record.name)}>
            Delete
          </Button>
        </Space>
      ),
    },

  ];
  useEffect(() => {
    props.callback(urls);
  });
  const dataInit = () => {
    let data = [];
    for (let index = 0; index < urls.length; index++) {
      const element = urls[index];
      data = [
        ...data,
        {
          key: (index + 1).toString(),
          name: element,
          state: ["cool"]
        }
      ];
    }
    return data;
  }


  return (<>

    <Card>
      <Table columns={columns} dataSource={dataInit()} />


      <p>{info}</p>

    </Card>


    <Card>

      <form onSubmit={formik.handleSubmit}>

        <div class="form-row">

          <FieldContainer>
            <div class="input-group">
              <div class="input-group-prepend">

                <span class="input-group-text">Id_dossier</span>
              </div>
              <input onChange={formik.handleChange}
                type="text" name="id_dossier" class="form-control"          value={formik.values.id_dossier}
                />

            </div>
          </FieldContainer>
          <FieldContainer>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Nom et prénom du client </span>
              </div>
              <input onChange={formik.handleChange}
                type="text" name="name" class="form-control" />

            </div>
          </FieldContainer>
          <FieldContainer>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" >CIN </span>
              </div>
              <input onChange={formik.handleChange}
                type="text" name="cinclt" class="form-control" />

            </div>
          </FieldContainer>
          <FieldContainer>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Email du client </span>
              </div>
              <input onChange={formik.handleChange}
                type="email" name="email" class="form-control" />

            </div>
          </FieldContainer>
          <FieldContainer>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Nom et prénom de l'adversaire </span>
              </div>
              <input onChange={formik.handleChange}
                type="text" name="nameadv" class="form-control" />

            </div>
          </FieldContainer>

        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Adresse et ville </span>
          </div>
          <input onChange={formik.handleChange}
            type="text" name="adress" class="form-control" />

        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Date </span>
          </div>
          <input onChange={formik.handleChange}
            type="date" name="date" class="form-control" />


        </div>

        <div class="form-row">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" name="statut" >Etat </span>
            </div>
            <select  class="form-control" name="statut">
              <option selected value="en cours">En cours</option>
              <option value="en progression">non traité</option>
              <option value="traite">Traité</option>
            </select>
          </div>


        </div>
        


        <FilePicker
          size={10}
          extensions={['json']}
          onChange={file => { setUrls([...urls, file.name]); setFile(file) }}
          onError={errMsg => (console.log(errMsg))}
        >

          <Button type="primary" icon={<DownloadOutlined />} size={100}> Importer un fichier spatial </Button>



        </FilePicker>

        <button type="submit" value="Envoyer"  > Envoyer</button>
      </form>
    </Card>



  </>);
}

export default Files;