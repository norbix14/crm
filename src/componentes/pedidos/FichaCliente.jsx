import React from 'react'
import PropTypes from 'prop-types'

const FichaCliente = ({cliente}) => {
	const { nombre, apellido, telefono, 
					email, empresa } = cliente

	return (
		<div className="ficha-cliente">
		  <h3>Datos de Cliente</h3>
		  <p>Nombre: <span>{nombre} {apellido}</span></p>
		  <p>Teléfono: <span>{telefono}</span></p>
		  <p>Email: <span>{email}</span></p>
		  <p>Empresa: <span>{empresa}</span></p>
		</div>
	)
}

FichaCliente.propTypes = {
	cliente: PropTypes.object.isRequired
}

export default FichaCliente
