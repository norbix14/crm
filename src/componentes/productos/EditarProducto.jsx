import React, { useContext, useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Toast from '../../helpers/Toast'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'

function EditarProducto(props) {
  const { id } = props.match.params
  const [auth] = useContext(CRMContext)
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
  })
  const { nombre, precio, imagen } = producto

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
    try {
      const url = `/productos/${id}`
      const actualizar = await clienteAxios.put(url, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      if (actualizar.status === 200) {
        if (actualizar.data) {
          if (actualizar.data.error) {
            Toast('warning', actualizar.data.mensaje)
          } else {
            Toast('success', actualizar.data.mensaje)
            props.history.push('/productos')
          }
        }
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.error) {
          Toast('error', err.response.data.mensaje)
        } else {
          Toast('error', err.response.data.mensaje)
        }
      } else {
        Toast('error', 'Ha ocurrido un error')
      }
    }
  }

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `/productos/${id}`
      const obtenerProducto = await clienteAxios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      if (obtenerProducto.status === 200) {
        if (!obtenerProducto.data.error) {
          guardarProducto(obtenerProducto.data.datos)
        } else {
          guardarProducto({})
        }
      }
    }
    consultarAPI()
  }, [id, auth.token])

  if (!auth.auth) {
    props.history.push('/iniciar-sesion')
  }

  return (
    <Fragment>
      <h2>Editar producto</h2>
      <form onSubmit={actualizarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            required
            onChange={leerInfoProducto}
            defaultValue={nombre}
          />
        </div>
        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            required
            onChange={leerInfoProducto}
            defaultValue={precio}
          />
        </div>
        <div className="campo">
          <label>Imagen actual:</label>
          {imagen ? (
            <img alt="Imagen de producto" width="300" src={imagen} />
          ) : null}
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Actualizar Producto"
          />
        </div>
      </form>
    </Fragment>
  )
}

export default withRouter(EditarProducto)
