import React from 'react'
import PropTypes from 'prop-types'

const FormCliente = (props) => {
	const {
		action, 
		cliente, 
		titulo, 
		handleSubmit, 
		handleChange
	} = props
	
	return (
		<form onSubmit={handleSubmit}>
			<legend>{titulo}</legend>
			<div className="campo">
				<label>Nombre:</label>
				<input
					type="text"
					placeholder="Nombre Cliente"
					name="nombre"
					autoFocus
					required
					onChange={handleChange}
					value={cliente.nombre}
				/>
			</div>
			<div className="campo">
				<label>Apellido:</label>
				<input
					type="text"
					placeholder="Apellido Cliente"
					name="apellido"
					required
					onChange={handleChange}
					value={cliente.apellido}
				/>
			</div>
			<div className="campo">
				<label>Empresa:</label>
				<input
					type="text"
					placeholder="Empresa Cliente"
					name="empresa"
					required
					onChange={handleChange}
					value={cliente.empresa}
				/>
			</div>
			<div className="campo">
				<label>Email:</label>
				<input
					type="email"
					placeholder="Email Cliente"
					name="email"
					required
					onChange={handleChange}
					value={cliente.email}
				/>
			</div>
			<div className="campo">
				<label>Teléfono:</label>
				<input
					type="tel"
					placeholder="Teléfono Cliente"
					name="telefono"
					required
					onChange={handleChange}
					value={cliente.telefono}
				/>
			</div>
			<div className="enviar">
				<input
					type="submit"
					className="btn btn-azul"
					value={action}
				/>
			</div>
		</form>
	)
}

FormCliente.propTypes = {
	action: PropTypes.string.isRequired,
	cliente: PropTypes.object.isRequired,
	titulo: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired
}

export default FormCliente
