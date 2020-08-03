import React, { useContext, useEffect, useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import Cliente from './Cliente'
import { CRMContext } from '../../context/CRMContext'
import { consultarClientelaDeApi } from './handleCliente'

function Clientes(props) {
	const [ clientes, guardarClientes ] = useState([])
    const [ auth ] = useContext(CRMContext)
    
	useEffect(() => {
		if(auth.token !== '') {
			consultarClientelaDeApi('', auth.token, res => {
                if(res.ok) {
                    guardarClientes(res.data)
                } else {
                    Toast('warning', res.msg)
                }
            })
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [auth.token, props.history])
    
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
    
	return (
	    <Fragment>
			<h2>Clientes</h2>
			<Link 
			    to={"/clientes/nuevo"} 
			    className="btn btn-verde nvo-cliente"
			 ><i className="fas fa-plus-circle"></i> 
                Nuevo Cliente
            </Link>
            {
            	clientes.length > 0 ? (
					<ul className="listado-clientes">
						{
                            clientes.map(cliente => (
                                <Cliente 
                                    key={cliente._id} 
                                    cliente={cliente} 
                                />
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
