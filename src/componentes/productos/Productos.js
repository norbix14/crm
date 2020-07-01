import React, { useContext, useEffect, useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Producto from './Producto'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function Productos(props) {
	const [ productos, guardarProductos ] = useState([])
	const [ auth ] = useContext(CRMContext)
	// ATENCION: LOOP INFINITO si se le pasa como dependencia a [productos]
	useEffect(() => {
		if(auth.token !== '') {
			async function consultarAPI() {
				try {
					const obtenerProductos = await clienteAxios.get('/productos', {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					})
					guardarProductos(obtenerProductos.data)
				} catch(error) {
					if(error.response) {
						if(error.response.status === 500) {
							props.history.push('/iniciar-sesion')			
						}
					}
				}
			}
			consultarAPI()
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [auth.token, props.history])
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
	return (
	    <Fragment>
			<h2>Productos</h2>
			<Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
				<i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            {
            	productos.length > 0 ?
		            <ul className="listado-productos">
		            	{productos.map(producto => (
			            	<Producto producto={producto} key={producto._id} />
		            	))}
		            </ul>
            	: <h2>Aún no hay productos agregados</h2>
            }
	    </Fragment>
	)
}

export default withRouter(Productos)
