import React, { useCallback, useContext, useEffect, useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import { CRMContext } from '../../context/CRMContext'

function Clientes(props) {
	const [ clientes, guardarClientes ] = useState([])
    const [ auth ] = useContext(CRMContext)
    const consultarAPI = useCallback(async () => {
        try {
            const obtenerClientes = await clienteAxios.get('/clientes',
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            if(obtenerClientes.status === 200) {
                if(!obtenerClientes.data.error) {
                    guardarClientes(obtenerClientes.data.datos)
                } else {
                    guardarClientes([])
                }
            }
        } catch(error) {
            if(error.response) {
                if(error.response.data.status === 500) {
                    // props.history.push('/iniciar-sesion')
                    Toast('warning', error.response.data.mensaje)
                } else {
                    Toast('warning', error.response.data.mensaje)
                }
            } else {
                Toast('error', 'Ha ocurrido un error')
            }
        }
    }, [auth.token])
    // ATENCION: LOOP INFINITO si se le pasa como dependencia a [clientes]
	useEffect(() => {
		if(auth.token !== '') {
			consultarAPI()
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [auth.token, consultarAPI, props.history])
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
	return (
	    <Fragment>
			<h2>Clientes</h2>
			<Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
				<i className="fas fa-plus-circle"></i> 
				Nuevo Cliente
            </Link>
            {
            	clientes.length > 0 ? (
					<ul className="listado-clientes">
						{
                            clientes.map(cliente => (
                                <Cliente key={cliente._id} cliente={cliente} />
                            ))
                        }
					</ul>
             	) :	(
                    <h2>Aún no hay clientes dados de alta</h2>
                )
         	}
		</Fragment>
	)
}

export default withRouter(Clientes)
