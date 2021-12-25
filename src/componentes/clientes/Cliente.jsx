import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast, SwalDelete } from '../../helpers/SweetAlert'
import { deleteClient } from './handleClients'

/**
 * Componente para mostrar datos de un cliente y
 * que muestra las acciones que se pueden realizar
 * como `Editar`, `Eliminar`, etc
 *
 * @param {object} props - component props
 * @param {object} props.client - client data
 * @param {function} props.updateClientList - function
 * to update client list
 */
const Cliente = (props) => {
  const [auth] = useContext(CRMContext)

  const { token, logged } = auth

  const { client, updateClientList } = props

  const { _id, nombre, apellido, empresa, email, telefono } = client

  const handleDeleteClick = () => {
    SwalDelete(async () => {
      try {
        const { data, response = null } = await deleteClient(_id, token)
        if (response) {
          const { data } = response
          const { message } = data
          return Toast('warning', message)
        }
        const { message } = data
        updateClientList(_id)
        return Toast('success', message)
      } catch (error) {
        return Toast('error', 'Ha ocurrido un error')
      }
    })
  }

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
  }

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          Cliente: {nombre} {apellido}
        </p>
        <p className="empresa">Empresa: {empresa}</p>
        <p>Email: {email}</p>
        <p>Teléfono: {telefono}</p>
      </div>
      <div className="acciones">
        <Link className="btn btn-azul" to={'/clientes/editar/' + _id}>
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link className="btn btn-amarillo" to={'/pedidos/nuevo/' + _id}>
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={handleDeleteClick}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  )
}

Cliente.propTypes = {
  client: PropTypes.object.isRequired,
  updateClientList: PropTypes.func.isRequired,
}

export default Cliente
