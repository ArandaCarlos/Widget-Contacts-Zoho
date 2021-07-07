import { useState, useEffect} from "react";
import ValidateNumber from '../Context/ValidateNumber';
import {ZOHO} from '../assets/Zoho';
import {useAsignarContacto} from '../Context/DatosContacto';

const StoreTable = (props) => {

    const [stores, setStores]=useState(props.stores);
    const [show, setShow] = useState(false);
    const [telTiendas, setTelTiendas]= useState([]);
    const [telFijo, setTelFijo]=useState([]);
    const [showRepetido, setShowRepetido]=useState(false);

    useEffect(() => {
        props.stores.forEach(store => {
            store.Check_Robocall=null;
            store.Check=null;
            store.Control=null;
            store.Tel_fono_Tienda=null;
        });
    }, [])
    
    const onSubmit = (e)=>{
        e.preventDefault();
        let bool= true;
        let repeat = true;
        let tele='';
        props.stores.forEach(store => {
            let cont = 0;
            if(store.Check_Robocall!='OK' && store.Control!='OK'){
                bool=false;
            }
            telTiendas.forEach(tel => {
                if(tel==store.Tel_fono_Tienda ){
                    
                    cont =cont+1;
                    if(cont>=2){
                        tele=tel;
                    }
                }
            });
            if(store.Check_Robocall!='OK'){
                store.Tel_fono_Tienda=null
            }
            if(store.Control!='OK'){
                store.Check=null
            }
            if(cont>=2){
                repeat=false;
                console.log(tele);
            }
            console.log(repeat+''+telTiendas);
            
        });

        if(bool && repeat){
            asociarTelefono();
            props.onSubmitTelefonoStore();
        }else if(!repeat)
            {
                props.stores.forEach(store => {
                    let inp = document.getElementById(store.id+store.Account_Name+"telefonoTienda"); 
                    inp.value = '';
                    inp = document.getElementById(store.id+store.Account_Name+"telefonoFijo"); 
                    inp.value = '';
                    store.Check=null;
                    store.Tel_fono_Tienda=null;
                    store.Check_Robocall=null;
                    store.Control=null;
                    setShow(false);
                });
                setTelTiendas([]);
                setShowRepetido(true);
                
            }else{
                setShowRepetido(false);
                setShow(true);
            }
          
    }

    const asociarTelefono = ()=>{
        props.stores.forEach(store => {
            console.log(store.Control);
            console.log(store.Check);
            let telTienda=store.Tel_fono_Tienda;
            if(telTienda!= null){
                if(telTienda.includes("+51") || telTienda.includes("+54")|| telTienda.includes("+55")|| telTienda.includes("+57")||telTienda.includes("+56") ){
                    telTienda=telTienda.substr(3);
                }
                
                if(telTienda.includes("+506") || telTienda.includes("+593") || telTienda.includes("+598")){
                    if(telTienda!=null){
                            telTienda=telTienda.substr(4);                          
                    }
                }

                if(telTienda.includes("+52")){
                    if(telTienda!=null){
                        if(telTienda.length==13){
                        telTienda=telTienda.substr(3) 
                        }
                        if(telTienda.length==14){
                            telTienda=telTienda.substr(4) 
                        }
                        
                    }
                }
            }
            
            // if(telTienda!=null && store.Check!=null){
            //     ZOHO.CRM.API.updateRecord({Entity:"Accounts", 
            //         APIData:{"id":store.id, 
            //                 "Tel_fono_Tienda": telTienda,
            //                 "Phone": store.Check,
            //                 "WhatsApp_Contacto_Principal": store.Tel_fono_Tienda
            //                  }}).then(function(data){
            //                 console.log(data)
            //     })
            // }else if(telTienda!=null){
            //     ZOHO.CRM.API.updateRecord({Entity:"Accounts", 
            //         APIData:{"id":store.id, 
            //                 "Tel_fono_Tienda": telTienda,
            //                 "WhatsApp_Contacto_Principal": store.Tel_fono_Tienda
            //                  }}).then(function(data){
            //                 console.log(data)
            //     })
            // }else if(store.Check!=null){
            //     ZOHO.CRM.API.updateRecord({Entity:"Accounts", 
            //         APIData:{"id":store.id, 
            //                 "Phone": store.Check,
            //                  }}).then(function(data){
            //                 console.log(data)
            //     })
            // }
            console.log(store.id);
            console.log("holaaa")
            let conn_name = "crm";
            let map;
            if(telTienda!=null && store.Check!=null){
                map={"id" : store.id.toString(),
                "Tel_fono_Tienda" : telTienda.toString(),
                "WhatsApp_Contacto_Principal": store.Tel_fono_Tienda.toString(),
                "Phone":store.Check.toString()}
            }else if(telTienda==null){
                map={"id" : store.id.toString(),
                "Tel_fono_Tienda" : null,
                "WhatsApp_Contacto_Principal": null,
                "Phone":store.Check.toString()}
            }else if(store.Check==null){
                map={"id" : store.id.toString(),
                "Tel_fono_Tienda" : telTienda.toString(),
                "WhatsApp_Contacto_Principal": store.Tel_fono_Tienda.toString(),
                "Phone":store.Tel_fono_Tienda.toString()}
            }
            console.log(map)
            let req_data ={
            "parameters" : { 
                map
            },
            "method" : "POST",
            "url" : "https://www.zohoapis.com/crm/v2/functions/update_store_phone_number_from_widget/actions/execute?auth_type=apikey&zapikey=1003.7c02a5b10f13810ff9499d39a02c0d43.605b9c5964f99646e4da05c6b3e3afdc",
            "param_type" : 1
            };
            ZOHO.CRM.CONNECTION.invoke(conn_name, req_data)
            .then(function(data){
                console.log(data)
            })
            
            
            
        });
    }

    const repeatNumbers = (nro)=>{
        let validate = true;
        telTiendas.forEach(tel => {
            if(nro==tel){
                validate = false;
            }
        });
        return validate
    }

    const handleInputChange = (id,name,mod,event) => {
        
        let index= stores.findIndex(store=> store.id==id);
        let arrayStores = [...stores];
        if(!event.target.value=="" || !event.target.value==null){

            if(!ValidateNumber(event.target.value)){
                console.log(event.target.value)
                let inp = document.getElementById(id+name+mod);
                inp.classList.add("is-invalid");
            }else{
                if(repeatNumbers(event.target.value, mod)){
                    setShowRepetido(false);
                    let inp = document.getElementById(id+name+mod);
                    inp.classList.remove("is-invalid");
                    if(mod =="telefonoTienda"){
                        arrayStores[index].Tel_fono_Tienda=event.target.value;
                        arrayStores[index].Check_Robocall = 'OK';
                        setTelTiendas([...telTiendas,event.target.value]);
                    }else{
                        arrayStores[index].Check=event.target.value;
                        arrayStores[index].Control = 'OK';
                        setTelTiendas([...telFijo,event.target.value]);
                    }
                }else{
                    let inp = document.getElementById(id+name+mod);
                    inp.classList.add("is-invalid");
                    setShowRepetido(true);
                }
            }
            setStores(arrayStores);
        }else{
            let inp = document.getElementById(id+name+mod);
            inp.classList.remove("is-invalid");
        }
        
    }

    return (
        <div className="table-responsive"> 
            <div className="container text-center mt-3 mb-3">
            <h4>Teléfonos Stores</h4>
            <h6 >Acá debes indicar el teléfono que cada tienda tiene en caso que los usuarios necesiten comunicarse con la tienda</h6>
            <h6>Los numeros de contacto no se pueden repetir</h6>

            </div>
            <table className="mx-auto mt-3 table container ml-4 w-100 ">
                <thead className="table-secondary">
                    
                    <tr>
                        <th scope="col">Store</th>
                        <th scope="col">Whatsapp de la Tienda</th>
                        <th scope="col">Teléfono Fijo de la Tienda</th>
                    </tr>
                </thead>
                <tbody >
                    
                        
                        {props.stores.map(item => (
                                <tr>
                                <td>
                                    <div className="fw-bold mt-1" id={item.id}>{item.Account_Name}</div>  
                                </td>

                            <td>
                                <div className="row" id={item.id}>
                                    <div className="col-sm-10">
                                        <input 
                                            type="cel1" 
                                            className="form-control" 
                                            name="Mobile" 
                                            id={item.id+item.Account_Name+"telefonoTienda"} 
                                            placeholder="ejemplo: +552131354684"  
                                            onChange={(event)=>handleInputChange(item.id,item.Account_Name,"telefonoTienda",event)} 
                                            required>
                                        </input>
                                        {showRepetido?<div id="validationServerUsernameFeedback" className="invalid-feedback">
                                            Numero repetido Por favor seleccione un numero distinto
                                        </div>:<div id="validationServerUsernameFeedback" className="invalid-feedback">
                                            (cód de país "+52")(cod ciudad "22") XXXXXXX
                                        </div>}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="row" id={item.id}>
                                    <div className="col-sm-10">
                                        <input 
                                            type="cel2" 
                                            className="form-control" 
                                            name="Mobile" 
                                            id={item.id+item.Account_Name+"telefonoFijo"} 
                                            placeholder="ejemplo: +552131354684"  
                                            onChange={(event)=>handleInputChange(item.id,item.Account_Name,"telefonoFijo",event)} 
                                            required>
                                        </input>
                                        {showRepetido?<div id="validationServerUsernameFeedback" className="invalid-feedback">
                                            Numero repetido Por favor seleccione un numero distinto
                                        </div>:<div id="validationServerUsernameFeedback" className="invalid-feedback">
                                            (cód de país "+52")(cod ciudad "22") XXXXXXX
                                        </div>}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        ))}
                    
                </tbody>
            </table>
            
            <div className="text-center" style={{marginTop:50+'px'}}>
                <div>
                    <button type="submit" id="button" className="btn btn-primary " onClick={onSubmit}>Continuar</button>
                </div>
                {show? <div className="mt-3 text-danger">Debe cargar un numero válido por store</div>:
                showRepetido? <div className="mt-3 text-danger">Los numeros del contacto no se pueden repetir</div>:<span></span>}
            </div>
        </div>
     );
}
 
export default StoreTable;