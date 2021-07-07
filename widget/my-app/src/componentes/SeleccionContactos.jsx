import React,{useEffect, useState} from 'react'
import {ZOHO} from '../assets/Zoho';
import ValidateNumber from '../Context/ValidateNumber'
import StoreTable from './StoreTable';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useAsignarContacto} from '../Context/DatosContacto';


const SeleccionContactos = (props) => {
    
    const [stores, setStores] = useState();
    const [isBusy, setBusy] = useState(true);
    const [contacts, setContacts]= useState([]);
    const [showModal, setShowModal]=useState(false);
    const [showError, setShowError]=useState(false);
    const {contacto, setContacto}=useAsignarContacto();
    const {contactoTipo, setContactoTipo}=useAsignarContacto();
    const [emailError, setEmailError]= useState(false);
    
    const [datos, setDatos] = useState({
        First_Name: '',
        Last_Name: '',
        Email:'',
        Phone:'',
        Mobile:'',
        Rol_Contacto: [],
        Stores_ids:[{}],
        stores_fotos:[{}],
        stores_credenciales:[{}],
        foto:false,
        credenciales:false,
        contacto:false,
        flag:false
    });

    useEffect(()=>{
        ZOHO.CRM.API.getRelatedRecords({Entity:"Deals",RecordID:props.id,RelatedList:"Oportunidades"}).then((data)=>{
            setStores(data);
            setBusy(false); 
        })
        console.log(contacto);
        let preContacts = props.contacts;
        preContacts.forEach(contact => {
            contact.Stores_ids=[];
            contact.stores_fotos=[];
            contact.stores_credenciales=[];
            contact.foto=false;
            contact.credenciales=false;
            contact.contacto=false;
            if(contact.Rol_Contacto.includes("Store Decision Maker")){
                let newRolContact = contact.Rol_Contacto.filter(item => item!=="Store Decision Maker");
                contact.Rol_Contacto = newRolContact;
            }
        });
        setContacts(props.contacts);
  
    }, [])

    const handleInputChange = (event) => {
        //console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        //console.log(contacts);

        props.onSubmitSeleccion(contacts);
    }

    //asignación del contacto seleccionado a el/los stores seleccionados.
    const asignarContacto = (email, storeMap, control) =>{
        // console.log(email);
        if(email != null){
            let index= contacts.findIndex(item => item.Email === email);
            let newArrayContacts = [...contacts];
            if(control=="fotografia"){
                if(!newArrayContacts[index].stores_fotos.some(store=>store.id == storeMap.id)){
                    newArrayContacts[index].stores_fotos.push(storeMap);
                    newArrayContacts[index].foto=true;
                    newArrayContacts[index].Rol_Contacto.push("Fotografía");
                }
            }
            if(control=="contacto"){
                if(!newArrayContacts[index].Stores_ids.some(store=>store.id == storeMap.id)){
                    newArrayContacts[index].Stores_ids.push(storeMap);
                    newArrayContacts[index].contacto=true;
                    newArrayContacts[index].Rol_Contacto.push("Store Decision Maker");
                }
            }
            if(control=="credenciales"){
                if(!newArrayContacts[index].stores_credenciales.some(store=>store.id == storeMap.id)){
                    newArrayContacts[index].stores_credenciales.push(storeMap);
                    newArrayContacts[index].credenciales=true;
                    newArrayContacts[index].Rol_Contacto.push("Credenciales");
                }
            }                
                setContacts(newArrayContacts);
        }
        else{
            return false;
        }  
        //console.log(contacts);  
        return true;    
    }
    //asignación del contacto a Fotografia
    const showPopUp = (contactoTipo) =>{

        if(contactoTipo=="fotografia"){
            setDatos({...datos, foto: true})
        }
        if(contactoTipo == "credenciales"){
            setDatos({...datos, credenciales: true})
        }
        if(contactoTipo == "contacto"){
            setDatos({...datos, contacto: true})
        }
        setDatos({...datos, Stores_ids:[],stores_credenciales:[],stores_fotos:[]})
        
        setShowModal(true);

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
            const validate = ValidateNumber(datos.Mobile);
            if(verificarContactos() && emailValidate() && validate){
                
                setContacts([
                    ...contacts,
                    datos
                ])
                
                setDatos({...datos, Phone:''})
                setContacto({contact:datos})
                setShowModal(false)
                
            }else{
                if(!verificarContactos()){
                    let inp = document.getElementById('Email');
                    inp.classList.add("is-invalid");
                    inp.focus();
                    inp = document.getElementById('Mobile');
                    inp.classList.add("is-invalid");
                    inp.focus();
                }else{
                    let inp = document.getElementById('Email');
                    inp.classList.remove("is-invalid");
                    inp = document.getElementById('Mobile');
                    inp.classList.remove("is-invalid");
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
                }
            }
        // setShow(false);
    }
    //mostrar u ocultar el boton de asignación de contacto
    // const handleButton = ()=>{
    //     setShow(true);
    // }

    return ( 
        (isBusy ? (
            <h3>Cargando</h3>
          ) : (
        <div>
            <div className="row mt-3">
                <div className="col">
                </div>
                    <div className="text-center">
                        <div>
                            <h4>Contactos Stores</h4>
                            <h6>Seleccione un contacto para cada Módulo</h6>
                            <StoreTable stores={stores} contacts={contacts} asignarContacto={asignarContacto} onSubmit={onSubmit} showPopUp={showPopUp} setShowError={setShowError} id={props.id} volverTelefono={props.volverTelefono}/>
                        </div>
                        {(showError ? <div className="mt-3 text-danger">Debe Asociar un Contacto para cada Store, Fotografía y Credenciales</div>:<span></span>)}
                    </div> 
                    <Modal isOpen={showModal}>
                        <ModalHeader>
                            <h5>Crear Nuevo Contacto</h5>
                            <h6>{contactoTipo}</h6>
                        </ModalHeader>
                        <ModalBody>
                            <form className="container" onSubmit={addContact}>
                                <div>
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
                                    <label htmlFor="cel1" className="col-sm-2 col-form-label">Cel:</label>
                                    <div className="col-sm-10">
                                        <input 
                                            type="cel1" 
                                            className="form-control" 
                                            name="Mobile" 
                                            id="Mobile" 
                                            placeholder="ej: +552131354684" 
                                            onChange={handleInputChange} 
                                            required>
                                        </input> 
                                        
                                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                            (cód de país "+52")(cod ciudad "22") XXXXXXX
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>
                                
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary mt-3 mb-2" onClick={()=>setShowModal(false)}>Cancelar</button> 
                            <button className="btn btn-primary mt-3 mb-2" onClick={addContact}>Agregar Contacto</button> 
                        </ModalFooter>
                    </Modal>                            
            </div>
        
        </div>    
        )
        )
     );
}
 
export default SeleccionContactos;