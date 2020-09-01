import React, { useContext, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import Cliente from './Cliente'
import { CRMContext } from '../../context/CRMContext'
import { consultarClientelaDeApi } from './handleCliente'
import Resultados from '../helpers/Resultados'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const Clientes = (props) => {
	const [clientes, guardarClientes] = useState([])
	const [auth] = useContext(CRMContext)

	useEffect(() => {
		if (auth.token !== '') {
			consultarClientelaDeApi('', auth.token, (res) => {
				if (res.ok) {
					guardarClientes(res.data)
				} else {
					Toast('warning', res.msg)
				}
			})
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [auth.token, props.history])

	if (!auth.auth) {
		props.history.push('/iniciar-sesion')
	}

	return (
		<div className={AddAnimClass('fadeInRight')}>
			<h2>
				Clientes <Resultados len={clientes.length} />
			</h2>
			<Link 
				className="btn btn-verde nvo-cliente" 
				to={'/clientes/nuevo'}
			><i className="fas fa-plus-circle"></i>
				Nuevo Cliente
			</Link>
			{
				clientes.length > 0 ? 
					<ul className={AddAnimClass('fadeInUp') + "listado-clientes"}>
						{
							clientes.map((cliente) => (
								<Cliente key={cliente._id} cliente={cliente} />
							))
						}
					</ul>
			 	: <h2>Aún no hay clientes dados de alta</h2>
			}
		</div>
	)
}

export default withRouter(Clientes)
