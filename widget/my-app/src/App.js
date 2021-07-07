import { useEffect, useState } from 'react';
import Contacto from './componentes/Contacto';
import OverView from './componentes/OverView';
import {ZOHO} from './assets/Zoho';
import DatosContacto from './Context/DatosContacto';
import TelefonoStore from './componentes/TelefonoStore';
import SeleccionContactos from './componentes/SeleccionContactos';


const App = () => {
   const [record, setRecord] = useState({});
   const [id, setID] = useState(null);
   const [link, setLink] = useState(['contacto']);
   const [contacts, setContacts]= useState([]);
   const [infoCompleta, setInfoCompleta] = useState();
   const [contactsFoto, setContactsFoto] = useState([]);
   const [stores, setStores]=useState([]);

   useEffect(() => {

      ZOHO.embeddedApp.on("PageLoad", function (data) {
         console.log(data);
         let id = data.EntityId;
         setID(id);
         console.log(id);
         ZOHO.CRM.API.getRecord({Entity:"Deals",RecordID:id}).then((result)=>{
           setInfoCompleta(result.data[0].Informaci_n_de_Contacto_Completa);
            setRecord(result.data[0])
         })
         ZOHO.CRM.API.getRelatedRecords({Entity:"Deals",RecordID:id,RelatedList:"Oportunidades"}).then((data)=>{
            setStores(data.data);
            console.log(data.data);
        })
         
      });
      ZOHO.embeddedApp.init()
   },[]);

   const changeLink = (link)=>{
      setLink(link);
   }

   const onSubmitContacto = (contacts) =>{
      setContacts(contacts)
      setContactsFoto(contacts)
      changeLink('telefono')
   }

   const onSubmitTelefonoStore = ()=>{
      changeLink('seleccion')
   }
   const onSubmitSeleccion = (contacts , contactsFoto) =>{
      setContacts(contacts);
      setContactsFoto(contactsFoto);
      changeLink('overView');
   }

   const volver = () =>{
      changeLink('seleccion');
   }
   const volverTelefono = ()=>{
      changeLink('telefono')
   }

   function closeWindow() {
      ZOHO.embeddedApp.init().then(function(){
      return ZOHO.CRM.UI.Popup.closeReload();
      }).then(function(data){
      console.log(data);
      })
  }
  function proceedToNextState() {
   ZOHO.embeddedApp.init().then(function(){
   return ZOHO.CRM.BLUEPRINT.proceed();
   }).then(function(data){
   console.log(data);
   })
   }

   
   return (
   (infoCompleta == null || infoCompleta == 'NO') ? (
    (link == 'contacto') ?
      <Contacto onSubmitContacto={onSubmitContacto}/>: 
      (link =='telefono') ?
         <DatosContacto>
         <TelefonoStore onSubmitTelefonoStore={onSubmitTelefonoStore} stores={stores} /> 
         </DatosContacto>:
         (link =='seleccion') ?
         <DatosContacto>
         <SeleccionContactos stores={stores} id={id} contacts={contacts} contactsFoto={contactsFoto} onSubmitSeleccion={onSubmitSeleccion} volverTelefono={volverTelefono}/>
         </DatosContacto>:
            <OverView id={id} volver={volver} record={record} contacts={contacts} contactsFoto={contactsFoto}/>): 
               <div className="text-center mt-5">
                  <h3 className="mt-5">Contactos Cargados</h3>
                  <button className="btn btn-primary mt-3" onClick={proceedToNextState}>Continuar</button>

               </div>
   );
}

export default App;
