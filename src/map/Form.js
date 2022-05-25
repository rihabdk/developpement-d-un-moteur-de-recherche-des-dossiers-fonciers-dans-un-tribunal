import React from "react";
import { Button } from "bootstrap";

export default function Form () {
    
  
  
    
    return ( <div>
<form>
       <div class="form-row">
       <div class="form-group col-md-6">
           <label for="inputEmail4">Nom</label>
           <input type="text" class="form-control" id="inputEmail4" placeholder="Nom"/>
           <input type="text" value={this.state.value} onChange={this.handleChange} />
         </div>
         <div class="form-group col-md-6">
           <label for="inputEmail4">Prénom</label>
           <input type="text" class="form-control" id="inputEmail4" placeholder="Prénom"/>
           <input type="text" value={this.state.value} onChange={this.handleChange} />
         </div>
         <div class="form-group col-md-6">
           <label for="inputEmail4">Email</label>
           <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
         </div>
         <div class="form-group col-md-6">
           <label for="inputPassword4">ID_Dossier</label>
           <input type="text" class="form-control" id="inputPassword4" placeholder="Id_dossier"/>
         </div>
       </div>
       <div class="form-group">
       <div class="form-group">
         <label for="inputAddress2">Client</label>
         <input type="text" class="form-control" id="inputAddress2" placeholder=""/>
       </div>
         <label for="inputAddress">Address</label>
         <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
       </div>
       
       <div class="form-row">
         <div class="form-group col-md-6">
           <label for="inputCity">Ville</label>
           <input type="text" class="form-control" id="inputCity"/>
         </div>
         <div class="form-group col-md-4">
           <label for="inputState">Etat</label>
           <select id="inputState" class="form-control">
             <option selected>En cours</option>
             <option>En progression</option>
             <option>Traité</option>
           </select>
         </div>
         <div class="form-group col-md-2">
           <label for="inputZip">Zip</label>
           <input type="text" class="form-control" id="inputZip"/>
         </div>
       </div>
       <div class="form-group">
         <div class="form-check">
           <input class="form-check-input" type="checkbox" id="gridCheck"/>
           <label class="form-check-label" for="gridCheck">
             Valider
           </label>
         </div>
       </div>
       <Button type="submit" value="Envoyer" ></Button>
     </form>
     </div>);
}
