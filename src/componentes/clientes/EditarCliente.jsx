import { useCallback, useContext, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import { Toast } from '../../helpers/SweetAlert'
import FormCliente from './FormCliente'
import { editClient, findClient } from './handleClients'

/**
 * Componente para editar un cliente
 *
 * @param {object} props - component props
 */
const EditarCliente = () => {
  const [auth] = useContext(CRMContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const { token, logged } = auth

  const initialState = {
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',
  }

  const [client, handleInputChange, setClient] =
    useHandlerInputChange(initialState)

  const handleClientData = useCallback(async () => {
    try {
      const { data, response = null } = await findClient(id, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { details } = data
      const { client } = details
      setClient(client)
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }, [id, token, setClient])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { _id } = client
      const { data, response = null } = await editClient(_id, client, token)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { message } = data
      Toast('success', message)
      navigate('/clientes')
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }

  useEffect(() => {
    handleClientData()
  }, [handleClientData])

  if (!logged) {
    return <Navigate to="/iniciar-sesion" />
  }

  return (
    <FormCliente
      action="Editar cliente"
      title="Editar datos del cliente"
      client={client}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditarCliente
