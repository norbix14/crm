import React, {
	useContext, 
	useState, 
	useEffect
} from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Pedido from './Pedido'
import Toast from '../../helpers/Toast'
import { searchOrders } from './handlePedido'
import Resultados from '../helpers/Resultados'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const Pedidos = (props) => {
	const [pedidos, guardarPedidos] = useState([])
	const [auth] = useContext(CRMContext)

	useEffect(() => {
		if (auth.token !== '') {
			searchOrders(auth.token, (res) => {
				if(res.ok) {
					guardarPedidos(res.data)
				} else {
					guardarPedidos([])
					Toast('warning', res.msg)
				}
			})
		} else {
			props.history.push('/iniciar-sesion')
		}
	}, [auth.token, props.history])

	if (!auth.auth) {
		props.history.push('/iniciar-sesion')
	}

	return (
		<div className={AddAnimClass('fadeInRight')}>
			<h2>
				Pedidos <Resultados len={pedidos.length} />
			</h2>
			{
				pedidos.length > 0 ?
					<ul className={AddAnimClass('fadeInUp') + "listado-pedidos"}>
						{
							pedidos.map((pedido) => (
								<Pedido pedido={pedido} key={pedido._id} />
							))
						}
					</ul>
				: <h2>Aún no hay pedidos realizados</h2>
			}
		</div>
	)
}

export default withRouter(Pedidos)
