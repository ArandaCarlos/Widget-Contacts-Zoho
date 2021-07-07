import { createContext, useContext, useState, useEffect } from "react";

const DatosContacto = createContext();

export default function AsignarContacto({children}) {
    const [contacto, setContacto]=useState({contact:null});
    const [contactoTipo, setContactoTipo] = useState({contactoTipo:null});
    const [telTienda, setTelTienda] = useState([]);
   
   return (
      <DatosContacto.Provider value={{contacto, setContacto, contactoTipo, setContactoTipo, telTienda, setTelTienda}}>
         {children}
      </DatosContacto.Provider>
   );
};

export const useAsignarContacto = () => {

   const context = useContext(DatosContacto);

   if (!context) throw new Error("UseWidget inside ZohoContext");

   return context;
   
}