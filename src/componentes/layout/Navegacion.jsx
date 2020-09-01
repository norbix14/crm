import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'

const Navegacion = () => {
  const [ auth ] = useContext(CRMContext)
    
  if(!auth.auth) return null
    
	return (
		<aside className="sidebar col-3">
      <h2>Administración</h2>
      <nav className="navegacion">
        <Link to={"/"}>Inicio</Link>
        <Link className="clientes" to={"/clientes"}>Clientes</Link>
        <Link className="productos" to={"/productos"}>Productos</Link>
        <Link className="pedidos" to={"/pedidos"}>Pedidos</Link>
      </nav>
    </aside>
	)
}

export default Navegacion
