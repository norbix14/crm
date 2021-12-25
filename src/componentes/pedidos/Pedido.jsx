import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CRMContext } from '../../context/CRMContext'
import { Toast, SwalDelete } from '../../helpers/SweetAlert'
import Articulo from './Articulo'
import { deleteOrder } from './handleOrders'

/**
 * Componente que muestra datos del pedido
 *
 * @param {object} props - component props
 * @param {object} props.order - order data
 * @param {function} props.updateOrderList - function
 * to update order list
 */
const Pedido = (props) => {
  const [auth] = useContext(CRMContext)
  const navigate = useNavigate()

  const { token, logged } = auth

  const { order, updateOrderList } = props

  const { _id, cliente, total, pedido } = order

  const fullClientName = (obj) => {
    if (obj !== null) {
      return `${obj.nombre} ${obj.apellido}`
    }
    return 'Este cliente ya no existe'
  }

  const handleClickDelete = () => {
    SwalDelete(async () => {
      try {
        const { data, response = null } = await deleteOrder(_id, token)
        if (response) {
          const { data } = response
          const { message } = data
          return Toast('warning', message)
        }
        const { message } = data
        Toast('success', message)
        updateOrderList(_id)
        navigate('/pedidos')
      } catch (error) {
        return Toast('error', 'Ha ocurrido un error')
      }
    })
  }

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
  }

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">Orden ID: {_id}</p>
        <p className="nombre">Cliente: {fullClientName(cliente)}</p>
        <div className="articulos-pedido">
          <p className="productos">Artículos del pedido</p>
          <ul>
            {pedido.map((element, index) => (
              <Articulo key={element._id} index={index} element={element} />
            ))}
          </ul>
        </div>
        <p className="total">Total: ${total}.-</p>
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={handleClickDelete}
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  )
}

Pedido.propTypes = {
  order: PropTypes.object.isRequired,
  updateOrderList: PropTypes.func.isRequired,
}

export default Pedido
