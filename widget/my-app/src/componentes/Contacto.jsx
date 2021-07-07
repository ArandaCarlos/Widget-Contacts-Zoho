import React, {Fragment, useState} from 'react';
import ValidateNumber from '../Context/ValidateNumber'
import UserTable from './UserTable';
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
const Contacto = (props) => {
    
    const [roles, setRoles] = useState([]);
    const [preRol, setPreRol] = useState([]);
    const [contacts, setContacts]= useState([]);
    const [show, setShow] = useState(false);
    const [datos, setDatos] = useState({
        First_Name: '',
        Last_Name: '',
        Email:'',
        Mobile:'',
        Rol_Contacto: [],
        Stores_ids:[],
        neg: true,
        foto:false
    })

    const [emailError, setEmailError]= useState(false);

    //console.log(roles, preRol, contacts, datos);
    const handleInputChange = (event) => {
        //console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleInputCheckbox = (e) =>{
        const arraycheck = datos.Rol_Contacto;
        const arrayRol = preRol;
        let index = datos.Rol_Contacto.indexOf(e.target.value);
        if(index > -1){
            arraycheck.splice(index,1);
            arrayRol.splice(index,1);
        }else{
            arraycheck.push(e.target.value);
            arrayRol.push(e.target.value);
        }
        //console.log(arraycheck)
        setDatos({
            ...datos,
            Rol_Contacto: arraycheck
        })   
        setPreRol(arrayRol);
        
    }

    //Verificar que no haya un contacto repetido
    const verificarContactos= ()=>{
        let verificado = true;
        contacts.forEach(contact => {
            if(contact.Email === datos.Email || contact.Mobile === datos.Mobile){
               verificado = false;
            }
        });
        
        return(verificado);
    }
    const emailValidate = () =>{
        let verificado = true;
        let indexarroba = datos.Email.indexOf('@');
        let dominio = datos.Email.substr(indexarroba);
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!re.test(datos.Email) || dominio=='@rappi.com')
        {
            verificado = false;
        }
        if(dominio == '@rappi.com'){
            setEmailError(true);
        }else{
            setEmailError(false);
        }
        return verificado;
    }

    //cargar contacto al array 
    const addContact = (e)=>{
        e.preventDefault();
        if(datos.First_Name !=='' && datos.Email !=='' && datos.Last_Name!=='' && datos.Mobile!==''){
            console.log(datos.Mobile);
            console.log(datos.Mobile.substr(3));
            if(verificarContactos() && emailValidate() && ValidateNumber(datos.Mobile) && (datos.Rol_Contacto.length > 0) && (datos.Rol_Contacto.length < 5) ){
                setContacts([
                    ...contacts,
                    datos
                ])
                let arrayRoles = roles;
                datos.Rol_Contacto.forEach(rol => {
                    arrayRoles.push(rol);
                    let inp = document.getElementById(rol);
                    inp.disabled =true;
                })
                
                setRoles(arrayRoles);
                setPreRol([]);
                let inp = document.getElementById('Email');
                inp.classList.remove("is-invalid");
                let inp2 = document.getElementById('Mobile');
                inp2.classList.remove("is-invalid");
                e.target.reset();
            }else{
                if(!verificarContactos()){
                    alert("debe ingresar un contacto distinto a los anteriores");
                }
                if(!emailValidate()){
                    let inp = document.getElementById('Email');
                    inp.classList.add("is-invalid");
                    inp.focus();
                }else{
                    let inp = document.getElementById('Email');
                    inp.classList.remove("is-invalid");
                }
                if(!ValidateNumber(datos.Mobile)){
                    let inp = document.getElementById('Mobile');
                    inp.classList.add("is-invalid");
                    inp.focus();
                }else{
                    let inp = document.getElementById('Mobile');
                    inp.classList.remove("is-invalid");
                }
                if(!(datos.Rol_Contacto.length > 0)){
                    alert("Debe seleccionar por lo menos un rol");
                }
                if(!(datos.Rol_Contacto.length < 5)){
                    alert("Un contacto puede tener como máximo 4 roles");
                }
            }
            
        }
        setDatos({...datos, Rol_Contacto:[]})
        datos.Rol_Contacto.forEach(rol => {
            let inp = document.getElementById(rol);
            inp.checked =false;
        })
        
    }
    
    const onSubmit = (e)=>{
        e.preventDefault();
        addContact(e);
        if(roles.length >= 5 && contacts.length >= 1){
            setShow(true);
        }
        //console.log(datos.Phone);

    } 
    //EDITAR CONTACTO 
    const editarContacto = (user) =>{
        eliminarContacto(user.Email);
        const firstName = document.getElementById("First_Name");
        const lastName = document.getElementById("Last_Name");
        const email = document.getElementById("Email");
        const mobile = document.getElementById("Mobile");
        firstName.value=user.First_Name;
        lastName.value=user.Last_Name;
        email.value=user.Email;
        mobile.value=user.Mobile;
        console.log(contacts);
    }
    //ELIMINAR CONTACTO
    const eliminarContacto = (id) =>{
        let arrayContacts = contacts;
        let rolesActuales = roles;
        let contactoEliminar = arrayContacts.filter(contact => contact.Email == id);
        console.log(contactoEliminar);
        let rolesDesactivar= contactoEliminar[0].Rol_Contacto;
        rolesDesactivar.forEach(rol => {
            let inp = document.getElementById(rol);
            inp.disabled =false;
            rolesActuales = rolesActuales.filter(rolAct => rolAct != rol);
        });
        setRoles(rolesActuales);
        arrayContacts = arrayContacts.filter(contact => contact.Email != id);
        setContacts(arrayContacts);
        if(rolesActuales.length >= 5 && contacts.length >= 1){
            setShow(true);
        }else{
            setShow(false);
        }
    }

    const continuar = ()=>{
        console.log(contacts);
        props.onSubmitContacto(contacts);
    }

    return ( 
        <Fragment>
        <div className="row">
        <div className="col">
        <form className="container mt-3" onSubmit={onSubmit}>
            <h4>Contactos Asociados a la Negociación</h4>
            <div className="form-group row mt-4">
                <label htmlFor="First_Name1" className="col-sm-2 col-form-label">Nombre</label>
                <div className="col-sm-10">
                <input 
                    type="First_Name1" 
                    className="form-control" 
                    name="First_Name" 
                    id="First_Name" 
                    placeholder="Ingrese nombre del Contacto" 
                    onChange={handleInputChange} 
                    
                    />
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="Last_Name1" className="col-sm-2 col-form-label">Apellido</label>
                <div className="col-sm-10">
                <input 
                    type="Last_Name1" 
                    className="form-control" 
                    name="Last_Name" 
                    id="Last_Name" 
                    placeholder="Ingrese Apellido del Contacto" 
                    onChange={handleInputChange} 
                    required></input>
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="Email1" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input 
                    type="Email1" 
                    className="form-control" 
                    name="Email" 
                    id="Email" 
                    placeholder="Email" 
                    onChange={handleInputChange} 
                    required>
                </input>
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                    {(emailError)? <span>dominio @rappi.com no permitido</span>: <span>Email incorrecto</span>}
                </div>
                </div>
            </div>
            <div className="form-group row mt-3">
                <label htmlFor="cel1" className="col-sm-2 col-form-label">Whatsapp</label>
                <div className="col-sm-10">
                <input 
                    type="cel1" 
                    className="form-control ml-1" 
                    name="Mobile" 
                    id="Mobile" 
                    placeholder="ejemplo: +552131354684" 
                    onChange={handleInputChange} 
                    required>
                </input>
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                    (cód de país "+52")(cod ciudad "22") XXXXXXX
                </div>
                </div>
            </div>
            
            
            <div className="form-group row mt-3">
                <div className="col-sm-2">Roles a cumplir: </div>
                <div className="col-sm-10" id="checkboxs">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="check1" value="Brand Decision Maker" onChange={handleInputCheckbox} id="Brand Decision Maker" ></input>
                    <label className="form-check-label" htmlFor="check1">
                            Brand Decision Maker             
                    </label>
                    <Tooltip title="Responsable de la toma de decisiones generales de una empresa.">
                        <IconButton aria-label="Brand Decision Maker" style={styles.iconButton}>
                            <InfoIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                     
                </div>
                <div className="form-check"> 
                    <input className="form-check-input" type="checkbox" name="check2" value="Marketing Decision Maker" onChange={handleInputCheckbox} id="Marketing Decision Maker" ></input>
                    <label className="form-check-label" htmlFor="check2">
                            Marketing Decision Maker
                    </label>
                    <Tooltip title="-Responsable de la toma de decisiones de marketing de una empresa.
                            -Temas relacionados con el menú (combos, promociones de productos, etc.)
                            -Promociones y Campañas
                            -AnunciosPublicidad
                            -Calendario y planificación de campañas
                            ">
                        <IconButton aria-label="Marketing Decision Maker" style={styles.iconButton}>
                            <InfoIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="check3" value="Ops Decision Maker / COO" onChange={handleInputCheckbox} id="Ops Decision Maker / COO" ></input>
                    <label className="form-check-label" htmlFor="check3">
                            Ops Decision Maker/COO
                    </label>
                    <Tooltip title="-Responsable de la toma de decisiones operativas de una empresa.
                            -Disponibilidad
                            -Anulaciones de pedidos
                            -Defectos de pedido
                            -Compensaciones
                            -Abastecimiento / descuento de productos
                            -Tiempo de espera RT
                            -Horarios operativos
                            ">
                        <IconButton aria-label="Ops Decision Maker/COO" style={styles.iconButton}>
                            <InfoIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="check4" value="Finance Decision Maker" onChange={handleInputCheckbox} id="Finance Decision Maker" ></input>
                    <label className="form-check-label" htmlFor="check4">
                            Finance Decision Maker
                    </label>
                    <Tooltip title="-Responsable de la toma de decisiones financieras de una empresa.
                                    -Pagos
                                    -Comisiones
                                    -Ventas
                                    -Retorno de la inversión
                                    -Promociones">
                        <IconButton aria-label="Finance Decision Maker" style={styles.iconButton}>
                            <InfoIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="check5" value="Legal Representative" onChange={handleInputCheckbox} id="Legal Representative"></input>
                    <label className="form-check-label">Legal Representative</label>
                    <MuiThemeProvider theme={theme}>
                        <Tooltip title="Representante legal y / o encargado de la firma de contratos">
                            <IconButton aria-label="Representante legal y / o encargado de la firma de contratos" style={styles.iconButton}>
                                <InfoIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </MuiThemeProvider>
                    
                </div>
                
            </div>
                
            </div>
            <div className="form-group row mt-3">
                <div className="col-sm-10">
                <button type="submit" id="button" className="btn btn-primary" >Agregar</button>
                </div>
            </div>
        </form>
        </div>
        <div className="col mt-3 ">
            <UserTable contacts={contacts} eliminarContacto={eliminarContacto} editarContacto={editarContacto}/>
               
              {show ?
                 <div className="mt-3 col text-center">
                        <button id="button" className="btn btn-primary" onClick={continuar}>Continuar</button>
                    </div>:<div>Faltan contactos o roles por cumplir</div>}
                    
        </div>
                
        </div>
        
        </Fragment>
     );
}
 
export default Contacto;