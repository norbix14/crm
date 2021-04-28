import {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast } from '../../helpers/SweetAlert'
import FormProducto from './FormProducto'
import {
  editProduct,
  findProduct
} from './handleProducts'

/**
 * Componente para editar un producto
 * 
 * @param {object} props - component props
*/
const EditarProducto = (props) => {
  const [ auth ] = useContext(CRMContext)

  const { token, logged } = auth

  const { history, match } = props

  if (!logged) {
    history.push('/iniciar-sesion')
  }

  const { id } = match.params

  const initialState = {
    nombre: '',
    precio: ''
  }

  const [ product, setProduct ] = useState(initialState)

  const handleInputChange = (e) => {
    const { target } = e
    const { name, value } = target
    setProduct(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleProductData = useCallback(async () => {
    try {
      const {
        data,
        response = null
      } = await findProduct(id, token)
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
      const {
        data,
        response = null
      } = await editProduct(id, product, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { message } = data
      Toast('success', message)
      history.push('/productos')
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }

  useEffect(() => {
    handleProductData()
  }, [handleProductData])

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

export default withRouter(EditarProducto)
