import PropTypes from 'prop-types'

/**
 * Componente que muestra el formulario
 * 
 * @param {object} props - component props
 * @param {function} props.handleSubmit - function
 * to handle the submit event
 * @param {function} props.handleInputChange- function
 * to handle the input change event
*/
const FormLogin = ({handleSubmit, handleInputChange}) => (
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
				onChange={handleInputChange}
			/>
		</div>
		<input 
			type="submit" 
			value="Iniciar sesión" 
			className="btn btn-verde btn-block" 
		/>
	</form>
)

FormLogin.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired
}

export default FormLogin
