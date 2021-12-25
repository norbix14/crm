import { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { Toast } from '../../helpers/SweetAlert'
import useHandlerInputChange from '../../hooks/useHandlerInputChange'
import FormCrearCuenta from './FormCrearCuenta'
import { signup } from './handleAuth'

/**
 * Componente para crear cuenta
 *
 * @param {object} props - component props
 */
const CrearCuenta = () => {
  const initialState = {
    email: '',
    nombre: '',
    password: '',
  }
  const [auth] = useContext(CRMContext)
  const [values, handleInputChange] = useHandlerInputChange(initialState)
  const navigate = useNavigate()

  const { logged } = auth

  if (logged) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, response = null } = await signup(values)
      if (response) {
        const { data } = response
        const { message } = data
        return Toast('warning', message)
      }
      const { message } = data
      Toast('success', message)
      navigate('/iniciar-sesion')
    } catch (error) {
      return Toast('error', 'Ha ocurrido un error')
    }
  }

  return (
    <div className="crear-cuenta">
      <h2>Crear cuenta</h2>
      <Link to="/iniciar-sesion">Iniciar sesión</Link>
      <div className="contenedor-formulario">
        <FormCrearCuenta
          values={values}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default CrearCuenta
