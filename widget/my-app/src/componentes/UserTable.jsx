const UserTable = (props) => {

    return ( 
        <table className="me-3">
            <thead>
                <tr>
                    <th>Contacto</th>
                    <th>Roles</th>
                </tr>
            </thead>
            <tbody>
                    { 
                    props.contacts.map(user => (
                        <tr key={user.Email} className="mt-3">
                            <td>{user.First_Name} {user.Last_Name}</td>
                            <td>{user.Rol_Contacto}</td>
                            <td>
                                <button className="btn btn-outline-primary" onClick={()=>{props.editarContacto(user)}}>Editar</button>
                                <button className="btn btn-outline-danger mt-1 mb-1" onClick={()=>{props.eliminarContacto(user.Email)}}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                } 
                
            </tbody>
        </table>
     );
}
 
export default UserTable;