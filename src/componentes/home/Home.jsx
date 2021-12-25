import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'
import { AddAnimClass } from '../../helpers/AddAnimateClass'

/**
 * Componente para mostrar una pantalla de bienvenida
 *
 * @param {object} props - component props
 */
const Home = () => {
  const [auth] = useContext(CRMContext)

  const { logged } = auth

  if (!logged) {
    return <Navigate to='/iniciar-sesion' />
  }

  return (
    <div className={AddAnimClass('fadeInUp')}>
      <h2>Home</h2>
      <h3>Aquí puedes manejar a tus clientes</h3>
    </div>
  )
}

export default Home
