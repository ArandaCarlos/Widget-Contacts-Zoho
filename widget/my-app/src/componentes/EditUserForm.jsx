import React, {useState} from 'react';
import ValidateNumber from '../Context/ValidateNumber';
import UserTable from './UserTable';

const EditUserForm = (props) => {

    const [roles, setRoles] = useState([]);
    const [preRol, setPreRol] = useState([]);
    const [contacts, setContacts]= useState([]);
    const [datos, setDatos] = useState({
        First_Name: '',
        Last_Name: '',
        Email:'',
        Mobile:'',
        Rol_Contacto: [],
        Stores_ids:[],
        neg: true
    })
    const [emailError, setEmailError]=useState(false);
    const [numberError, setNumberError]=useState(false);
    const [show, setShow] = useState(false);
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
        return verificado;
    }
    const addContact = (e)=>{
        e.preventDefault();
        if(datos.First_Name !=='' && datos.Email !=='' && datos.Last_Name!=='' && datos.Mobile!==''){
            const validate = ValidateNumber(datos.Mobile);
            if(verificarContactos() && emailValidate() && validate){
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
                e.target.reset();
                return true;
            }else{
                if(!verificarContactos()){
                    alert("debe ingresar un contacto distinto a los anteriores");
                }
                else if(!emailValidate()){
                    setEmailError(true);
                }
                else if(!validate){
                    setNumberError(true);
                }
                return false;
            }
            
        }
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        let validate = addContact(e);
        if(validate){
            if(roles.length == 5 && contacts.length >= 1){
                setShow(true);
            }
            props.agregar(datos);
        }
        setDatos({...datos, Rol_Contacto: []});
        //console.log(datos.Phone);

    }

    

    return ( 
        <div className="row mt-3 mr-3">
            <div className="col">
                <form className="container mt-3" onSubmit={onSubmit}>
                    <h2>Contactos Asociados a la Negociación</h2>
                    <div className="form-group row mt-4">
                        <label htmlFor="First_Name1" className="col-sm-2 col-form-label">First_Name</label>
                        <div className="col-sm-10">
                        <input 
                            type="First_Name1" 
                            className="form-control" 
                            name="First_Name" 
                            id="First_Name1" 
                            placeholder="First_Name" 
                            onChange={handleInputChange} 
                            
                            />
                        </div>
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="Last_Name1" className="col-sm-2 col-form-label">Last_Name</label>
                        <div className="col-sm-10">
                        <input 
                            type="Last_Name1" 
                            className="form-control" 
                            name="Last_Name" 
                            id="Last_Name1" 
                            placeholder="Last_Name" 
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
                            id="Email1" 
                            placeholder="Email" 
                            onChange={handleInputChange} 
                            required></input>
                            {emailError ?
                                <span>Campo Obligatorio</span>: <div></div>
                            }
                            
                        </div>
                        
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="cel1" className="col-sm-2 col-form-label">Mobile</label>
                        <div className="col-sm-10">
                        <input 
                            type="cel1" 
                            className="form-control" 
                            name="Mobile" 
                            id="cel1" 
                            placeholder="+552131354684" 
                            onChange={handleInputChange} 
                            required></input>
                            {numberError ?
                                <span>Campo Obligatorio</span>: <div></div>
                            }
                        </div>
                    </div>
                    
                    
                    <div className="form-group row mt-3">
                        <div className="col-sm-2">Checkbox</div>
                        <div className="col-sm-10" id="checkboxs">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="check1" value="Brand Decision Maker" onChange={handleInputCheckbox} id="Brand Decision Maker" ></input>
                            <label className="form-check-label" htmlFor="check1">
                                <abbr title="Esta persona se encarga de ........" >
                                    Brand Decision Maker
                                </abbr>
                            </label>
                            
                        </div>
                        <div className="form-check"> 
                            <input className="form-check-input" type="checkbox" name="check2" value="Marketing Decision Maker" onChange={handleInputCheckbox} id="Marketing Decision Maker" ></input>
                            <label className="form-check-label" htmlFor="check2">
                                <abbr title="Esta persona se encarga de ........" >
                                    Marketing Decision Maker
                                </abbr>
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="check3" value="Ops Decision Maker / COO" onChange={handleInputCheckbox} id="Ops Decision Maker / COO" ></input>
                            <label className="form-check-label" htmlFor="check3">
                                <abbr title="Esta persona se encarga de ........" >
                                    Ops Decision Maker/COO
                                </abbr>
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="check4" value="Finance Decision Maker" onChange={handleInputCheckbox} id="Finance Decision Maker" ></input>
                            <label className="form-check-label" htmlFor="check4">
                                <abbr title="Esta persona se encarga de ........" >
                                    Finance Decision Maker
                                </abbr>
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="check5" value="Legal Representative" onChange={handleInputCheckbox} id="Legal Representative"></input>
                            <label className="form-check-label" htmlFor="check5">
                                <abbr title="Esta persona se encarga de ........" >
                                    Legal Representative 
                                </abbr>
                            </label>
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
        
            <div className="col">
                <UserTable contacts={contacts}  eliminarContacto={eliminarContacto}/>
                {show ?
                <div className="mt-3 text-right">
                <button id="button" className="btn btn-primary" onClick={props.continuar}>Continuar</button>
                </div>:<div>Faltan Contactos o Roles por cumplir para continuar</div>}
            </div>
        </div>
     );
}
 
export default EditUserForm;