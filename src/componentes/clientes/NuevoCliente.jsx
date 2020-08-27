import React, { Fragment, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import { CRMContext } from '../../context/CRMContext'
import { addCliente } from './handleCliente'

function NuevoCliente(props) {
	const [auth] = useContext(CRMContext)
	const [cliente, guardarCliente] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: '',
	})

	const actualizarState = (e) => {
		guardarCliente({
			...cliente,
			[e.target.name]: e.target.value,
		})
	}

	const validarCliente = () => {
		const { nombre, apellido, empresa, email, telefono } = cliente
		let valido =
			!nombre.length ||
			!apellido.length ||
			!empresa.length ||
			!email.length ||
			!telefono.length
		return valido
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		addCliente(cliente, auth.token, (res) => {
			if (res.ok) {
				Toast('success', res.msg)
				props.history.push('/clientes')
			} else {
				Toast('warning', res.msg)
			}
		})
	}

	if (!auth.auth) {
		props.history.push('/iniciar-sesion')
	}

	return (
		<Fragment>
			<h2>Nuevo Cliente</h2>
			<form onSubmit={handleSubmit}>
				<legend>Llena todos los campos</legend>
				<div className="campo">
					<label>Nombre:</label>
					<input
						type="text"
						placeholder="Nombre Cliente"
						name="nombre"
						autoFocus
						required
						onChange={actualizarState}
					/>
				</div>
				<div className="campo">
					<label>Apellido:</label>
					<input
						type="text"
						placeholder="Apellido Cliente"
						name="apellido"
						required
						onChange={actualizarState}
					/>
				</div>
				<div className="campo">
					<label>Empresa:</label>
					<input
						type="text"
						placeholder="Empresa Cliente"
						name="empresa"
						required
						onChange={actualizarState}
					/>
				</div>
				<div className="campo">
					<label>Email:</label>
					<input
						type="email"
						placeholder="Email Cliente"
						name="email"
						required
						onChange={actualizarState}
					/>
				</div>
				<div className="campo">
					<label>Teléfono:</label>
					<input
						type="tel"
						placeholder="Teléfono Cliente"
						name="telefono"
						required
						onChange={actualizarState}
					/>
				</div>
				<div className="enviar">
					<input
						type="submit"
						className="btn btn-azul"
						value="Agregar Cliente"
						disabled={validarCliente()}
					/>
				</div>
			</form>
		</Fragment>
	)
}

export default withRouter(NuevoCliente)
