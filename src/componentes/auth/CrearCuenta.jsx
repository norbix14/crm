import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import { validateFields } from '../../helpers/Validator'
import { crearUsuario } from './handleUser'
import FormCrearCuenta from './FormCrearCuenta'

const CrearCuenta = (props) => {
	const [ usuario, guardarUsuario ] = useState({})

	const leerDatos = e => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const passed = validateFields(usuario)
		if(passed.valid) {
			crearUsuario(usuario, (res) => {
				if(res.ok) {
					Toast('success', res.msg)
					props.history.push('/iniciar-sesion')
				} else {
					Toast('error', res.msg)
				}
			})
		} else {
			Toast('warning', passed.msg)
		}
	}

	return (
		<div className="crear-cuenta">
			<h2>Crear cuenta</h2>
			<Link to="/iniciar-sesion">Iniciar sesión</Link>
			<div className="contenedor-formulario">
				<FormCrearCuenta
					handleSubmit={handleSubmit}
					leerDatos={leerDatos}
				/>
			</div>
		</div>
	)
}

export default withRouter(CrearCuenta)
