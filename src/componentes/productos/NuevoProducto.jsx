import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
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
const NuevoProducto = () => {
  const [auth] = useContext(CRMContext)
  const navigate = useNavigate()

  const { token, logged } = auth

  const initialState = {
    nombre: '',
    precio: '',
  }

  const [product, handleInputChange] = useHandlerInputChange(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, response = null } = await addProduct(product, token)
    if (response) {
      const { data } = response
      const { message } = data
      return Toast('warning', message)
    }
    const { message } = data
    Toast('success', message)
    navigate('/productos')
  }

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
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

export default NuevoProducto
