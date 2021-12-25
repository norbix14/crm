import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'

/**
 * Componente que muestra una cabecera
 *
 * @param {object} props - component props
 */
const Header = () => {
  const [auth, setAuth] = useContext(CRMContext)
  const navigate = useNavigate()

  const { logged } = auth

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    setAuth({
      token: null,
      logged: false,
    })
    navigate('/iniciar-sesion')
  }

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>
          {logged && (
            <button
              type="button"
              className="btn btn-rojo"
              onClick={cerrarSesion}
            >
              <i className="far fa-times-circle"></i>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
