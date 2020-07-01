import React, { Fragment, useContext, useState, useEffect } from 'react'
import Toast from '../../helpers/Toast'
import { withRouter } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function EditarCliente(props) {
	const { id } = props.match.params
	const [ auth ] = useContext(CRMContext)
	const [ cliente, datosCliente ] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: ''
	})
	const actualizarState = e => {
		datosCliente({
			...cliente,
			[e.target.name]: e.target.value
		})
	}
	const validarCliente = () => {
		const { nombre, apellido, empresa, email, telefono } = cliente
		let valido = !nombre.length || !apellido.length || 
					 !empresa.length || !email.length || 
					 !telefono.length
		return valido
	}
	const actualizarCliente = e => {
		e.preventDefault()
		const url = `/clientes/${cliente._id}`
		clienteAxios.put(url, cliente, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		})
		.then(response => {
			if(response.status === 200) {
				if(response.data.error) {
					if(response.data.error.code === 11000) {
						Toast('error', 'Este email ya esta registrado')
					} else {
						Toast('error', 'Hubo un error inesperado')
					}
				} else {
					Toast('Correcto', response.data.mensaje)
					props.history.push('/')
				}
			}
		})
		.catch(err => {
			Toast('error', 'Ha ocurrido un error')
		})
	}
	useEffect(() => {
		if(auth.token !== '') {
			async function consultarAPI() {
				try {
					const url = `/clientes/${id}`
					const obtenerCliente = await clienteAxios.get(url, {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					})
					datosCliente(obtenerCliente.data)
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
	}, [id, auth.token, props.history])
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
	return (
	    <Fragment>
		    <h2>Editar Cliente</h2>
		    <form onSubmit={actualizarCliente}>
		        <legend>Llena todos los campos</legend>
		        <div className="campo">
		            <label>Nombre:</label>
		            <input type="text" placeholder="Nombre Cliente" 
		            	   name="nombre" autoFocus required 
		            	   onChange={actualizarState}
		            	   value={cliente.nombre}
		           	/>
		        </div>
		        <div className="campo">
		            <label>Apellido:</label>
		            <input type="text" placeholder="Apellido Cliente" 
		            	   name="apellido" required 
		            	   onChange={actualizarState}
		            	   value={cliente.apellido}
		           	/>
		        </div>
		        <div className="campo">
		            <label>Empresa:</label>
		            <input type="text" placeholder="Empresa Cliente" 
		            	   name="empresa" required 
		            	   onChange={actualizarState}
		            	   value={cliente.empresa}
		            />
		        </div>
		        <div className="campo">
		            <label>Email:</label>
		            <input type="email" placeholder="Email Cliente" 
		            	   name="email" required 
		            	   onChange={actualizarState}
		            	   value={cliente.email}
		            />
		        </div>
		        <div className="campo">
		            <label>Teléfono:</label>
		            <input type="tel" placeholder="Teléfono Cliente" 
		            	   name="telefono" required 
		            	   onChange={actualizarState}
		            	   value={cliente.telefono}
		            />
		        </div>
		        <div className="enviar">
		            <input type="submit" className="btn btn-azul" 
		            	   value="Guardar cambios" 
		            	   disabled={validarCliente()}
					/>
		        </div>
		    </form>
	    </Fragment>
	)
}

export default withRouter(EditarCliente)
