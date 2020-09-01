import React, {
  useContext, 
  useEffect, 
  useState
} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Producto from './Producto'
import Toast from '../../helpers/Toast'
import { consultarProductosApi } from './handleProducto'
import Resultados from '../helpers/Resultados'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

const Productos = (props) => {
  const [productos, guardarProductos] = useState([])
  const [auth] = useContext(CRMContext)
  
  useEffect(() => {
    if (auth.token !== '') {
      consultarProductosApi(auth.token, (res) => {
        if(res.ok) {
          guardarProductos(res.data)
        } else {
          guardarProductos([])
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
        Productos <Resultados len={productos.length} />
      </h2>
      <Link 
        className="btn btn-verde nvo-cliente" 
        to={'/productos/nuevo'}
      ><i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      {
        productos.length > 0 ?
          <ul className={AddAnimClass('fadeInUp') + "listado-productos"}>
            {
              productos.map((producto) => (
                <Producto producto={producto} key={producto._id} />
              ))
            }
          </ul>
        : <h2>Aún no hay productos agregados</h2>
      }
    </div>
  )
}

export default withRouter(Productos)
