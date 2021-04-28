import { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import { Toast } from '../../helpers/SweetAlert'
import FormLogin from './FormLogin'
import { login } from './handleAuth'

/**
 * Componente para iniciar sesion
 * 
 * @param {object} props - component props
*/
const Login = (props) => {
	const [ auth, setAuth ] = useContext(CRMContext)

	const { logged } = auth

	const { history } = props

	if (logged) {
		history.push('/')
	}

	const initialState = {
		email: '',
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
			} = await login(values)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { details } = data
			const { token } = details
			localStorage.setItem('token', token)
	    setAuth({
				token,
				logged: !!token
			})
			history.push('/')
		} catch (error) {
			return Toast('error', 'Ha ocurrido un error')
		}
	}

	return (
		<div className="login">
			<h2>Iniciar sesión</h2>
			<div className="contenedor-formulario">
				<FormLogin
					handleSubmit={handleSubmit}
					handleInputChange={handleInputChange}
				/>
			</div>
		</div>
	)
}

export default withRouter(Login)
