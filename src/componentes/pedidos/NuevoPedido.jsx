import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast } from '../../helpers/SweetAlert'
import {
  calculateTotal,
  checkRepeated
} from '../../helpers/OrderUtils'
import FormBuscarProducto from './FormBuscarProducto'
import FormCantidadProducto from './FormCantidadProducto'
import FichaCliente from './FichaCliente'
import RealizarPedido from './RealizarPedido'
import { findClientData } from './handleOrders'

/**
 * Componente para agregar un nuevo pedido
 * 
 * @param {object} props - component props
*/
const NuevoPedido = (props) => {
  const [ auth ] = useContext(CRMContext)

  const { token, logged } = auth

  const { history, match } = props

  if (!logged) {
    history.push('/iniciar-sesion')
  }

  const { id } = match.params

  const [ total, setTotal ] = useState(0)
  const [ client, setClient ] = useState({})
  const [ products, setProducts ] = useState([])

  const updateTotal = useCallback(() => {
    const newTotal = calculateTotal(products)
    setTotal(newTotal)
  }, [products])

  const findClient = useCallback(async () => {
    try {
      const {
        data,
        response = null
      } = await findClientData(id, token)
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
  }, [id, token])

  const addProductToList = (product) => {
    setProducts(prevState => {
      if (prevState.length <= 0) {
        return [
          ...prevState,
          product
        ]
      }
      return checkRepeated(prevState, product)
    })
  }

  useEffect(() => {
    findClient()
  }, [findClient])

  useEffect(() => {
    updateTotal()
  }, [updateTotal])

  return (
    <>
      <h2>Nuevo pedido</h2>
      <FichaCliente
        client={client}
       />
      <FormBuscarProducto
        token={token}
        addProductToList={addProductToList}
      />
      <ul className="resumen">
        {
          products.length > 0 && (
            products.map((product) => (
              <FormCantidadProducto
                key={product._id}
                product={product}
                setProducts={setProducts}
              />
            ))
          )
        }
      </ul>
      <p className="total">
        Total: <span>${total}.-</span>
      </p>
      <RealizarPedido
        idClient={id}
        products={products}
        total={total}
        token={token}
      />
    </>
  )
}

export default withRouter(NuevoPedido)
