import {
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Resultados from '../helpers/Resultados'
import { AddAnimClass } from '../../helpers/AddAnimateClass'
import { Toast } from '../../helpers/SweetAlert'
import Cliente from './Cliente'
import { findClients } from './handleClients'

/**
 * Componente para mostrar a los clientes
 *
 * @param {object} props - component props
*/
const Clientes = (props) => {
	const [ auth ] = useContext(CRMContext)

	const { token, logged } = auth

	const { history } = props

	if (!logged) {
		history.push('/iniciar-sesion')
	}

	const [ clients, setClients ] = useState([])

	const handleClientsData = useCallback(async() => {
		try {
			const {
				data,
				response = null
			} = await findClients(token)
			if (response) {
				const { data } = response
				const { message } = data
				return Toast('warning', message)
			}
			const { details } = data
			const { clients } = details
			setClients(clients)
		} catch (error) {
			return Toast('error', 'Ha ocurrido un error')
		}
	}, [token])

	const updateClientList = (id) => {
		setClients(prevState => {
			return prevState.filter(
				client => client._id !== id
			)
		})
	}

	useEffect(() => {
		handleClientsData()
	}, [handleClientsData])

	return (
		<div className={AddAnimClass('fadeInRight')}>
			<h2>
				Clientes <Resultados len={clients.length} />
			</h2>
			<Link 
				className="btn btn-verde nvo-cliente" 
				to={'/clientes/nuevo'}
			><i className="fas fa-plus-circle"></i>
				Nuevo Cliente
			</Link>
			{
				clients.length > 0 ? 
					<ul
						className={AddAnimClass('fadeInUp') + "listado-clientes"}
					>
						{
							clients.map((client) => (
								<Cliente
									key={client._id}
									client={client}
									updateClientList={updateClientList}
								/>
							))
						}
					</ul>
			 	: <h2>Aún no hay clientes dados de alta</h2>
			}
		</div>
	)
}

export default withRouter(Clientes)
