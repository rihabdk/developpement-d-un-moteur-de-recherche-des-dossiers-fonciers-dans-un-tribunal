import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import Form from '../../map/Form';
import Files from '../../map/Files';
import { FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { padding } from '@mui/system';

  
class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false  
        };  
    } 
     
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    } 
    componentDidMount() {
        fetch('http://localhost:4000/maps/edit')
          .then(response => response.json())
          .then(data => this.setState({ data }));
    
      }  
      useEffect=() => {
        (async () => {
          try {
            const map = await axios.get(
              "http://localhost:4000/maps/" +id
            );
            setUser(maps.data);
          } catch (error) {
            console.log(error);
          }
        })();
      } ; 
  
  
    render() {
        
       
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                           Informations à propos le dossier 
                         </Modal.Title>  
                    </Modal.Header> 
                     
                    <Modal.Body>  
                        <div className="signUp">  
                            <p>Voulez-vous annuler ?
                                <button type="button" className="btn btn-danger" style={{marginright:"20px", padding:"10px"}} onClick={() => this.isShowModal(true)}> Fermer</button></p>  
                            <form>
        <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Prénom</label>
            <input type="text" className="form-control"  id="inputEmail4" placeholder="Chaima" />
          </div>
        <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Nom</label>
            <input type="text" className="form-control" id="inputEmail4" placeholder="Hedhili" />
          </div><div className="form-group col-md-6">
            <label htmlFor="inputEmail4">CIN</label>
            <input type="text" className="form-control" id="inputEmail4" placeholder="12598631" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="chaima@gmail.com" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Nom et prénom de l'adversaire </label>
            <input type="text" className="form-control" id="inputPassword4" placeholder="Rihab Dkhil" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="12 Rue ibn Rochd" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Jugement</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="il est assigné qu'apres les documents déposés on a décider de ...." />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" placeholder='Ariana'/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>en cours</option>
              <option>Traité</option>
            </select>
          </div>
          
        </div>
       
        <button type="submit" className="btn btn-primary" style={{ marginLeft: "20rem", fontSize: "15px", margin: "20rem" }}>Enregistrer</button>
      </form>

                      </div> 
                    </Modal.Body>  
  
                </Modal >  
            </Fragment >  
  
        );  
    }  
}  
  
export default (ModalPopup);  