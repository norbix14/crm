import { useCallback, useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast } from '../../helpers/SweetAlert'
import { AddAnimClass } from '../../helpers/AddAnimateClass'
import Resultados from '../helpers/Resultados'
import Pedido from './Pedido'
import { findOrders } from './handleOrders'

/**
 * Componente que muestra todos los pedidos realizados
 *
 * @param {object} props - component props
 */
const Pedidos = () => {
  const [auth] = useContext(CRMContext)

  const { token, logged } = auth

  const [orders, setOrders] = useState([])

  const getOrders = useCallback(async () => {
    try {
      const { data, response = null } = await findOrders(token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { details } = data
      const { orders } = details
      setOrders(orders)
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }, [token])

  const updateOrderList = (id) => {
    setOrders((prevState) => {
      return prevState.filter((prod) => prod._id !== id)
    })
  }

  useEffect(() => {
    getOrders()
  }, [getOrders])

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
  }

  return (
    <div className={AddAnimClass('fadeInRight')}>
      <h2>
        Pedidos <Resultados len={orders.length} />
      </h2>
      {orders.length > 0 ? (
        <ul className={AddAnimClass('fadeInUp') + 'listado-pedidos'}>
          {orders.map((order) => (
            <Pedido
              key={order._id}
              order={order}
              updateOrderList={updateOrderList}
            />
          ))}
        </ul>
      ) : (
        <h2>Aún no hay pedidos realizados</h2>
      )}
    </div>
  )
}

export default Pedidos
