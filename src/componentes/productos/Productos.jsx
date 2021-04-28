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
import Producto from './Producto'
import { findProducts } from './handleProducts'

/**
 * Componente que muestra todos los productos
 * 
 * @param {object} props - component props
*/
const Productos = (props) => {
  const [ auth ] = useContext(CRMContext)

  const { token, logged } = auth

  const { history } = props

  if (!logged) {
    history.push('/iniciar-sesion')
  }

  const [ products, setProducts ] = useState([])

  const handleProductsData = useCallback(async () => {
    try {
      const {
        data,
        response = null
      } = await findProducts(token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { details } = data
      const { products } = details
      setProducts(products)
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }, [token])

  const updateProductList = (id) => {
    setProducts(prevState => {
      return prevState.filter(
        product => product._id !== id
      )
    })
  }

  useEffect(() => {
    handleProductsData()
  }, [handleProductsData])

  return (
    <div className={AddAnimClass('fadeInRight')}>
      <h2>
        Productos <Resultados len={products.length} />
      </h2>
      <Link 
        className="btn btn-verde nvo-cliente" 
        to={'/productos/nuevo'}
      ><i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      {
        products.length > 0 ?
          <ul
            className={AddAnimClass('fadeInUp') + "listado-productos"}
          >
            {
              products.map((product) => (
                <Producto
                  key={product._id}
                  product={product}
                  updateProductList={updateProductList}
                />
              ))
            }
          </ul>
        : <h2>Aún no hay productos agregados</h2>
      }
    </div>
  )
}

export default withRouter(Productos)
