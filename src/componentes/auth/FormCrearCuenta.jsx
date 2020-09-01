import React from 'react'
import PropTypes from 'prop-types'

const FormCrearCuenta = ({handleSubmit, leerDatos}) => (
	<form onSubmit={handleSubmit}>
		<div className="campo">
			<label>Email</label>
			<input 
	      type="email" 
	      name="email"
				placeholder="Ej: mail@mail.com"
				autoComplete="true"
				autoFocus
				required
				onChange={leerDatos}
			/>
		</div>
		<div className="campo">
			<label>Nombre</label>
			<input 
	      type="text" 
	      name="nombre"
				placeholder="Walter"
				autoComplete="true"
				required
				onChange={leerDatos}
			/>
		</div>
		<div className="campo">
			<label>Contraseña</label>
			<input 
	      type="password" 
	      name="password"
				placeholder="********"
				autoComplete="true"
				required
				onChange={leerDatos}
			/>
		</div>
		<input 
			type="submit" 
			value="Crear cuenta" 
			className="btn btn-verde btn-block" 
		/>
	</form>
)

FormCrearCuenta.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	leerDatos: PropTypes.func.isRequired
}

export default FormCrearCuenta