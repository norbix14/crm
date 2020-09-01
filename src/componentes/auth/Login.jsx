import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Toast from '../../helpers/Toast'
import { validateFields } from '../../helpers/Validator'
import { iniciarSesion } from './handleUser'
import FormLogin from './FormLogin'

const Login = (props) => {
	// eslint-disable-next-line
	const [ auth, guardarAuth ] = useContext(CRMContext)
	const [ credenciales, guardarCredenciales ] = useState({})
	
  const leerDatos = e => {
		guardarCredenciales({
			...credenciales,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const passed = validateFields(credenciales)
		if(passed.valid) {
			iniciarSesion(credenciales, (res) => {
				if(res.ok) {
					const token = res.msg
			    localStorage.setItem('token', token)
			    guardarAuth({
						token,
						auth: true
					})
					Toast('success', 'Sesión iniciada')
					props.history.push('/')
				} else {
					Toast('error', res.msg)
				}
			})
		} else {
			return Toast('warning', passed.msg)
		}
	}

	return (
		<div className="login">
			<h2>Iniciar sesión</h2>
			{/*<Link to="/crear-cuenta">Crear cuenta</Link>*/}
			<div className="contenedor-formulario">
				<FormLogin
					handleSubmit={handleSubmit}
					leerDatos={leerDatos}
				/>
			</div>
		</div>
	)
}

export default withRouter(Login)
