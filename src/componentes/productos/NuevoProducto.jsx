import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import Toast from '../../helpers/Toast'
import FormProducto from './FormProducto'
import { addProduct } from './handleProducto'
import { validateFields } from '../../helpers/Validator'

const NuevoProducto = (props) => {
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

  const agregarProducto = async (e) => {
    e.preventDefault()
    const passed = validateFields(producto)
    if(passed.valid) {
      addProduct(producto, auth.token, (res) => {
        if(res.ok) {
          Toast('success', res.msg)
          props.history.push('/productos')
        } else {
          Toast('warning', res.msg)
        }
      })
    } else {
      return Toast('warning', passed.msg)
    }
  }

  if (!auth.auth) {
    props.history.push('/iniciar-sesion')
  }

  return (
    <FormProducto
      titulo="Agregar un nuevo producto"
      action="Agregar producto"
      handleSubmit={agregarProducto}
      handleChange={leerInfoProducto}
    />
  )
}

export default withRouter(NuevoProducto)
