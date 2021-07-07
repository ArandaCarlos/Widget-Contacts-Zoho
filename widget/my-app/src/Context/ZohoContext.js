import { createContext, useContext, useState, useEffect } from "react";
import {ZOHO} from '../assets/Zoho';

const ZohoContext = createContext();

export default function ZohoProvider({children}) {

   const [module, setModule] = useState(null);
   const [entity, setEntity] = useState(null);

   useEffect(() => {

      const initWidget = () => {
         ZOHO.embeddedApp.on("PageLoad", function (data) {
            console.log(data);
            setModule(data.Entity);
            setEntity(data.EntityId);
         });

         ZOHO.embeddedApp.init();
      }

      setTimeout(()=> {
         initWidget();
      }, 1000);
      
   }, []);
   
   return (
      <ZohoContext.Provider value={{module: module, entity: entity}}>
         {children}
      </ZohoContext.Provider>
   );
};

export const useWidget = () => {

   const context = useContext(ZohoContext);

   if (!context) throw new Error("UseWidget inside ZohoContext");

   const { entity, module } = context;

   return {
      entity, module
   }
}