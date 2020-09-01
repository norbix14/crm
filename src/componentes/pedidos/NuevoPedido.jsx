import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Toast from '../../helpers/Toast'
import FormBuscarProducto from './FormBuscarProducto'
import FormCantidadProducto from './FormCantidadProducto'
import FichaCliente from './FichaCliente'
import {
  consultarClienteDeApi,
  addOrder,
  searchProduct
} from './handlePedido'

const NuevoPedido = (props) => {
  const { id } = props.match.params
  const [auth] = useContext(CRMContext)
  const [cliente, guardarCliente] = useState({})
  const [busqueda, guardarBusqueda] = useState('')
  const [productos, guardarProductos] = useState([])
  const [total, guardarTotal] = useState(0)

  const buscarProducto = (e) => {
    e.preventDefault()
    searchProduct(busqueda, auth.token, (res) => {
      if(res.ok) {
        if (res.data[0]) {
          let productoResultado = res.data[0]
          productoResultado.producto = res.data[0]._id
          productoResultado.cantidad = 0
          guardarProductos([...productos, productoResultado])
        } else {
          Toast('warning', 'Lo sentimos, no hay resultados')
        }
      } else {
        Toast('warning', res.msg)
      }
    })
  }

  const leerDatosBusqueda = (e) => guardarBusqueda(e.target.value)

  const restarProductos = (i) => {
    const todosProductos = [...productos]
    if (todosProductos[i].cantidad === 0) return
    todosProductos[i].cantidad--
    guardarProductos(todosProductos)
    actualizarTotal()
  }

  const sumarProductos = (i) => {
    const todosProductos = [...productos]
    todosProductos[i].cantidad++
    guardarProductos(todosProductos)
    actualizarTotal()
  }

  const actualizarTotal = useCallback(() => {
    if (productos.length === 0) {
      guardarTotal(0)
      return
    }
    let nuevoTotal = 0
    productos.map(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    )
    guardarTotal(nuevoTotal)
  }, [productos])

  const eliminarProductoPedido = (id) => {
    const productosFiltrados = productos.filter(
      (producto) => producto.producto !== id
    )
    guardarProductos(productosFiltrados)
  }

  const realizarPedido = async (e) => {
    e.preventDefault()
    const { id } = props.match.params
    const pedido = {
      cliente: id,
      pedido: productos,
      total: total,
    }
    addOrder(id, pedido, auth.token, (res) => {
      if(res.ok) {
        Toast('success', res.msg)
        props.history.push('/pedidos')
      } else {
        Toast('warning', res.msg)
      }
    })
  }

  useEffect(() => {
    consultarClienteDeApi(id, auth.token, (res) => {
      if(res.ok) {
        guardarCliente(res.data)
      }
    })
    actualizarTotal()
  }, [id, actualizarTotal, auth.token])

  if (!auth.auth) {
    props.history.push('/iniciar-sesion')
  }

  return (
    <Fragment>
      <h2>Nuevo pedido</h2>
      <FichaCliente cliente={cliente} />
      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />
      <ul className="resumen">
        {
          productos.map((producto, index) => (
            <FormCantidadProducto
              producto={producto}
              key={producto.producto}
              restarProductos={restarProductos}
              sumarProductos={sumarProductos}
              eliminarProductoPedido={eliminarProductoPedido}
              index={index}
            />
          ))
        }
      </ul>
      <p className="total">Total: <span>${total}.-</span></p>
      {
        total > 0 && (
          <form onSubmit={realizarPedido}>
            <input
              type="submit"
              className="btn btn-verde btn-block"
              value="Realizar el pedido"
            />
          </form>
        )
      }
    </Fragment>
  )
}

export default withRouter(NuevoPedido)
