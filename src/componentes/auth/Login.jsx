import React, { Fragment, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import { CRMContext } from '../../context/CRMContext'
import { iniciarSesion } from './iniciarSesion'

function Login(props) {
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
		iniciarSesion(credenciales)
		.then(data => {
		  if(data.ok) {
		    let token = data.msg
		    localStorage.setItem('token', token)
		    guardarAuth({
					token,
					auth: true
				})
				Toast('success', 'Sesión iniciada')
				props.history.push('/')
		  } else {
		    Toast('error', data.msg)
		  }
		})
	}
    
	return (
		<Fragment>
			<div className="login">
				<h2>Iniciar sesión</h2>
				<div className="contenedor-formulario">
					<form onSubmit={handleSubmit}>
						<div className="campo">
							<label>Email</label>
							<input 
                type="text" 
                name="email"
								placeholder="Tu email"
								autoComplete="email"
								required
								onChange={leerDatos}
							/>
						</div>
						<div className="campo">
							<label>Contraseña</label>
							<input 
                type="password" 
                name="password"
								placeholder="Tu contraseña"
								autoComplete="current-password"
								required
								onChange={leerDatos}
							/>
						</div>
						<input 
							type="submit" 
							value="Iniciar sesión" 
							className="btn btn-verde btn-block" 
						/>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default withRouter(Login)
