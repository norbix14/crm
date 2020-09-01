import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Toast from '../../helpers/Toast'
import FormProducto from './FormProducto'
import {
  editProduct,
  consultarProductoApi
} from './handleProducto'

const EditarProducto = (props) => {
  const { id } = props.match.params
  const [auth] = useContext(CRMContext)
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
  })

  const leerInfoProducto = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    })
  }

  const actualizarProducto = async (e) => {
    e.preventDefault()
    const { nombre, precio } = producto
    const data = {
      nombre,
      precio,
    }
    editProduct(id, data, auth.token, (res) => {
      if(res.ok) {
        Toast('success', res.msg)
        props.history.push('/productos')
      } else {
        Toast('warning', res.msg)
      }
    })
  }

  useEffect(() => {
    consultarProductoApi(id, auth.token, (res) => {
      if(res.ok) {
        guardarProducto(res.data)
      } else {
        guardarProducto({})
      }
    })
  }, [id, auth.token])

  if (!auth.auth) {
    props.history.push('/iniciar-sesion')
  }

  return (
    <FormProducto
      titulo="Editar un producto"
      action="Editar producto"
      defaultVal={producto}
      handleSubmit={actualizarProducto}
      handleChange={leerInfoProducto}
    />
  )
}

export default withRouter(EditarProducto)
