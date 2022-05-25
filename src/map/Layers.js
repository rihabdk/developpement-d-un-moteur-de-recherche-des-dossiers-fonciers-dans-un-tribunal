import React,{useEffect, useState} from "react";
import { JsonToTable } from "react-json-to-table";
const Layers = (props) =>{
    const [layers,setLayers] = useState(null) ; 
    useEffect(()=>{

        console.log(getProperties());
        
            
        
    });
    const getProperties = () =>{
        let f = [] ; 
        for (let index = 0; index < props.features.length; index++) {
            f= [...f, ...Object.values(props.features[index])]
        }
        let p =[] ; 
        return f; 
    }
    
    const removeEmptyOrNull = (obj) => {
        Object.keys(obj).forEach(k =>
          (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
          (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );
        return obj;
      };
    return <div>
        {
            getProperties().map(e=><div>
                <JsonToTable json={removeEmptyOrNull(e.properties)} />
                <br/>
            </div>)
        }
    </div> ; 
}
export default Layers ; 