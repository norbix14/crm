import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { addOrder } from './handleOrders'
import { Toast } from '../../helpers/SweetAlert'

/**
 * @param {object} props - component props
 * @param {string} props.idClient - client `_id`
 * @param {Array<object>} props.products - the order
 * @param {number} props.total - how much to pay
 * @param {string} props.token - authorization token
 */
const RealizarPedido = (props) => {
  const navigate = useNavigate()
  const { idClient, products, total, token } = props

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newOrder = {
        cliente: idClient,
        pedido: products,
        total,
      }
      const { data, response = null } = await addOrder(
        idClient,
        newOrder,
        token
      )
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { message } = data
      Toast('success', message)
      navigate('/pedidos')
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={total === 0}
        className="btn btn-verde btn-block"
      >
        Realizar el pedido
      </button>
    </form>
  )
}

RealizarPedido.propTypes = {
  idClient: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  token: PropTypes.string,
}

export default RealizarPedido
