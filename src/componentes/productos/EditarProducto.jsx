import { useCallback, useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast } from '../../helpers/SweetAlert'
import FormProducto from './FormProducto'
import { editProduct, findProduct } from './handleProducts'

/**
 * Componente para editar un producto
 *
 * @param {object} props - component props
 */
const EditarProducto = () => {
  const [auth] = useContext(CRMContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const { token, logged } = auth

  const initialState = {
    nombre: '',
    precio: '',
  }

  const [product, setProduct] = useState(initialState)

  const handleInputChange = (e) => {
    const { target } = e
    const { name, value } = target
    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleProductData = useCallback(async () => {
    try {
      const { data, response = null } = await findProduct(id, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { details } = data
      const { product } = details
      setProduct(product)
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }, [id, token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, response = null } = await editProduct(id, product, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { message } = data
      Toast('success', message)
      navigate('/productos')
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }

  useEffect(() => {
    handleProductData()
  }, [handleProductData])

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
  }

  return (
    <FormProducto
      title="Editar un producto"
      action="Editar producto"
      defaultVal={product}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  )
}

export default EditarProducto
