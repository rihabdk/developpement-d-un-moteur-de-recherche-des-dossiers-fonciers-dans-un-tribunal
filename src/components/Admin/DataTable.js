import React , {useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import QRCode from "qrcode.react";
import SearchPage from '../../map/Searchh'
import { Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import ModalPopup from './Modal_popup';

import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
import axios from 'axios';


export default class DenseTable extends React.Component {
  opensweetalert()
  {
    Swal.fire({
      title: 'Therichpost',
      text: "Hello",
      type: 'success',
      
      
    })
  }
  //Button Click Function
  opensweetalertdanger()
  {
    Swal.fire({
      title: 'Etes-vous sur?',
      text: "Le dossier va etre supprimé d'une façon permenante !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      })
      
      .then(
        function() {
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      })
      
  }



  
  constructor(props) {
    super(props);
this.state = {
      data: null,
      showModalPopup: false};
     

    }
    

    
    isShowPopup = (status) => {  
      this.setState({ showModalPopup: status });  
    };  

      deleteData= async(id)=>{
        
        console.log("azdz")
       
      
        const response = await axios
       
        .delete("http://localhost:4000/maps/"  + id, )
    
    
      if (response && response.data) {
        fetch('http://localhost:4000/maps/get')
        .then(response => response.json())
        .then(data => this.setState({ data }));
      }
      }
componentDidMount() {
    fetch('http://localhost:4000/maps/get')
      .then(response => response.json())
      .then(data => this.setState({ data }));

  } 
   handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
     const Columns = [...rowsData];
    Columns[index][name] = value;
    setRowsData(Columns);}
     deleteTableRows = (index)=>{
      const rows = [...rowsData];
      rows.splice(index, 1);
      setRowsData(rows);
 }
  

render() {

  const { data } = this.state;
  const columns = [
      {
        name: "Title",
        selector: "firstname",
        sortable: true
      },
      {
        name: "Year",
        selector: "lastname",
        sortable: true,
        right: true
      },
     
      {
        name: "last",
        selector: "email",
        sortable: true,
        right: true
      },
      {
        name: "last",
        selector: "Password",
        sortable: true,
        right: true
      }

    /*  {
        name: "Qr code",
        selector: "qrcode",
        ignoreRowClick: true,
        cell: row =>
          row.firstname ? <QRCode data-qr={row.firstname} value={row.firstname} /> : ""
      },
      {
        name: "Print",
        selector: "Print",
        ignoreRowClick: true,
        cell: row => <Button onClick={e => this.print(row, e)}>Print</Button>
      }*/
      

    ];
    return (
      
      
   /* <div className="App">
        <DataTable title="People" columns={columns} data={this.state.data} />
      </div>  */
      <div> <h1> Dossiers Clients</h1>
     
      <SearchPage>search</SearchPage>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Id_Dossier</TableCell>
              <TableCell >Client</TableCell>
              <TableCell >Adversaire</TableCell>
              <TableCell >Adresse</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Qr-code</TableCell>
              <TableCell>Etat</TableCell>
              
             
            </TableRow>
          </TableHead>
          <TableBody>
            
            {(data ||[]).map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                <Typography color="textSecondary" variant="body2"> {row.id_dossier}</Typography>
                </TableCell>
                <TableCell>
                    <Grid container>
                        <Grid item lg={2}>
                            <Avatar alt={row.name} src='.' />
                        </Grid>
                        <Grid item lg={10}>
                            <Typography >{row.name}</Typography>
                            <Typography color="textSecondary" variant="body2">Email client: {row.email}</Typography>
                            <Typography color="textSecondary" variant="body2">Cin client: {row.cinclt}</Typography>
                          
                        </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                  <Typography color="textSecondary" variant="body2"> {row.nameadv}</Typography>
                  </TableCell>
                  <TableCell>
                  <Typography color="textSecondary" variant="body2"> {row.adress}</Typography>
                  </TableCell>
                  <TableCell>
                  <Typography color="textSecondary" variant="body2"> {row.date}</Typography>
                  </TableCell>
                <TableCell>
                <Grid container>
                        <Grid item lg={2}>
                        <QRCode data-qr={"id_dossier" +row.id_dossier+ '---'+"nom client:" + row.name+'---'+ "email client"
                         + row.email+ '---' +'---'+ "CIN" + row.cinclt +'----'+ " Adversaire" +row.nameadv+ '---'+ "Adresse" +row.adress + '---'+ "Date de dépot"+ row.date} 
                        value={"id_dossier : " +" " +row.id_dossier+ " "+"nom client:" +" "+ row.name+ " "+ "email client" + " "
                        + row.email+  "  "+ "CIN:" +" " + row.cinclt +" "+ " Adversaire:" +"  " +row.nameadv+ " "+ "Adresse:"+" " +row.adress + " "+ "Date de dépot:"+ " "+row.date } />
                        </Grid>
                  
                    </Grid>
                  </TableCell>
                <TableCell>
                <Typography color="textSecondary" variant="body2"> {row.statut}</Typography>

                </TableCell>
                <TableCell>
                    <Typography >
                      
                     
                    <button class='btn btn-danger' onClick={()=>{this.deleteData(row._id);this.opensweetalertdanger ;console.log("dazdaz" + row._id)}}> Supprimer</button>
                 
<button type="button" class="btn btn-primary"  onClick={() => this.isShowPopup(true)} data-toggle="modal" data-target="#exampleModal" >
  <span class="bi bi-exclamation-lg"></span>
   
 Editer
</button>
<ModalPopup  
          showModalPopup={this.state.showModalPopup}  
          onPopupClose={this.isShowPopup}  
        ></ModalPopup> 
 </Typography>






                   
                  </TableCell>
              </TableRow>
            ))}
          </TableBody> </Table>
          </TableContainer> </div>
     
    );
  }
} 