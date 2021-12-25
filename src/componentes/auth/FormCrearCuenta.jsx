import PropTypes from 'prop-types'

/**
 * Componente que muestra el formulario
 *
 * @param {object} props - component props
 * @param {object} props.values - input values
 * @param {function} props.handleSubmit - handle the submit event
 * @param {function} props.handleInputChange - handle the input change event
*/
const FormCrearCuenta = ({values, handleSubmit, handleInputChange}) => {
	const { email, nombre, password } = values

	return (
		<form onSubmit={handleSubmit}>
			<div className="campo">
				<label htmlFor="email">Email</label>
				<input 
		      type="email" 
		      name="email"
		      id="email"
					placeholder="Ej: mail@mail.com"
					autoComplete="true"
					autoFocus
					required
					value={email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="campo">
				<label htmlFor="nombre">Nombre</label>
				<input 
		      type="text" 
		      name="nombre"
		      id="nombre"
					placeholder="Walter"
					autoComplete="true"
					required
					value={nombre}
					onChange={handleInputChange}
				/>
			</div>
			<div className="campo">
				<label htmlFor="password">Contraseña</label>
				<input 
		      type="password" 
		      name="password"
		      id="password"
					placeholder="********"
					autoComplete="true"
					required
					value={password}
					onChange={handleInputChange}
				/>
			</div>
			<input 
				type="submit" 
				value="Crear cuenta" 
				className="btn btn-verde btn-block" 
			/>
		</form>
	)
}

FormCrearCuenta.propTypes = {
	values: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired
}

export default FormCrearCuenta
