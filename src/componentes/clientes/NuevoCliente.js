import React, { Fragment, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function NuevoCliente(props) {
	const [ auth ] = useContext(CRMContext)
	const [ cliente, guardarCliente ] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: ''
	})
	const actualizarState = e => {
		guardarCliente({
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
	const agregarCliente = e => {
		e.preventDefault()
		clienteAxios.post('/clientes',
			cliente,
			{
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			}
		)
		.then(response => {
			if(response.status === 200) {
				if(response.data.error) {
					if(response.data.error.code === 11000) {
						Toast('warning', 'Este email ya esta registrado')
					} else {
						Toast('warning', 'No se ha podido agregar')
					}
				} else {
					Toast('success', response.data.mensaje)
					props.history.push('/')
				}
			}
		})
		.catch(err => {
			Toast('error', 'Ha ocurrido un error')
		})
	}
	if(!auth.auth) {
		props.history.push('/iniciar-sesion')
	}
	return (
	    <Fragment>
		    <h2>Nuevo Cliente</h2>
		    <form onSubmit={agregarCliente}>
		        <legend>Llena todos los campos</legend>
		        <div className="campo">
		            <label>Nombre:</label>
		            <input type="text" placeholder="Nombre Cliente" 
		            	   name="nombre" autoFocus required 
		            	   onChange={actualizarState}
		           	/>
		        </div>
		        <div className="campo">
		            <label>Apellido:</label>
		            <input type="text" placeholder="Apellido Cliente" 
		            	   name="apellido" required 
		            	   onChange={actualizarState}
		           	/>
		        </div>
		        <div className="campo">
		            <label>Empresa:</label>
		            <input type="text" placeholder="Empresa Cliente" 
		            	   name="empresa" required 
		            	   onChange={actualizarState}
		            />
		        </div>
		        <div className="campo">
		            <label>Email:</label>
		            <input type="email" placeholder="Email Cliente" 
		            	   name="email" required 
		            	   onChange={actualizarState}
		            />
		        </div>
		        <div className="campo">
		            <label>Teléfono:</label>
		            <input type="tel" placeholder="Teléfono Cliente" 
		            	   name="telefono" required 
		            	   onChange={actualizarState}
		            />
		        </div>
		        <div className="enviar">
		            <input type="submit" className="btn btn-azul" 
		            	   value="Agregar Cliente" 
		            	   disabled={validarCliente()}
					/>
		        </div>
		    </form>
	    </Fragment>
	)
}

export default withRouter(NuevoCliente)
