import React, {Fragment, useState} from 'react';
import {ZOHO} from '../assets/Zoho';

const OverView = (props) => {
    const contactos = props.contacts;
    const contactosNego = contactos.filter(contacto=> contacto.neg == true);
    const contactosStores = contactos.filter(contacto => contacto.Stores_ids.length > 0);
    const contactsFoto = contactos.filter(contacto => contacto.stores_fotos.length > 0);
    const contactsCredenciales = contactos.filter(contacto => contacto.stores_credenciales.length > 0);
    const record = props.record;

    const onSubmit = ()=>{
        crearContactosNegociacion();
        proceedToNextState();
       
    }
    function proceedToNextState() {
        ZOHO.embeddedApp.init().then(function(){
        return ZOHO.CRM.BLUEPRINT.proceed();
        }).then(function(data){
        console.log(data);
        })
        }

    function closeWindow() {
            ZOHO.embeddedApp.init().then(function(){
            return ZOHO.CRM.UI.Popup.closeReload();
            }).then(function(data){
            console.log(data);
            })
        }

    const crearContactosNegociacion = () =>{
        contactos.forEach(contacto => {
            //console.log(contacto);
                ZOHO.CRM.API.insertRecord({Entity:"Contacts",APIData: contacto}).then(function(data){
                    let idContacto =data.data[0].details.id;
                    if(contacto.hasOwnProperty('neg')){
                        ZOHO.CRM.API.insertRecord({Entity:"Deals_X_Contacts",APIData: {"Contactos":idContacto, "Negociaci_n":props.id}}).then(function(data){
                            //console.log(data);
                        });
                        if(contacto.Rol_Contacto.includes("Legal Representative")){
                            ZOHO.CRM.API.updateRecord({Entity:"Contacts" , APIData:{"id": idContacto,"Raz_n_Social": record.Raz_n_Social.id, "Brand": record.Brand.id}}).then(function(data){
                                console.log(data)
                            })
                            ZOHO.CRM.API.updateRecord({Entity:"Razones_Sociales" , 
                            APIData:{
                                "id": record.Raz_n_Social.id,
                                "Legal_First_Name": contacto.First_Name,
                                "Legal_Last_Name": contacto.Last_Name,
                                "Telefono": contacto.Mobile,
                                "Legal_Email": contacto.Email}}).then(function(data){
                                //console.log(data)
                            })
                        }else{
                            ZOHO.CRM.API.updateRecord({Entity:"Contacts" , APIData:{"id": idContacto, "Brand": record.Brand.id}}).then(function(data){
                                console.log(data)
                            })
                        }
                        
                    }
                
                    if(contacto.Stores_ids.length > 0 && contacto.contacto ==true && contacto.Rol_Contacto.includes("Store Decision Maker")){
                        contacto.Stores_ids.forEach(store => {
                            console.log(store.id+' '+idContacto);
                            ZOHO.CRM.API.insertRecord({Entity:"Stores_X_Contacts", 
                                APIData: {"Stores":store.id, "Contactos":idContacto}}).then(function(data){
                                console.log(data)
                            })
                        });
                    }

                    if(contacto.stores_fotos.length > 0 && contacto.foto ==true){
                        contacto.stores_fotos.forEach(store => {
                            ZOHO.CRM.API.getRecord({Entity:"Accounts",RecordID:store.id}).then((result)=>{
                                let reg_store = (result.data[0]);
                                if(reg_store.Solicitud_Fotograf_a != null){
                                    let idFoto =reg_store.Solicitud_Fotograf_a.id;
                                    if(idFoto != null){
                                        ZOHO.CRM.API.updateRecord({Entity:"Fotograf_a", APIData:{"id":idFoto, 
                                            "Contacto":idContacto }}).then(function(data){
                                            console.log(data)
                                        })
                                    }
                                }
                                
                              })
                        });
                    }

                    if(contacto.stores_credenciales.length > 0 && contacto.credenciales== true){
                        contacto.stores_credenciales.forEach(store => {
                            console.log(store.id+' '+idContacto);
                            ZOHO.CRM.API.insertRecord({Entity:"Stores_X_Contacts", 
                                APIData: {"Stores":store.id, "Contactos":idContacto}}).then(function(data){
                                console.log(data)
                            })
                            ZOHO.CRM.API.updateRecord({Entity:"Accounts", APIData:{"id":store.id, 
                                            "Correo_eletr_nico":contacto.Email }}).then(function(data){
                                            console.log(data)
                            })
                        });
                        
                    }

                    
                    
                });
            }
        );

        ZOHO.CRM.API.updateRecord({Entity:"Deals", 
                                APIData:{"id":props.id, 
                                    "Informaci_n_de_Contacto_Completa": "SI"
                                     }}).then(function(data){
                                    console.log(data)
                            })
        
    }

    const volver = ()=>{
        props.volver();
    }

    return ( 
        <Fragment>
            <div className="mt-4 ">
                <div className="text-center ">
                    <h4>Contactos Agregados y Asociaciones</h4>
                </div> 
                
                <table className="mx-auto mt-3 table container ml-4 w-75 table-responsive">
                    <thead className="table-secondary">
                        <tr>
                            <th scope="col">Contactos Negociación</th>
                            <th scope="col">Contactos Stores</th>
                            <th scope="col">Contactos Fotografía</th>
                            <th scope="col">Credenciales</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {contactosNego.map(item => (
                                    <div className="fw-bold">{item.Email}</div>  
                                    ))}
                            </td>
                            <td>
                                { contactosStores.map(item => (
                                    <div key={item.Email}>
                                        <span className="fw-bold">{item.First_Name+' '+item.Last_Name}</span>  {item.Stores_ids.map(item =>(<div key={item.id}> - {item.name}</div>))}
                                        </div>
                                )) }
                            </td>
                            <td>
                            { contactsFoto.map(item => (
                                    <div key={item.Email}>
                                        <span className="fw-bold">{item.First_Name+' '+item.Last_Name}</span>  {item.stores_fotos.map(item =>(<div key={item.id}> - {item.name}</div>))}
                                        </div>
                                )) }
                            </td>
                            <td>
                            { contactsCredenciales.map(item => (
                                    <div key={item.Email}>
                                        <span className="fw-bold">{item.First_Name+' '+item.Last_Name}</span>  {item.stores_credenciales.map(item =>(<div key={item.id}> - {item.name}</div>))}
                                        </div>
                                )) }
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <div className="text-center">
                    <span className="text-left ">
                            <button type="submit" id="button" className="btn btn-primary me-3" onClick={volver}>Volver</button>
                    </span>
                    <span className="text-center">
                            <button type="submit" id="button" className="btn btn-primary " onClick={onSubmit}>Continuar</button>                      
                    </span>
                </div>
            </div>
        </Fragment>
     );
}
 
export default OverView;