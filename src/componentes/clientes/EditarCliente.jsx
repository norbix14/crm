import {
	useCallback,
	useContext,
	useEffect
} from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import { Toast } from '../../helpers/SweetAlert'
import FormCliente from './FormCliente'
import { editClient, findClient } from './handleClients'

/**
 * Componente para editar un cliente
 *
 * @param {object} props - component props
*/
const EditarCliente = (props) => {
	const [ auth ] = useContext(CRMContext)

	const { token, logged } = auth

	const { history, match } = props

	if (!logged) {
		history.push('/iniciar-sesion')
	}

	const { id } = match.params

	const initialState = {
		nombre: '',
		apellido: '',
		empresa: '',
		email: '',
		telefono: ''
	}

	const [
		client,
		handleInputChange,
		setClient
	] = useHandlerInputChange(initialState)

	const handleClientData = useCallback(async () => {
		try {
			const {
				data,
				response = null
			} = await findClient(id, token)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { details } = data
			const { client } = details
			setClient(client)
		} catch (error) {
			return Toast('error', 'Ha ocurrido un error')
		}
	}, [id, token, setClient])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { _id } = client
			const {
				data,
				response = null
			} = await editClient(_id, client, token)
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

	useEffect(() => {
		handleClientData()
	}, [handleClientData])

	return (
	  <FormCliente 
			action="Editar cliente"
			title="Editar datos del cliente"
			client={client}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
		/>
	)
}

export default withRouter(EditarCliente)
