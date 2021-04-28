import { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import { Toast } from '../../helpers/SweetAlert'
import FormProducto from './FormProducto'
import { addProduct } from './handleProducts'

/**
 * Componente para agregar un nuevo producto
 * 
 * @param {object} props - component props
*/
const NuevoProducto = (props) => {
  const [ auth ] = useContext(CRMContext)

  const { token, logged } = auth

  const { history } = props

  if (!logged) {
    history.push('/iniciar-sesion')
  }

  const initialState = {
    nombre: '',
    precio: ''
  }

  const [
    product,
    handleInputChange
  ] = useHandlerInputChange(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      data,
      response = null
    } = await addProduct(product, token)
    if (response) {
      const { data } = response
      const { message } = data
      return Toast('warning', message)
    }
    const { message } = data
    Toast('success', message)
    history.push('/productos')
  }

  return (
    <FormProducto
      title="Agregar un nuevo producto"
      action="Agregar producto"
      defaultVal={product}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  )
}

export default withRouter(NuevoProducto)
