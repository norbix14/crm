import { withRouter, Link } from 'react-router-dom'
import { Toast } from '../../helpers/SweetAlert'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import FormCrearCuenta from './FormCrearCuenta'
import { signup } from './handleAuth'

/**
 * Componente para crear cuenta
 *
 * @param {object} props - component props
*/
const CrearCuenta = (props) => {
	const { history } = props

	const initialState = {
		email: '',
		nombre: '',
		password: ''
	}

	const [
		values,
		handleInputChange
	] = useHandlerInputChange(initialState)

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const {
				data,
				response = null
			} = await signup(values)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { message } = data
			Toast('success', message)
			history.push('/iniciar-sesion')
		} catch (error) {
			return Toast('error', 'Ha ocurrido un error')
		}
	}

	return (
		<div className="crear-cuenta">
			<h2>Crear cuenta</h2>
			<Link to="/iniciar-sesion">Iniciar sesión</Link>
			<div className="contenedor-formulario">
				<FormCrearCuenta
					values={values}
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
				/>
			</div>
		</div>
	)
}

export default withRouter(CrearCuenta)
