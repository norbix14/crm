import { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import { Toast } from '../../helpers/SweetAlert'
import FormCliente from './FormCliente'
import { addClient } from './handleClients'

/**
 * Componente para agregar un nuevo cliente
 * 
 * @param {object} props - component props
*/
const NuevoCliente = (props) => {
	const [ auth ] = useContext(CRMContext)

	const { token, logged } = auth

	const { history } = props

	if (!logged) {
		history.push('/iniciar-sesion')
	}

	const initialState = {
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: ''
	}

	const [
		client,
		handleInputChange
	] = useHandlerInputChange(initialState)

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const {
				data,
				response = null
			} = await addClient(client, token)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { message } = data
			Toast('success', message)
			history.push('/clientes')
		} catch (error) {
			return Toast('error', 'Ha ocurrido un error')
		}
	}

	return (
		<FormCliente 
			action="Agregar cliente"
			title="Dar de alta a un nuevo cliente"
			client={client}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	)
}

export default withRouter(NuevoCliente)
