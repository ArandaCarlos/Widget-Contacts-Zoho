import { useState, useEffect} from "react";
import {useAsignarContacto} from '../Context/DatosContacto';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import {
    createMuiTheme,
    MuiThemeProvider,
  } from "@material-ui/core/styles";

const styles = {

    iconButton: {
      padding: 0,
      marginLeft: 5,
    },
  
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1em",
        }
      }
    }
  });

const StoreTable = (props) => {

    const[stores, setStores] = useState(props.stores.data);
    const[mapAsignar, setMapAsignar] = useState([]);
    const {contacto, setContacto} = useAsignarContacto();
    const [datosStore, setDatosStore ]= useState();
    const {contactoTipo, setContactoTipo}=useAsignarContacto();


    useEffect(() => {
        let newArrayStores=[...stores];
        newArrayStores.forEach(store => {
            store.Check=null;
            store.Check_RoboCall=null;
            store.Control=null;
        });
        setStores(newArrayStores);
    }, [])

    useEffect(()=>{
        console.log(contacto);
        if(contacto.contact!=null){
            selectContact(contacto.contact, datosStore.id, datosStore.mod);
        }
    }, [contacto])

    const showPopUp= (storeId, mod)=>{
        setDatosStore({
            id: storeId,
            mod: mod
        })
        if(mod=="contacto"){
            setContactoTipo("Store Decision Maker")
        }
        if(mod=="fotografia"){
            setContactoTipo("Contacto Encargado de Fotografía")
        }
        if(mod=="credenciales"){
            setContactoTipo("Contacto encargado de Recibir Credenciales")
        }
        props.showPopUp();
    }

    const selectContact = (contact, id, mod)=>{
        console.log(contact, id, mod);
        let index = stores.findIndex(item =>  (item.id === id));
        let newArrayStores = [...stores];
        let newArrayMapAsignar = [...mapAsignar];
        if(mod == "contacto"){
            let indexMap = mapAsignar.findIndex(mapA => mapA.mod=="contacto" && mapA.mapStore.id == id);
            console.log(indexMap);
            if(indexMap > -1){
                newArrayMapAsignar[indexMap].contact=contact.Email;
                newArrayStores[index].Check = contact.First_Name+' '+contact.Last_Name;
            }else{
                newArrayStores[index].Check = contact.First_Name+' '+contact.Last_Name;
                let store = newArrayStores[index];
                let mapStore = {
                    name: store.Account_Name,
                    id: store.id,
                    tipo: mod
                }
                let mapContacto={
                    contact:contact.Email,
                    mapStore:mapStore,
                    mod:mod
                }
                setMapAsignar([
                    ...mapAsignar,
                    mapContacto
                ])
            }      
        }
        if(mod == "fotografia"){
            let indexMap = mapAsignar.findIndex(mapA => mapA.mod=="fotografia" && mapA.mapStore.id == id);
            console.log(indexMap);
            if(indexMap > -1){
                newArrayMapAsignar[indexMap].contact=contact.Email;
                newArrayStores[index].Check_RoboCall = contact.First_Name+' '+contact.Last_Name;
            }else{
                newArrayStores[index].Check_RoboCall = contact.First_Name+' '+contact.Last_Name;
                let store = newArrayStores[index];
                let mapStore = {
                    name: store.Account_Name,
                    id: store.id,
                    tipo: mod
                }
                let mapContacto={
                    contact:contact.Email,
                    mapStore:mapStore,
                    mod:mod
                }
                setMapAsignar([
                    ...mapAsignar,
                    mapContacto
                ])
            }
            
        }
        if(mod == "credenciales"){
            let indexMap = mapAsignar.findIndex(mapA => mapA.mod=="credenciales" && mapA.mapStore.id == id);
            console.log(indexMap);
            if(indexMap > -1){
                newArrayMapAsignar[indexMap].contact=contact.Email;
                newArrayStores[index].Control = contact.First_Name+' '+contact.Last_Name;
            }else{
                newArrayStores[index].Control = contact.First_Name+' '+contact.Last_Name;
                let store = newArrayStores[index];
                let mapStore = {
                    name: store.Account_Name,
                    id: store.id,
                    tipo: mod
                }
                let mapContacto={
                    contact:contact.Email,
                    mapStore:mapStore,
                    mod:mod
                }
                setMapAsignar([
                    ...mapAsignar,
                    mapContacto
                ])
            }
        }
        setStores(newArrayStores);
        
        console.log(mapAsignar);
        
    }
    const volverTelefono = ()=>{
        props.volverTelefono();
    }

    const onSubmit = (e)=>{

        let flag=true;
        //console.log(mapAsignar);
        if(mapAsignar.length>=stores.length*3){
            mapAsignar.forEach(map => {
                let resp=props.asignarContacto(map.contact, map.mapStore, map.mod);
                if(resp == false){
                    flag=false;
                }
                //console.log(stores);
            });
            props.onSubmit(e);
        }
        else{
            props.setShowError(true);
        }
    }

    return (
        <div className="table-responsive"> 
            <table className="mx-auto mt-3 table container ml-4 w-100 ">
                <thead className="table-secondary">
                    <tr>
                        <th scope="col">Store</th>
                        <th scope="col">Store Decision Maker
                            
                                <Tooltip title="Persona encargada de tomar las decisiones en el store.">
                                    <IconButton aria-label="Store Decision Maker" style={styles.iconButton}>
                                        <InfoIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            
                        </th>
                        <th scope="col">Fotografía
                            <Tooltip title="Persona encargada de proveer todas imágenes de la tienda.">
                                <IconButton aria-label="Fotografía" style={styles.iconButton}>
                                    <InfoIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        </th>
                        <th scope="col">Recibe Credenciales
                        <MuiThemeProvider theme={theme}>
                            <Tooltip title="Contacto al que le van a llegar las credenciales de la tienda.">
                                <IconButton aria-label="Credenciales" style={styles.iconButton}>
                                    <InfoIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        </MuiThemeProvider>
                        </th>
                    </tr>
                </thead>
                <tbody>
                        { 
                        props.stores.data.map(store => (
                            <tr key={store.id} className="mt-3">
                                <td>{store.Account_Name}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {(store.Check != null ? store.Check : <span>Contacts</span>)}
                                        </button>

                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            { props.contacts.map(item => (
                                                <li key={item.Email}><a className="dropdown-item" href="#" onClick={()=>selectContact(item, store.id,"contacto")}>{item.First_Name+' '+item.Last_Name}</a></li>
                                            )) }
                                        </ul>
                                        <span className="ms-3">
                                            <button className="btn btn-primary" type="button" onClick={()=>showPopUp(store.id,"contacto")}>
                                                +
                                            </button>
                                        </span>

                                    </div>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {(store.Check_RoboCall != null ? store.Check_RoboCall : <span>Contacts</span>)}
                                        </button>

                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            { props.contacts.map(item => (
                                                <li key={item.Email}><a className="dropdown-item" href="#" onClick={()=>selectContact(item, store.id,"fotografia")}>{item.First_Name+' '+item.Last_Name}</a></li>
                                            )) }
                                        </ul>
                                        <span className="ms-3">
                                            <button className="btn btn-primary" type="button" onClick={()=>showPopUp(store.id,"fotografia")}>
                                                +
                                            </button>
                                        </span>

                                    </div>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {(store.Control != null ? store.Control : <span>Contacts</span>)}
                                        </button>

                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            { props.contacts.map(item => (
                                                <li key={item.Email}><a className="dropdown-item" href="#" onClick={()=>selectContact(item, store.id,"credenciales")}>{item.First_Name+' '+item.Last_Name}</a></li>
                                            )) }
                                        </ul>
                                        <span className="ms-3">
                                            <button className="btn btn-primary" type="button" onClick={()=>showPopUp(store.id,"credenciales")}>
                                                +
                                            </button>
                                        </span>

                                    </div>
                                </td>
                                
                            </tr>
                        ))
                    } 
                    
                    
                </tbody>
            </table>
            
            <div className="text-center" style={{marginTop:50+'px'}}>
                    <span className="text-left ">
                            <button type="submit" id="button" className="btn btn-primary me-3" onClick={volverTelefono}>Volver</button>
                    </span>
                    <span className="text-center">
                            <button type="submit" id="button" className="btn btn-primary " onClick={onSubmit}>Continuar</button>                      
                    </span>
            </div>
        </div>
     );
}
 
export default StoreTable;