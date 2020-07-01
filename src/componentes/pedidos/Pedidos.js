import React, { Fragment, useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Pedido from './Pedido'
import { CRMContext } from '../../context/CRMContext'

function Pedidos(props) {
	const [ pedidos, guardarPedidos ] = useState([])
	const [ auth ] = useContext(CRMContext)
	// ATENCION: LOOP INFINITO si se le pasa como dependencia a [pedidos]
	useEffect(() => {
		if(auth.token !== '') {
			async function consultarAPI() {
				try {
					const obtenerPedidos = await clienteAxios.get('/pedidos', {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					})
					guardarPedidos(obtenerPedidos.data)
				} catch(error) {
					if(error.response.status === 500) {
						props.history.push('/iniciar-sesion')			
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
	    	<h2>Pedidos</h2>
	    	{
	    		pedidos.length > 0 ? 
			    	<ul className="listado-pedidos">
			    		{pedidos.map(pedido => (
				    		<Pedido pedido={pedido} key={pedido._id} />
			    		))}
			    	</ul>
	    	: <h2>Aún no hay pedidos realizados</h2>
	    	}
	    </Fragment>
	)
}

export default withRouter(Pedidos)
