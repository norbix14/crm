import PropTypes from 'prop-types'

/**
 * Componente que muestra datos del cliente
 * 
 * @param {object} props - component props
 * @param {object} props.client - client data
*/
const FichaCliente = (props) => {
	const { client } = props

	const {
		nombre,
		apellido,
		telefono,
		email,
		empresa
	} = client

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
	client: PropTypes.object.isRequired
}

export default FichaCliente
