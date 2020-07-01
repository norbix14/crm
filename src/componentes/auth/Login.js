import React, { Fragment, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Toast from '../../helpers/Toast'
import { CRMContext } from '../../context/CRMContext'

function Login(props) {
	const [ auth, guardarAuth ] = useContext(CRMContext)
	const [ credenciales, guardarCredenciales ] = useState({})
	const leerDatos = e => {
		guardarCredenciales({
			...credenciales,
			[e.target.name]: e.target.value
		})
	}
	const iniciarSesion = async e => {
		e.preventDefault()
		try {
			const obtenerUsuario = await clienteAxios.post('/iniciar-sesion', credenciales)
			if(obtenerUsuario.status === 200) {
				const { token } = obtenerUsuario.data
				localStorage.setItem('token', token)
				guardarAuth({
					token,
					auth: true
				})
				Toast('success', 'Sesión iniciada')
				props.history.push('/')
			}
		} catch(err) {
			if(err.response) {
				Toast('error', err.response.data.mensaje)
			} else {
				Toast('error', 'Ha ocurrido un error. Intente más tarde')
			}
		}
	}
	return (
		<Fragment>
			<div className="login">
				<h2>Iniciar sesión</h2>
				<div className="contenedor-formulario">
					<form onSubmit={iniciarSesion}>
						<div className="campo">
							<label>Email</label>
							<input type="text" name="email"
								   placeholder="Tu email"
								   required
								   onChange={leerDatos}
							/>
						</div>
						<div className="campo">
							<label>Contraseña</label>
							<input type="password" name="password"
								   placeholder="Tu contraseña"
								   required
								   onChange={leerDatos}
							/>
						</div>
						<input type="submit" value="Iniciar sesión" 
							   className="btn btn-verde btn-block" 
						/>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default withRouter(Login)
